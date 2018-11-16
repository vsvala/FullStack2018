import React from 'react';
import ReactDOM from 'react-dom';

const Kurssi=({kurssi})=> {
  const rivit = () => kurssi.osat.map(osa =>
  <p key={osa.id}>
   {osa.nimi}, {osa.tehtavia}</p>)
  return(

  <p>{rivit()}</p>

  )
}

const App = () => { 
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10,
        id: 1
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7,
          id: 2
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14,
         id: 3
      }

    ]
  }

    return (
      <div>
      <h1>{kurssi.nimi}</h1>
      <Kurssi kurssi = {kurssi}/>
      </div>
      )
    }

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
