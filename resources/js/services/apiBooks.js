const BASE_URL = 'http://127.0.0.1:8000/api/books'

export async function getBooks() {
  try {
    const res = await fetch(BASE_URL)
    if (!res.ok) throw new Error('Failed to fetch books')
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
    throw new Error('Books could not be fetched')
  }
}

export async function deleteBook(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    })

    if (!res.ok) throw new Error('Failed to delete book')

    if (res.status === 204) return { success: true }

    const data = await res.json().catch(() => null)
    return data || { success: true }
  } catch (error) {
    console.error(error)
    throw new Error('Book could not be deleted')
  }
}

export async function createBook(bookData) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookData),
    })
    if (!res.ok) throw new Error('Failed to create book')
    return await res.json()
  } catch (error) {
    console.error(error)
    throw new Error('Book could not be created')
  }
}

export async function editBook(id, updatedData) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    })
    if (!res.ok) throw new Error('Failed to update book')
    return await res.json()
  } catch (error) {
    console.error(error)
    throw new Error('Book could not be updated')
  }
}

export async function getBookById(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`)
    if (!res.ok) throw new Error('Failed to fetch book')
    return await res.json()
  } catch (error) {
    console.error(error)
    throw new Error('Book could not be fetched')
  }
}
