const http = require('http')
const express = require('express') //ohjelmointirajapinnan tarjoava kirjasto
const app = express()
const bodyParser = require('body-parser') //kirjasto HTTP POST pyyntöjen apuriksi
const cors = require('cors') //middleware sallii pyynnöt muista origineista
const mongoose = require('mongoose') // mongoose kirjasto JS-olioiden tallentamiseksi mongo databasin dokumenteiksi
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs') //haetaan blogs modulista router käyttöön
const config = require('./utils/config') //ympäristökohtainen konfigurointi
const usersRouter = require('./controllers/users') // huolehtii users pyynnöistä
const loginRouter = require('./controllers/login')

// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config()
// }

//tietokantayhteyden muodostus käyttää utils/config.js konfigurointia
mongoose
  .connect(config.mongoUrl)
  .then( () => {
    console.log('connected to database', config.mongoUrl)
  })
  .catch( error => {
    console.log(error)
  })

//otetaan käyttöön joukko erilaisia  middlewareja eli funktioita request- ja response-olioiden käsittelyyn.
app.use(middleware.tokenExtractor)
app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build')) //tarkastaa express GET-tyyppisten HTTP-pyyntöjen yhteydessä ensin löytyykö pyynnön polkua vastaavan nimistä tiedostoa hakemistosta build
app.use(middleware.logger) //määritelty utils tiedostossa middleware.js

//app.use(middleware.tokenExtractor)

//otetaan router middlewaret käyttöön ja määritellään polun alkuosa /api/ ?
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.error) ////määritelty utils tiedostossa middleware.js


// yhteydet serveriin ja databaseen
// Sovelluksen käynnistäminentapahtuu server-muuttujassa olevan olion kautta.
const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

// Tapahtumankäsittelijäfunktio sulkee tietokantayhteyden.
server.on('close', () => {
  mongoose.connection.close()
})
// Sekä sovellus app että sitä suorittava server-olio määritellään eksportattavaksi tiedostosta. 
// Tämä mahdollistaa sen, että testit voivat käynnistää ja sammuttaa backendin.
module.exports = {
  app, server
}
