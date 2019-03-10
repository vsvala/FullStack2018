const bcrypt = require('bcrypt') //salasanojen hashaamiseen
const usersRouter = require('express').Router()
const User = require('../models/user')



usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs',{ title:1, author:1, url:1, likes:1 } )
  //liitosten tekeminen mongoosen komennolla populate ja rajataan mukaan otettavat
  response.json(users.map(User.format))
})


usersRouter.post('/', async (request, response) => {
  // varmistetaan ettei samaa kättäjänimeä voi lisäta kahdesti etsimällä löytyykö kannsta samannimistä nimistä
  try {
    const body = request.body

    const existingUser = await User.find({ username: body.username })
    if (existingUser.length>0) {
      return response.status(400).json({ error: 'username must be unique' })
    }


    if (body.password.length<3) {
      return response.status(400).json({ error: 'password must have at least 3 letters' })
    }

    // Tietokantaan siis ei talleteta pyynnön mukana tulevaa salasanaa, vaan funktion bcrypt.hash avulla laskettu hash
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
      age: body.age
    })

    const savedUser = await user.save()

    response.json(User.format(savedUser))
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

module.exports = usersRouter