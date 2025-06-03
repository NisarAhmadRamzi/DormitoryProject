import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  withCredentials: true,
})

// Add the Authorization header dynamically for each request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Get all library students
export const getAllLibraryStudents = async () => {
  const response = await apiClient.get('/library-students')
  return response.data
}

// Get a single library student by ID
export const getLibraryStudentById = async (id) => {
  const response = await apiClient.get(`/library-students/${id}`)
  return response.data
}

// Create a new library student
export const createLibraryStudent = async (data) => {
  const response = await apiClient.post('/library-students', data)
  return response.data
}

// Update an existing library student
export const editLibraryStudent = async (id, data) => {
  const response = await apiClient.put(`/library-students/${id}`, data)
  return response.data
}

// Delete a library student
export const deleteLibraryStudent = async (id) => {
  const response = await apiClient.delete(`/library-students/${id}`)
  return response.data
}
