const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Joku',
    author: 'Minä',
    url: '2018-07-11T11:40:14.893Z',
    likes: 2
  },
  {
    title: 'Jamit',
    author: 'Jaska',
    url: '2018-07-11T11:40:14.893Z',
    likes: 7
  }
]
const format = (blog) => {
  return {
    title: blog.title,
    author: blog.author,
    url:blog.url,
    likes:blog.likes,
    id: blog._id
  }
}
// epävalidi id
const nonExistingId = async () => {
  const blog = new Blog()
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}
// palauttaa kaikki tietokannassa kutsuhetkellä olevat blogit
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(format)
}

const usersInDb = async () => {
  const users = await User.find({})
  return users
}


module.exports = {
  initialBlogs, format, nonExistingId, blogsInDb, usersInDb
}