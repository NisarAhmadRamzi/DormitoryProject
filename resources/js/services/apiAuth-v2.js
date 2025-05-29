import axios from 'axios'

export async function login({ email, password }) {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/login', {
      email,
      password,
    })

    const token = response.data.token
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
  if (!token) throw new Error('No token found')

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

    localStorage.removeItem('token')
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Logout failed')
  }
}
