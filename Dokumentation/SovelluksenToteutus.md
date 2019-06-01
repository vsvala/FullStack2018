# Sovelluksen toteutus

## Sovelluksen luonti ja käynnistys

Asenna koneeseesi [Node.js](https://nodejs.org/en/) Noden (väh.5.3) mukana asentuu npm-työkalu (node packagemanager) jonka mukana asentuu komento npx, joka mahdollistaa create-react-app:in käytön asentamatta sitä erikseen. 

Npm:n version saa selville komennolla npm -v.

```
npx create-react-app "nimeämäsikansio"
cd "nimeämäsikansio"
npm start
````
Sovellus käynnistyy oletusarvoisesti localhostin porttiin 3000, eli osoitteeseen http://localhost:3000 automaattisesti.

asennetaan sovellukseen axios-kirjasto selaimen ja palvelimen välisen kommunikoinnin  hoitamiseen
```
npm install axios --save
```
asennetaan sovellukseen redux komennolla
```
npm install redux --save
```
Asennetaan myös json-server projektin sovelluskehityksen aikaiseksi riippuvuudeksi komennolla
```
npm install json-server --save-dev
```

Projektin normaalit riippuvuudet määritellään package.json tiedostoon "dependencies" alle. Kehitysaikaiset rippuvuudet määritellään "devDependencies" alle. Käynnistys scriptit määritellään "script":in alle.

Määritellään käynnistykselle npm-skripti tiedostoon package.json ja json serverille käynnistys scripti

 ``` 
  // ..
  "scripts": {
    "start": "node index.js",
    "watch": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
    "server": "json-server -p3001 db.json"
  },
  // ..
  ´´´ 
 
´npm start`           sovelluksen käynnistäminen
´npm run watch`     sovelluksen automaattinen uudelleen käynnistäminen nodemonin avulla
 ```
## Backendin luominen

Mennään sopivaan hakemistoon ja luodaan projektimme runko komennolla npm init. Vastaillaan kysymyksiin sopivasti ja tuloksena on hakemiston juureen sijoitettu projektin tietoja kuvaava tiedosto package.json

Luodaan sitten sovelluksen ensimmäinen versio, eli projektin juureen sijoitettava tiedosto index.js 

Otetaan käyttöön ohjelmointirajapinnan tarjoama kirjasto express määrittelemällä se projektimme riippuvuudeksi komennolla
 ``` 
npm install express --save
 ```
 Jos aloitamme projektin koodaamisen toisella koneella, saamme haettua ajantasaiset, package.json:in määrittelyn kanssa yhteensopivat riippuvuudet komennolla
 ``` 
npm install
 ```
 Nodmon käynnistää automaattisesti sovelluksen aina kunsiihen tehdään muutoksia.
 Asennetaan nodemon määrittelemällä se kehitysaikaiseksi riippuvuudeksi
 ``` 
npm install --save-dev nodemon
 ```  
Koska palvelin on localhostin portissa 3001 ja frontend localhostin portissa 3000, niiden origin ei ole sama.
Voimme sallia muista origineista tulevat pyynnöt käyttämällä Noden cors-middlewarea.
Asennetaan cors komennolla:
 ``` 
npm install cors --save
 ``` 
 Otetaan middleware käyttöön ja sallitaan kaikki origineista tulevat pyynnöt:
 ``` 
const cors = require('cors')
app.use(cors())
 ``` 
 
 ###  [ESlint](https://github.com/vsvala/FullStack2018/blob/master/Dokumentation/lint.md) koodin tyylintarkastus
Javascript-maailmassa tämän hetken johtava työkalu staattiseen analyysiin, eli “linttaukseen” on ESlint.

 
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

### Kirjautuminen

salasanan kryptaus
Käytetään jsonwebtoken-kirjastoa, jonka avulla koodimme pystyy generoimaan JSON web token -muotoisia tokeneja.

# Hyödyllisiä toimintoja
## palvelinta suorittava prosessin "tappaminen"
 Portin 3002 varaavan prosessin -id eli PID (esim. 8318) löytyy OSX:lla ja Linuxilla esim. komennolla lsof -i :3002.
 Prosessin saa tapettua komennolla KILL 8318 olettaen että PID on 8318 niin kuin kuvassa. Joskus prosessi on sitkeä eikä kuole ennen kuin se tapetaan komennolla KILL -9 8318.
 

