import { gql } from 'graphql-tag'

export const UPLOAD_AVT = gql`
  mutation MyMutation($avatar_image: String = "") {
    Uploadprofile(input: { avatar_image: $avatar_image }) {
      message
    }
  }
`
