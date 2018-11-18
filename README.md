# FullStack2018

Kurssilla tutustutaan Javascriptilla tapahtuvaan moderniin websovelluskehitykseen. Pääpaino on React-kirjaston avulla toteutettavissa single page -sovelluksissa, ja niitä tukevissa Node.js:llä toteutetuissa REST-rajapinnoissa.

Kurssilla käsitellään myös sovellusten testaamista, konfigurointia ja suoritusympäristöjen hallintaa sekä NoSQL-tietokantoja.

# Käytetyt työkalut ja termit

### REST = Representational State Transfer
on HTTP-protokollaan perustuva arkkitehtuurimalli ohjelmointirajapintojen toteuttamiseen. Se määrittelee, millaisilla operaatioilla palvelinten dataa pyydetään, lisätään ja käsitellään.Restin tärkeä määrittävä tekijä on tilattomuus.Toinen tärkeä osa on palvelin–asiakas-malli.Rest pohjaa vahvasti http-protokollan ominaisuuksiin. Http:n metodeja (get, post, put ja delete) sekä eri uri:ta käytetään kuvaamaan pyynnön luonnetta, jolloin itse pyynnön dataan ei tarvitse sisällyttää metatietoja.  

### Mongo
Tehtävissä on käytössä [MongoDB:tä](https://www.mongodb.com/) joka on ns. dokumenttitietokanta. Mongosta käytetään netissä palveluna toimivaa [mlab:in](https://mlab.com/) kantaa.

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
