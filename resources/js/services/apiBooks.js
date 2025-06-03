import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/api/books'

// Centralized axios config with Authorization
const axiosConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
})

// Get all books
export async function getBooks() {
  try {
    const res = await axios.get(BASE_URL, axiosConfig())
    return res.data
  } catch (error) {
    console.error(error.response?.data || error.message)
    throw new Error('Books could not be fetched')
  }
}

// Get a single book by ID
export async function getBookById(id) {
  try {
    const res = await axios.get(`${BASE_URL}/${id}`, axiosConfig())
    return res.data
  } catch (error) {
    console.error(error.response?.data || error.message)
    throw new Error('Book could not be fetched')
  }
}

// Delete a book by ID
export async function deleteBook(id) {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`, axiosConfig())
    return res.status === 204 ? { success: true } : res.data
  } catch (error) {
    console.error(error.response?.data || error.message)
    throw new Error('Book could not be deleted')
  }
}

// Create a new book
export async function createBook(bookData) {
  try {
    const res = await axios.post(BASE_URL, bookData, axiosConfig())
    return res.data
  } catch (error) {
    console.error(error.response?.data || error.message)
    throw new Error('Book could not be created')
  }
}

// Edit/update an existing book
export async function editBook(id, updatedData) {
  try {
    const res = await axios.put(`${BASE_URL}/${id}`, updatedData, axiosConfig())
    return res.data
  } catch (error) {
    console.error(error.response?.data || error.message)
    throw new Error('Book could not be updated')
  }
}
