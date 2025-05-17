// services/apiLibraryStudents.js

import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  withCredentials: true, // Laravel Sanctum requirement
})

export const getAllLibraryStudents = async () => {
  const response = await apiClient.get('/library-students')
  return response.data
}

export const getLibraryStudentById = async (id) => {
  const response = await apiClient.get(`/library-students/${id}`)
  return response.data
}

export const createLibraryStudent = async (data) => {
  const response = await apiClient.post('/library-students', data)
  return response.data
}

export const editLibraryStudent = async (id, data) => {
  const response = await apiClient.put(`/library-students/${id}`, data)
  return response.data
}

export const deleteLibraryStudent = async (id) => {
  const response = await apiClient.delete(`/library-students/${id}`)
  return response.data
}
