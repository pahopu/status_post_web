import { gql } from 'graphql-tag'

export const GET_POST = gql`
  query MyQuery {
    posts(order_by: { create_at: desc }) {
      id
      user_id
      post_content
      post_image_url
      create_at
      post_comments(order_by: { create_at: desc }) {
        id
        user_id
        comment
        create_at
      }
    }
  }
`
