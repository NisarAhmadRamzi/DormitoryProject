// import axios from 'axios'

// const API_URL = 'http://127.0.0.1:8000/api/profile'
// const BASE_IMAGE_URL = 'http://127.0.0.1:8000/' // Laravel public folder

// // Auth header config
// const axiosConfig = () => ({
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem('token')}`,
//     Accept: 'application/json',
//   },
//   withCredentials: true,
// })

// // GET profile info
// export async function getProfile() {
//   const res = await axios.get(API_URL, axiosConfig())

//   // Add full URL for the profile photo
//   const profile = res.data

//   return {
//     ...profile,
//     photo_url: profile.profile ? `${BASE_IMAGE_URL}${profile.profile}` : null,
//   }
// }

import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/api/profile'
const BASE_IMAGE_URL = 'http://127.0.0.1:8000/' // Laravel public folder

// Auth header config
const axiosConfig = (isMultipart = false) => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    Accept: 'application/json',
    ...(isMultipart ? {} : { 'Content-Type': 'application/json' }),
  },
  withCredentials: true,
})

// GET profile info
export async function getProfile() {
  const res = await axios.get(API_URL, axiosConfig())
  const profile = res.data
  return {
    ...profile,
    photo_url: profile.profile ? `${BASE_IMAGE_URL}${profile.profile}` : null,
  }
}

// UPDATE profile info (name, email, optionally profile image)
// formData should be either JSON or FormData (for file upload)
export async function updateProfile(data) {
  // Check if data is FormData (for file uploads)
  const isMultipart = data instanceof FormData
  const res = await axios.post(API_URL, data, axiosConfig(isMultipart))
  const profile = res.data
  return {
    ...profile,
    photo_url: profile.profile ? `${BASE_IMAGE_URL}${profile.profile}` : null,
  }
}
