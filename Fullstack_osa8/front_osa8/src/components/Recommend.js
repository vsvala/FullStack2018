import React , { useState } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
 //import { useApolloClient } from 'react-apollo-hooks'

 
const Recommend = (props) => {
 if (!props.show) {
   return null
 }


 if (props.user.loading) {
  return <div>loading...</div>
 }

 const client = useApolloClient()
 const [books, setBooks] = useState([])

console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkk',props.user)//.favoriteGenre
 
const showBook = async () => {
    const { data } = await client.query({
      query: props.ALL_BOOKS,
      variables:{ genre: props.user.data.me }//.favoriteGenre
    })
    setBooks(data.allBooks)
  } 
showBook()

//if(props.user){
 return (
    <div>
      <h2>Recommendations</h2>
      {/* <p>books in your  {props.user.data.me.username} favorite genre {props.user.data.me.favoriteGenre}</p> */}

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
        { 
      books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
             <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
         )
        }    
        </tbody>
      </table>
          {/* <button onClick={() => showBook()} >show books in your favorite genre </button> */}
    
    </div>
  )
}

export default Recommend