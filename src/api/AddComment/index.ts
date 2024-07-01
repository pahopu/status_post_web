import { gql } from 'graphql-tag'

export const ADD_COMMENT = gql`
  mutation MyMutation($post_id: String = "", $content: String = "") {
    insert_comments(objects: {post_id: $post_id, comment: $content }) {
      returning {
        id
      }
    }
  }
`
