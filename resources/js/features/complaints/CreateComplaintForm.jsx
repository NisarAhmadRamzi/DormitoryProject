import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createComplaint, editComplaint } from '../../services/apiComplaints'

import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import styled from 'styled-components'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import Input from '../../ui/Input'

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

function CreateComplaintForm({ complaintToEdit = {}, onCloseModal }) {
  const isEditSession = Boolean(complaintToEdit.id)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? complaintToEdit : {},
  })

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) =>
      isEditSession
        ? editComplaint(complaintToEdit.id, data)
        : createComplaint(data),
    onSuccess: (res) => {
      const complaint = res.data
      toast.success(
        isEditSession
          ? `Complaint "${complaint.title}" updated successfully`
          : `New complaint "${complaint.title}" submitted`
      )
      queryClient.invalidateQueries({ queryKey: ['complaints'] })
      reset()
      onCloseModal?.()
    },
    onError: (err) => {
      toast.error(err.message || 'Something went wrong')
    },
  })

  const onSubmit = (data) => mutate(data)

  React.useEffect(() => {
    if (isEditSession && complaintToEdit) {
      reset(complaintToEdit)
    }
  }, [isEditSession, complaintToEdit, reset])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          {...register('title', {
            required: 'Title is required',
            maxLength: {
              value: 255,
              message: 'Title must be under 255 characters',
            },
          })}
        />
        {errors?.title && <Error>{errors.title.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description</Label>
        <Input
          type="text"
          id="description"
          {...register('description', {
            required: 'Description is required',
            maxLength: {
              value: 1000,
              message: 'Description must be under 1000 characters',
            },
          })}
        />
        {errors?.description && <Error>{errors.description.message}</Error>}
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
          {isEditSession ? 'Edit Complaint' : 'Submit Complaint'}
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateComplaintForm
