const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const cors = require('cors')

app.use(cors())


const logger = (request, response, next) => {
    console.log('Method:',request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }
  app.use(logger)

let notes = [
    {
      id: 1,
      content: 'HTML on helppoa',
      date: '2017-12-10T17:30:31.098Z',
      important: true
    },
    {
      id: 2,
      content: 'Selain pystyy suorittamaan vain javascriptiä',
      date: '2017-12-10T18:39:34.091Z',
      important: false
    },
    {
      id: 3,
      content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
      date: '2017-12-10T19:20:14.298Z',
      important: true
    }
  ]
  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
  app.get('/notes', (req, res) => {
    res.json(notes)
  })

  app.get('/notes/:id', (request, response) => {
    const id =  Number(request.params.id)
    const note = notes.find(note => note.id === id )
    if ( note ) {
        response.json(note)
      } else {
        response.status(404).end()
      }
  })
  app.delete('/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
  })

  const generateId = () => {
    const maxId = notes.length > 0 ? notes.map(n => n.id).sort().reverse()[0] : 1
    return maxId + 1
  }
  
  app.post('/notes', (request, response) => {
    const body = request.body
  
    if (body.content === undefined) {
      return response.status(400).json({error: 'content missing'})
    }
  
    const note = {
      content: body.content,
      important: body.important|| false,
      date: new Date(),
      id: generateId()
    }
  
    notes = notes.concat(note)
  
    response.json(note)
  })

  const error = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
  }
  
  app.use(error)
  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })