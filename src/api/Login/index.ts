import { gql } from 'graphql-tag'

export const LOGIN = gql`
  mutation MyMutation($email: String = "", $password: String = "") {
    login(credentials: { email: $email, password: $password }) {
      uid
      access_token
    }
  }
`
