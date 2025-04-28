import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createExpense, editExpense } from '../../services/apiExpenses'

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

function CreateExpensesForm({ expenseToEdit = {}, onCloseModal }) {
  const isEditSession = Boolean(expenseToEdit.id)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? expenseToEdit : {},
  })

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) =>
      isEditSession ? editExpense(expenseToEdit.id, data) : createExpense(data),
    onSuccess: (res) => {
      const expense = res.data
      toast.success(
        isEditSession
          ? `Expense updated successfully`
          : `New expense created successfully`
      )
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
      reset()
      onCloseModal?.()
    },
    onError: (err) => {
      toast.error(err.message || 'Something went wrong')
    },
  })

  const onSubmit = (data) => mutate(data)

  React.useEffect(() => {
    if (isEditSession && expenseToEdit) {
      reset(expenseToEdit)
    }
  }, [isEditSession, expenseToEdit, reset])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="type">Type</Label>
        <Input
          type="text"
          id="type"
          {...register('type', { required: 'Type is required' })}
        />
        {errors?.type && <Error>{errors.type.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="expense_cash">Expense Cash</Label>
        <Input
          type="number"
          id="expense_cash"
          {...register('expense_cash', {
            required: 'Expense cash is required',
          })}
        />
        {errors?.expense_cash && <Error>{errors.expense_cash.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="goods_quantity">Goods Quantity</Label>
        <Input
          type="number"
          id="goods_quantity"
          {...register('goods_quantity', {
            required: 'Goods quantity is required',
          })}
        />
        {errors?.goods_quantity && (
          <Error>{errors.goods_quantity.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description</Label>
        <Input
          type="text"
          id="description"
          {...register('description', { required: 'Description is required' })}
        />
        {errors?.description && <Error>{errors.description.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="expense_date">Expense Date</Label>
        <Input
          type="date"
          id="expense_date"
          {...register('expense_date', {
            required: 'Expense date is required',
          })}
        />
        {errors?.expense_date && <Error>{errors.expense_date.message}</Error>}
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
          {isEditSession ? 'Edit Expense' : 'Create New Expense'}
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateExpensesForm
