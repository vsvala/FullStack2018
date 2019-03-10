if (process.env.NODE_ENV !== 'production') { // Koodi lataa ympäristömuuttujat tiedostosta .env jos se ei ole tuotantomoodissa.
  require('dotenv').config()
}
let port = process.env.PORT
let mongoUrl = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test') {  // haetaan env kansiosta testitietokannan
  port = process.env.TEST_PORT
  mongoUrl = process.env.TEST_MONGODB_URI
}

module.exports = {
  mongoUrl,
  port
}