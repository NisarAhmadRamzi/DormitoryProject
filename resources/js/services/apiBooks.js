import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/api/books'

// Get all books
export async function getBooks() {
  try {
    const res = await axios.get(BASE_URL, {
      withCredentials: true,
    })
    return res.data
  } catch (error) {
    console.error(error)
    throw new Error('Books could not be fetched')
  }
}

// Get a single book by ID
export async function getBookById(id) {
  try {
    const res = await axios.get(`${BASE_URL}/${id}`, {
      withCredentials: true,
    })
    return res.data
  } catch (error) {
    console.error(error)
    throw new Error('Book could not be fetched')
  }
}

// Delete a book by ID
export async function deleteBook(id) {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`, {
      withCredentials: true,
    })
    return res.status === 204 ? { success: true } : res.data
  } catch (error) {
    console.error(error)
    throw new Error('Book could not be deleted')
  }
}

// Create a new book
export async function createBook(bookData) {
  try {
    const res = await axios.post(BASE_URL, bookData, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      withCredentials: true,
    })
    return res.data
  } catch (error) {
    console.error(error)
    throw new Error('Book could not be created')
  }
}

// Edit/update an existing book
export async function editBook(id, updatedData) {
  try {
    const res = await axios.put(`${BASE_URL}/${id}`, updatedData, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      withCredentials: true,
    })
    return res.data
  } catch (error) {
    console.error(error)
    throw new Error('Book could not be updated')
  }
}
