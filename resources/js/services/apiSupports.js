import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/api/supports'

// Centralized config with Authorization
const axiosConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
})

// Get all supports
export async function getSupports() {
  try {
    const res = await axios.get(BASE_URL, axiosConfig())
    return res.data
  } catch (error) {
    console.error(error.response?.data || error.message)
    throw new Error('Supports could not be fetched')
  }
}

// Delete a support by ID
export async function deleteSupport(id) {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`, axiosConfig())
    return res.status === 204 ? { success: true } : res.data
  } catch (error) {
    console.error(error.response?.data || error.message)
    throw new Error('Support could not be deleted')
  }
}

// Create a new support
export async function createSupport(supportData) {
  try {
    const res = await axios.post(BASE_URL, supportData, axiosConfig())
    return res.data
  } catch (error) {
    console.error(error.response?.data || error.message)
    throw new Error('Support could not be created')
  }
}

// Edit/update an existing support
export async function editSupport(id, updatedData) {
  try {
    const res = await axios.put(`${BASE_URL}/${id}`, updatedData, axiosConfig())
    return res.data
  } catch (error) {
    console.error(error.response?.data || error.message)
    throw new Error('Support could not be updated')
  }
}
