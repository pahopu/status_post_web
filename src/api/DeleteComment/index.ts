import { gql } from 'graphql-tag'

export const DELETE_COMMENT = gql`
  mutation MyMutation($_eq: Int) {
    delete_comments(where: { id: { _eq: $_eq } }) {
      returning {
        id
      }
    }
  }
`
