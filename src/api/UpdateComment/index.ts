import { gql } from 'graphql-tag'

export const UPDATE_COMMENT = gql`
  mutation MyMutation($id: Int = 10, $comment: String!) {
    update_comments(where: { id: { _eq: $id } }, _set: { comment: $comment }) {
      returning {
        comment
      }
    }
  }
`