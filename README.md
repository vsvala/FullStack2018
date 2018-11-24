# FullStack2018

Kurssilla tutustutaan Javascriptilla tapahtuvaan moderniin websovelluskehitykseen. Pääpaino on React-kirjaston avulla toteutettavissa single page -sovelluksissa, ja niitä tukevissa Node.js:llä toteutetuissa REST-rajapinnoissa.

Kurssilla käsitellään myös sovellusten testaamista, konfigurointia ja suoritusympäristöjen hallintaa sekä NoSQL-tietokantoja.

**[osa3 Puhelinmuistio](https://github.com/vsvala/Fullstack_phonebook_osa3)**

**[osa3 Puhelinmuistio heroku](https://limitless-island-73610.herokuapp.com)** Linkki sovelluksen nettiversioon Herokussa 

**[osa4 Blogi](https://github.com/vsvala/Fullstack_osa4_blogi/tree/master/osa4_backend-)**

# Käytetyt työkalut ja termit

### REST = Representational State Transfer
on HTTP-protokollaan perustuva arkkitehtuurimalli ohjelmointirajapintojen toteuttamiseen. Se määrittelee, millaisilla operaatioilla palvelinten dataa pyydetään, lisätään ja käsitellään.Restin tärkeä määrittävä tekijä on tilattomuus.Toinen tärkeä osa on palvelin–asiakas-malli.Rest pohjaa vahvasti http-protokollan ominaisuuksiin. Http:n metodeja (get, post, put ja delete) sekä eri uri:ta käytetään kuvaamaan pyynnön luonnetta, jolloin itse pyynnön dataan ei tarvitse sisällyttää metatietoja.  

### Node.js 
 [Node.js](https://nodejs.org/en/) on avoimen lähdekoodin alustariippumaton JavaScript runtime-ympäristö JavaScript-koodin suorittamiseen palvelimella. Node.js mahdollistaa koodin suorittamisen suoraan palvelimella, jonka jälkeen verkkosivu lähetetään käyttäjälle. Node.jspohjautuu Googlen Chrome V8 JavaScript-moottoriin.

### NPM: Node Package Manager
NPM: Node Package Manager on pakettien hallinta työkalu, joka mahdollistaa moduulien julkaisun muiden käyttöön.

### Express-sovelluskehys
Node.js:n [Express-sovelluskehys](https://expressjs.com/)
Nodella tapahtuvaa web-sovellusten ohjelmointia helpottamaan kehitelty ohjelmointirajapinnan tarjoama kirjasto.

 ### JSON = JavaScript Object Notation
 JSON-muotoinen “raakadata”, tiedostoformaatti

 ### DOM = Document Object Model 
 Document Object Model eli DOM on ohjelmointirajapinta eli API, joka mahdollistaa selaimessa esitettävien web-sivuja vastaavien elementtipuiden muokkaamisen ohjelmallisesti.

 ### HTML

 ### CSS = Cascading Style Sheets 
 CSS on kieli, jonka avulla web-sovellusten ulkoasu määritellään

### SPA = Single-page application
Viimeisten vuosien aikana on noussut esiin tyyli tehdä web-sovellukset käyttäen Single-page application (SPA) -tyyliä, missä sovelluksille ei enää tehdä erillisiä, palvelimen sille lähettämiä sivuja, vaan sovellus koostuu ainoastaan yhdestä palvelimen lähettämästä HTML-sivusta, jonka sisältöä manipuloidaan selaimessa suoritettavalla Javascriptillä.

### Middlewaret
Middlewaret ovat funktioita, joiden avulla voidaan käsitellä request- ja response-olioita.

### same origin policy ja CORS 
Yleismaailmallisia periaatteita Web-sovellusten toiminnasta: websovelluksen selaimessa suoritettava Javascript-koodi saa oletusarvoisesti kommunikoida vain samassa originissa olevan palvelimen kanssa. Muista origineista tulevat pyynnöt voidaan salli käyttämällä Noden [cors-middlewarea](https://github.com/expressjs/cors).

# Tietokanta

### Mongo ja mlab
Tehtävissä on käytössä [MongoDB:tä](https://www.mongodb.com/) joka on ns. dokumenttitietokanta. Mongosta käytetään netissä palveluna toimivaa [mlab:in](https://mlab.com/) kantaa.

### Mongoose kirjasto
Mongoosea voisi luonnehtia: object document mapper (ODM), ja sen avulla Javascript-olioiden tallettaminen mongon dokumenteiksi on suoraviivaista.
asennus: npm install mongoose --save

# Aputyökaluja

### [nodemon](https://github.com/remy/nodemon) 
sovelluskehitystyökalu jota käytetään sovelluksen automaattiseen uudelleenkäynnistykseen. 

### [body-parser kirjasto](https://github.com/expressjs/body-parser)
middleware HTTP POST pyyntöjen käsittelyn apuri, Body-parserin toimintaperiaatteena on, että se ottaa pyynnön mukana olevan JSON-muotoisen datan, muuttaa sen Javascript-olioksi.


# Käyttöohje

Projektin normaalit riippuvuudet määritellään package.json tiedostoon "dependencies" alle. Kehitysaikaiset rippuvuudet määritellään "devDependencies" alle. Käynnistys scriptit määritellään "script":in alle.

Määritellään käynnistykselle npm-skripti tiedostoon package.json

 ``` 
  // ..
  "scripts": {
    "start": "node index.js",
    "watch": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  // ..
  ´´´ 
 
´npm start`           sovelluksen käynnistäminen
´npm run watch`     sovelluksen automaattinen uudelleen käynnistäminen nodemonin avulla
 ```
### Kirjautuminen

salasanan kryptaus
Käytetään jsonwebtoken-kirjastoa, jonka avulla koodimme pystyy generoimaan JSON web token -muotoisia tokeneja.
 
### ympäristömuutujat
Noden konventiona on määritellä projektin suoritusmoodi ympäristömuuttujan NODE_ENV avulla. 
 Asennetaan  dotenv-kirjasto ympäristömuuttujien määrittelyyn
  `npm install dotenv --save`
 Sovelluksen juurihakemistoon tehdään sitten tiedosto nimeltään .env
` MONGODB_URI=mongodb://fullstack:sekred@ds111078.mlab.com:11078/fullstact-notes-dev`
Tiedosto .env **tulee heti gitignorata**
Otetaan dotenv käyttöön seuraavasti:
  `const mongoose = require('mongoose')

if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config()
}
const url = process.env.MONGODB_URI
// ...
module.exports = Note  `
Nyt dotenvissä olevat ympäristömuuttujat otetaan käyttöön ainoastaan silloin kun sovellus ei ole production- eli tuotantomoodissa (kuten esim. Herokussa).
 
  Yleinen käytäntö on määritellä sovelluksille omat moodinsa myös sovelluskehitykseen ja testaukseen.

Määritellään nyt tiedostossa package.json, että testejä suorittaessa sovelluksen NODE_ENV saa arvokseen test:
`
{
  // ...
  "scripts": {
    "start": "NODE_ENV=production node index.js",
    "watch": "NODE_ENV=development nodemon index.js",
    "test": "NODE_ENV=test jest --verbose",
    "lint": "eslint ."
  },
  // ...
}
`
Samalla määriteltiin, että suoritettaessa sovellusta komennolla npm run watch eli nodemonin avulla, on sovelluksen moodi development. Jos sovellusta suoritetaan normaalisti Nodella, on moodiksi määritelty production.
Eristetään sovelluksen ympäristökohtainen konfigurointi omaan tiedostoon utils/config.js sijoitettavaan moduuliin.
 
### sovellus herokuun

### Lint koodin tyylintarkastus
Javascript-maailmassa tämän hetken johtava työkalu staattiseen analyysiin, eli “linttaukseen” on ESlint.
Javascript-maailmassa tämän hetken johtava työkalu staattiseen analyysiin, eli “linttaukseen” on ESlint.

# Hyödyllisiä toimintoja
## palvelinta suorittava prosessin "tappaminen"
 Portin 3002 varaavan prosessin -id eli PID (esim. 8318) löytyy OSX:lla ja Linuxilla esim. komennolla lsof -i :3002.
 Prosessin saa tapettua komennolla KILL 8318 olettaen että PID on 8318 niin kuin kuvassa. Joskus prosessi on sitkeä eikä kuole ennen kuin se tapetaan komennolla KILL -9 8318.
 
# Testaus
 ### Yksikkötestaus
 jest
 
 ### API:n backendin testaus
Käytetään API:n testaamiseen Jestin apuna supertest-kirjastoa.
 Integraatiotestit = useita sovelluksen komponentteja yhtäaikaa käyttäviä testejä
 (“valekomponentilla” eli mockilla.mongo-mock.)
 
 

`
