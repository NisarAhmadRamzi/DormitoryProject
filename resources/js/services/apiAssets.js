import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/api/assets'

// Helper to create axios config based on data type
const axiosConfig = (isFormData = false) => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    // Only set Content-Type if NOT form data; let browser set boundary for multipart/form-data
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    Accept: 'application/json',
  },
  // Include credentials if you are using cookie-based auth (Sanctum)
  // If using Bearer token only, you can omit this or keep true if backend expects it
  withCredentials: true,
})

// Get assets with pagination
export async function getAssets({ page = 1, limit = 10 } = {}) {
  const res = await axios.get(
    `${API_URL}?page=${page}&limit=${limit}`,
    axiosConfig()
  )
  return res.data
}

// Create asset - supports JSON or FormData
export async function createAsset(assetData) {
  const isFormData = assetData instanceof FormData
  const res = await axios.post(API_URL, assetData, axiosConfig(isFormData))
  return res.data
}

// Edit asset - supports JSON or FormData
export async function editAsset(id, updatedData) {
  const isFormData = updatedData instanceof FormData
  const res = await axios.put(
    `${API_URL}/${id}`,
    updatedData,
    axiosConfig(isFormData)
  )
  return res.data
}

// Delete asset
export async function deleteAsset(id) {
  const res = await axios.delete(`${API_URL}/${id}`, axiosConfig())
  return res.data
}
