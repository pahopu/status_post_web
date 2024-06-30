import { gql } from 'graphql-tag'

export const CHANGE_PASSWORD = gql`
  mutation MyMutation($new_password: String = "", $old_password: String = "") {
    change_password(credentials: { new_password: $new_password, old_password: $old_password }) {
      message
    }
  }
`
