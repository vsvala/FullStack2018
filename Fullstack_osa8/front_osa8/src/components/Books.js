import React, { useState }  from 'react'
import { useApolloClient } from '@apollo/react-hooks'


//const Books = ({ result }) => {
const Books = (props) => {
if (!props.show) {
    return null
  }

 if (props.books.loading) {
  return <div>loading...</div>
 }
 const client = useApolloClient()
const [books, setBooks] = useState(props.books.data.allBooks) //aluksi kaikki
console.log('bookdataAllBooks',props.books.data.allBooks)

const [genres, setGenres] = useState([])
const [genre, setGenre] = useState('all')
//setBooks(props.result.data.allBooks)

props.books.data.allBooks.forEach(book=>{book.genres.forEach(g=>{
  if(!genres.includes(g))setGenres(genres.concat(g)) //asettaa genreihin kirjojen genret
})})

//  let genre
//  const getgenrebooks=(genre)=>{ 
//    console.log('genreeee', genre)
// //    //genre=genre
// // console.log('books', books[1])
// // // if (genre==='all'){
// // //   console.log('alll',books)  
// // //   return books
// // // }else{
// const filteredbooks=books.filter(book => book.genres.includes(genre))
// setBooks(filteredbooks)
// console.log('books', books)
// }


 const showGenre = async (genre) => {

  const { data } = await client.query({
    query: props.ALL_BOOKS,
    variables: { genre }
  })
  setBooks(data.allBooks)  
 setGenre(genre)
}


 return (
    <div>
      <h2>books</h2> 
  {genre?
    <p>in genre {genre}</p>
    :  null
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
          </tr>
          { 
        //   genres ? books.filter(book => book.genres.includes(genres)).
        //  map(a =>
        //     <tr key={a.title}>
        //       <td>{a.title}</td>
        //    <td>{a.author.name}</td>
        //       <td>{a.published}</td>
        //    </tr>
        //   ):
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
        <div> 

      <h2>books</h2>
      <div>
        {genres.map(genre =>
          <button key={genre} onClick={() => showGenre(genre)}>{genre}</button>
        )}
        <button onClick={() => setBooks(props.books.data.allBooks)& setGenre('all') }>all genres</button>
      </div>
    </div>
    </div>
  )
}

export default Books