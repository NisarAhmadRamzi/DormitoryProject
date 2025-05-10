import React, { useEffect, useState } from 'react'
import { createUser, editUser } from '../../services/apiUser'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import Button from '../../ui/Button'
import Form from '../../ui/Form'
import Input from '../../ui/Input'
import styled from 'styled-components'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;
  padding: 1.2rem 0;
  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    padding-bottom: 0;
  }
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`

const Label = styled.label`
  font-weight: 500;
`

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`

function CreateUserForm({ userToEdit = {}, onCloseModal }) {
  const isEditSession = Boolean(userToEdit.id)
  const [profileImage, setProfileImage] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? userToEdit : {},
  })

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation({
    mutationFn: (formData) =>
      isEditSession ? editUser(userToEdit.id, formData) : createUser(formData),
    onSuccess: () => {
      toast.success(
        isEditSession
          ? 'User updated successfully'
          : 'New user created successfully'
      )
      queryClient.invalidateQueries({ queryKey: ['users'] })
      reset()
      onCloseModal?.()
    },
    onError: (err) => {
      toast.error(err.message || 'Something went wrong')
    },
  })

  const onSubmit = (data) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('password', data.password || '')
    formData.append('cpassword', data.cpassword || '')
    formData.append('role', data.role)

    if (profileImage) {
      formData.append('profile', profileImage)
    }

    mutate(formData)
  }

  useEffect(() => {
    if (isEditSession && userToEdit) {
      reset(userToEdit)
    }
  }, [isEditSession, userToEdit, reset])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          {...register('name', { required: 'Name is required' })}
        />
        {errors?.name && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email format',
            },
          })}
        />
        {errors?.email && <Error>{errors.email.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          {...register('password', {
            minLength: {
              value: 4,
              message: 'Password must be at least 4 characters',
            },
          })}
        />
        {errors?.password && <Error>{errors.password.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="cpassword">Confirm Password</Label>
        <Input
          type="password"
          id="cpassword"
          {...register('cpassword', {
            validate: (value) =>
              value === watch('password') || 'Passwords do not match',
          })}
        />
        {errors?.cpassword && <Error>{errors.cpassword.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="role">Role</Label>
        <select
          id="role"
          {...register('role', {
            required: 'Role is required',
            validate: (value) =>
              ['admin', 'second-admin', 'student'].includes(value) ||
              'Invalid role',
          })}
        >
          <option value="">Select role</option>
          <option value="admin">Admin</option>
          <option value="second-admin">Second Admin</option>
          <option value="student">Student</option>
        </select>
        {errors?.role && <Error>{errors.role.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="profile">Profile Image</Label>
        <Input
          type="file"
          id="profile"
          accept="image/*"
          onChange={(e) => setProfileImage(e.target.files[0])}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isEditSession ? 'Edit User' : 'Create User'}
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateUserForm
