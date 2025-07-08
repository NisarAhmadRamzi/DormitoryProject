// import axios from 'axios'

// const API_URL = 'http://127.0.0.1:8000/api/dashboard/library-student'

// const axiosConfig = () => ({
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem('token')}`,
//     Accept: 'application/json',
//   },
//   withCredentials: true,
// })

// export async function getLibraryStudentDashboardStats() {
//   const res = await axios.get(API_URL, axiosConfig())
//   return res.data
// }

import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/api/dashboard/library-student'

const axiosConfig = () => {
  const token = localStorage.getItem('token') || ''
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
    // withCredentials: true, // disable if not needed
  }
}

export async function getLibraryStudentDashboardStats() {
  try {
    const res = await axios.get(API_URL, axiosConfig())
    return res.data
  } catch (error) {
    console.error(
      'Failed to fetch library student dashboard:',
      error.response?.data || error.message
    )
    throw error
  }
}
