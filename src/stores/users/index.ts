import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useUsersStore = defineStore('users', () => {
  const users = reactive([
    {
      id: 'u1',
      name: 'Pham Hoang Phuc',
      gender: 'Male',
      birthday: '2002-07-01',
      birthPlace: 'Tan Chau, An Giang, Vietnam',
      currentPlace: 'Ho Chi Minh City, Vietnam',
      avt: 'src/assets/imgs/Sqrt_Avt.jpg',
      cover: 'src/assets/imgs/Cover.png',
      email: 'hoangphucpham0172@gmail.com'
    },
    {
      id: 'u2',
      name: 'Mike Johnson',
      gender: 'Male',
      birthday: '1990-06-01',
      birthPlace: 'New York, USA',
      currentPlace: 'New York, USA',
      avt: 'https://assets.answersingenesis.org/img/cms/content/contentnode/image/bios/mike-johnson-300x300.jpg',
      cover:
        'https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      email: 'mikejohnson@gmail.com'
    },
    {
      id: 'u3',
      name: 'Emily Clark',
      gender: 'Female',
      birthday: '1995-03-15',
      birthPlace: 'Los Angeles, USA',
      currentPlace: 'Los Angeles, USA',
      avt: 'src/assets/imgs/Sqrt_Avt.jpg',
      cover: 'src/assets/imgs/Cover.png',
      email: 'emilyclark@gmail.com'
    },
    {
      id: 'u4',
      name: 'David Wang',
      gender: 'Male',
      birthday: '2005-12-25',
      birthPlace: 'Beijing, China',
      currentPlace: 'Beijing, China',
      avt: 'src/assets/imgs/Sqrt_Avt.jpg',
      cover: 'src/assets/imgs/Cover.png',
      email: 'davidwang@gmail.com'
    },
    {
      id: 'u5',
      name: 'Sarah Lee',
      gender: 'Female',
      birthday: '1998-09-30',
      birthPlace: 'Seoul, Korea',
      currentPlace: 'Seoul, Korea',
      avt: 'src/assets/imgs/Sqrt_Avt.jpg',
      cover: 'src/assets/imgs/Cover.png',
      email: 'sarahlee@gmail.com'
    },
    {
      id: 'u6',
      name: 'John Smith',
      gender: 'Male',
      birthday: '2000-04-20',
      birthPlace: 'London, England',
      currentPlace: 'London, England',
      avt: 'src/assets/imgs/Sqrt_Avt.jpg',
      cover: 'src/assets/imgs/Cover.png',
      email: 'johnsmith@gmail.com'
    }
  ])

  const addUser = (user) => {
    users.push(user)
  }

  const getUserById = (userId) => {
    return users.find((user) => user.id === userId)
  }

  const updateUser = (userId, updatedData) => {
    const user = users.find((user) => user.id === userId)
    Object.assign(user, updatedData)
  }

  return {
    users,
    addUser,
    getUserById,
    updateUser
  }
})
