import { createUser, editUser } from '../../services/apiUser'
//v2
import { useMutation, useQueryClient } from '@tanstack/react-query'

import Button from '../../ui/Button'
import Form from '../../ui/Form'
import Input from '../../ui/Input'
import styled from 'styled-components'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;
  padding: 1.2rem 0;
  &:has(button) {
    display: flex;
    justify-content: flex-end;
  }
`
const Label = styled.label`
  font-weight: 500;
`
const Error = styled.span`
  font-size: 1.4rem;
  color: red;
`

const SelectInput = styled.select`
  font-size: 1.4rem;
  padding: 1.2rem;
  border-radius: var(--border-radius-sm); /* Use global border-radius */
  border: 1px solid var(--color-grey-300); /* Use global grey border */
  background-color: var(--color-grey-0); /* Background for light mode */
  color: var(--color-grey-700); /* Text color for light mode */
  width: 100%;
  transition: background-color 0.3s, color 0.3s, border 0.3s;

  &:focus {
    outline: 2px solid var(--color-brand-600);
    outline-offset: -1px;
  }

  &:disabled {
    background-color: var(--color-grey-200);
    color: var(--color-grey-500);
    cursor: not-allowed;
  }
`

function CreateUserForm({ userToEdit = {}, onCloseModal }) {
  const isEdit = Boolean(userToEdit.id)
  const [profileImage, setProfileImage] = useState(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: isEdit
      ? { ...userToEdit, role: userToEdit.role || 'student' }
      : { role: 'student' },
  })
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation({
    mutationFn: (data) =>
      isEdit ? editUser(userToEdit.id, data) : createUser(data),
    onSuccess: () => {
      toast.success(`User ${isEdit ? 'updated' : 'created'} successfully`)
      queryClient.invalidateQueries(['users'])
      onCloseModal?.()
    },
    onError: () => toast.error('Something went wrong'),
  })

  const onSubmit = (data) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('email', data.email)
    if (data.password) formData.append('password', data.password)
    if (data.cpassword) formData.append('cpassword', data.cpassword)
    if (profileImage) formData.append('profile', profileImage)
    if (data.role) formData.append('role', data.role) // Add role to formData
    mutate(formData)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label>Name</Label>
        <Input {...register('name', { required: 'Name is required' })} />
        {errors.name && <Error>{errors.name.message}</Error>}
      </FormRow>
      <FormRow>
        <Label>Email</Label>
        <Input
          type="email"
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <Error>{errors.email.message}</Error>}
      </FormRow>
      {!isEdit && (
        <>
          <FormRow>
            <Label>Password</Label>
            <Input
              type="password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <Error>{errors.password.message}</Error>}
          </FormRow>
          <FormRow>
            <Label>Confirm Password</Label>
            <Input
              type="password"
              {...register('cpassword', {
                required: 'Confirm password is required',
              })}
            />
            {errors.cpassword && <Error>{errors.cpassword.message}</Error>}
          </FormRow>
        </>
      )}
      <FormRow>
        <Label>Role</Label>
        <SelectInput {...register('role')}>
          <option value="student">Student</option>
          <option value="second_admin">Second Admin</option>
          <option value="admin">Admin</option>
        </SelectInput>
      </FormRow>
      <FormRow>
        <Label>Profile Image</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setProfileImage(e.target.files[0])}
        />
      </FormRow>
      <FormRow>
        <Button type="submit" disabled={isLoading}>
          {isEdit ? 'Update' : 'Create'} User
        </Button>
        <Button type="button" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateUserForm
