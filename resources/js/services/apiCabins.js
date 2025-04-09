// import supabase from "./supabase";

// export async function getCabins() {
//   const { data, error } = await supabase.from("cabins").select("*");

//   if (error) {
//     console.log(error);
//     throw new Error("Cabins could not founded");
//   }

//   return data;
// }

export async function getCabins() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/rooms')

    // Check if the response status is OK (status 200)
    if (!response.ok) {
      throw new Error('Failed to fetch rooms')
    }

    const data = await response.json()

    return data
  } catch (error) {
    console.log(error)
    throw new Error('Cabins could not be fetched')
  }
}
//v2

// import supabase from './supabase'

// export async function DeketeCabins() {
//   const { data, error } = await supabase.from('cabins').delete().eq('id', id)

//   if (error) {
//     console.log(error)
//     throw new Error('Cabins could not founded')
//   }

//   return data
// }

export async function DeleteRooms(id) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/rooms/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Failed to delete room')
    }

    const data = await response.json()

    return data
  } catch (error) {
    console.error(error)
    throw new Error('Room could not be deleted')
  }
}
