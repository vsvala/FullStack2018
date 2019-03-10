const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const body = request.body

  //etsitään pyynnön mukana  olevaa username:a vastaavan käyttäjän tietokannasta
  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null ?
    false :
    await bcrypt.compare(body.password, user.passwordHash)
  // katsotaan onko pyynnön mukana oleva password oikea salasanasta laskettu hash, tehdään vertailu metodilla bcrypt.compare:
  if ( !(user && passwordCorrect) ) {
    return response.status(401).send({ error: 'invalid username or password' })
  }
  // luodaan metodin jwt.sign avulla token, joka sisältää kryptatussa muodossa käyttäjätunnuksen ja käyttäjän id:
  const userForToken = {
    username: user.username,
    id: user._id
  }

  //console.log(process.env.SECRET)
  //Token on digitaalisesti allekirjoitettu käyttämällä salaisuutena ympäristömuuttujassa SECRET olevaa merkkijonoa. Digitaalinen allekirjoitus varmistaa sen, että ainoastaan salaisuuden tuntevilla on mahdollisuus generoida validi token.
  // Ympäristömuuttujalle pitää muistaa asettaa arvo tiedostoon .env.
  const token = jwt.sign(userForToken, process.env.SECRET)

  response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter