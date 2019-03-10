import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import CommentForm from '../comment/CommentForm'
//import CommentList from '../comment/CommentList'
//import { loggedUser } from '../../reducers/loginReducer'
import { removeBlog } from '../../reducers/blogReducer'
import { voteBlog } from '../../reducers/blogReducer'
import { notify } from '../../reducers/notificationReducer'
import { initializeComments } from '../../reducers/commentReducer'
import Comment from '../comment/Comment'


const SingleBlog = ({ blog, initializeComments, visibleComments, visibleBlogs, removeBlog, notify, voteBlog, user, history }) => {
  useEffect(() => {
    console.log(blog.id,'blogiiiiiiiiiiiddddd')
    initializeComments(blog.id)
  },
  []
  )


  console.log(user, 'tänhetken käyttäjäääääääääää')
  const blogStyle = {
    paddingTop: 2,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteBlog = (id) => {
    return () => {
      const blog = visibleBlogs.find(n => n.id === id)
      //console.log(blog,'poistetaanaaaaaaaaaaaaaan')
      console.log(user.name)
      //bloguser on id ja propsusername=nimi
      //if(blog.user.name===user.name ||blog.user.name===undefined){

      if (window.confirm('Poistetaanko ' + blog.title + '?')) {
        removeBlog(blog)//actioncreator kutsu
        notify('blog is deleted', 5)
        history.push('/blogs')

        //}
      }
    }
  }

  // likejen lisäys ja päivitys toiminto
  const addLike = (blog) => {
    console.log(blog, 'päänestetääänblogi')
    return () => {
      const likedblog = visibleBlogs.find(n => n.id === blog.id)
      const blogObject = { ...likedblog, likes: blog.likes + 1 }
      console.log(blogObject, 'päänestetääänuusblogObject')
      voteBlog(blogObject) //actioncreator kutsu
      notify(`Blogikirjoituksen ${blogObject.title} by ${blog.author} liken lisäys onnistui!`, 5)
      //   })
      //   .catch(error => {
      //     this.setState({
      //       error: `Blogin '${blogObject.title}' likejen päivitys epäonnistui, voit likettää yhtä blogia vain yhden kerran loggautumisesi yhteydessä`,
      //     // blogs: this.state.blogs.filter(n => n.id !==blog.id)
      //     })

    }
  }
  //  console.log(blog.id, 'iiiidffffffffffffffffffffffffffffffffffffffff')

  return (

    <div style={blogStyle}>
      <div className="content">
        <h1>blog</h1>
        <h3>{blog.title} by {blog.author}</h3>
        <div className="tog">
          <p>url: {blog.url} </p>
          <p>{blog.likes}likes < button onClick={addLike(blog)}>like</button></p>
          <p>Added by {blog.user.name}</p>
          {console.log(blog.id, 'iiiiiiiiiiiiiiiiddddddddddddddddddddddd')}
          {console.log(user.name, 'usernameeeeeeeeeeeeeeeeeeeeeeeeeeeee')}
          {user.name === blog.user.name
            ? <button onClick={deleteBlog(blog.id)}>delete</button>
            : <em></em>}
        </div>
      </div>
      <h2>Comments</h2>
      <div className="commentList">
        <ul>
          { visibleComments.map(comment =>
            <Comment key={comment.id}
              comment={comment} />)}
        </ul>
      </div>
      {/* <CommentList /> */}
      <CommentForm blog={blog} />
    </div>
  )
}
// const commentsToShow = (visibleComments, blog) => {
//   const filteredComments=visibleComments.find(comment => comment.id === blog.id)
//   return filteredComments

// }

const mapStateToProps = (state) => {
  console.log(state.blogs)
  console.log(state.comments, 'kommenttienstate')
  console.log(state, 'koko stote')
  return {
    user: state.loggedUser,
    visibleBlogs: state.blogs,
    visibleComments: state.comments
  }
}
//kutsutaan  reducereista actioncreator metodeja
export default connect(
  mapStateToProps,
  { removeBlog, voteBlog, notify, initializeComments }
)(SingleBlog)