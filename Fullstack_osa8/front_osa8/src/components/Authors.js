import React, {useState} from 'react'
//import { useApolloClient } from 'react-apollo-hooks'
//import SetBirthYearForm from './SetBirthYearForm'
import Select from 'react-select'

//const Authors = ({result}) => {
const Authors = (props) => {
// const client = useApolloClient()
  if (!props.show) {
   // if (!result) {
    return null
  }
  if (props.result.loading) {
    return <div>loading...</div>
   }
   const [born, setBirth] = useState('')
   const [name, setName] = useState('')

  const authors = props.result.data.allAuthors 

  const options = []
  authors.forEach(a => {
    const auth = {value: a.name, label: a.name}
    options.push(auth)
  })

  const submit = async (e) => {
    e.preventDefault()

    await props.editYear({
      variables: { name, born }
    })

    setBirth('')
    setName('')

  }


  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
               <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* <h2>Set birth year </h2>
    <SetBirthYearForm editYear={props.editYear} />  */}
     
      <h2>Set birth year </h2>
       <div>
        <form onSubmit={submit}> 
  
      <div>
          <Select
            value={name.value}
            onChange={( name ) => setName(name.value)}
            options={options}
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

    </div>
  )
}

export default Authors