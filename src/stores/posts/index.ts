import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const usePostsStore = defineStore('posts', () => {
  const posts = reactive([
    {
      id: 'p1',
      userId: 'u1',
      content:
        'Had a great time hiking this weekend! The view from the top was breathtaking.\n#nature #hiking',
      img: 'https://images.pexels.com/photos/868097/pexels-photo-868097.jpeg',
      time: '2024-06-21T10:30:00+07:00',
      hidden: false,
      comments: [
        {
          id: 'c1_2',
          userId: 'u3',
          content: 'Wow, I wish I could join you next time!',
          time: '2024-06-21T11:15:00+07:00'
        },
        {
          id: 'c1_1',
          userId: 'u6',
          content: 'Looks amazing! Where did you go?',
          time: '2024-06-21T11:00:00+07:00'
        }
      ]
    },
    {
      id: 'p2',
      userId: 'u2',
      content:
        "Just finished reading 'The Great Gatsby'. Such an incredible book! Has anyone else read it?",
      img: 'https://m.media-amazon.com/images/I/81QuEGw8VPL._SL1500_.jpg',
      time: '2024-06-17T10:00:00+07:00',
      hidden: false,
      comments: [
        {
          id: 'c2_1',
          userId: 'u5',
          content: "Yes! It's one of my favorites. What did you think of the ending?",
          time: '2024-06-20T10:30:00+07:00'
        }
      ]
    },
    {
      id: 'p3',
      userId: 'u1',
      content:
        'Just tried a new recipe and it turned out delicious! Here is the recipe if anyone is interested.\n#cooking #recipe',
      img: 'https://media.istockphoto.com/id/479770816/vi/vec-to/mary1.jpg?s=1024x1024&w=is&k=20&c=NX011xiH53VBI60fO7GlXAJXJ5P1NEjInQ8aQeReXYw=',
      time: '2024-06-10T21:00:00+07:00',
      hidden: false,
      comments: [
        {
          id: 'c3_3',
          userId: 'u5',
          content: 'Yum! I will definitely be making this soon.',
          time: '2024-06-11T08:00:00+07:00'
        },
        {
          id: 'c3_2',
          userId: 'u3',
          content: "Looks delicious! Can't wait to try it.",
          time: '2024-06-10T23:45:00+07:00'
        },
        {
          id: 'c3_1',
          userId: 'u2',
          content: 'I love trying new recipes. Please share the recipe!',
          time: '2024-06-10T21:30:00+07:00'
        }
      ]
    }
  ])

  const addPost = (post) => {
    posts.unshift(post)
  }

  const deletePost = (postId) => {
    const index = posts.findIndex((post) => post.id === postId)
    posts.splice(index, 1)
  }

  const togglePost = (postId) => {
    const post = posts.find((post) => post.id === postId)
    post.hidden = !post.hidden
  }

  const addComment = (postId, comment) => {
    const post = posts.find((post) => post.postId === postId)
    post.comments.push(comment)
  }

  const getPostsByUserId = (userId) => {
    return posts.filter((post) => post.userId === userId)
  }

  return {
    posts,
    addPost,
    deletePost,
    togglePost,
    addComment,
    getPostsByUserId
  }
})
