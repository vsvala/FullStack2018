const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (listWithOneBlog) => {
  console.log(listWithOneBlog[0].likes)
  return listWithOneBlog[0].likes
}


const totalLikesAll = (blogs) => {
  console.log(blogs[0].likes)
  const likeslist = () => blogs.map(blog => blog.likes)
  console.log(likeslist())
  const reducer = (accumulator, currentValue) => accumulator + currentValue
  return likeslist().reduce(reducer)
}

const favoriteBlog = (blogs) => {
  const likelist = () => blogs.map(blog => blog.likes)
  const biggest = Math.max(...likelist())
  //console.log(biggest)
  const mostLiked =() => blogs.filter(blog => (blog.likes===biggest))
  //console.log(mostLiked()[0])
  //console.log('title:',mostLiked()[0].title,', author:', mostLiked()[0].author,', likes:', mostLiked()[0].likes)
  return mostLiked()[0]
}

// //mappaa nimet, katso kenen nimiä eniten taulukkossa..?
// const mostBlogs = (blogs) => {
//   var occurance
//   const authorlist = () => blogs.map(blog => blog.author)
//   console.log('lista', authorlist)
//   var a = [],b = 0, occurrence
//   for(var i = 0; i < authorlist.length;i++){
//     if(a[authorlist[i]] !== undefined){
//       a[authorlist[i]]++
//     }else{
//       a[authorlist[i]] = 1
//     }
//   }
//   for(var key in a){
//     if(a[key] > b){
//       b = a[key]
//       occurrence = key
//     }

//     console.log('occuranc',occurance)
//     return occurrence
//   }
// }



module.exports = {
  totalLikes,
  totalLikesAll,
  favoriteBlog,
  dummy
}