import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import ShamsiDatePicker from '../../components/ShamsiDatePicker'
import { createFee, editFee } from '../../services/apiFees'
import { getStudents } from '../../services/apiStudents'
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

const SelectInput = styled.select`
  font-size: 1.4rem;
  padding: 1.2rem;
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-grey-300);
  width: 100%;
  color: var(--color-grey-700);
  background-color: var(--color-grey-0);
  &:focus {
    border-color: var(--color-primary);
    outline: none;
  }
`

function CreateFeeForm({ feeToEdit = {}, onCloseModal }) {
  const isEditSession = Boolean(feeToEdit.id)
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const { data: studentsData, isLoading: isLoadingStudents } = useQuery({
    queryKey: ['students', { page: 1, limit: 1000 }],
    queryFn: () => getStudents({ page: 1, limit: 1000 }),
  })

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onChange',
    defaultValues: isEditSession
      ? {
          ...feeToEdit,
        }
      : {
          office_pay: 1000,
          warranty_pay: 1000,
        },
  })

  const officePay = watch('office_pay')
  const warrantyPay = watch('warranty_pay')
  const registrationDate = watch('registration_date')

  useEffect(() => {
    if (isEditSession && feeToEdit) {
      reset({
        ...feeToEdit,
      })
    }
  }, [feeToEdit, isEditSession, reset])

  const toISO = (d) => d?.toDate?.().toISOString().split('T')[0]

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
      toast.error(err?.response?.data?.message || t('Fees.messages.error'))
    },
  })

  const onSubmit = (data) => {
    data.registration_date = toISO(data.registration_date)
    data.due_date = toISO(data.due_date)
    if (data.paid_date) data.paid_date = toISO(data.paid_date)

    mutate(data)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGrid>
        <FormRow>
          <Label htmlFor="student_id">{t('Fees.fields.studentId')}</Label>
          <SelectInput
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
          </SelectInput>
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
              min: { value: 0, message: t('Fees.errors.officePayMinZero') },
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
              min: { value: 0, message: t('Fees.errors.officePaidMinZero') },
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
              min: { value: 0, message: t('Fees.errors.warrantyPayMinZero') },
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
              min: { value: 0, message: t('Fees.errors.warrantyPaidMinZero') },
              validate: (val) =>
                parseFloat(val) <= parseFloat(warrantyPay || 0) ||
                t('Fees.errors.warrantyPaidTooMuch'),
            })}
          />
          {errors?.warranty_paid && (
            <Error>{errors.warranty_paid.message}</Error>
          )}
        </FormRow>

        <FormRow>
          <Label>{t('Fees.fields.registrationDate')}</Label>
          <Controller
            name="registration_date"
            control={control}
            rules={{
              required: t('Fees.errors.registrationDateRequired'),
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

        <FormRow>
          <Label>{t('Fees.fields.dueDate')}</Label>
          <Controller
            name="due_date"
            control={control}
            rules={{
              required: t('Fees.errors.dueDateRequired'),
              validate: (due) => {
                const reg = watch('registration_date')?.toDate?.()
                const d = due?.toDate?.()
                return (
                  !reg || d >= reg || t('Fees.errors.dueDateBeforeRegistration')
                )
              },
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

        <FormRow>
          <Label>{t('Fees.fields.paidDateOptional')}</Label>
          <Controller
            name="paid_date"
            control={control}
            rules={{
              validate: (paid) => {
                const reg = watch('registration_date')?.toDate?.()
                const d = paid?.toDate?.()
                return (
                  !d ||
                  !reg ||
                  d >= reg ||
                  t('Fees.errors.paidDateBeforeRegistration')
                )
              },
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
      </FormGrid>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '1.2rem',
          marginTop: '1.6rem',
        }}
      >
        <Button type="reset" variation="secondary" onClick={() => reset()}>
          {t('CommonFees.cancel')}
        </Button>
        <Button type="submit" disabled={isLoading || isSubmitting}>
          {isEditSession
            ? t('Fees.buttons.editFee')
            : t('Fees.buttons.createFee')}
        </Button>
      </div>
    </Form>
  )
}

export default CreateFeeForm
