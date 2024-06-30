import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core'
import { onError } from '@apollo/client/link/error'
import { logErrorMessages } from '@vue/apollo-util'

function getHeaders() {
  const headers = {}
  const token = localStorage.getItem('token')
  const firebaseToken = localStorage.getItem('firebase-token')
  if (firebaseToken) {
    headers['x-hasura-firebase-token'] = `firebase ${firebaseToken}`
    localStorage.removeItem('firebase-token')
  } else if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}

// Create an http link:
const httpLink = new HttpLink({
  uri: 'http://localhost:8080/v1/graphql',
  fetch: (uri: RequestInfo, options: RequestInit) => {
    options.headers = getHeaders()
    return fetch(uri, options)
  }
})

const errorLink = onError((error) => {
  if (process.env.NODE_ENV !== 'production') {
    logErrorMessages(error)
  }
})

// Create the apollo client
export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: errorLink.concat(httpLink)
})
