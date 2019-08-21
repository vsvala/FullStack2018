import React, { useState } from 'react'

const BookForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genres, setGenres] = useState('')
  
  const submit = async (e) => {
    e.preventDefault()
     await props.addBook({ 
       variables: { title, author, published, genres } 
    })

    setTitle('')
    setAuthor('')
    setPublished('')
    setGenres('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published <input
            value={published}
            onChange={({ target }) => setPublished(parseInt(target.value))}
          />
        </div>
        <div>
          genres <input
            value={genres}
            onChange={({ target }) => setGenres(target.value)}
          />
        </div>
        <button type='submit'>add!</button>
      </form>

    </div>
  )
}

export default BookForm