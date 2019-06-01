## Lint

Javascript-maailmassa tämän hetken johtava työkalu staattiseen analyysiin, eli “linttaukseen” on [ESlint](https://eslint.org/)
**Asennetaan ESlint backendiin kehitysaikaiseksi riippuvuudeksi komennolla**
```
npm install eslint --save-dev
```
Tämän jälkeen voidaan muodostaa alustava ESlint-konfiguraatio komennolla.
```
node_modules/.bin/eslint --init
```
Vastaillaan kysymyksiin:
```
 How would you like to use ESLint? To check syntax and find problems
? What type of modules does your project use? JavaScript modules (import/expor
? Which framework does your project use? React
? Where does your code run? (Press <space> to select, <a> to toggle all, <i> to 
invert selection)Browser
? What format do you want your config file to be in? JavaScript
The config that you've selected requires the following dependencies:eslint-plugin-react@latest
? Would you like to install them now with npm? Yes
```

Konfiguraatiot tallentuvat tiedostoon .eslintrc.js:
```
module.exports = {
    "env": {
        "node": true,
        "es6": true,
        "jest": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "eqeqeq": "error",
 	"no-trailing-spaces": "error",
        "object-curly-spacing": [
            "error", "always"
        ],
        "arrow-spacing": [
             "error", { "before": true, "after": true }
        ],
        "no-console": 0
    }
};

```

Esim tiedoston index.js tarkastus tapahtuu komennolla

```
node_modules/.bin/eslint index.js
```

Hakemiston build ja coverage sisältö jätetään huomioimatta linttauksessa lisäämällä .eslintignore tiedostoon seuraavat rivit:

```
build
coverage
```

**ESlint käyttöön frontendissa**

Create-react-app on asentanut projektille eslintin valmiiksi, joten ei tarvita muuta kun sopiva konfiguraatio tiedoston .eslintrc.js.

HUOM: älä suorita komentoa npm init. Se asentaa uuden version eslintistä joka on epäsopiva create-react-app:in konfiguraatioiden kanssa!


Luodaan tiedosto .eslintrc.js ja kopioidaan sinne seuraava sisältö:

module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest/globals": true
    },
    "extends": [ 
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react", "jest"
    ],
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "eqeqeq": "error",
        "no-trailing-spaces": "error",
        "object-curly-spacing": [
            "error", "always"
        ],
        "arrow-spacing": [
            "error", { "before": true, "after": true }
        ],
        "no-console": 0,
        "react/prop-types": 0
    }
};


(HUOM!! tämä jää välistä katso yllä..Tiedoston voi generoida komennolla: 
```
npx eslint --init
```
ja vastailemalla sopivasti kysymyksiin)


Jotta pääsemme eroon testeissä olevista turhista huomautuksista asennetaan eslint-jest-plugin

npm add --save-dev eslint-plugin-jest

Joudumme asentamaan myös babel-eslint-pluginin, jotta ESlint osaisi tulkita koodissa käyttämäämme class property -syntaksia. Pluginin asennus tapahtuu komennolla

npm install babel-eslint --save-dev
ja se tulee muistaa ottaa käyttöön konfiguraatiossa.
