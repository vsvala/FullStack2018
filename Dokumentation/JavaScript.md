# JavaScript
Javascript-standardin virallinen nimi on ECMAScript. Tämän hetken tuorein versio on kesäkuussa 2017 julkaistu ES8, toiselta nimeltään ECMAScript 2017.

Node.js on melkein missä vaan, mm. palvelimilla toimiva, Googlen chrome V8-javascriptmoottoriin perustuva Javascript-suoritusympäristö. Javascriptin kirjoittamiseen Nodella tarvitset Node.js:n (vähintään versio v8.6.0). Koodi kirjoitetaan .js-päätteiseen tiedostoon, ja suoritetaan komennolla node tiedosto.js

Koodia on mahdollisuus kirjoittaa myös Node.js-konsoliin, joka aukeaa kun kirjoitat komentorivillä node tai myös selaimen developer toolin konsoliin. Chromen uusimmat versiot osaavat suoraan transpiloimatta melko hyvin Javascriptin uusiakin piirteitä.


## Muuttujat const, let, (var)

```
const x= 1
let y = 5
```
const ei oikeastaan määrittele muuttujaa vaan vakion, jonka arvoa ei voi enää muuttaa, let taas määrittelee normaalin muuttujan.
Muuttujan tallettaman tiedon tyyppi voi vaihtaa tyyppiä suorituksen aikana.  Var toimii tietyissä tilanteissa eri tavalla kuin useimpien muiden kielien muuttujien määrittely.

## Taulukot

Taulukon sisältöä voi muuttaa vaikka sen on määritelty const:ksi.Taulukon map funktio.
Taulukon yksittäisiä alkioita on helppo sijoittaa muuttujiin destrukturoivan sijoituslauseen avulla:
```
const t = [1, -1, 3]

t.push(5)

console.log(t.length)  // tulostuu 4
console.log(t[1])      // tulostuu -1

t.forEach((luku) => {
  console.log(luku)    // tulostuu 1, -1, 3 ja 5 omille riveilleen
})

t[6] = 99

console.log(t)         // tulostuu [ 1, -1, 3, 5, <2 empty items>, 99 ]
const m1 = t.map((luku) => luku * 2)
console.log(m1) // tulostuu [2, 4, 6, 8]

const m2 = t.map((luku) => '<li>' + luku + '</li>')
console.log(m2) // tulostuu [ '<li>1</li>', '<li>2</li>', '<li>3</li>', '<li>4</li>' ]
const t = [1, 2, 3, 4, 5]

const [eka, toka, ...loput] = t

console.log(eka, toka)      // tulostuu 1, 2
console.log(loput)          // tulostuu [3, 4 ,5]
```

## Oliot

Erittäin yleisesti käytetään olioliteraaleja, eli määritellään olio luettelemalla sen kentät (englanniksi property) aaltosulkeiden sisällä. Kenttien arvot voivat olla tyypiltään mitä vaan, lukuja, merkkijonoja, taulukoita, olioita. Olioiden kenttiin viitataan pistenotaatiolla, tai hakasulkeilla. Javascriptissä olioilla voi luonnollisesti olla myös metodeja. (Olioita on myös mahdollista määritellä ns. konstruktorifunktioiden avulla)

```
const olio1 = {
  nimi: 'Arto Hellas',
  ika: 35,
  koulutus: 'Filosofian tohtori'
  tervehdi: function () {
    console.log('hello, my name is', this.nimi)
  }
}
arto.tervehdi()  // tulostuu hello, my name is Arto Hellas
}

const olio3 = {
  nimi: {
    etunimi: 'Jami',
    sukunimi: 'Kousa'
  },
  arvosanat: [2, 3, 5, 3],
  laitos: 'TKTL'
}
console.log(olio1.nimi)          // tulostuu Arto Hellas
const kentanNimi = 'ika'
console.log(olio1[kentanNimi])   // tulostuu 35

```
## Funktiot

```
const summa = (p1, p2) => {
  console.log(p1)
  console.log(p2)
  return p1 + p2
}

const vastaus = summa(1,5)
console.log(vastaus)

Jos parameteja on vain yksi, voidaan sulut jättää määrittelystä pois:

const nelio = p => {
  console.log(p)
  return p * p
}
Jos funktio sisältää ainoastaan yhden lausekkeen, ei aaltosulkeita tarvita. Tällöin funktio palauttaa ainoan lausekkeensa arvon. Eli edellinen:

const nelio = p => p * p

Tämä muoto on erityisen kätevä käsiteltäessä taulukkoja esim. map-metodin avulla:

const t = [1, 2, 3]
const tnelio = t.map(p => p * p)
// tnelio on nyt [1, 4, 9]
```

Nuolifunktio on tullut Javascriptiin vasta muutama vuosi sitten version ES6 myötä. Tätä ennen ja paikoin nykyäänkin funktioiden määrittely tapahtui avainsanan function avulla.Määrittelytapoja on kaksi.

funktiolle voidaan antaa **function declaration -tyyppisessä määrittelyssä nimi= nimetty funktio** jonka avulla funktioon voidaan viitata:
```
function tulo(a, b) {
  return a * b
}
const vastaus = tulo(2, 6)
```
2 tapa on tehdä määrittely **funktiolausekkeena= Funktioliteraali eli anonyymi funktio, nimetön funktio**  Tällöin funktiolle ei tarvitse antaa nimeä ja määrittely voi sijaita muun koodin seassa:

```
const keskiarvo = function(a, b) {
  return (a + b) / 2
}
const vastaus = keskiarvo(2, 5)
```
Nuolifunktiot ja avainsanan function avulla määritellyt funktiot kuitenkin poikkeavat radikaalisti siitä miten ne käyttäytyvät avainsanan this suhteen.

## Luokat
Kuten aiemmin mainittiin, Javascriptissä ei ole olemassa olio-ohjelmointikielten luokkamekanismia. Periytyminen hoituu prototyyppiperinnän kautta.ES6:n myötä Javascriptiin on tullut luokkasyntaksi, joka helpottaa oleellisesti luokkien (tai luokan kaltaisten asioiden) määrittelyä Javascriptissa. Syntaksin osalta luokat ja niistä luodut oliot muistuttavat erittäin paljon esim. Javan olioita. Käyttäytymiseltäänkin ne ovat aika lähellä Javan olioita. Perimmiltään kyseessä on kuitenkin edelleen Javascriptin prototyyppiperintään perustuvista olioista.
[Mozillan javascript -matskua](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[A re-introduction to JavaScript (JS tutorial)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript)
[kirjasarja You-Dont-Know-JS](https://github.com/getify/You-Dont-Know-JS)
[egghead.io:lla on tarjolla runsaasti laadukkaita screencasteja](https://egghead.io/)

