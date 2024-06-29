import { gql } from 'graphql-tag'

export const GET_LIST_USER = gql`
  query MyQuery {
    account {
      uid
      display_name
      email
      avatar_url
      birthday
      birth_place
      current_place
      gender
    }
  }
`
