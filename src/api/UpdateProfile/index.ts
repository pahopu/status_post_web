import { gql } from 'graphql-tag'

export const UPDATE_PROFILE = gql`
  mutation MyMutation(
    $gender: String = ""
    $display_name: String = ""
    $current_place: String = ""
    $birthday: date = ""
    $birth_place: String = ""
    $uid: String = ""
  ) {
    update_account(
      where: { uid: { _eq: $uid } }
      _set: {
        gender: $gender
        display_name: $display_name
        current_place: $current_place
        birthday: $birthday
        birth_place: $birth_place
      }
    ) {
      returning {
        uid
      }
    }
  }
`
