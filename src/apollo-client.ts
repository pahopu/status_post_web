import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core'
import { onError } from '@apollo/client/link/error'
import { logErrorMessages } from '@vue/apollo-util'

function getHeaders() {
  const headers = {}
  const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJteXN1cGVyU2VjcmV0SXNzIiwic3ViIjoidXNlciIsImF1ZCI6Imhhc3VyYSIsImlhdCI6MTcxOTM5MDA4MCwibmJmIjoxNzE5MzkwMDgwLCJleHAiOjE4MTk0NzY0ODAsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoidXNlciIsIngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciJdLCJ4LWhhc3VyYS11c2VyLWlkIjoidFRHNHllQXNaeFFYeVNTa2R6SUFEdlhqWEdyMSJ9fQ.gWsCZUaQkTQVW5i77XafpoqXdNdOvTVWOnQKkq6siZw'
  if (token) {
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
