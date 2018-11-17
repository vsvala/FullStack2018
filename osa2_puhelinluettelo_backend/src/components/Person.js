import React from 'react'

const Person = ({ person, deletePerson }) => {
    const label = 'poista'
  return (
    <li className="person">{person.name} {person.num}<button onClick={deletePerson}>{label}</button> </li>
  )
}

export default Person

