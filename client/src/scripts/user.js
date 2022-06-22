// TODO: change from .then/catch to async/await
import axios from 'axios'

export default {
  register (newUser, callback) {
    axios.post('http://localhost:8000/user/register', newUser)
      .then(res => {
        const mes = {
          auth: true,
          msg: res.data
        }
        return callback(mes)
      })
      .catch(err => {
        const mes = {
          auth: false,
          msg: err.response.data
        }
        return callback(mes)
      })
  },

  login (user, callback) {
    axios.post('http://localhost:8000/user/login', user)
      .then(res => {
        localStorage.token = res.data.token
        localStorage.username = res.data.username
        localStorage.email = res.data.email
        const mes = {
          auth: true,
          msg: res.data.msg
        }
        this.loginStatus(true)
        return callback(mes)
      })
      .catch(err => {
        const mes = {
          auth: false,
          msg: err.response.data
        }
        this.loginStatus(false)
        return callback(mes)
      })
  },

  loggedIn () {
    return !!localStorage.token
  },

  logout (callback) {
    localStorage.clear()
    this.loginStatus(false)
    return callback()
  },

  // Update loginStatus
  loginStatus () {},

  // Get user's stat
  getStat (callback) {
    axios.get('http://localhost:8000/user/stat', {
      headers: {
        'auth-token': localStorage?.token
      }
    }).then((res) => {
      const mes = {
        success: true,
        stat: res.data
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

  // Get liked posts
  getLikedPosts (callback) {
    axios.get('http://localhost:8000/user/liked', {
      headers: {
        'auth-token': localStorage?.token
      }
    }).then((res) => {
      const mes = {
        success: true,
        stat: res.data
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

  getUsername () {
    return localStorage?.username
  },

  getEmail () {
    return localStorage?.email
  },

  // Get other username by id
  getUsernameById (userId, callback) {
    axios.get(`http://localhost:8000/user/${userId}`, {
      headers: {
        'auth-token': localStorage?.token
      }
    }).then((res) => {
      const mes = {
        success: true,
        username: res.data.username
      }
      return callback(mes)
    }).catch((err) => {
      const mes = {
        success: false,
        msg: err.response.data
      }
      return callback(mes)
    })
  }
}
