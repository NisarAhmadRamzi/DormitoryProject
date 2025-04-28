import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createSupport, editSupport } from '../../services/apiSupports'

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

function CreateSupportForm({ supportToEdit = {}, onCloseModal }) {
  const isEditSession = Boolean(supportToEdit.id)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? supportToEdit : {},
  })

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) =>
      isEditSession ? editSupport(supportToEdit.id, data) : createSupport(data),
    onSuccess: (res) => {
      const support = res.data
      toast.success(
        isEditSession
          ? `Support "${support.type}" updated successfully`
          : `New support "${support.type}" created successfully`
      )
      queryClient.invalidateQueries({ queryKey: ['supports'] })
      reset()
      onCloseModal?.()
    },
    onError: (err) => {
      toast.error(err.message || 'Something went wrong')
    },
  })

  const onSubmit = (data) => mutate(data)

  React.useEffect(() => {
    if (isEditSession && supportToEdit) {
      reset(supportToEdit)
    }
  }, [isEditSession, supportToEdit, reset])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="type">Support Type</Label>
        <Input
          type="text"
          id="type"
          {...register('type', {
            required: 'Support type is required',
            maxLength: {
              value: 255,
              message: 'Type must be under 255 characters',
            },
          })}
        />
        {errors?.type && <Error>{errors.type.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="details">Details</Label>
        <Input
          type="text"
          id="details"
          {...register('details', {
            required: 'Details are required',
          })}
        />
        {errors?.details && <Error>{errors.details.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="helper_fullname">Helper Fullname</Label>
        <Input
          type="text"
          id="helper_fullname"
          {...register('helper_fullname')}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="helper_number">Helper Number</Label>
        <Input type="text" id="helper_number" {...register('helper_number')} />
      </FormRow>

      <FormRow>
        <Label htmlFor="helper_email">Helper Email</Label>
        <Input type="email" id="helper_email" {...register('helper_email')} />
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
          {isEditSession ? 'Edit Support' : 'Create New Support'}
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateSupportForm
