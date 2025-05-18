// // apiUsers.js

// import axios from 'axios'
// const BASE_URL = 'http://127.0.0.1:8000/api/users'
// const UPDATE_URL = 'http://127.0.0.1:8000/api/users/updateUsers'

// export async function getUsers() {
//   try {
//     const res = await fetch(BASE_URL)
//     if (!res.ok) throw new Error('Failed to fetch users')
//     const data = await res.json()
//     return data
//   } catch (error) {
//     console.error(error)
//     throw new Error('Users could not be fetched')
//   }
// }

// export async function deleteUser(id) {
//   try {
//     const res = await axios.delete(`${BASE_URL}/${id}`, {
//       withCredentials: true, // Important for Sanctum
//     })
//     return res.data
//   } catch (error) {
//     console.error(error)
//     throw new Error(
//       error.response?.data?.message || 'User could not be deleted'
//     )
//   }
// }

// export async function createUser(formData) {
//   try {
//     const res = await axios.post(BASE_URL, formData, {
//       headers: {
//         Accept: 'application/json',
//       },
//       withCredentials: true, // For Sanctum
//     })
//     return res.data
//   } catch (error) {
//     console.error(error)
//     throw new Error(
//       error.response?.data?.message || 'User could not be created'
//     )
//   }
// }

// export async function editUser(id, updatedData) {
//   try {
//     const res = await axios.post(`${UPDATE_URL}/${id}`, updatedData, {
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//       },
//       withCredentials: true, // For Sanctum
//     })
//     return res.data
//   } catch (error) {
//     console.error(error)
//     throw new Error(
//       error.response?.data?.message || 'User could not be updated'
//     )
//   }
// }

import axios from 'axios'
const BASE_URL = 'http://127.0.0.1:8000/api/users'
const UPDATE_URL = 'http://127.0.0.1:8000/api/users/updateUsers'

export async function getUsers() {
  try {
    const res = await fetch(BASE_URL)
    if (!res.ok) throw new Error('Failed to fetch users')
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
    throw new Error('Users could not be fetched')
  }
}

export async function deleteUser(id) {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`, {
      withCredentials: true,
    })
    return res.data
  } catch (error) {
    console.error(error)
    throw new Error(
      error.response?.data?.message || 'User could not be deleted'
    )
  }
}

export async function createUser(formData) {
  try {
    const res = await axios.post(BASE_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // must send multipart for file upload
        Accept: 'application/json',
      },
      withCredentials: true,
    })
    return res.data
  } catch (error) {
    console.error(error)
    throw new Error(
      error.response?.data?.message || 'User could not be created'
    )
  }
}

export async function editUser(id, formData) {
  try {
    const res = await axios.post(`${UPDATE_URL}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // must send multipart for file upload
        Accept: 'application/json',
      },
      withCredentials: true,
    })
    return res.data
  } catch (error) {
    console.error(error)
    throw new Error(
      error.response?.data?.message || 'User could not be updated'
    )
  }
}
