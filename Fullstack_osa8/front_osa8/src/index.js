import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import ApolloClient from 'apollo-boost'
import { ApolloProvider } from "@apollo/react-hooks"
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'

import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'


const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: { reconnect: true }
})

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('books-user-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    }
  }
})
const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  authLink.concat(httpLink),
)


const client = new ApolloClient({
  link, //: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

// const client = new ApolloClient({
//   uri: "http://localhost:4000/graphql"
// })

ReactDOM.render(
  <ApolloProvider client={client} >
  <App />
</ApolloProvider>, 
  document.getElementById('root')
)
