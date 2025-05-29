// import axios from 'axios'

// export async function login({ email, password }) {
//   try {
//     const response = await axios.post('http://127.0.0.1:8000/api/login', {
//       email,
//       password,
//     })

//     const token = response.data.token
//     if (!token) {
//       throw new Error('No token received')
//     }

//     return token
//   } catch (error) {
//     throw new Error(
//       error.response?.data?.message || 'Invalid login credentials'
//     )
//   }
// }

// export async function logout() {
//   const token = localStorage.getItem('token')
//   if (!token) throw new Error('No token found')

//   try {
//     await axios.post(
//       'http://127.0.0.1:8000/api/logout',
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     )

//     localStorage.removeItem('token')
//   } catch (error) {
//     throw new Error(error.response?.data?.message || 'Logout failed')
//   }
// }

import axios from 'axios'

// export async function login({ email, password }) {
//   try {
//     const response = await axios.post('http://127.0.0.1:8000/api/login', {
//       email,
//       password,
//     })

//     const token = response.data.token
//     const user = response.data.user // Assuming the backend returns user info with token
//     console.log(user)

//     if (!token) {
//       throw new Error('No token received')
//     }

//     // Save token and user info to localStorage
//     localStorage.setItem('token', token)
//     localStorage.setItem('user', JSON.stringify(user)) // Save user as a JSON string

//     return { token, user } // Return both token and user info for use in the frontend
//   } catch (error) {
//     throw new Error(
//       error.response?.data?.message || 'Invalid login credentials'
//     )
//   }
// }
export async function login({ email, password }) {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/login', {
      email,
      password,
    })

    // Assuming the backend returns { token, user }
    const { token, user } = response.data
    if (!token) {
      throw new Error('No token received')
    }

    // Save token and user data to localStorage
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))

    return { token, user } // Returning both so context can use them
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Invalid login credentials'
    )
  }
}

// export async function logout() {
//   const token = localStorage.getItem('token')
//   if (!token) throw new Error('No token found')

//   try {
//     await axios.post(
//       'http://127.0.0.1:8000/api/logout',
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     )

//     // Clear localStorage on logout
//     localStorage.removeItem('token')
//     localStorage.removeItem('user')
//   } catch (error) {
//     throw new Error(error.response?.data?.message || 'Logout failed')
//   }
// }

export async function logout() {
  const token = localStorage.getItem('token')
  if (!token) {
    // Clear any stale data and return
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return
  }

  try {
    await axios.post(
      'http://127.0.0.1:8000/api/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  } catch (error) {
    if (error.response?.status === 401) {
      // Token was invalid or expired, just clear local data
      console.warn('Token invalid or expired during logout')
    } else {
      throw new Error(error.response?.data?.message || 'Logout failed')
    }
  } finally {
    // Always clear localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
}
