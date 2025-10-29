import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API || '/api/graphql'
})

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})
