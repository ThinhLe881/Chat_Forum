// TODO: change from .then/catch to async/await
import axios from 'axios'

export default {
  // Get all posts
  getPosts (callback) {
    axios.get('http://localhost:8000/thread', {
      headers: {
        'auth-token': localStorage?.token
      }
    }).then((res) => {
      const mes = {
        success: true,
        // array of posts, creator is in 'id' form
        // need to convert to username (use api in 'user.js')
        posts: res.data
      }
      return callback(mes)
    }).catch((err) => {
      const mes = {
        success: false,
        msg: err.response.data
      }
      return callback(mes)
    })
  },

  // Get post by id
  getPostById (postId, callback) {
    axios.get(`http://localhost:8000/thread/${postId}`, {
      headers: {
        'auth-token': localStorage?.token
      }
    }).then((res) => {
      const mes = {
        success: true,
        post: res.data
      }
      return callback(mes)
    }).catch((err) => {
      const mes = {
        success: false,
        msg: err.response.data
      }
      return callback(mes)
    })
  },

  // Get user's posts
  getUserPosts (callback) {
    axios.get('http://localhost:8000/thread/user', {
      headers: {
        'auth-token': localStorage?.token
      }
    }).then((res) => {
      const mes = {
        success: true,
        posts: res.data
      }
      return callback(mes)
    }).catch((err) => {
      const mes = {
        success: false,
        msg: err.response.data
      }
      return callback(mes)
    })
  },

  // Get comments from a specific post or parent comment
  getComments (parentId, callback) {
    axios.get(`http://localhost:8000/thread/comment/${parentId}`, {
      headers: {
        'auth-token': localStorage?.token
      }
    }).then((res) => {
      const mes = {
        success: true,
        comments: res.data
      }
      return callback(mes)
    }).catch((err) => {
      const mes = {
        success: false,
        msg: err.response.data
      }
      return callback(mes)
    })
  },

  // Add new post
  addPost (newPost, callback) {
    axios.post('http://localhost:8000/thread', newPost, {
      headers: {
        'auth-token': localStorage?.token
      }
    })
      .then(res => {
        const mes = {
          success: true,
          post: res.data.thread,
          msg: res.data.msg
        }
        return callback(mes)
      })
      .catch(err => {
        const mes = {
          success: false,
          msg: err.response.data
        }
        return callback(mes)
      })
  },

  // Add new comment or child comment
  addComment (newComment, parentId, callback) {
    axios.post(`http://localhost:8000/thread/${parentId}`, newComment, {
      headers: {
        'auth-token': localStorage?.token
      }
    })
      .then(res => {
        const mes = {
          success: true,
          comment: res.data.thread,
          msg: res.data.msg
        }
        return callback(mes)
      })
      .catch(err => {
        const mes = {
          success: false,
          msg: err.response.data
        }
        return callback(mes)
      })
  },

  // Update post or comment
  updateThread (updatedThread, parentId, callback) {
    axios.patch(`http://localhost:8000/thread/${parentId}`, updatedThread, {
      headers: {
        'auth-token': localStorage?.token
      }
    })
      .then(res => {
        const mes = {
          success: true,
          thread: res.data.thread,
          msg: res.data.msg
        }
        return callback(mes)
      })
      .catch(err => {
        const mes = {
          success: false,
          msg: err.response.data
        }
        return callback(mes)
      })
  },

  // Update votes for post or comment
  updateVotes (updatedThread, parentId, callback) {
    axios.patch(`http://localhost:8000/thread/vote/${parentId}`, updatedThread, {
      headers: {
        'auth-token': localStorage?.token
      }
    })
      .then(res => {
        const mes = {
          success: true,
          thread: res.data.thread,
          msg: res.data.msg
        }
        return callback(mes)
      })
      .catch(err => {
        const mes = {
          success: false,
          msg: err.response.data
        }
        return callback(mes)
      })
  },

  // Delete post or comment
  deleteThread (threadId, callback) {
    axios.delete(`http://localhost:8000/thread/${threadId}`, {
      headers: {
        'auth-token': localStorage?.token
      }
    })
      .then(res => {
        const mes = {
          success: true,
          msg: res.data
        }
        return callback(mes)
      })
      .catch(err => {
        const mes = {
          success: false,
          msg: err.response.data
        }
        return callback(mes)
      })
  }
}
