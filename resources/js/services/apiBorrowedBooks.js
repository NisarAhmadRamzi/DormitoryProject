import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/api/borrowed-books'

// Helper function to generate the config with Authorization header
const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
})

// Get all borrowed books
export async function getBorrowedBooks() {
  try {
    const res = await axios.get(BASE_URL, authConfig())
    return res.data
  } catch (error) {
    console.error(error.response?.data || error.message)
    throw new Error('Borrowed books could not be fetched')
  }
}

// Delete a borrowed book by ID
export async function deleteBorrowedBook(id) {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`, authConfig())
    return res.status === 204 ? { success: true } : res.data
  } catch (error) {
    console.error(error.response?.data || error.message)
    throw new Error('Borrowed book could not be deleted')
  }
}

// Create a new borrowed book entry
export async function createBorrowedBook(borrowedBookData) {
  try {
    const res = await axios.post(BASE_URL, borrowedBookData, authConfig())
    return res.data
  } catch (error) {
    console.error(
      'Create borrowed book error:',
      error.response?.data || error.message
    )
    throw new Error(
      error.response?.data?.message || 'Borrowed book could not be created'
    )
  }
}

// Update an existing borrowed book entry
export async function editBorrowedBook(id, updatedData) {
  try {
    const res = await axios.put(`${BASE_URL}/${id}`, updatedData, authConfig())
    return res.data
  } catch (error) {
    console.error(
      'Edit borrowed book error:',
      error.response?.data || error.message
    )
    throw new Error(
      error.response?.data?.message || 'Borrowed book could not be updated'
    )
  }
}
