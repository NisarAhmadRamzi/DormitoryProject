import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { createFee, editFee } from '../../services/apiFees'
import { getStudents } from '../../services/apiStudents'
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

const Select = styled.select`
  font-size: 1.6rem;
  padding: 0.8rem 1.2rem;
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-grey-300);
  width: 100%;
  box-sizing: border-box;

  color: var(--color-grey-700);
  background-color: var(--color-grey-0);

  &:focus {
    border-color: var(--color-brand-600);
    outline: none;
    box-shadow: 0 0 0 2px var(--color-blue-100);
  }

  &:disabled {
    background-color: var(--color-grey-200);
    color: var(--color-grey-500);
  }
`

function CreateFeeForm({ feeToEdit = {}, onCloseModal }) {
  const isEditSession = Boolean(feeToEdit.id)
  const { t } = useTranslation()

  const { data: studentsData, isLoading: isLoadingStudents } = useQuery({
    queryKey: ['students', { page: 1, limit: 1000 }],
    queryFn: () => getStudents({ page: 1, limit: 1000 }),
  })

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...feeToEdit,
      office_pay: feeToEdit.office_pay ?? 1000,
      warranty_pay: feeToEdit.warranty_pay ?? 1000,
    },
  })

  // Watch values for cross validations
  const officePay = watch('office_pay')
  const warrantyPay = watch('warranty_pay')
  const registrationDate = watch('registration_date')

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) =>
      isEditSession ? editFee(feeToEdit.id, data) : createFee(data),
    onSuccess: () => {
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
      reset({
        ...feeToEdit,
        office_pay: feeToEdit.office_pay ?? 1000,
        warranty_pay: feeToEdit.warranty_pay ?? 1000,
      })
    }
  }, [isEditSession, feeToEdit, reset])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="student_id">{t('Fees.fields.studentId')}</Label>
        <Select
          id="student_id"
          disabled={isLoadingStudents}
          {...register('student_id', {
            required: t('Fees.errors.studentIdRequired'),
          })}
        >
          <option value="">{t('selectStudent')}</option>
          {studentsData?.data?.map((student) => (
            <option key={student.id} value={student.id}>
              {student.id} — {student.name} {student.last_name}
            </option>
          ))}
        </Select>
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
            valueAsNumber: true,
            min: {
              value: 0,
              message: t('Fees.errors.officePayMinZero'),
            },
          })}
        />
        {errors?.office_pay && <Error>{errors.office_pay.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="office_paid">{t('Fees.fields.officePaid')}</Label>
        <Input
          type="number"
          id="office_paid"
          step="0.01"
          {...register('office_paid', {
            required: t('Fees.errors.officePaidRequired'),
            valueAsNumber: true,
            min: {
              value: 0,
              message: t('Fees.errors.officePaidMinZero'),
            },
            validate: (val) =>
              parseFloat(val) <= parseFloat(officePay || 0) ||
              t('Fees.errors.officePaidTooMuch'),
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
            valueAsNumber: true,
            min: {
              value: 0,
              message: t('Fees.errors.warrantyPayMinZero'),
            },
          })}
        />
        {errors?.warranty_pay && <Error>{errors.warranty_pay.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="warranty_paid">{t('Fees.fields.warrantyPaid')}</Label>
        <Input
          type="number"
          id="warranty_paid"
          step="0.01"
          {...register('warranty_paid', {
            required: t('Fees.errors.warrantyPaidRequired'),
            valueAsNumber: true,
            min: {
              value: 0,
              message: t('Fees.errors.warrantyPaidMinZero'),
            },
            validate: (val) =>
              parseFloat(val) <= parseFloat(warrantyPay || 0) ||
              t('Fees.errors.warrantyPaidTooMuch'),
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
            validate: (due) => {
              if (!registrationDate) return true
              return (
                due >= registrationDate ||
                t('Fees.errors.dueDateBeforeRegistration')
              )
            },
          })}
        />
        {errors?.due_date && <Error>{errors.due_date.message}</Error>}
      </FormRow>
      <FormRow>
        <Label htmlFor="paid_date">{t('Fees.fields.paidDateOptional')}</Label>
        <Input
          type="date"
          id="paid_date"
          {...register('paid_date', {
            validate: (paid) => {
              if (!paid || !registrationDate) return true
              return (
                paid >= registrationDate ||
                t('Fees.errors.paidDateBeforeRegistration')
              )
            },
          })}
        />
        {errors?.paid_date && <Error>{errors.paid_date.message}</Error>}
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
