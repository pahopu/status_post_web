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
      avt: 'https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-1/392938308_3665412847075897_5900783978140370372_n.jpg?stp=dst-jpg_p160x160&_nc_cat=106&ccb=1-7&_nc_sid=50d2ac&_nc_ohc=tMDGuoqk9D8Q7kNvgG4-079&_nc_ht=scontent.fsgn2-9.fna&oh=00_AYArqhJrfN8TGhESHZsK1ZSv0BCl3QKUrkTeeJyEmFDfiA&oe=6683F812',
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
      avt: 'https://hips.hearstapps.com/hmg-prod/images/gettyimages-1769089488-654b617730709.jpg?crop=1.00xw:0.667xh;0,0.0885xh&resize=1200:*',
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
      avt: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3Lyfxzjt955kvW2CgET3rx3WAv6_1PujV6g&s',
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
      avt: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJnCrXGp-26R_JfPFmr1TWuPIu2RX3H2LWDA&s',
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
      avt: 'https://e-cdn-images.dzcdn.net/images/artist/086f50bb1ce0e3033634e5e9c2d75462/500x500-000000-80-0-0.jpg',
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
