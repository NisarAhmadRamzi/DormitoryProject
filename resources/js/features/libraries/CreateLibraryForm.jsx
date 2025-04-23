import { createLibrary, editLibrary } from '../../services/apiLibraries'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import Button from '../../ui/Button'
import Form from '../../ui/Form'
import Input from '../../ui/Input'
import React from 'react'
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

function CreateLibraryForm({ libraryToEdit = {}, onCloseModal }) {
  const isEditSession = Boolean(libraryToEdit.id)

  // Initialize form with defaultValues from libraryToEdit if in edit mode
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? libraryToEdit : {}, // Set form values for editing
  })

  const queryClient = useQueryClient()

  // Mutation hook for creating or editing a library
  const { mutate, isLoading } = useMutation({
    mutationFn: (data) =>
      isEditSession ? editLibrary(libraryToEdit.id, data) : createLibrary(data),
    onSuccess: (res) => {
      const library = res.data // API response returns { data: {...} }
      toast.success(
        isEditSession
          ? `Library "${library.name}" updated successfully`
          : `New library "${library.name}" created successfully`
      )
      queryClient.invalidateQueries({ queryKey: ['libraries'] })
      reset() // Reset the form after successful submission
      onCloseModal?.()
    },
    onError: (err) => {
      toast.error(err.message || 'Something went wrong')
    },
  })

  const onSubmit = (data) => mutate(data)

  // If we are in edit mode, ensure the form is reset with proper values
  React.useEffect(() => {
    if (isEditSession && libraryToEdit) {
      reset(libraryToEdit)
    }
  }, [isEditSession, libraryToEdit, reset])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="name">Library Name</Label>
        <Input
          type="text"
          id="name"
          {...register('name', {
            required: 'Library name is required',
            maxLength: {
              value: 255,
              message: 'Name must be under 255 characters',
            },
          })}
        />
        {errors?.name && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="location">Location</Label>
        <Input
          type="text"
          id="location"
          {...register('location', {
            required: 'Location is required',
          })}
        />
        {errors?.location && <Error>{errors.location.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="contact_info">Contact Info</Label>
        <Input type="text" id="contact_info" {...register('contact_info')} />
        {errors?.contact_info && <Error>{errors.contact_info.message}</Error>}
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
          {isEditSession ? 'Edit Library' : 'Create New Library'}
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateLibraryForm
