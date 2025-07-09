import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { createExpense, editExpense } from '../../services/apiExpenses'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import Input from '../../ui/Input'

const Select = styled.select`
  padding: 0.8rem 1.2rem;
  font-size: 1.6rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 4px;
  background-color: var(--color-grey-0);
  width: 100%;
  font-family: inherit;
  color: inherit;
`

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
  const { t } = useTranslation()
  const isEditSession = Boolean(expenseToEdit.id)

  const processedExpenseToEdit = isEditSession
    ? {
        ...expenseToEdit,
        expense_cash:
          expenseToEdit.expense_cash != null
            ? String(expenseToEdit.expense_cash)
            : '',
        goods_quantity:
          expenseToEdit.goods_quantity != null
            ? String(expenseToEdit.goods_quantity)
            : '',
      }
    : {}

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: processedExpenseToEdit,
  })

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) =>
      isEditSession ? editExpense(expenseToEdit.id, data) : createExpense(data),
    onSuccess: () => {
      toast.success(
        isEditSession
          ? t('ExpensesForm.successUpdate')
          : t('ExpensesForm.successCreate')
      )
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
      reset()
      onCloseModal?.()
    },
    onError: (err) => {
      toast.error(err.message || t('ExpensesForm.error'))
    },
  })

  const onSubmit = (data) => mutate(data)

  React.useEffect(() => {
    if (isEditSession && expenseToEdit) {
      reset(processedExpenseToEdit)
    }
  }, [isEditSession, expenseToEdit, reset])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="type">{t('ExpensesForm.type')}</Label>
        <Input
          type="text"
          id="cash"
          value="cash"
          {...register('type', {
            required: t('ExpensesForm.requiredType'),
          })}
        />
        {errors?.type && <Error>{errors.type.message}</Error>}
      </FormRow>
      <FormRow>
        <Label htmlFor="expense_cash">{t('ExpensesForm.expenseCash')}</Label>
        <Input
          type="number"
          id="expense_cash"
          {...register('expense_cash', {
            required: t('ExpensesForm.requiredExpenseCash'),
            min: {
              value: 0,
              message:
                t('ExpensesForm.minExpenseCash') ||
                'Value must be 0 or greater',
            },
          })}
        />
        {errors?.expense_cash && <Error>{errors.expense_cash.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">{t('ExpensesForm.description')}</Label>
        <Input
          type="text"
          id="description"
          {...register('description', {
            required: t('ExpensesForm.requiredDescription'),
          })}
        />
        {errors?.description && <Error>{errors.description.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="expense_date">{t('ExpensesForm.expenseDate')}</Label>
        <Input
          type="date"
          id="expense_date"
          {...register('expense_date', {
            required: t('ExpensesForm.requiredExpenseDate'),
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
          {t('cancel.cancel')}
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isEditSession ? t('ExpensesForm.edit') : t('ExpensesForm.create')}
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateExpensesForm
