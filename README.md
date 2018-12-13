# FullStack2018

Kurssilla tutustutaan Javascriptilla tapahtuvaan moderniin websovelluskehitykseen. Pääpaino on React-kirjaston avulla toteutettavissa single page -sovelluksissa, ja niitä tukevissa Node.js:llä toteutetuissa REST-rajapinnoissa.

Kurssilla käsitellään myös sovellusten testaamista, konfigurointia ja suoritusympäristöjen hallintaa sekä NoSQL-tietokantoja(Mongodb).

**[osa0 sekvenssikaavioiden piirtäminen](https://github.com/vsvala/FullStack2018/tree/master/osa0)**

**[osa1 reactin alkeita](https://github.com/vsvala/Fullstack_phonebook_osa3)**

**[osa2 tehtäviä](https://github.com/vsvala/FullStack2018)**

**[osa3 Puhelinmuistio](https://github.com/vsvala/Fullstack_phonebook_osa3)**

**[osa3 Puhelinmuistio heroku](https://limitless-island-73610.herokuapp.com)** Linkki sovelluksen nettiversioon Herokussa 

**[osa4 Blogi](https://github.com/vsvala/Fullstack_osa4_blogi/tree/master/osa4_backend-)**

**[osa5 Blogi](https://github.com/vsvala/Fullstack_osa5)**

**[osa5 Redux_Unicafe](https://github.com/vsvala/FullStack2018/tree/master/Redux-Unicafe_osa5)**

**[osa5 Redux_Anecdotes](https://github.com/vsvala/FullStack2018/tree/master/Redux-anecdotes_osa5/redux-anecdotes)**

**[osa6 Anecdotes](https://github.com/vsvala/FullStack2018/tree/master/osa6)**

# Käytetyt työkalut ja termit

### SPA = Single-page application
Viimeisten vuosien aikana on noussut esiin tyyli tehdä web-sovellukset käyttäen Single-page application (SPA) -tyyliä, missä sovelluksille ei enää tehdä erillisiä, palvelimen sille lähettämiä sivuja, vaan sovellus koostuu ainoastaan yhdestä palvelimen lähettämästä HTML-sivusta, jonka sisältöä manipuloidaan selaimessa suoritettavalla Javascriptillä.

FRONT:
### REACT = JavaScript kirjasto
Komponentti pohjainen JavaScript-kirjasto web-käyttöliittymien tekoon. React päivittää/renderöi käyttöliittymän automaattisesti kun data muuttuu. React osaa päivittää käyttöliittymästä vain ne osat jotka liittyvät muuttuneeseen dataan
Reactilla toteutettu käyttöliittymä muodostuu koostetuista komponenteista.  Reactissa filosofiana onkin koostaa sovellus useista, pieneen asiaan keskittyvistä uudelleenkäytettävistä komponenteista.React ei käytä html- templateja vaan Javascriptia ja JSX:ää.

### JSX
JSX on hieman XML-kieleltä näyttävää Javascriptia, jossa jokainen tagi tulee sulkea. 
JSX:n avulla voi kirjoittaa HTML/XML-tyylistä koodia jossa on sekaisin html-elementtejä ja React-komponentteja. Html-elementit kirjoitetaan pienillä kirjaimilla. React-komponenttien nimet aloitetaan kapiteeleilla. JSX transformoidaan tavalliseksi Javascript-koodiksi. Käännöksen hoitaa automaattisesti Babel. Elementin attribuuteissa sijaitseva Javascript-koodi sijoitetaan JSX-syntaksissa {}-merkkien sisään.

### Axios kirjasto, promiset
Käytetään selaimen ja palvelimen väliseen kommunikaatioon. Axiosin metodi get palauttaa promisen,joka edustaa asynkronista operaatiota. Promise voi olla tilassa pendin, fulfilled/resolved, rejected. Axios-kirjasto osaa parsia pelvelimelta tulleen datan Javascript-taulukoksi.

### Komponenttien lifecycle-metodit
Reactin luokkien avulla määritellyillä komponenteilla voidaan määritellä joukko lifecycle-metodeita, eli metodeita, joita React kutsuu tietyssä komponentin “elinkaaren” vaiheessa. Yleinen tapa datan palvelimelta tapahtuvaan hakemiseen on suorittaa se metodissa **componentDidMount**. React kutsuu metodia sen jälkeen kun konstruktori on suoritettu ja render-metodi on suoritettu ensimmäistä kertaa.

 ### DOM = Document Object Model 
 Document Object Model eli DOM on ohjelmointirajapinta eli API, joka mahdollistaa selaimessa esitettävien web-sivuja vastaavien elementtipuiden muokkaamisen ohjelmallisesti.

### REST = Representational State Transfer -arkkitehtuurimalli
on HTTP-protokollaan perustuva arkkitehtuurimalli ohjelmointirajapintojen toteuttamiseen. Se määrittelee, millaisilla operaatioilla palvelinten dataa pyydetään, lisätään ja käsitellään.Restin tärkeä määrittävä tekijä on tilattomuus.Toinen tärkeä osa on palvelin–asiakas-malli.Rest pohjaa vahvasti http-protokollan ominaisuuksiin. Http:n metodeja (get, post, put ja delete) sekä eri uri:ta käytetään kuvaamaan pyynnön luonnetta, jolloin itse pyynnön dataan ei tarvitse sisällyttää metatietoja. Jokaisella resurssilla on URL eli sen yksilöivä osoite.Erittäin yleinen konventio on muodostaa resurssien yksilöivät URLit liittäen resurssityypin nimi ja resurssin yksilöivä tunniste.

Erittäin yleinen konventio on muodostaa resurssien yksilöivät URLit liittäen resurssityypin nimi ja resurssin yksilöivä tunniste.

 ### HTML  Hypertext Markup Language
 Html n avulla esitetään sivun rakenne ja sisältö = teksti ja kuvat. Htmlon kieli, jonka avulla WWW-selaimelle kerrotaan sivun millaisia osia WWW-dokumentti sisältää.

 ### CSS = Cascading Style Sheets 
 CSS on kieli, jonka avulla web-sovellusten ulkoasu määritellään

BACKEND
### Node.js 
 [Node.js](https://nodejs.org/en/) on avoimen lähdekoodin alustariippumaton JavaScript runtime-ympäristö JavaScript-koodin suorittamiseen palvelimella. Node.js mahdollistaa koodin suorittamisen suoraan palvelimella, jonka jälkeen verkkosivu lähetetään käyttäjälle. Node.jspohjautuu Googlen Chrome V8 JavaScript-moottoriin. Selaimet eivät vielä osaa uusimpia Javascriptin ominaisuuksia ja siksi selainpuolen koodi täytyy kääntää eli transpiloida esim babel:illa. Backendin toteutusympäristönä käytetään kurssilla Node.js:ää Backendissä Nodea suoritetaan koodia suoraan ilman  transpilointivaihetta. Saat käynnistettyä interaktiivisen node-repl:in kirjoittamalla komentoriville node.

### Express-sovelluskehys
Node.js:n [Express-sovelluskehys](https://expressjs.com/)
Nodella tapahtuvaa web-sovellusten ohjelmointia helpottamaan kehitelty ohjelmointirajapinnan tarjoama kirjasto.

### [body-parser kirjasto HTTP POST-pyynnön käsittelyyn](https://github.com/expressjs/body-parser)
middleware HTTP POST pyyntöjen käsittelyn apuri,middleware. Body-parserin toimintaperiaatteena on, että se ottaa pyynnön mukana olevan JSON-muotoisen datan, muuttaa sen Javascript-olioksi. Tapahtumankäsittelijäfunktio pääsee dataan käsiksi viittaamalla request.Body-parserin toimintaperiaatteena on, että se ottaa pyynnön mukana olevan JSON-muotoisen datan request-oliosta,muuttaa/parsii sen Javascript-olioksi ja sijoittaa request-olion kenttään body ennen kuin routen käsittelijää kutsutaan.

### [nodemon](https://github.com/remy/nodemon) 
sovelluskehitystyökalu jota käytetään sovelluksen Backendin automaattiseen uudelleenkäynnistykseen. 

### Redux kirjasto
Tarjoaa standardin tavan sille miten ja missä sovelluksen tila pidetään sekä tavalle tehdä tilaan muutoksia. Sovelluksen tilan hallinta erotetaan kokonaan Reactin komponenttien ulkopuolisiin varastoihin eli storeihin. Storessa olevaa tilaa ei muuteta suoraan, vaan tapahtumien eli actionien avulla.

Koko sovelluksen tila talletetaan yhteen storen tallettamaan Javascript-objektiin.Storen tilaa muutetaan actionien avulla. Actionit ovat olioita, joilla on vähintään actionin tyypin määrittelevä kenttä type.Actionien vaikutus sovelluksen tilaan määritellään reducerin avulla. Käytännössä reducer on funktio, joka saa parametrikseen olemassaolevan staten tilan sekä actionin ja palauttaa staten uuden tilan. Store käyttää reduceria käsitelläkseen actioneja, jotka dispatchataan eli “lähetetään” storelle sen dispatch-metodilla.

React Redux -kirjaston määrittelemä funktio **connect** on paras ratkaisu siihen, miten Redux-store saadaan välitettyä React-componenteille. Muita kenoja this.props.store tai context.

 ### JSON = JavaScript Object Notation
 JSON-muotoinen “raakadata”, tiedostoformaatti
 
### NPM: Node Package Manager
NPM: Node Package Manager on pakettien hallinta työkalu, joka mahdollistaa moduulien julkaisun muiden käyttöön. npm eli Javascript-projektien hallintaan liittyvästä, alunperin Node-ekosysteemistä kotoisin oleva työkalu. Nykyään lähes kaikki Javascript-projektit määritellään node “pakkausmanagerin” eli npm:n avulla. Myös create-react-app:in avulla generoidut projektit ovat npm-muotoisia projekteja. Varma tuntomerkki siitä on projektin juuressa oleva tiedosto package.json.

### Middlewaret
Middlewaret ovat funktioita, joiden avulla voidaan käsitellä request- ja response-olioita. Esim. body-parser.

### same origin policy ja CORS 
Yleismaailmallisia periaatteita Web-sovellusten toiminnasta: websovelluksen selaimessa suoritettava Javascript-koodi saa oletusarvoisesti kommunikoida vain samassa originissa olevan palvelimen kanssa. Muista origineista tulevat pyynnöt voidaan salli käyttämällä Noden [cors-middlewarea](https://github.com/expressjs/cors).
 
 ### Json- server
json-server tallettaa kaiken datan palvelimella sijaitsevaan tiedostoon db.json. Todellisuudessa data tallennetaan johonkin tietokantaan. json-server on kuitenkin käyttökelpoinen apuväline, joka mahdollistaa palvelinpuolen toiminnallisuuden käyttämisen kehitysvaiheessa ilman tarvetta itse ohjelmoida mitään.

### safe ja idempotent HTTP pyynnöt
 GET:in ja HEAD:in tulisi olla safe.Safety siis tarkoittaa, että pyynnön suorittaminen ei saa aiheuttaa palvelimelle sivuvaikutuksia eli esim. muuttaa palvelimen tietokannan tilaa, pyynnön tulee ainoastaan palauttaa palvelimella olevaa dataa.HTTP-pyynnöistä muiden paitsi POST:in tulisi olla idempotentteja:Eli jos pyynnöllä on sivuvaikutuksia, lopputulos on sama suoritetaanko pyyntö yhden tai useamman kerran.HTTP pyyntötyypeistä POST on ainoa joka ei ole safe eikä idempotent.

### async-await
Async- ja await ovat ES7:n mukanaan tuoma uusi syntaksi, joka mahdollistaa promisen palauttavien asynkronisten funktioiden kutsumisen siten, että kirjoitettava koodi näyttää synkroniselta.ES7:ssa async ja await tuovat generaattoreiden tarjoaman toiminnallisuuden ymmärrettävästi ja syntaksin puolesta selkeällä tavalla koko Javascript-kansan ulottuville.Mistä tahansa kohtaa Javascript-koodia ei awaitia kuitenkaan pysty käyttämään. Awaitin käyttö onnistuu ainoastaan jos ollaan async-funktiossa.

Metodikutsu Note.find() palauttaa promisen, ja saamme itse operaation tuloksen rekisteröimällä promiselle tapahtumankäsittelijän metodilla then. Kaikki operaation suorituksen jälkeinen koodi kirjoitetaan tapahtumankäsittelijään. Jos haluaisimme tehdä peräkkäin useita asynkronisia funktiokutsuja joutuisimme tekemään kutsut tapahtumankäsittelijästä. 
Ketjuttamalla promiseja tilanne pysyy jollain tavalla hallinnassa, callback-helvetin eli monien sisäkkäisten callbackien sijaan saadaan aikaan siistihkö then-kutsujen ketju.

### Token perustainen autentikointi, kirjautuminen
Asenna JWT [jsonwebtoken-kirjasto](https://github.com/auth0/node-jsonwebtoken), jonka avulla koodimme pystyy generoimaan [JSON web token](https://jwt.io/) -muotoisia tokeneja.Token on digitaalisesti allekirjoitettu käyttämällä salaisuutena ympäristömuuttujassa SECRET olevaa merkkijonoa. Digitaalinen allekirjoitus varmistaa sen, että ainoastaan salaisuuden tuntevilla on mahdollisuus generoida validi token. Ympäristömuuttujalle pitää muistaa asettaa arvo tiedostoon .env.

Tokenin välittämiseen selaimesta backendiin käytämme ratkaisussamme Authorization-headeria. Tokenin lisäksi headerin avulla kerrotaan mistä autentikointiskeemasta on kyse. Skeeman ilmaiseminen kertoo näissä tapauksissa palvelimelle, miten mukana olevat kredentiaalit tulee tulkita.Käytetään Bearer-skeemaa.

Käyttäjätunnuksia, salasanoja ja tokenautentikaatiota hyödyntäviä sovelluksia tulee aina käyttää salatun HTTPS-yhteyden yli.

### [bcrypt-kirjasto:](https://github.com/kelektiv/node.bcrypt.js) salasanojen hashaamiseen
Tietokantaan ei talleteta pyynnön mukana tulevaa salasanaa, vaan funktion bcrypt.hash avulla laskettu hash.

### [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Storage)
Selaimessa oleva avain-arvo- eli key-value-periaatteella toimiva tietokanta. Storageen talletetut arvot säilyvät vaikka sivu uudelleenladattaisiin. Storage on ns. origin-kohtainen, eli jokaisella selaimella käytettävällä web-sovelluksella on oma storagensa. Koska storageen talletettavat arvot ovat merkkijonoja, emme voi tallettaa storageen suoraan Javascript-oliota, vaan ne on muutettava ensin JSON-muotoon metodilla JSON.stringify. Vastaavasti kun JSON-muotoinen olio luetaan local storagesta, on se parsittava takaisin Javascript-olioksi metodilla JSON.parse.

### propTypes kirjasto
Sen avulla voidaan määritellä propsit joille on “pakko” antaa arvo.

# Tietokanta

### Mongo ja mlab
Tehtävissä on käytössä [MongoDB:tä](https://www.mongodb.com/) joka on ns. dokumenttitietokanta. Mongosta käytetään netissä palveluna toimivaa [mlab:in](https://mlab.com/) kantaa.

### Mongoose kirjasto
Mongoosea voisi luonnehtia: object document mapper (ODM), ja sen avulla Javascript-olioiden tallettaminen mongon dokumenteiksi on suoraviivaista.
asennus: npm install mongoose --save

Liitoksen tekeminen suoritetaan mongoosen komennolla **populate**. Populaten yhteydessä on myös mahdollista rajata mitä kenttiä sisällytettävistä dokumenteista otetaan mukaan. 




###  ESlint
Javascript-maailmassa tämän hetken johtava työkalu staattiseen analyysiin, eli “linttaukseen” on [ESlint](https://eslint.org/)
**Asennetaan ESlint backendiin kehitysaikaiseksi riippuvuudeksi komennolla**
```
npm install eslint --save-dev
```
Tämän jälkeen voidaan muodostaa alustava ESlint-konfiguraatio komennolla. Vastaillaan kysymyksiin
```
node_modules/.bin/eslint --init
```
Konfiguraatiot tallentuvat tiedostoon .eslintrc.js:

**ESlint käyttöön frontendissa**

Tiedoston voi generoida komennolla
```
npx eslint --init
```
ja vastailemalla sopivasti kysymyksiin:
Jotta pääsemme eroon testeissä olevista turhista huomautuksista asennetaan eslint-jest-plugin

npm add --save-dev eslint-plugin-jest
Joudumme asentamaan myös babel-eslint-pluginin, jotta ESlint osaisi tulkita koodissa käyttämäämme class property -syntaksia. Pluginin asennus tapahtuu komennolla

npm install babel-eslint --save-dev
ja se tulee muistaa ottaa käyttöön konfiguraatiossa.

# [Sovelluksen pystytys](https://github.com/vsvala/FullStack2018/blob/master/Dokumentation/SovelluksenToteutus.md)
 
# [JavaScript](https://github.com/vsvala/FullStack2018/blob/master/Dokumentation/JavaScript.md)

# [REAKTin perusteita](https://github.com/vsvala/FullStack2018/blob/master/Dokumentation/REACTsovellus.md)


# Testaus
 ### Yksikkötestaus
 jest
 
 ### API:n testaus
API:n testaamisen käytetään Facebookin [Jest](https://jestjs.io/) supertest-kirjastoa. Frontin testauksessa käytetään lisäksi AirBnB:n kehittämää [enzyme-kirjastoa](https://github.com/airbnb/enzyme).

Integraatiotestit = useita sovelluksen komponentteja yhtäaikaa käyttäviä testejä. (“valekomponentilla” eli mockilla.mongo-mock.)
 
 Testien ajaminen konsolista
 ```
 CI=true npm tes
 ```
Testauskattavuus saadaan selville suorittamalla testit komennolla
```
CI=true npm test -- --coverage
```
Melko primitiivinen HTML-muotoinen raportti generoituu hakemistoon coverage/lcov-report
