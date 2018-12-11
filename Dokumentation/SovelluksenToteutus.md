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


asennetaan sovellukseen redux komennolla
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
 
 # React sovelluksen toimintaperiaatteita
 
### komponentit

React päivittää/renderöi käyttöliittymän automaattisesti kun data muuttuu. React osaa päivittää käyttöliittymästä vain ne osat jotka liittyvät muuttuneeseen dataan Reactilla toteutettu käyttöliittymä muodostuu koostetuista ***komponenteista jotka kirjoitetaan isolla**. Reactissa filosofiana onkin koostaa sovellus useista, pieneen asiaan keskittyvistä uudelleenkäytettävistä komponenteista.React ei käytä html- templateja vaan Javascriptia ja JSX:ää.  Elementin attribuuteissa sijaitseva Javascript-koodi sijoitetaan JSX-syntaksissa {}-merkkien sisään. Komponetteja kutsutaan <Komponentti/>

Kannattaa myös pitää mielessä, että React-komponentin sisällön tulee (yleensä) sisältää yksi juurielementti. Eli div tagit elementtien ympärille. Komponentin App määrittely ilman uloimmaista div-elementtiä johtaisi virheilmoitukseen:JSX must be wrappedin an enclosing tag.

ReactDOM.render(<App />, document.getElementById('root'))

Komento renderöi komponentin sisällön tiedoston public/index.html määrittelemään div-elementtiin, jonka id:n arvona on ‘root’

### tiedon välitys propsien avulla 


Komponenteille on mahdollista välittää dataa propsien avulla.
```
const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const App = () => {
  const nimi = 'Pekka'
  const ika = 10
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Arto" age={26 + 10} />
      <Hello name={nimi} age={ika} />
    </div>
  )
}
```
### funktionaalinen ja luokkakomponentti

Reactin best practice onkin käyttää funktioiden avulla määriteltyjä komponentteja aina kuin mahdollista.
Jos komponentti tarvitsee tilaa, on luokkasyntaksin käyttäminen välttämätöntä. Kannattaa kuitenkin muistaa, että Reactin filosofian mukaista on sijoittaa tila mahdollisimman ylös komponenttihierarkiaan, mielellään ainoastaan sovelluksen juurikomponenttiin. Näin tilallisten komponenttien potentiaalinen tarvekin on vähäisempi.

Yllä käytetään funktionaalisia komponentteja, eli määrittelimme kaikki komponentit nuolifunktioiden avulla.Toinen tapa komponenttien määrittelyyn on käyttää luokkasyntaksia. Tällöin komponentti määritellään luokaksi, joka perii React.Component-luokan.

```class Hello extends React.Component {
  render() {
    return (
      <div>
        <p>Hello {this.props.name}, you are {this.props.age} years old</p>
      </div>
    )
  }
}
```
Luokkakomponenttien tulee määritellä ainakin metodi render, joka palauttaa komponentin ulkoasun määrittelevät React-elementit eli käytännössä JSX:n.

Luokkakomponentissa viitataan komponentin propseihin this-viitteen kautta.päästään nimeen ja ikään käsiksi luokkamuotoisen komponentin sisällä viittaamalla this.props.name ja this.props.age. Huomaa ero funktionaaliseen komponenttiin!
<Hello name="Arto" age={36} />

Luokkakomponenteille voidaan tarvittaessa määritellä muitakin metodeja ja “oliomuuttujia”, eli kenttiä.
```
class Hello extends React.Component {
  bornYear() {
    const yearNow = new Date().getFullYear()
    return yearNow - this.props.age
  }
  render() {
    return (
      <div>
        <p>
          Hello {this.props.name}, you are {this.props.age} years old <br />
          So you were probably born {this.bornYear()}
        </p>
      </div>
    )}}
```
Metodia kutsutaan render:in sisältä käyttäen this-viitettä syntaksilla this.bornYear()

###  destrukturointia.  
ES6:n mukanaan tuomaa uutta piirre Javascriptissä, eli sijoittamisen yhteydessä tapahtuva destrukturointi.

```
Destrukturoinnin avulla voimme “kerätä” olion oliomuuttujien arvot suoraan omiin yksittäisiin muuttujiin:

class Hello extends React.Component {
  render() {
    const {name, age} = this.props
    const bornYear = () => new Date().getFullYear() - age

    return (
      <div>
        <p>
          Hello {name}, you are {age} years old <br />
          So you were probably born {bornYear()}
        </p>
      </div>
    )}}`
    this.props = {
  name: 'Arto Hellas',
  age: 35
}
 ```
  Nyt saa const {name, age} = this.props aikaan sen, että name saa arvon ‘Arto Hellas’ ja age arvon 35.

### Sivun uudelleenrenderöinti

### Ehdollinen renderöinti

### Tilallinen komponentti

### Tilan vieminen alikomponenttiin propsien avulla

### Tapahtumankäsittely

### REAKT matskua

