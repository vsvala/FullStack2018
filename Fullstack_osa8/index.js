const { ApolloServer, UserInputError, gql } = require('apollo-server')
const uuid = require('uuid/v1')
const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = 'mongodb+srv://graphql:graphql@cluster0-b2hdh.mongodb.net/test?retryWrites=true&w=majority'


console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

//skeemat,  Query, joka kertoo mitä kyselyjä API:iin voidaan tehdä.
const typeDefs = gql`
type Author {
  name: String!
  born:Int
  id: ID!
  bookCount:Int
}

type Book {
  title: String! 
  author: Author!    
  published: Int!  
  genres:[String] 
  id: ID!
 

}

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    findBook(genre:String!): [Book]
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
    
    editAuthor(
      name: String!
      born: Int
    ): Author

  }
`  
// allBooks: [Book!]!
 //findBook(author: String!, genre:String!): [Book]

const resolvers = {

  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
   // allBooks: () => books, 
    
     allBooks: (root, args) => {  
     if (args.genre) {
      return books.filter(b => b.genres.includes(args.genre))
    }
    if (args.author) { return books.filter(b => b.author === args.author)}
    return books
  },
    
    allAuthors: () => 
    authors.map(author=>({
     ...author,//this will spread all existing values from author object
    bookCount: books.filter(book=>book.author===author.name).length
  }))
 },

Mutation: {
  addBook: async(root, args) => {
    if (books.find(b => b.title === args.title)) {
      throw new UserInputError('Title must be unique', {
        invalidArgs: args.title,
      })
    }
    if (books.find(b => b.author !== args.author)) {
      const author = new Author({ name:args.author, id: uuid() })   
      //authors = authors.concat(author)
      console.log('addAuthor')  
     // return author  
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
     //? return Author
  
      }
    const book = new book({ ...args, id: uuid() })
  // books = books.concat(book)
  try {
    await book.save()
  } catch (error) {
    throw new UserInputError(error.message, {
      invalidArgs: args,
    })
  }
    return book
},

addAuthor: (root, args) => {
  if (authors.find(a => a.name === args.name)) {
    throw new UserInputError('Name must be unique', {
      invalidArgs: args.name,
    })
  }
  const author = { ...args, id: uuid() }
 authors = authors.concat(author)
  return author  
},



editAuthor: (root, args) => {
  const author = authors.find(a => a.name === args.name)
  if (!author) {
    return null
  }
  if (args.born){
  const updatedAuthor = { ...author, name: args.name, born: args.born  }
  authors = authors.map(p => p.name === args.name ? updatedAuthor : p)
  return updatedAuthor
} else{
  const updatedAuthor = { ...author, name: args.name, born: null  }
  authors = authors.map(p => p.name === args.name ? updatedAuthor : p)
  return updatedAuthor

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