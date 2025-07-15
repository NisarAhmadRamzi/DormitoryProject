import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import ShamsiDatePicker from '../../components/ShamsiDatePicker'
import { createExpense, editExpense } from '../../services/apiExpenses'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import Input from '../../ui/Input'

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.4rem;
  max-height: 70vh;
  overflow-y: auto;
  padding-right: 1rem;
`

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

const Label = styled.label`
  font-weight: 500;
`

const Error = styled.span`
  font-size: 1.2rem;
  color: var(--color-red-700);
`

const TextArea = styled.textarea`
  font-size: 1.4rem;
  padding: 1.2rem;
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-grey-300);
  width: 100%;
  color: var(--color-grey-700);
  background-color: var(--color-grey-0);
  min-height: 10rem;
  resize: vertical;
  &:focus {
    border-color: var(--color-primary);
    outline: none;
  }
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
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: processedExpenseToEdit,
  })

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => {
      data.expense_date = data.expense_date
        ?.toDate?.()
        .toISOString()
        .split('T')[0]
      return isEditSession
        ? editExpense(expenseToEdit.id, data)
        : createExpense(data)
    },
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
      toast.error(err?.response?.data?.message || t('ExpensesForm.error'))
    },
  })

  useEffect(() => {
    if (isEditSession && expenseToEdit) {
      reset(processedExpenseToEdit)
    }
  }, [isEditSession, expenseToEdit, reset])

  const onSubmit = (data) => mutate(data)

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGrid>
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
                message: t('ExpensesForm.minExpenseCash'),
              },
            })}
          />
          {errors?.expense_cash && <Error>{errors.expense_cash.message}</Error>}
        </FormRow>

        <FormRow style={{ gridColumn: '1 / -1' }}>
          <Label htmlFor="description">{t('ExpensesForm.description')}</Label>
          <TextArea
            id="description"
            {...register('description', {
              required: t('ExpensesForm.requiredDescription'),
            })}
            error={errors?.description}
          />
          {errors?.description && <Error>{errors.description.message}</Error>}
        </FormRow>

        <FormRow>
          <Label>{t('ExpensesForm.expenseDate')}</Label>
          <Controller
            name="expense_date"
            control={control}
            rules={{
              required: t('ExpensesForm.requiredExpenseDate'),
            }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <ShamsiDatePicker
                value={value}
                onChange={onChange}
                error={error?.message}
              />
            )}
          />
        </FormRow>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '1.2rem',
            marginTop: '1.6rem',
          }}
        >
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
        </div>
      </FormGrid>
    </Form>
  )
}

export default CreateExpensesForm
