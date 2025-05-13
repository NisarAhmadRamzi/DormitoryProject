import { logout as logoutApi } from '../../services/apiAuth'
import { toast } from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

export function useLogout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.clear()
      toast.success('Logout successful')
      navigate('/login', { replace: true })
    },
    onError: (err) => {
      console.error('Logout failed:', err)
      toast.error(err.message || 'Logout failed')
    },
  })

  return { logout, isLoading }
}
