
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
//const morgan = require('morgan')
const cors = require('cors')


app.use(bodyParser.json())
app.use(cors())

//morgan.token('content', function (req, res) {
// return JSON.stringify(req.body)
//})
//app.use(morgan(':method :url :content :status :res[content-length] - :response-time ms')
//)


let persons= [
  {
    name: "Martti Tienari",
    num: "040-12345678",
    important: true,
    id: 1
  },
  {
    name: "Arto Järvinen",
    num: "040-123456",
    id: 2,
    important: true
  },
  {
    name: "Lea Kutvonen",
    num: "300",
    important: true,
    id: 3
  }
]


app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if ( person ) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
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
  if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({error: 'name is allready in the phonebook, name must be unique'})
}

  const person = {
    name: body.name,
    num: body.num,
    important: body.important|| false,
    id: getRandomInt(50000)
  }

  persons = persons.concat(person)

  response.json(person)
})



app.get('/', (req, res) => {
  res.send('<h1>Hello World!!!!</h1>')
})


app.get('/info', (req, res) => {
  res.send('<p>puhelinluettelossa on '+ persons.length+' henkilön tiedot</p>'
  +new Date())
})


app.get('/api/persons', (req, res) => {
  res.json(persons)
})


const PORT =process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
