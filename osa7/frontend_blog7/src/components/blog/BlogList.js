import React from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import { connect } from 'react-redux'
import Togglable from '../common/Togglable'
import { removeBlog } from '../../reducers/blogReducer'
import { Table } from 'react-bootstrap'

export const BlogList = (props) => {


  return (
    <div className="blogList">

      <Togglable buttonLabel="new blog" ref={component => this.blogForm = component}>
        <BlogForm></BlogForm>
      </Togglable>

      <Table striped>
        <thead>
          <tr>
            <th>Blog</th> <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {props.visibleBlogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id}
              blog={blog}
            //user={props.user}
            />
          )}
        </tbody>
      </Table>

    </div>
  )

}
const blogsToShow = (blogs) => {
  return blogs
}
const mapStateToProps = (state) => {
  console.log(state.blogs)
  console.log(state, 'koko stote')
  return {

    visibleBlogs: blogsToShow(state.blogs)
  }
}

export default connect(
  mapStateToProps,
  { removeBlog }
)(BlogList)
