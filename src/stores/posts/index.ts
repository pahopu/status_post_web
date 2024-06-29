import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import { useQuery } from '@vue/apollo-composable'
import { GET_POST } from '../../api/GetPost'

export const usePostsStore = defineStore('posts', () => {
  const posts = ref([])
  const currId = computed(() => `p${posts.value.length + 1}`)

  const getPostsList = () => {
    const { onResult } = useQuery(GET_POST)
    onResult((result) => {
      if (result && result.data) {
        const postsList = []
        const results = result.data.posts

        for (const key in results) {
          const comment = results[key].post_comments.map((comment) => {
            return {
              id: comment.id,
              userId: comment.user_id,
              content: comment.comment,
              time: comment.create_at
            }
          })

          const post = {
            id: results[key].id,
            userId: results[key].user_id,
            content: results[key].post_content,
            img: results[key].post_image_url,
            time: results[key].create_at,
            hidden: false,
            comments: comment
          }
          postsList.push(post)
        }
        posts.value = postsList
      }
    })
  }

  const currCommentId = (postId) => {
    const post = posts.value.find((post) => post.id === postId)
    const commentNumber = post.comments.length + 1
    return `c${postId.slice(1)}_${commentNumber}`
  }

  const addPost = (post) => {
    posts.value.unshift(post)
  }

  const deletePost = (postId) => {
    const index = posts.value.findIndex((post) => post.id === postId)
    posts.value.splice(index, 1)
  }

  const togglePost = (postId) => {
    const post = posts.value.find((post) => post.id === postId)
    post.hidden = !post.hidden
  }

  const addComment = (postId, comment) => {
    const post = posts.value.find((post) => post.id === postId)
    post.comments.unshift(comment)
  }

  const updateComment = (postId, commentId, newContent) => {
    const post = posts.value.find((post) => post.id === postId)
    const comment = post.comments.find((comment) => (comment.id = commentId))
    comment.content = newContent
    console.log(posts)
  }

  const deleteComment = (postId, commentId) => {
    const post = posts.value.find((post) => post.id === postId)
    const index = post.comments.findIndex((comment) => comment.id === commentId)
    post.comments.splice(index, 1)
  }

  const getPostsByUserId = (userId) => {
    return posts.value.filter((post) => post.userId === userId)
  }

  const getPost = (postId) => {
    return posts.value[postId - 1]
  }

  return {
    posts,
    currId,
    addPost,
    deletePost,
    togglePost,
    addComment,
    getPostsByUserId,
    getPost,
    getPostsList,
    currCommentId,
    updateComment,
    deleteComment
  }
})
