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
