import { gql } from 'graphql-tag'

export const DELETE_POST = gql`
  mutation MyMutation($_eq: Int = 10) {
    delete_posts(where: { id: { _eq: $_eq } }) {
      returning {
        id
      }
    }
  }
`
