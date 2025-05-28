import { createSupport, editSupport } from '../../services/apiSupports'
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
    onSuccess: (support) => {
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
        <Label htmlFor="goods_quantity">Goods Quantity</Label>
        <Input
          type="number"
          id="goods_quantity"
          {...register('goods_quantity', {
            min: {
              value: 0,
              message: 'Goods quantity cannot be negative',
            },
          })}
        />
        {errors?.goods_quantity && (
          <Error>{errors.goods_quantity.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="cash_quantity">Cash Quantity</Label>
        <Input
          type="number"
          id="cash_quantity"
          {...register('cash_quantity', {
            min: {
              value: 0,
              message: 'Cash quantity cannot be negative',
            },
          })}
        />
        {errors?.cash_quantity && <Error>{errors.cash_quantity.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="helper_fullname">Helper Fullname</Label>
        <Input
          type="text"
          id="helper_fullname"
          {...register('helper_fullname', {
            required: 'Helper fullname is required',
          })}
        />
        {errors?.helper_fullname && (
          <Error>{errors.helper_fullname.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="helper_number">Helper Number</Label>
        <Input
          type="text"
          id="helper_number"
          {...register('helper_number', {
            required: 'Helper number is required',
            pattern: {
              value: /^[0-9+\-() ]+$/,
              message: 'Invalid phone number format',
            },
          })}
        />
        {errors?.helper_number && <Error>{errors.helper_number.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="helper_email">Helper Email</Label>
        <Input
          type="email"
          id="helper_email"
          {...register('helper_email', {
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email address',
            },
          })}
        />
        {errors?.helper_email && <Error>{errors.helper_email.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="help_date">Help Date</Label>
        <Input
          type="date"
          id="help_date"
          {...register('help_date', {
            required: 'Help date is required',
          })}
        />
        {errors?.help_date && <Error>{errors.help_date.message}</Error>}
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
