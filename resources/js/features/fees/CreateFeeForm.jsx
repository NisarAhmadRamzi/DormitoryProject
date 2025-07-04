import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createFee, editFee } from '../../services/apiFees'

import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
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

function CreateFeeForm({ feeToEdit = {}, onCloseModal }) {
  const { t } = useTranslation()
  const isEditSession = Boolean(feeToEdit.id)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? feeToEdit : {},
  })

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) =>
      isEditSession ? editFee(feeToEdit.id, data) : createFee(data),
    onSuccess: (res) => {
      const fee = res.data || res
      toast.success(
        isEditSession
          ? t('Fees.messages.updatedSuccess')
          : t('Fees.messages.createdSuccess')
      )
      queryClient.invalidateQueries({ queryKey: ['fees'] })
      reset()
      onCloseModal?.()
    },
    onError: (err) => {
      toast.error(err.message || t('Fees.messages.error'))
    },
  })

  const onSubmit = (data) => mutate(data)

  React.useEffect(() => {
    if (isEditSession && feeToEdit) {
      reset(feeToEdit)
    }
  }, [isEditSession, feeToEdit, reset])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="student_id">{t('Fees.fields.studentId')}</Label>
        <Input
          type="number"
          id="student_id"
          {...register('student_id', {
            required: t('Fees.errors.studentIdRequired'),
          })}
        />
        {errors?.student_id && <Error>{errors.student_id.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="office_pay">{t('Fees.fields.officePay')}</Label>
        <Input
          type="number"
          id="office_pay"
          step="0.01"
          {...register('office_pay', {
            required: t('Fees.errors.officePayRequired'),
          })}
        />
        {errors?.office_pay && <Error>{errors.office_pay.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="office_paid">{t('Fees.fields.officePaid')}</Label>
        <Input
          type="text"
          id="office_paid"
          {...register('office_paid', {
            required: t('Fees.errors.officePaidRequired'),
          })}
        />
        {errors?.office_paid && <Error>{errors.office_paid.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="warranty_pay">{t('Fees.fields.warrantyPay')}</Label>
        <Input
          type="number"
          id="warranty_pay"
          step="0.01"
          {...register('warranty_pay', {
            required: t('Fees.errors.warrantyPayRequired'),
          })}
        />
        {errors?.warranty_pay && <Error>{errors.warranty_pay.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="warranty_paid">{t('Fees.fields.warrantyPaid')}</Label>
        <Input
          type="text"
          id="warranty_paid"
          {...register('warranty_paid', {
            required: t('Fees.errors.warrantyPaidRequired'),
          })}
        />
        {errors?.warranty_paid && <Error>{errors.warranty_paid.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="registration_date">
          {t('Fees.fields.registrationDate')}
        </Label>
        <Input
          type="date"
          id="registration_date"
          {...register('registration_date', {
            required: t('Fees.errors.registrationDateRequired'),
          })}
        />
        {errors?.registration_date && (
          <Error>{errors.registration_date.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="due_date">{t('Fees.fields.dueDate')}</Label>
        <Input
          type="date"
          id="due_date"
          {...register('due_date', {
            required: t('Fees.errors.dueDateRequired'),
          })}
        />
        {errors?.due_date && <Error>{errors.due_date.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="paid_date">{t('Fees.fields.paidDateOptional')}</Label>
        <Input type="date" id="paid_date" {...register('paid_date')} />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          {t('CommonFees.cancel')}
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isEditSession
            ? t('Fees.buttons.editFee')
            : t('Fees.buttons.createFee')}
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateFeeForm
