import { useQuery } from '@tanstack/react-query'
import { getProfile } from '../../services/apiProfile'

export function useAccount() {
  const {
    isLoading,
    error,
    data: account,
  } = useQuery({
    queryKey: ['account'],
    queryFn: getProfile,
  })
  return { isLoading, error, account }
}
