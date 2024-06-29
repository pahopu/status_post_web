import { gql } from 'graphql-tag'

export const REGISTER = gql`
  mutation MyMutation($display_name: String = "", $email: String = "", $password: String = "") {
    register(credentials: { display_name: $display_name, email: $email, password: $password }) {
      uid
      access_token
    }
  }
`
