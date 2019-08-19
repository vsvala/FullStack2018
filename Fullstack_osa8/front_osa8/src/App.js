import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import BookForm from './components/BookForm'
import { Query,  Mutation} from "react-apollo"//ApolloConsumer,

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
  }
}
`
// const CREATE_BOOK = gql`
// mutation createBook($title: String!, $author: String!, $published: Int!, $genre:[Sring]) {
//   addBook(
//     title: $title,
//     author: $author,
//     published: $published,
//     genre: $genre
//   ) {
//     title
//     author
//     published
//     genre
//     id   
//     }
//   }
// }
// `

const App = () => { 
   const [page, setPage] = useState('authors')

  return (
 <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}     
      />
      <Books
        show={page === 'books'}
      />
      <NewBook
        show={page === 'add'}
      />
   
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
 

<div>
<Query query={allAuthors}>
  {(result) => <Authors result={result} />}
</Query> 
</div>

<div>
<Query query={allBooks}>
  {(result) => <Books result={result} />}
</Query> 
</div>

{/* 
 <h2>create new</h2>
      <Mutation mutation={CREATE_BOOK}>
        {(addBook) =>
          <BookForm  addUser={addBook}
         /> }
      </Mutation>   */}


</div>

  )
}

export default App