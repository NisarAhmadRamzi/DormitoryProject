const BASE_URL = 'http://127.0.0.1:8000/api/users'

export async function getUsers() {
  try {
    const res = await fetch(BASE_URL)
    if (!res.ok) throw new Error('Failed to fetch users')
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
    throw new Error('Users could not be fetched')
  }
}

export async function deleteUser(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    })

    if (!res.ok) throw new Error('Failed to delete user')

    if (res.status === 204) return { success: true }

    const data = await res.json().catch(() => null)
    return data || { success: true }
  } catch (error) {
    console.error(error)
    throw new Error('User could not be deleted')
  }
}

export async function createUser(userData) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
    if (!res.ok) throw new Error('Failed to create user')
    return await res.json()
  } catch (error) {
    console.error(error)
    throw new Error('User could not be created')
  }
}

export async function editUser(id, updatedData) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    })
    if (!res.ok) throw new Error('Failed to update user')
    return await res.json()
  } catch (error) {
    console.error(error)
    throw new Error('User could not be updated')
  }
}
