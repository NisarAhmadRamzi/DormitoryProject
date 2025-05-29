import axios from 'axios'

export async function login({ email, password }) {
  window.location.href = '/dashboard'
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/login', {
      email,
      password,
    })

    const token = response.data.token
    const user = response.data.user
    localStorage.setItem('user', JSON.stringify(user))
    console.log(response.data.user)
    if (!token) {
      throw new Error('No token received')
    }

    return token
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Invalid login credentials'
    )
  }
}

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
