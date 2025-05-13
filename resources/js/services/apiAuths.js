// import supabase from './supabase'

// export async function login({ email, password }) {
//   const { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   })
//   if (error) throw new Error(error.message)
//   console.log(data)
//   return data
// }

// export async function logout() {
//   const { error } = await supabase.auth.sighnOut()
//   if (error) throw new Error(error.message)
// }

//v2

import supabase from './supabase'

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw new Error(error.message)
  return data
}

export async function logout() {
  const { error } = await supabase.auth.signOut() // ✅ Fixed typo here
  if (error) throw new Error(error.message)
}
