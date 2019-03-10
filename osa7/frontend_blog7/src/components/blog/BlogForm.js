import React from 'react'
import { createBlog } from '../../reducers/blogReducer'
import { notify } from '../../reducers/notificationReducer'
import { connect } from 'react-redux'
import { FormGroup, FormControl, FormLabel, Button } from 'react-bootstrap'


//class BlogForm extends React.Component {
const BlogForm = (props) => {
  // Blogin lisäys tai päivitys
  const addBlog = async(event) => {
    event.preventDefault()

    const blogObject = {
      title:event.target.title.value,
      author:event.target.author.value,
      url:event.target.url.value,
      user:props.user
    }
    // tells blogreducer to create blog
    props.createBlog(blogObject)
    props.notify(`blog ${blogObject.title} by ${blogObject.author} created`, 5)

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    // history.push('/blogs')
  }

  //jos samanniminen blogi olemassa päivitetään
  //  if (this.includesBlog(blogObject)){
  //    this.updateBlog(blogObject)
  //      }
  // luodaan uusipäiväkirjaolio ja lähetetään tietokantaan
  // else{
  //   const saveBlog = await blogService.create(blogObject)

  //}
  //    handleBlogFormChange = (event) => {
  //     this.setState({[event.target.name]: event.target.value })
  // }

  /* // tarkistetaan onko samannimistä blogia
 includesBlog = (blogObject) => {
  const blogger = this.state.blogs.map(blog=> blog.title.toLowerCase());
  if (blogger.includes(blogObject.title.toLowerCase())) {
      return true;
  } else {
      return false;
  }
}
// etsitään blogi titlen perusteella
findBlog = () => {
  let sama = this.state.blogs.find(blog => blog.title.toLowerCase() === this.state.newHeader.toLowerCase())
  if (sama) {
      return sama;
  } else {
      return false;
  }
} */

  return (

    <div>
      <h2>Create new blog</h2>

      <form onSubmit={addBlog}>

        <FormGroup>

          <FormLabel>Title:</FormLabel>
          <FormControl
            type="text"
            name="title"
          />

          <FormLabel>Author:</FormLabel>
          <FormControl
            type="text"
            name="author"
          />

          <FormLabel>Url:</FormLabel>
          <FormControl
            type="text"
            name="url"
          />
          <br></br>
          <Button bsStyle="success" type="submit">add blog</Button>
        </FormGroup>
      </form>
    </div>
  )
}


export default connect(
  null,
  { createBlog, notify }
)(BlogForm)

