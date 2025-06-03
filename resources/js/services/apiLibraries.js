import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/api/libraries'

const axiosConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
})

// Get students
export async function getLibraries({ page = 1, limit = 10 } = {}) {
  const res = await axios.get(
    `${API_URL}?page=${page}&limit=${limit}`,
    axiosConfig()
  )
  return res.data
}

// Create student
export async function createLibrary(libraryData) {
  const res = await axios.post(API_URL, libraryData, axiosConfig())
  return res.data
}

// Edit student
export async function editLibrary(id, updatedData) {
  const res = await axios.put(`${API_URL}/${id}`, updatedData, axiosConfig())
  return res.data
}

// Delete student
export async function deleteLibrary(id) {
  const res = await axios.delete(`${API_URL}/${id}`, axiosConfig())
  return res.data
}
