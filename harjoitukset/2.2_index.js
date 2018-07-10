import React from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
  const { osat } = props;

  const rivit = () => kurssi.osat.map(osa =>
     <p key={osa.id}>
     {osa.nimi}, {osa.tehtavia}</p>)


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
      },
      {
        nimi: 'Redux',
        tehtavia: 7,
         id: 4
      }

    ]
  }

    return (
      <div>
      <h1>{kurssi.nimi}</h1>
       <ul>
        {rivit()}
        <p>yhteensä {kurssi.osat[0].tehtavia+kurssi.osat[1].tehtavia+kurssi.osat[2].tehtavia+kurssi.osat[3].tehtavia} tehtävää</p>
      </ul>
      </div>
      )
    }
ReactDOM.render(
  <App />,
  document.getElementById('root')
)
