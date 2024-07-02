import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import { apolloClient } from '../../apollo-client'
import { useApolloClient, provideApolloClient } from '@vue/apollo-composable'

provideApolloClient(apolloClient)
const { resolveClient } = useApolloClient()
const client = resolveClient()

import { useMutation } from '@vue/apollo-composable'
import { GET_LIST_USER } from '../../api/GetListUser'
import { UPDATE_PROFILE } from '../../api/UpdateProfile'
import { UPLOAD_AVT } from '../../api/UploadAvt'

const defaultImage =
  'https://images.pexels.com/photos/1227511/pexels-photo-1227511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
const avtDefault =
  'https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1'

export const useUsersStore = defineStore('users', () => {
  const users = ref([])
  const lastFetch = ref(null)
  const shouldUpdate = computed(() => {
    const now = new Date().getTime()
    console.log('should update', !lastFetch.value || now - lastFetch.value > 60000)
    return !lastFetch.value || now - lastFetch.value > 60000
  })

  const getUsersList = async (force = false) => {
    if (!force && !shouldUpdate.value) return
    await client
      .query({
        query: GET_LIST_USER
      })
      .then((result) => {
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
        lastFetch.value = new Date().getTime()
      })
      .catch((error) => console.log(error))
    console.log('fetching users')
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
    const user = getUserById(userId)
  }

  const updateAvt = async (userId, avatar) => {
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
