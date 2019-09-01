import React, { useState } from 'react'


const SetBirthYearForm = (props) => {
    const [name, setName] = useState('')
    const [born, setBirth] = useState('')
  
    if (!props.show) {
       return null
     }
     if (props.result.loading) {
       return <div>loading...</div>
      }
  
    const submit = async (e) => {
      e.preventDefault()
  
      await props.editYear({
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
              onChange={({ target }) => setBirth(target.value)}
            />
          </div>
          <button type='submit'>change year</button>
        </form> 
    </div>
    )
  }
  export default SetBirthYearForm