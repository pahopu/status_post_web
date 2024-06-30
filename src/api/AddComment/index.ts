import { gql } from 'graphql-tag'

export const ADD_COMMENT = gql`
  mutation MyMutation($user_id: String = "", $post_id: String = "", $content: String = "") {
    insert_comments(objects: { user_id: $user_id, post_id: $post_id, comment: $content }) {
      returning {
        id
      }
    }
  }
`
