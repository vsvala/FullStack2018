# Sovelluksen toteutus

## Sovelluksen luonti ja käynnistys

```
npx create-react-app "nimeämäsikansio"
cd "nimeämäsikansio"
npm start
````

asennetaan siihen redux komennolla
```
npm install redux --save
```

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
