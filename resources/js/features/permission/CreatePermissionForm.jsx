import { createPermission, editPermission } from '../../services/apiPermission'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import Button from '../../ui/Button'
import styled from 'styled-components'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Label = styled.label`
  font-weight: 500;
`

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 4px;
  background-color: var(--color-grey-0);
  color: var(--color-grey-700);
  transition: background-color 0.3s, color 0.3s, border 0.3s;

  &:focus {
    border-color: var(--color-brand-600);
    outline: none;
  }

  &:disabled {
    background-color: var(--color-grey-200);
    color: var(--color-grey-500);
  }
`

function CreatePermissionForm({ permissionToEdit = {}, onCloseModal }) {
  const isEditSession = Boolean(permissionToEdit?.id)
  const queryClient = useQueryClient()
  const { register, handleSubmit, reset } = useForm({
    defaultValues: isEditSession ? { name: permissionToEdit.name } : {},
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: isEditSession
      ? (data) => editPermission(permissionToEdit.id, data)
      : createPermission,
    onSettled: () => {
      queryClient.invalidateQueries(['permissions'])
      onCloseModal?.()
      reset()
    },
    onSuccess: () => {
      toast.success(
        `Permission ${isEditSession ? 'updated' : 'created'} successfully`
      )
    },
    onError: (err) => toast.error(err.message || 'Something went wrong'),
  })

  const onSubmit = (data) => {
    mutate(data)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor="name">Permission Name</Label>
      <Input
        id="name"
        {...register('name', { required: 'Permission name is required' })}
      />
      <Button type="submit" disabled={isLoading}>
        {isEditSession ? 'Update Permission' : 'Add Permission'}
      </Button>
    </Form>
  )
}

export default CreatePermissionForm