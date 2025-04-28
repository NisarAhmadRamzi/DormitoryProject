import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAsset, editAsset } from '../../services/apiAssets'

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

function CreateAssetsForm({ assetToEdit = {}, onCloseModal }) {
  const isEditSession = Boolean(assetToEdit.id)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? assetToEdit : {},
  })

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) =>
      isEditSession ? editAsset(assetToEdit.id, data) : createAsset(data),
    onSuccess: (res) => {
      const asset = res.data
      toast.success(
        isEditSession
          ? `Asset updated successfully`
          : `New asset created successfully`
      )
      queryClient.invalidateQueries({ queryKey: ['assets'] })
      reset()
      onCloseModal?.()
    },
    onError: (err) => {
      toast.error(err.message || 'Something went wrong')
    },
  })

  const onSubmit = (data) => mutate(data)

  React.useEffect(() => {
    if (isEditSession && assetToEdit) {
      reset(assetToEdit)
    }
  }, [isEditSession, assetToEdit, reset])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          type="number"
          id="quantity"
          {...register('quantity', {
            required: 'Quantity is required',
            min: {
              value: 1,
              message: 'Quantity must be at least 1',
            },
          })}
        />
        {errors?.quantity && <Error>{errors.quantity.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description</Label>
        <Input
          type="text"
          id="description"
          {...register('description', {
            required: 'Description is required',
            maxLength: {
              value: 500,
              message: 'Description must be under 500 characters',
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
          {isEditSession ? 'Edit Asset' : 'Create New Asset'}
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateAssetsForm
