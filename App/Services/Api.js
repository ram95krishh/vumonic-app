// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import { Platform } from 'react-native'
import DeviceInfo from 'react-native-device-info'


const create = (baseURL = '') => {
  const api = apisauce.create({
    baseURL: 'https://cryptic-fjord-38456.herokuapp.com/',
    headers: {
      'Cache-Control': 'no-cache',
      'device_type': Platform.OS,
      'version': DeviceInfo.getVersion()
    },
    timeout: 30000
  })

  const saveUser = (user) => api.post('users/onboard', user)

  const getUserByEmail = (email) => api.get(`users/get_by_email/${email}`)

  const getFeed = (payload) => api.post(`posts/get_feed`, payload)

  const updateLikes = (payload) => api.post('posts/update_likes_by_id', payload)

  const getCommentsById = (payload) => api.post(`posts/get_comments_by_id`, payload)

  const getLikesById = (payload) => api.post('posts/get_likes_by_id', payload)

  const addComment = payload => api.post('posts/add_comment', payload)

  return {
    getFeed,
    saveUser,
    getUserByEmail,
    updateLikes,
    getCommentsById,
    addComment,
    getLikesById
  }
}

export default {
  create
}
