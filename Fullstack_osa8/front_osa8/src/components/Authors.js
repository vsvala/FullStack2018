import React from 'react'
//import { useApolloClient } from 'react-apollo-hooks'
//import SetBirthYearForm from './SetBirthYearForm'

const Authors = (props) => {
// const client = useApolloClient()
//const Authors = ({result}) => {
  if (!props.show) {
   // if (!result) {
    return null
  }
  if (props.result.loading) {
    return <div>loading...</div>
   }
  const authors = props.result.data.allAuthors 
  //const authors = []

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
    </div>
  )
}

export default Authors