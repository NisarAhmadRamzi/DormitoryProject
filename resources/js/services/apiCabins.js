import apiClient from './apiClient'

export async function getCabins({ page = 1, limit = 10 } = {}) {
  try {
    const response = await apiClient.get('/rooms', {
      params: { page, limit },
    })
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Cabins could not be fetched')
  }
}

export async function deleteRoom(id) {
  try {
    const response = await apiClient.delete(`/rooms/${id}`)
    return response.data
  } catch (error) {
    console.error('Deletion error:', error)
    throw new Error('Room could not be deleted')
  }
}

export async function createRoom(roomData) {
  try {
    const response = await apiClient.post('/rooms', roomData)
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Room could not be created')
  }
}

export async function editRoom(id, updatedRoom) {
  try {
    const response = await apiClient.put(`/rooms/${id}`, updatedRoom)
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Room could not be updated')
  }
}
