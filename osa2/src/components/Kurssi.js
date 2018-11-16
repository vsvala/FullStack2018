import React from 'react'

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
export default Kurssi