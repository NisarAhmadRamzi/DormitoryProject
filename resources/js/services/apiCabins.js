// export async function getCabins() {
//   try {
//     const response = await fetch('http://127.0.0.1:8000/api/rooms')

//     // Check if the response status is OK (status 200)
//     if (!response.ok) {
//       throw new Error('Failed to fetch rooms')
//     }

//     const data = await response.json()

//     return data
//   } catch (error) {
//     console.log(error)
//     throw new Error('Cabins could not be fetched')
//   }
// }
export async function getCabins({ page = 1, limit = 10 }) {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/rooms?page=${page}&limit=${limit}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch rooms')
    }

    const data = await response.json()

    return data // { data: [...], count: number }
  } catch (error) {
    console.log(error)
    throw new Error('Cabins could not be fetched')
  }
}

export async function DeleteRooms(id) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/rooms/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Failed to delete room')
    }

    return await response.json() // Ensure the response is returned
  } catch (error) {
    console.error('Deletion error:', error)
    throw new Error('Room could not be deleted')
  }
}

export async function createRoom(roomData) {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roomData),
    })

    if (!response.ok) {
      throw new Error('Failed to create room')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw new Error('Room could not be created')
  }
}

export async function editRoom(id, updatedRoom) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/rooms/${id}`, {
      method: 'PUT', // or 'PATCH', depending on your backend
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedRoom),
    })

    if (!response.ok) {
      throw new Error('Failed to update room')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw new Error('Room could not be updated')
  }
}
