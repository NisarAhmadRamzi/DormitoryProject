import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createLibraryStudent,
  editLibraryStudent,
} from '../../services/apiLibraryStudents'

import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import styled from 'styled-components'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import Input from '../../ui/Input'

const FormRow = styled.div`
  // same styling as before
`

const Label = styled.label`
  // same styling as before
`

const Error = styled.span`
  // same styling as before
`

function CreateLibraryStudentForm({ studentToEdit = {}, onCloseModal }) {
  const isEditSession = Boolean(studentToEdit.id)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? studentToEdit : {},
  })

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) =>
      isEditSession
        ? editLibraryStudent(studentToEdit.id, data)
        : createLibraryStudent(data),
    onSuccess: (res) => {
      const student = res.data
      toast.success(
        isEditSession
          ? `Student "${student.name}" updated successfully`
          : `New student "${student.name}" created successfully`
      )
      queryClient.invalidateQueries({ queryKey: ['libraryStudents'] })
      reset()
      onCloseModal?.()
    },
    onError: (err) => {
      toast.error(err.message || 'Something went wrong')
    },
  })

  const onSubmit = (data) => mutate(data)

  React.useEffect(() => {
    if (isEditSession && studentToEdit) {
      reset(studentToEdit)
    }
  }, [isEditSession, studentToEdit, reset])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          {...register('name', { required: 'Student name is required' })}
        />
        {errors?.name && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          {...register('email', { required: 'Email is required' })}
        />
        {errors?.email && <Error>{errors.email.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="phone">Phone</Label>
        <Input type="text" id="phone" {...register('phone')} />
        {errors?.phone && <Error>{errors.phone.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="libraryId">Library ID</Label>
        <Input
          type="number"
          id="libraryId"
          {...register('libraryId', { required: 'Library ID is required' })}
        />
        {errors?.libraryId && <Error>{errors.libraryId.message}</Error>}
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
          {isEditSession ? 'Edit Student' : 'Create New Student'}
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateLibraryStudentForm
