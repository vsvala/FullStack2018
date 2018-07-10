import React from 'react';
import ReactDOM from 'react-dom';

const Kurssit=({kurssit}) => {
return(
<div>
  {kurssit.map(kurssi key={kurssi.id} kurssi={kurssi} /> )}
<div>
)

}


const Kurssi = ({kurssi}) => {
    return (
        <div>
            <Otsikko nimi={kurssi.nimi} />
            <Sisalto kurssi={kurssi} />
            <Yhteensa kurssi={kurssi} />

        </div>
    )
}
const Otsikko = ({nimi}) => {
    return (
        <div>
            <h1>{nimi}</h1>
        </div>
    )
}

const Sisalto = ({kurssi}) => {
    return (
        <div>
            {kurssi.osat.map(osa => <p key={osa.id}>{osa.nimi} {osa.tehtavia}</p>)}
        </div>
    )
}
const Yhteensa = ({kurssi}) => {
    const tehtavat = kurssi.osat.map(osa => osa.tehtavia)
    const reducer = (accumulator, currentValue) => (accumulator + currentValue);
    return (
        <div>
            <p>yhteensä {tehtavat.reduce(reducer, 0)} tehtävää</p>
        </div>
    )

}


 const App = () => {
     const kurssit = [
       {
         nimi: 'Half Stack -sovelluskehitys',
         id: 1,
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
       },
       {
         nimi: 'Node.js',
         id: 2,
         osat: [
           {
             nimi: 'Routing',
             tehtavia: 3,
             id: 1
           },
           {
             nimi: 'Middlewaret',
             tehtavia: 7,
             id: 2
           }
         ]
       }
     ]


    return (
      <div>
      <h1>Opetusohjelma</h1>

       <ul>
       <li>{kurssit[0].nimi}</li>
      <li>{kurssit[1].nimi}</li>
      {kurssit.map(kurssi => <li>{kurssi.nimi}</li>)}
      {kurssit.map(kurssi => <li>{kurssi.osat.nimi}</li>)}

      {rivit()}
       <Kurssit kurssit={kurssit} />
      </ul>
      </div>
      )
    }
ReactDOM.render(
  <App />,
  document.getElementById('root')
)
