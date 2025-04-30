const BASE_URL = 'http://127.0.0.1:8000/api/library-students'

// GET all library students
export async function getLibraryStudents() {
  try {
    const res = await fetch(BASE_URL)
    if (!res.ok) throw new Error('Failed to fetch library students')
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
    throw new Error('Library students could not be fetched')
  }
}

// DELETE a library student by ID
export async function deleteLibraryStudent(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    })

    if (!res.ok) throw new Error('Failed to delete library student')

    if (res.status === 204) return { success: true }

    const data = await res.json().catch(() => null)
    return data || { success: true }
  } catch (error) {
    console.error(error)
    throw new Error('Library student could not be deleted')
  }
}

// POST create new library student
export async function createLibraryStudent(studentData) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData),
    })
    if (!res.ok) throw new Error('Failed to create library student')
    return await res.json()
  } catch (error) {
    console.error(error)
    throw new Error('Library student could not be created')
  }
}

// PUT update existing library student
export async function editLibraryStudent(id, updatedData) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    })
    if (!res.ok) throw new Error('Failed to update library student')
    return await res.json()
  } catch (error) {
    console.error(error)
    throw new Error('Library student could not be updated')
  }
}
