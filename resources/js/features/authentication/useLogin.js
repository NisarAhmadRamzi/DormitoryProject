import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast' // Make sure toast is imported if you're using it
import { useNavigate } from 'react-router-dom'
import { login as loginApi } from '../../services/apiAuth'

export function useLogin() {
  const navigate = useNavigate()

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      toast.success('Login successful!')
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
