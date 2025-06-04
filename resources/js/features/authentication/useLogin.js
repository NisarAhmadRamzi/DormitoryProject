import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext' // Make sure the path is correct
import { login as loginApi } from '../../services/apiAuth'

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
