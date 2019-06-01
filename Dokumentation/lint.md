## Lint


Javascript-maailmassa tämän hetken johtava työkalu staattiseen analyysiin, eli "linttaukseen" on ESlint.


Asennetaan ESlint backendiin kehitysaikaiseksi riippuvuudeksi komennolla

npm install eslint --save-dev
Tämän jälkeen voidaan muodostaa alustava ESlint-konfiguraatio komennolla

node_modules/.bin/eslint --init

Vastaillaan kysymyksiin:
 How would you like to use ESLint? To check syntax and find problems
? What type of modules does your project use? JavaScript modules (import/expor
? Which framework does your project use? React
? Where does your code run? (Press <space> to select, <a> to toggle all, <i> to 
invert selection)Browser
? What format do you want your config file to be in? JavaScript
The config that you've selected requires the following dependencies:eslint-plugin-react@latest
? Would you like to install them now with npm? Yes


Konfiguraatiot tallentuvat tiedostoon .eslintrc.js:

module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        
      "eqeqeq": "error"
  },
        
        "semi": [
            "error",
            "never"
        ]
    }
        "eqeqeq": "error"
  }
};



Esim tiedoston index.js tarkastus tapahtuu komennolla

node_modules/.bin/eslint index.js


Hakemiston build ja coverage sisältö jätetään huomioimatta linttauksessa lisäämällä .eslintignore tiedostoon seuraavat rivit:

build
coverage


