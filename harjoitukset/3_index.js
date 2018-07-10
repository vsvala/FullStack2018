
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')


app.use(cors())
app.use(bodyParser.json())

// const logger = (request, response, next) => {
//   console.log('Method:', request.method)
//   console.log('Path:  ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('---')
//   next()
// }

app.use(express.static('build'))
//app.use(logger)

morgan.token('content', function (req, res) {
return JSON.stringify(req.body)
})
app.use(morgan(':method :url :content :status :res[content-length] - :response-time ms')
)

const formatPerson = (person) => {
  return {
    name: person.name,
    num: person.num,
    important: person.important,
    id: person._id
  }
}

app.get('/api/persons/:id', (request, response) => {
  Person
        .findById(request.params.id)
        .then(person=>{
          if (person){
            response.json(formatPerson(person))
            } else {
              response.status(404).end()
            }
          })
          .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
          })
          
        })

app.delete('/api/persons/:id', (request, response) => {
  Person
  .findByIdAndRemove(request.params.id)
  .then(result=>{  response.status(204).end()
  })
  .catch(error=>{
    response.status(400).send({error:'malformatted id'})
})
})


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({error: 'name missing'})
  }
  if (body.num === undefined) {
    return response.status(400).json({error: 'number missing'})
  }

  const person = new Person({
    name: body.name,
    num: body.num,
    important: body.important|| false,
    id: getRandomInt(50000)
  })

person
  .save()
  .then(savedPerson=> {
   response.json(formatPerson(savedPerson)) 
})
.catch(error => {
  console.log(error)
  response.status(404).end()
})
})

app.get('/info', (req, res) => {
  Person
    .find({})
    .then(persons=>{
       res.send('<p>puhelinluettelossa on '+ persons.length+' henkilön tiedot</p>'
      +new Date())
    })
})

app.get('/api/persons', (req, res) => {
  Person 
  .find({})
  .then(persons=>{
   res.json(persons.map(formatPerson))
  })
})



app.put('/api/persons/:id', (request, response) => {
  const body = request.body

  const person = {
    name: body.name,
    num: body.num,
   // important: body.important
  }

  Person
    .findByIdAndUpdate(request.params.id, person, { new: true } )
    .then(updatedPerson=> {
      response.json(formatPerson(updatedPerson))
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

const error = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(error)


const PORT =process.env.PORT || 3004
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
