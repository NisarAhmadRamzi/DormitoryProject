import {
  deleteProfilePhoto,
  updatePassword,
  updateProfile,
} from '../../services/apiProfile'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import toast from 'react-hot-toast'

export function useUpdateAccount() {
  const queryClient = useQueryClient()

  const { mutate: updateProfileMutate, isLoading: isUpdating } = useMutation(
    updateProfile,
    {
      onSuccess: () => {
        toast.success('Account successfully updated')
        queryClient.invalidateQueries(['account'])
      },
      onError: (err) => toast.error(err.message || 'Failed to update account'),
    }
  )

  const { mutate: deleteProfilePhotoMutate, isLoading: isDeletingPhoto } =
    useMutation(deleteProfilePhoto, {
      onSuccess: () => {
        toast.success('Profile photo deleted')
        queryClient.invalidateQueries(['account'])
      },
      onError: () => toast.error('Failed to delete profile photo'),
    })

  const { mutate: updatePasswordMutate, isLoading: isUpdatingPassword } =
    useMutation(updatePassword, {
      onSuccess: () => {
        toast.success('Password updated successfully')
      },
      onError: (err) => toast.error(err.message || 'Failed to update password'),
    })

  return {
    isUpdating,
    updateProfile: updateProfileMutate,
    isDeletingPhoto,
    deleteProfilePhoto: deleteProfilePhotoMutate,
    isUpdatingPassword,
    updatePassword: updatePasswordMutate,
  }
}
