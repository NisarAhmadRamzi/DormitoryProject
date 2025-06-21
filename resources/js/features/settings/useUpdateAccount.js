import { useMutation, useQueryClient } from '@tanstack/react-query'

import toast from 'react-hot-toast'
import { updateProfile as apiUpdateProfile } from '../../services/apiProfile'

// Import your actual API update function here:

export function useUpdateAccount() {
  const queryClient = useQueryClient()

  const { mutate: updateProfile, isLoading: isUpdating } = useMutation({
    mutationFn: apiUpdateProfile, // use your imported API function here
    onSuccess: () => {
      toast.success('Account successfully updated')
      queryClient.invalidateQueries({
        queryKey: ['account'], // fix typo here too: queryKey, not querykey
      })
    },
    onError: (err) => toast.error(err.message || 'Failed to update account'),
  })

  return { isUpdating, updateProfile }
}
