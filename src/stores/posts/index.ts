import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import { useQuery, useMutation } from '@vue/apollo-composable'

import { GET_POST } from '../../api/GetPost'
import { CREATE_POST } from '../../api/CreatePost'
import { DELETE_POST } from '../../api/DeletePost'
import { ADD_COMMENT } from '../../api/AddComment'
import { DELETE_COMMENT } from '../../api/DeleteComment'
import { UPDATE_COMMENT } from '../../api/UpdateComment'

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
    const post = posts.value.find((post) => post.id == postId)
    const commentNumber = post.comments.length + 1
    return `c${postId.slice(1)}_${commentNumber}`
  }

  const addPost = async (post) => {
    const variables = {
      post_content: post.content,
      post_image_url: post.img
    }
    const createPostMutation = useMutation(CREATE_POST)
    await createPostMutation.mutate(variables)
    window.location.reload()
  }

  const deletePost = async (postId) => {
    const deletePostMutation = useMutation(DELETE_POST)
    await deletePostMutation.mutate({ _eq: postId })
    window.location.reload()
  }

  const togglePost = (postId) => {
    const post = posts.value.find((post) => post.id == postId)
    post.hidden = !post.hidden
  }

  const addComment = async (postId, comment) => {
    const addCommentMutation = useMutation(ADD_COMMENT)
    const response = await addCommentMutation.mutate({
      post_id: String(postId),
      content: comment
    })
    console.log(response)
    window.location.reload()
  }

  const updateComment = (commentId, newContent) => {
    const updateCommentMutation = useMutation(UPDATE_COMMENT)
    updateCommentMutation.mutate({ id: commentId, comment: newContent })
    window.location.reload()
  }

  const deleteComment = async (commentId) => {
    const deleteCommentMutation = useMutation(DELETE_COMMENT)
    await deleteCommentMutation.mutate({ _eq: commentId })
    window.location.reload()
  }

  const getPostsByUserId = (userId) => {
    return posts.value.filter((post) => post.userId === userId)
  }

  const getPost = (postId) => {
    return posts.value.find((post) => post.id == postId)
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
