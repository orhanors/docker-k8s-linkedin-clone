import axios from "axios"
import { getLocalStorage } from "../helpers/localStorage"

const { REACT_APP_BE_URL } = process.env
const userId = getLocalStorage("user")?._id
const username = getLocalStorage("user")?.username

const config = {
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
}

export const addLike = async (postId, userId) => {
  const likeBody = { userId }
  try {
    let response = await axios.post(
      `${process.env.REACT_APP_BE_URL}/posts/${postId}/likes`,
      likeBody,
      config
    )
    if (!response.errors) {
      return response.data
    } else {
      console.log(response.data)
      //   return response.data
    }
  } catch (error) {
    console.log("Error in adding like", error)
    console.log("error response data", error.response.data)
    return error.response.data
  }
}

export const deleteLike = async (postId, likeId) => {
  try {
    const response = await axios.delete(
      `${REACT_APP_BE_URL}/posts/${postId}/likes/${likeId}`,
      config
    )
    if (!response.errors) {
      return response.data
    } else {
      console.log(response.data)
    }
  } catch (error) {
    console.log("error deleting the like", error.response.data)
  }
}

export const addPost = async (data) => {
  const newPost = { ...data, user: userId, username: username }
  try {
    const response = await axios.post(
      `${REACT_APP_BE_URL}/posts`,
      newPost,
      config
    )

    if (!response.errors) {
      return response.data
    } else {
      console.log(response.data)
      //   return response.data
    }
  } catch (error) {
    console.log("Error in adding posting", error)
    console.log("error response data", error.response.data)
    return error.response.data
  }
}

export const fetchPosts = async () => {
  try {
    const response = await axios.get(`${REACT_APP_BE_URL}/posts`)
    if (response.data) {
      return response.data
    } else {
      console.log("posts not found", response.data)
    }
  } catch (error) {}
}

export const editPost = async (post, id) => {
  try {
    const modifiedPost = { ...post, user: userId, username: username }
    console.log("modifiedPost", modifiedPost)
    console.log("id", id)

    let response = await axios.put(
      `${REACT_APP_BE_URL}/posts/${id}`,
      modifiedPost,
      config
    )
    if (!response.errors) {
      return response.data
    } else {
      console.log(response.data)
    }
  } catch (error) {
    console.log("error editing the post", error.response.data)
  }
}

export const deletePost = async (id) => {
  try {
    const response = await axios.delete(
      `${REACT_APP_BE_URL}/posts/${id}`,
      config
    )
    if (!response.errors) {
      return response.data
    } else {
      console.log(response.data)
    }
  } catch (error) {
    console.log("error editing the post", error.response.data)
  }
}

export const postImage = async (data, postId) => {
  try {
    const response = await axios.post(
      `${REACT_APP_BE_URL}/posts/${postId}/picture`,
      data,
      config
    )
    if (!response.errors) {
      return response.data
    } else {
      console.log(response.data)
    }
  } catch (error) {}
}
