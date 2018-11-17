import React from 'react'

const Person = ({ person }) => {
    return (
      <li>{person.name} {person.num}</li>
    )
  }
  
  export default Person