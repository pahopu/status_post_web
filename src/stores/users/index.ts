import { defineStore } from 'pinia'
import { ref } from 'vue'

import { useMutation, useQuery } from '@vue/apollo-composable'
import { GET_LIST_USER } from '../../api/GetListUser'
import { UPDATE_PROFILE } from '../../api/UpdateProfile'
import { UPLOAD_AVT } from '../../api/UploadAvt'

const defaultImage =
  'https://images.pexels.com/photos/1227511/pexels-photo-1227511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
const avtDefault =
  'https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1'

export const useUsersStore = defineStore('users', () => {
  const users = ref([])

  const getUsersList = () => {
    const { onResult } = useQuery(GET_LIST_USER)
    onResult((result) => {
      if (result && result.data) {
        const usersList = []
        const results = result.data.account

        for (const key in results) {
          const user = {
            id: results[key].uid,
            name: results[key].display_name,
            gender: results[key].gender,
            birthday: results[key].birthday,
            birthPlace: results[key].birth_place,
            currentPlace: results[key].current_place,
            avt: results[key].avatar_url || avtDefault,
            cover: defaultImage,
            email: results[key].email
          }
          usersList.push(user)
        }
        users.value = usersList
      }
    })
  }

  const addUser = (user) => {
    users.value.push(user)
  }

  const getUserById = (userId) => {
    return users.value.find((user) => user.id === userId)
  }

  const updateUser = async (userId, updatedData) => {
    const updateProfileMutation = useMutation(UPDATE_PROFILE)
    await updateProfileMutation.mutate({
      uid: userId,
      display_name: updatedData.name,
      gender: updatedData.gender,
      birthday: updatedData.birthday,
      birth_place: updatedData.birthPlace,
      current_place: updatedData.currentPlace
    })
  }

  const updateAvt = async (avatar) => {
    const updateAvtMutation = useMutation(UPLOAD_AVT)
    await updateAvtMutation.mutate({
      avatar_image: avatar
    })
  }

  return {
    users: users,
    addUser,
    getUserById,
    getUsersList,
    updateUser,
    updateAvt
  }
})
