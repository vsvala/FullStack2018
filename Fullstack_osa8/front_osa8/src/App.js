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
    author
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

const CREATE_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres:[String]) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author
    published
    genres
    id   
  }
}
` 

const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $born: Int!) {
  editAuthor(name: $name, born: $born)  {
    name
    born
    id
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
   refetchQueries: [{ query: ALL_BOOKS }]
    })
  const [editAuthor] = useMutation(EDIT_AUTHOR)
 

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
      />
      <Books 
        show={page === 'books'}
        result={books} 
      />
      <NewBook
        show={page === 'add'}
        addBook={createBook}
        editYear={editAuthor}
      />

      {errorMessage &&
        <div style={{ color: 'red' }}>
          {errorMessage}
        </div>
      }
{/*    
       <h2>Set birth year </h2>
       <SetBirthYearForm editYear={editAuthor} /> */}


</div>

  )
}

export default App