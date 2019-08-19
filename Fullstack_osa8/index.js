const { ApolloServer, gql } = require('apollo-server')
const uuid = require('uuid/v1')


const authors = [
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

const books = [
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

const typeDefs = gql`
type Author {
  name: String!
  born:Int
}

type Book {
  title: String! 
  published: Int!
  author: String!  
  id: ID!
  genres:[String]  

}

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks: [Book!]!
    allAuthors: [Author!]!
    findBook(genre:String!): [Book]
  }
  
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]
    ): Book

    addAuthor(
      name: String!
    ): Author 
    
    editAuthor(
      name: String!
      setBornTo: Int
    ): Author

  }
`  
//    allBooks(author: String, genre: String): [Book!]!
// allBooks: [Book!]!
 //findBook(author: String!, genre:String!): [Book]
const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: () => books,
  //   allBooks: (root, args) => {
  // if (args.genre) {
  //   return books.filter(b => b.genres.includes(args.genre))
  //  }return books.filter(b => b.author === args.author)
  // },
    allAuthors: () => authors,
    findBook: (root, args) =>  
    books.find(b => b.author === args.author)

},
Book:{
  title:(root)=>root.title,
  author:(root)=>root.author

},
Mutation: {
  addBook: (root, args) => {
    if (books.find(b => b.title === args.title)) {
      throw new UserInputError('Title must be unique', {
        invalidArgs: args.title,
      })
    }
    if (books.find(b => b.author !== args.author)) {
      const author = { ...args, id: uuid() }
      this.authors = authors.concat(author)
      console.log('addAuthor')  
     // return author   
      }
    const book = { ...args, id: uuid() }
    this.books = books.concat(book)
    return book
},

addAuthor: (root, args) => {
  if (authors.find(a => a.name === args.name)) {
    throw new UserInputError('Name must be unique', {
      invalidArgs: args.name,
    })
  }
  const author = { ...args, id: uuid() }
  this.authors = authors.concat(author)
  return author  
},

editAuthor: (root, args) => {
  const author = authors.find(a => a.name === args.name)
  if (!author) {
    return null
  }
  if (args.setBornTo){
  const updatedAuthor = { ...author, name: args.name, born: args.setBornTo  }
  this.authors = authors.map(p => p.name === args.name ? updatedAuthor : p)
  return updatedAuthor
} else{
  const updatedAuthor = { ...author, name: args.name, born: null  }
 this. authors = authors.map(p => p.name === args.name ? updatedAuthor : p)
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