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

### Tilallinen komponentti
Komponentin tila määritellään this.state-objektilla. Komponentin tila alustetaan getInitialState-funktiossa. Myöhemmin tilaa voidaan muuttaa this.setState()-metodilla.ritä sijoittaa kaikki sovelluksen tilaan liittyvät muuttujat komponenttihierarkiassa mahdollisimman korkealle tasolle ja vain yhteen paikkaan juurielementtiin.

### Sivun uudelleenrenderöinti

**Luokkiin perustuvilla komponenteilla voi olla tila**, joka talletetaan muuttujaan state.Eli tila sisältää kentän counter, jonka arvo on 1. React-komponenttien tilaa, eli muuttujaa this.state ei saa päivittää suoraan, tilan päivitys on tehtävä aina funktion **setState avulla. Metodin kutsuminen päivittää tilan ja aiheuttaa komponentin uuden renderöinnin** (ellei sitä ole estetty myöhemmin esiteltävällä tavalla). Uudelleenrenderöinnin yhteydessä myös kaikki komponentin sisältämät alikomponentit renderöidää
Muutetaan esimerkkisovelluksen komponentti App luokkaperustaiseksi:
```
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      counter: 1
    }}
  render() {
    return (
      <div>{this.state.counter}</div>
    )}}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
```

### Ehdollinen renderöinti

### Tilan vieminen alikomponenttiin propsien avulla

### Tapahtumankäsittely
 Tapahtumankäsittelijät, eli funktiot, jotka on rekisteröity kutsuttavaksi tiettyjen tapahtumien eli eventien yhteydessä. Esim. käyttäjän interaktio sivun elementtien kanssa aiheuttaa joukon erinäisiä tapahtumia.
 
 Reactissa funktion rekisteröiminen tapahtumankäsittelijäksi tapahtumalle click tapahtuu seuraavasti-Eli laitetaan button:in onClick-attribuutin arvoksi aaltosulkeissa oleva viite koodissa määriteltyyn funktioon.tai Tapahtumankäsittelijäfunktio voidaan määritellä suoraan onClick-määrittelyn yhteydessä:
```
<button onClick={funktio}> plus</button>

<button onClick={() => console.log('clicked')}>
<button onClick={() => this.setState({ counter: this.state.counter + 1 })}>plus</button>
```
Mutta paremoi tapa määritellä ne omiin metodeihinsa. Viittaus: this.metodi 

```
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      counter: 1
    }} 
   kasvataYhdella = () => {
    this.setState({ counter: this.state.counter + 1 })
  }
  nollaa = () => {
   this.setState({ counter: 0 })
  }
  render() {
    return (
      <div>
        <div>{this.state.counter}</div>
        <div><button onClick={this.kasvataYhdella}>plus </button>
          <button onClick={this.nollaa}>zero</button>
        </div>
      </div>
    )}}
    
   ```
   Ehkä paras ratkaisu this-ongelman estämiseen on käyttää tulevaan Javascript-standardiin ehdotettua **class properties -ominaisuutta. Jolloin jokainen App-komponentti saa kentät kasvataYhdella ja nollaa jotka ovat funktioita,** joiden this on sidottu komponenttiin riippumatta siitä miten ja kenen toimesta metodia kutsutaan.
  
Tärkeä mielessä pidettävä seikka on myös se, että React kutsuu funktiota setState asynkroonisesti, eli jos meillä on seuraava koodi

### REAKT matskua
