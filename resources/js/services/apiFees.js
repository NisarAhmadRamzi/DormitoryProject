import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/api/fees'

const jsonConfig = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
}

// Get all fees
export async function getFees() {
  try {
    const res = await axios.get(BASE_URL, { withCredentials: true })
    return res.data
  } catch (error) {
    console.error(error.response?.data || error.message)
    throw new Error(
      error.response?.data?.message || 'Fees could not be fetched'
    )
  }
}

// Delete a fee
export async function deleteFee(id) {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`, {
      withCredentials: true,
    })
    return res.status === 204 ? { success: true } : res.data
  } catch (error) {
    console.error(error.response?.data || error.message)
    throw new Error(error.response?.data?.message || 'Fee could not be deleted')
  }
}

// Create a new fee
export async function createFee(feeData) {
  try {
    const res = await axios.post(BASE_URL, feeData, jsonConfig)
    return res.data
  } catch (error) {
    console.error(error.response?.data || error.message)
    throw new Error(error.response?.data?.message || 'Fee could not be created')
  }
}

// Edit/update a fee
export async function editFee(id, updatedData) {
  try {
    const res = await axios.put(`${BASE_URL}/${id}`, updatedData, jsonConfig)
    return res.data
  } catch (error) {
    console.error(error.response?.data || error.message)
    throw new Error(error.response?.data?.message || 'Fee could not be updated')
  }
}
