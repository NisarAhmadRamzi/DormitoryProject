// import { login as loginApi } from '../../services/apiAuth'
// import { toast } from 'react-hot-toast' // Make sure toast is imported if you're using it
// import { useMutation } from '@tanstack/react-query'
// import { useNavigate } from 'react-router-dom'

// export function useLogin() {
//   const navigate = useNavigate()

//   const { mutate: login, isLoading } = useMutation({
//     mutationFn: ({ email, password }) => loginApi({ email, password }),

//     // onSuccess: (token) => {
//     //   localStorage.setItem('token', token)
//     //   toast.success('Login successful!')
//     //   navigate('/dashboard')
//     // },
//     onSuccess: (token) => {
//       localStorage.setItem('token', token)
//       setToken(token) // <-- this updates AppContext immediately
//       toast.success('Login successful!')
//       navigate('/dashboard')
//     },
//     onError: (err) => {
//       console.log('ERROR', err)
//       toast.error('Provided email or password are incorrect')
//     },
//   })

//   return { login, isLoading }
// }

import { AppContext } from '../../context/AppContext' // Make sure the path is correct
import { login as loginApi } from '../../services/apiAuth'
import { toast } from 'react-hot-toast'
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

export function useLogin() {
  const navigate = useNavigate()
  const { setToken } = useContext(AppContext) // ✅ Access setToken here

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (token) => {
      localStorage.setItem('token', token)
      setToken(token) // ✅ Update AppContext
      toast.success('Login successful!')
      navigate('/dashboard')
    },

    onError: (err) => {
      console.log('ERROR', err)
      toast.error('Provided email or password are incorrect')
    },
  })

  return { login, isLoading }
}
