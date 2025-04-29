const BASE_URL = 'http://127.0.0.1:8000/api/borrowed-books'

export async function getBorrowedBooks() {
  try {
    const res = await fetch(BASE_URL)
    if (!res.ok) throw new Error('Failed to fetch borrowed books')
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
    throw new Error('Borrowed books could not be fetched')
  }
}

export async function deleteBorrowedBook(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    })

    if (!res.ok) throw new Error('Failed to delete borrowed book')

    if (res.status === 204) return { success: true }

    const data = await res.json().catch(() => null)
    return data || { success: true }
  } catch (error) {
    console.error(error)
    throw new Error('Borrowed book could not be deleted')
  }
}

export async function createBorrowedBook(borrowedBookData) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(borrowedBookData),
    })
    if (!res.ok) throw new Error('Failed to create borrowed book')
    return await res.json()
  } catch (error) {
    console.error(error)
    throw new Error('Borrowed book could not be created')
  }
}

export async function editBorrowedBook(id, updatedData) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    })
    if (!res.ok) throw new Error('Failed to update borrowed book')
    return await res.json()
  } catch (error) {
    console.error(error)
    throw new Error('Borrowed book could not be updated')
  }
}
