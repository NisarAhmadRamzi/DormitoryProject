import { login as loginApi } from '../../services/apiAuths'
import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

export function useLogins() {
  const navigate = useNavigate()
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      console.log(user)
      navigate('/dashboard')
    },
    onError: (err) => {
      console.log('ERROR', err)
      toast.error('Provided email or password are incorrect')
    },
  })
  return { login, isLoading }
}
