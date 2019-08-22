import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
//import SetBirthYearForm from './components/SetBirthYearForm'
import { useQuery, useMutation } from '@apollo/react-hooks'

const ALL_BOOKS = gql`
{
  allBooks  {
    title
    author{name}
    published
    id
  }
}
`
const ALL_AUTHORS = gql`
{
  allAuthors  {
    name
    born
    bookCount
    id
  }
}
`
//    bookCount
const CREATE_BOOK = gql`
mutation 
createBook(
  $title: String!, 
  $author: String!, 
  $published: Int!, 
  $genres:[String]
  ){
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author{name}
    published
    genres
    id
  }
}
` 

const ADD_YEAR = gql`
mutation addYear($name: String!, $born: Int!) {
  addYear(name: $name, born: $born)  {
    id  
    name
    born
  }
}
`
const App = () => { 
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const books = useQuery(ALL_BOOKS)
  const authors = useQuery(ALL_AUTHORS)
  const [createBook] = useMutation(CREATE_BOOK, {
   onError: handleError,
   refetchQueries: [{ query: ALL_BOOKS },{ query: ALL_AUTHORS }]
    })
  const [addYear] = useMutation(ADD_YEAR,{
    onError: handleError,
    refetchQueries: [{ query: ALL_AUTHORS }] 
  })
 

  return (
 <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'} 
        result={authors}   
        addYear={addYear}
      />
      <Books 
        show={page === 'books'}
        result={books} 
      />
      <NewBook
        show={page === 'add'}
        addBook={createBook}

      />

      {errorMessage &&
        <div style={{ color: 'red' }}>
          {errorMessage}
        </div>
      }
  {/* <h2>Set birth year </h2>
    <SetBirthYearForm editYear={editYear} />  */}
 
</div>

  )
}

export default App