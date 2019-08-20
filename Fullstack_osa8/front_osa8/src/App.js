import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import BookForm from './components/BookForm'
import SetBirthYearForm from './components/SetBirthYearForm'
//import { Query,  Mutation} from "react-apollo"//ApolloConsumer,
import { useQuery, useMutation } from 'react-apollo-hooks'

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
const allAuthors = gql`
{
  allAuthors  {
    name
    born
    id
  }
}
`

// const CREATE_BOOK = gql`
// mutation createBook($title: String!, $author: String!, $published: Int!, $genres:[Sring]) {
//   addBook(
//     title: $title,
//     author: $author,
//     published: $published,
//     genres: $genres
//   ) {
//     title
//     author
//     published
//     genres
//     id   
//     }
//   }
// }
// `
const editAuthor = gql`
mutation editYear($name: String!, $born: String!) {
  editYear(name: $name, born: $born)  {
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

  const result = useQuery(allBooks)
  const result2 = useQuery(allAuthors)
  // const addBook = useMutation(CREATE_BOOK, {
  //    onError: handleError,
  //    refetchQueries: [{ query: ALL_BOOKS }]
  //  })
  const editYear = useMutation(editAuthor)
 

  return (
 <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'} 
        result={result2}   
      />
      <Books 
        show={page === 'books'}
        result={result} 
      />
      <NewBook
        show={page === 'add'}
      />

      {errorMessage &&
        <div style={{ color: 'red' }}>
          {errorMessage}
        </div>
      }
   
{/*
 <div>
      <ApolloConsumer>
        {(client => 
          <Query query={allBooks}>
            {(result) => <Books result={result} client={client} />}
          </Query> 
        )}
      </ApolloConsumer>
    </div> 
*/}
 

{/* <div>
<Query query={allAuthors}>
  {(result) => <Authors result={result} />}
</Query> 
</div> */}


 {/* <Books result={result} /> */}

{/* <div>
<Query query={allBooks}>
  {(result) => <Books result={result} />}
</Query> 
</div>  */}


 {/* <h2>create new</h2>
      <Mutation mutation={createBook}
      refetchQueries={[{ query: allBooks }]}
        onError={handleError}
      >
        {(addBook) =>
          <BookForm  addUser={addBook}
         /> }
      </Mutation>    */}

     <h2>create new</h2>
      {/* <BookForm addBook={addBook} /> */}

       <h2>Set birth year </h2>
       <SetBirthYearForm editYear={editYear} />


</div>

  )
}

export default App