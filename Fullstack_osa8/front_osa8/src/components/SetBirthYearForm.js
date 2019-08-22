import React, { useState } from 'react'
import { renderPlaygroundPage } from '@apollographql/graphql-playground-html/dist/render-playground-page';
//import Select from 'react-select';

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' },
// ];


const SetBirthYearForm = (props) => {
    const [name, setName] = useState('')
    const [born, setBirth] = useState('')
   

    const submit = async(e) => {
      e.preventDefault()
  
      await props.addYear({
        variables: { name, born }
      })
  
      setName('')
      setBirth('')

    }
  
    return (
      <div>
        <form onSubmit={submit}>
          <div>
            name <input
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </div>
          <div>
            birthyear <input
              value={born}
              onChange={({ target }) => setBirth(parseInt(target.value))}
            />
          </div>
          <button type='submit'>change year</button>
        </form> 
    </div>
    )
  }
  export default SetBirthYearForm