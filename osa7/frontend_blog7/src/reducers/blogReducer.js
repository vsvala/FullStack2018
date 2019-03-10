import blogService from '../services/blogs'

//REDUCER on funktio  joka saa parametriksi alkutilan, actionin=tilanmuuttajan ja palauttaa uudentilan
const blogReducer = (store = [], action) => {
  console.log('ACTION:', action)

  switch (action.type) {
  case 'VOTE':
    //console.log('casevote',action.id)
    { /* eslint-disable */ } 
    const old = store.filter(a => a.id !==action.id)
    //console.log('casevote, old blogs',old)
    const liked = store.find(a => a.id === action.id)
    // console.log('casevote, addedblog',old)
     { /* eslint-disable */ } 
    return [...old, { ...liked, likes: liked.likes + 1 } ]

  case 'CREATE':
    console.log(action.data)
    //return store.concat(action.content)
    return [...store,  action.data ]

  case 'DELETE':
    console.log('deleting')
    return store = action.data

  case 'INITIALIZE':
    return store = action.data //palauttaa taulukon

  default:
    return store
  }
}

//ACTION CREATORIT
//tähän täytyy saada useri..
export const createBlog=(content) => {
  return async (dispatch)  => {
    //console.log('createblogaction',content)
    const newBlog = await blogService.create(content)
    //console.log(newBlog,'uuusblogiiiiiiiiiiiiiii')
    dispatch({
      type:'CREATE',
      data:newBlog
    })
  }
}


export const removeBlog=(blog) => {
  return async (dispatch)  => {
    //console.log('dleteblogaction',blog)
    await blogService.deleteOne(blog.id)
    const changedBlogList = await blogService.getAll()
    //console.log(changedBlogList,'remoooooooooooooooooooviiiiiiiiingi')
    dispatch({
      type:'DELETE',
      data:changedBlogList
      //id: blog.id
    })
  }
}

export const voteBlog = (blog) => {
  //console.log(blog,'vvvvvvvvvvvvvvvvoooooooooooooooooooooooooote ACTION')
  // console.log(blog, blog.id,'vooootedblog ACTION')
  return async (dispatch) => {
    await blogService.update(blog.id, blog)
    dispatch({
      type: 'VOTE',
      id: blog.id
    })
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const content = await blogService.getAll()
    console.log(content)
    dispatch({
      type: 'INITIALIZE',
      data:content
    })
  }
}
export default blogReducer