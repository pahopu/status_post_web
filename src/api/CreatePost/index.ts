import { gql } from 'graphql-tag'

export const CREATE_POST = gql`
  mutation MyMutation($post_content: String = "", $post_image_url: String = "") {
    post_create(input: { post_content: $post_content, post_image_url: $post_image_url }) {
      message
    }
  }
`
