import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import { login as loginApi } from '../../services/apiAuth'

export function useLogin({ onErrorReset } = {}) {
  const navigate = useNavigate()
  const { setToken } = useContext(AppContext)

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: ({ token, user }) => {
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user)) // ✅ save user
      setToken(token)

      // ✅ Navigate based on role
      if (user.role === 'admin') window.location.href = '/dashboard'
      else if (user.role === 'student')
        window.location.href = '/students-dashboard'
      else if (user.role === 'second_admin') navigate('/dashboard')
      else if (user.role === 'library_admin') navigate('/dashboard')
      else if (user.role === 'library_student') navigate('/rooms')
      else navigate('/')
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
