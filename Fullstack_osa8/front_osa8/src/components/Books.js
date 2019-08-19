import React,  {useState } from 'react'
import { gql } from 'apollo-boost'
import { Query} from "react-apollo"//, ApolloConsumer, Mutation 


const allBooks = gql`
{
  allBooks  {
    title
    author
    published
    id
  }
}
`
const Books = ({ result }) => {
//const Books = (props) => {
//if (!props.show) {
if (!result) {
    return null
  }

 if (result.loading) {
  return <div>loading...</div>
 }
const books = result.data.allBooks 
 // const books = []

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books