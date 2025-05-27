import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/api/students'

const axiosConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
})

// Get students
export async function getStudents({ page = 1, limit = 10 } = {}) {
  const res = await axios.get(
    `${API_URL}?page=${page}&limit=${limit}`,
    axiosConfig()
  )
  return res.data
}

// Create student
export async function createStudent(studentData) {
  const res = await axios.post(API_URL, studentData, axiosConfig())
  return res.data
}

// Edit student
export async function editStudent(id, updatedData) {
  const res = await axios.put(`${API_URL}/${id}`, updatedData, axiosConfig())
  return res.data
}

// Delete student
export async function deleteStudent(id) {
  const res = await axios.delete(`${API_URL}/${id}`, axiosConfig())
  return res.data
}
