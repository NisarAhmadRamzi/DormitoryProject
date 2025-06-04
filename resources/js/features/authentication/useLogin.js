import { AppContext } from '../../context/AppContext'
import { login as loginApi } from '../../services/apiAuth'
import { toast } from 'react-hot-toast'
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

export function useLogin({ onErrorReset } = {}) {
  const navigate = useNavigate()
  const { setToken } = useContext(AppContext)

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (token) => {
      localStorage.setItem('token', token)
      setToken(token)
      localStorage.setItem('loginSuccess', 'true')
      window.location.href = '/dashboard'
    },
    onError: (err) => {
      console.log('ERROR', err)
      toast.error('Provided email or password are incorrect')
    },
    onSettled: () => {
      // reset input fields on error or success if you want
      if (onErrorReset) onErrorReset()
    },
  })

  return { login, isLoading }
}
