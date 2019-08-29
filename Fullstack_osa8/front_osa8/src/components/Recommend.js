import React , { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
 //import { useApolloClient } from 'react-apollo-hooks'

 
const Recommend = (props) => {
 if (!props.show) {
   return null
 }


 if (props.user.loading) {
  return <div>loading...</div>
 }

 const [books, setBooks] = useState([])
 const [user, setUser] = useState(null)
 const client = useApolloClient()

 useEffect(() => {
   async function fetchUser(){
   const {data} =await client.query({
     query:props.USER
   })
   console.log('dasta'. data)
   setUser(data.me)
   }
   fetchUser()
   console.log('inituser',user)
  }, [])


useEffect(() => {
  if(user!==null){
  async function fetchBooks(){
  const {data} =await client.query({
    query:props.ALL_BOOKS,
    variables:{ genre: user.favoriteGenre },
  })
  console.log('dasta'. data)
  setBooks(data.allBooks)
  }
  fetchBooks()
  console.log('initbooks',books)
 }}, [user])


//if(props.user){
 return (
    <div>
      <h2>Recommendations</h2>
      {user&&user?    
      <p>books in your  {props.user.data.me.username} favorite genre {user.favoriteGenre}</p>
      :null
      }

 

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
            <th>
             genre
            </th>
          </tr>
        { 
      books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
             <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genres}</td>
            </tr>
         )
        }    
        </tbody>
      </table>
    
    </div>
  )
}

export default Recommend