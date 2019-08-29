import React , { useEffect, useState } from 'react'
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

//   setGenres()
// },props.books)
//  const user=props.user
//  console.log('props.user.data.allUSer ',user)
// console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkk',props.user)//.favoriteGenre
 
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

  // const setGenres = async () => {
  //   const gen = await client.query({
  //      query: props.USER,
  //     })


// setGenre(gen.data.me.favoriteGenre)
// //const showBook = async () => {
//   const { data } = await client.query({
//       query: props.ALL_BOOKS,
//       variables:{ genre: gen.data.me.favoriteGenre },
//       fetchPolicy: 'no-cache' // yksittäisen henkilön genre tietoja ei tallenneta välimuistiin:
//     })
//     setBooks(data.allBooks)
//   } 
//showBook()

//if(props.user){
 return (
    <div>
      <h2>Recommendations</h2>
      {user&&user?
    <p>books in your favorite genre {user.favoriteGenre}</p>
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