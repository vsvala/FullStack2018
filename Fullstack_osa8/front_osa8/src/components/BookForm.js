import React, { useState } from 'react'

const BookForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  
  const submit = async (e) => {
    e.preventDefault()
     await props.addUser({ 
       variables: { title, author, published, genre } 
    })

    setTitle('')
    setAuthor('')
    setPublished('')
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          phone <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          street <input
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          city <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
        </div>
        <button type='submit'>add!</button>
      </form>

    </div>
  )
}

export default BookForm