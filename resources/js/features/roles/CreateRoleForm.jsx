import { createRole, editRole } from '../../services/apiRoles'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import Button from '../../ui/Button'
import styled from 'styled-components'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
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
`

function CreateRoleForm({ roleToEdit = {}, onCloseModal }) {
  const isEditSession = Boolean(roleToEdit?.id)
  const queryClient = useQueryClient()
  const { register, handleSubmit, reset } = useForm({
    defaultValues: isEditSession ? { name: roleToEdit.name } : {},
  })

  useEffect(() => {
    if (isEditSession) {
      reset({ name: roleToEdit.name })
    }
  }, [roleToEdit, reset, isEditSession])

  const { mutate, isLoading } = useMutation({
    mutationFn: isEditSession
      ? (data) => editRole(roleToEdit.id, data) // Edit existing role
      : createRole, // Create new role
    onSuccess: () => {
      toast.success(
        `Role ${isEditSession ? 'updated' : 'created'} successfully`
      )
      queryClient.invalidateQueries(['roles'])
      onCloseModal?.()
      reset()
    },
    onError: (err) => toast.error(err.message || 'Something went wrong'),
  })

  const onSubmit = (data) => {
    // Ensure the data aligns with the API's expectations
    mutate(data)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor="name">Role Name</Label>
      <Input
        id="name"
        {...register('name', { required: 'Role name is required' })} // Required validation
      />
      <Button type="submit" disabled={isLoading}>
        {isEditSession ? 'Update Role' : 'Add Role'}
      </Button>
    </Form>
  )
}

export default CreateRoleForm
