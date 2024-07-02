import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import { apolloClient } from '../../apollo-client'
import { useMutation, useApolloClient, provideApolloClient } from '@vue/apollo-composable'

import { GET_POST } from '../../api/GetPost'
import { CREATE_POST } from '../../api/CreatePost'
import { DELETE_POST } from '../../api/DeletePost'
import { ADD_COMMENT } from '../../api/AddComment'
import { DELETE_COMMENT } from '../../api/DeleteComment'
import { UPDATE_COMMENT } from '../../api/UpdateComment'

provideApolloClient(apolloClient)
const { resolveClient } = useApolloClient()
const client = resolveClient()

export const usePostsStore = defineStore('posts', () => {
  const posts = ref([])
  const lastFetch = ref(null)
  const shouldUpdate = computed(() => {
    const now = new Date().getTime()
    console.log('should update', !lastFetch.value || now - lastFetch.value > 60000)
    return !lastFetch.value || now - lastFetch.value > 60000
  })

  const getPostsList = async () => {
    if (!shouldUpdate.value) return
    await client
      .query({
        query: GET_POST
      })
      .then((result) => {
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
        lastFetch.value = new Date().getTime()
      })
      .catch((error) => console.log(error))
    console.log('fetching posts')
  }

  const addPost = async (post) => {
    const variables = {
      post_content: post.content,
      post_image_url: post.img
    }
    const createPostMutation = useMutation(CREATE_POST)
    const message = await createPostMutation.mutate(variables)
    const postId = message?.data.post_create.message
    const newPost = {
      id: postId,
      userId: post.userId,
      content: post.content,
      img: post.img,
      time: new Date().toISOString(),
      hidden: false,
      comments: []
    }
    posts.value.unshift(newPost)
  }

  const deletePost = async (postId) => {
    const deletePostMutation = useMutation(DELETE_POST)
    await deletePostMutation.mutate({ _eq: postId })
    const index = posts.value.findIndex((post) => post.id == postId)
    posts.value.splice(index, 1)
  }

  const togglePost = (postId) => {
    const post = posts.value.find((post) => post.id == postId)
    post.hidden = !post.hidden
  }

  const addComment = async (postId, comment) => {
    const addCommentMutation = useMutation(ADD_COMMENT)
    const response = await addCommentMutation.mutate({
      post_id: String(postId),
      content: comment.content
    })
    const commentId = response?.data.insert_comments.returning[0].id
    const newComment = {
      id: commentId,
      userId: comment.userId,
      content: comment.content,
      time: new Date().toISOString()
    }
    const post = posts.value.find((post) => post.id == postId)
    post.comments.unshift(newComment)
  }

  const updateComment = async (postId, newComment) => {
    const updateCommentMutation = useMutation(UPDATE_COMMENT)
    await updateCommentMutation.mutate({ id: newComment.id, comment: newComment.content })
    const post = posts.value.find((post) => post.id == postId)
    const comment = post.comments.find((comment) => comment.id == newComment.id)
    comment.content = newComment.content
  }

  const deleteComment = async (postId, commentId) => {
    const deleteCommentMutation = useMutation(DELETE_COMMENT)
    await deleteCommentMutation.mutate({ _eq: commentId })
    const post = posts.value.find((post) => post.id == postId)
    const index = post.comments.findIndex((comment) => comment.id == commentId)
    post.comments.splice(index, 1)
  }

  const getPostsByUserId = (userId) => {
    return posts.value.filter((post) => post.userId === userId)
  }

  const getPost = (postId) => {
    return posts.value.find((post) => post.id == postId)
  }

  const notHiddenPosts = computed(() => {
    return posts.value.filter((post) => !post.hidden)
  })

  return {
    notHiddenPosts,
    getPost,
    addPost,
    deletePost,
    togglePost,
    getPostsList,
    getPostsByUserId,
    addComment,
    updateComment,
    deleteComment
  }
})
