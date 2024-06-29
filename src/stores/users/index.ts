import { defineStore } from 'pinia'
import { ref } from 'vue'

import { useQuery } from '@vue/apollo-composable'
import { GET_LIST_USER } from '../../api/GetListUser'

const defaultImage = 'src/assets/imgs/Cover/.png'

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
            avt: results[key].avatar_url,
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

  const updateUser = (userId, updatedData) => {
    const user = users.value.find((user) => user.id === userId)
    Object.assign(user, updatedData)
  }

  return {
    users: users,
    addUser,
    getUserById,
    getUsersList,
    updateUser
  }
})
