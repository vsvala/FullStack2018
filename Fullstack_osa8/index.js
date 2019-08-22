const { ApolloServer, UserInputError, gql } = require('apollo-server')
const uuid = require('uuid/v1')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
//const jwt =require("jsonwebtoken")

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}
const password = process.argv[2]

const MONGODB_URI = `mongodb+srv://graphql:graphql@cluster0-b2hdh.mongodb.net/test?retryWrites=true&w=majority`



console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


//skeemat,  Query, joka kertoo mitä kyselyjä API:iin voidaan tehdä.
const typeDefs = gql`
type Author {
  name: String!
  born:Int
  bookCount:Int
  id: ID!
}

type Book {
  title: String! 
  author: Author!
  published: Int!  
  genres:[String] 
  id: ID!
}

type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author:String, genre: String): [Book!]!
    allAuthors: [Author!]!
    findBook(genre:String!): [Book]
    me: User
  }
  
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]
    ): Book

    addAuthor(
      name: String!
    ): Author 
    
   addYear(
      name: String!
      born: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`  
//bookCount:Int
// bookCount:String!
// allBooks: [Book!]!
//allBooks(author: String, genre: String): [Book!]!
 //findBook(author: String!, genre:String!): [Book]

const resolvers = {

  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () =>  Author.collection.countDocuments(),
    allBooks: (root, args) => { 
       if (args.genre) {
      return Book.find({ genres: { $in: args.genre }}).populate('author')
       }  
        return Book.find({}).populate('author') 
     },
    allAuthors: () => {
    return Author.find({}) 
}
 },
//  Author:{
//    bookCount:parent=>{
//    return Book.collection.countDocuments({author:parent})
//  }
// },
Author:{
  bookCount:(root)=>{
   return Book.find({author:{$eq:root.id}}).countDocuments()
}
},
// Book:{
//   author:async(root)=>{
//     let author=await Author.findOne({name:root.author.name})
// return {author:author}//object
// }
// },

Mutation: {
  addBook: async(root, args) => {
    let author=await Author.findOne({name:args.author})

    try {
   if (!author) {
   author = new Author({ name:args.author}) 
    await author.save()
   }
    } catch (error) {
     throw new UserInputError(error.message, 
      { invalidArgs: args,})
     }
  let book = new Book({
     title: args.title,
     published: args.published,
     genres: args.genres,
     author: author
    })
  try {
    await book.save()
   //const populateBook=await Book.findOne({title:args.title}).populate('author, {name:1}')
  } catch (error) {
    throw new UserInputError(error.message, {
      invalidArgs: args,})
  }
    return book
},


addYear: async(root, args) => {

 const author = await Author.findOne({name:args.name})
 if (!author) {
  return null
   }
   if (args.born){ 
   author.born=args.born
 
 try {
 author.save()
} catch (error) {
  throw new UserInputError(error.message, {
    invalidArgs: args,})
}
return author
}
}
}
 }
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

//8.4 Author's books
//query {
//   allBooks(author: "Robert Martin") {
//     title
//   }
// }

//genre's books
// query {
//   allBooks(genre: "refactoring") {
//     title
//     author
//   }
// }

//8,6 addingBook
// mutation {
//   addBook(
//     title: "NoSQL Distilled",
//     author: "Martin Fowler",
//     published: 2012,
//     genres: ["database", "nosql"]
//   ) {
//     title,
//     author
//   }
// }

//8,7 editingAuthor 
// mutation {
//   editAuthor(name: "Reijo Mäki", setBornTo: 1958) {
//     name
//     born
//   }
// }
