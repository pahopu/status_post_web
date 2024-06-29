import { graphql } from 'graphql'

export const REGISTER = graphql(`
  mutation MyMutation($display_name: String = "", $email: String = "", $password: String = "") {
    register(credentials: { display_name: $display_name, email: $email, password: $password }) {
      uid
      role
      email
      display_name
      avatar_url
      access_token
    }
  }
`),
