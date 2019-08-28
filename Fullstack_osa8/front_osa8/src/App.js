import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'

//import SetBirthYearForm from './components/SetBirthYearForm'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'

const ALL_BOOKS = gql`
  query filteredBooks($genre: String) {
  allBooks(genre:$genre){
    title
    author{name}
    published
    genres
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
const USER = gql`
{
  me {
    username
    favoriteGenre
  }
}
`
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
const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
  `

const App = () => { 

  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
  const client = useApolloClient()
  
  const books = useQuery(ALL_BOOKS)
  const authors = useQuery(ALL_AUTHORS)
  const user = useQuery(USER)
 
  const [createBook] = useMutation(CREATE_BOOK, {
   onError: handleError,
   refetchQueries: [{ query: ALL_BOOKS },{ query: ALL_AUTHORS }]
    })

  const [addYear] = useMutation(ADD_YEAR,{
    onError: handleError,
    refetchQueries: [{ query: ALL_AUTHORS }] 
  })

  const [login] = useMutation(LOGIN, {
    onError: handleError
  })
  const errorNotification = () => errorMessage &&
  <div style={{ color: 'red' }}>
    {errorMessage}
  </div>

if (!token) {
  return (
    <div>
      {errorNotification()}
      <LoginForm
        login={login}
        setToken={(token) => setToken(token)}
      />
    </div>
  )
}
const logout = () => {
  setToken(null)
  localStorage.clear()
  client.resetStore()
}
  return (
 <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token !== null &&
        <button onClick={() => setPage('add')}>add book</button>
        }
         {token !== null &&
        <button onClick={() => setPage('recommend')}>recommend</button>
        }
        {/* {token=== null ?
         <button onClick={() => setPage('login')}>login</button>: 
       */}
      {token !== null &&
       <button onClick={() => logout()}>logout</button>}

     {/* {token === null &&
          <button onClick={() => setPage('login')}>login</button>
     } */}
  </div>
      <Authors
        show={page === 'authors'} 
        result={authors}   
        addYear={addYear}
      />
     <Books 
        show={page === 'books'}
        books={books} 
        ALL_BOOKS={ALL_BOOKS}
      />
      <NewBook
        show={page === 'add'}
        addBook={createBook}
      />
      <Recommend
        show={page === 'recommend'}
        user={user}
        ALL_BOOKS={ALL_BOOKS}
      /> 
      {/* <LoginForm
        show={page === 'login'}
        setPage={setPage}
        login={login}
        setToken={(token) => setToken(token)}
      />   */}



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