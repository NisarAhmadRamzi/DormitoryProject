import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import ShamsiDatePicker from '../../components/ShamsiDatePicker'
import { createSupport, editSupport } from '../../services/apiSupports'
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

const FullWidthRow = styled(FormRow)`
  grid-column: 1 / -1;
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

const TextArea = styled.textarea`
  font-size: 1.4rem;
  padding: 1.2rem;
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  color: var(--color-grey-700);
  width: 100%;
  min-height: 10rem;
  resize: vertical;
  &:focus {
    border-color: var(--color-primary);
    outline: none;
  }
`

function CreateSupportForm({ supportToEdit = {}, onCloseModal }) {
  const { t } = useTranslation()
  const isEditSession = Boolean(supportToEdit?.id)
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession
      ? {
          ...supportToEdit,
          help_date: supportToEdit?.help_date
            ? new Date(supportToEdit.help_date)
            : null,
        }
      : {},
  })

  useEffect(() => {
    if (isEditSession) {
      reset({
        ...supportToEdit,
        help_date: supportToEdit?.help_date
          ? new Date(supportToEdit.help_date)
          : null,
      })
    }
  }, [isEditSession, supportToEdit, reset])

  const type = watch('type')

  const toISO = (d) => d?.toDate?.()?.toISOString()?.split('T')[0]

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => {
      data.help_date = toISO(data.help_date)
      return isEditSession
        ? editSupport(supportToEdit.id, data)
        : createSupport(data)
    },
    onSuccess: (support) => {
      toast.success(
        isEditSession
          ? t('SupportsForm.messages.updated', { type: support.type })
          : t('SupportsForm.messages.created', { type: support.type })
      )
      queryClient.invalidateQueries({ queryKey: ['supports'] })
      reset()
      onCloseModal?.()
    },
    onError: (err) => {
      toast.error(err.message || t('SupportsForm.messages.error'))
    },
  })

  const onSubmit = (data) => mutate(data)

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGrid>
        {/* Support Type */}
        <FormRow>
          <Label htmlFor="type">{t('SupportsForm.validation.type')}</Label>
          <SelectInput
            id="type"
            {...register('type', {
              required: t('SupportsForm.validation.typeRequired'),
            })}
          >
            <option value="">{t('selectOption')}</option>
            <option value="cash">{t('SupportsForm.validation.cash')}</option>
            <option value="goods">{t('SupportsForm.validation.goods')}</option>
            <option value="both">{t('SupportsForm.validation.both')}</option>
          </SelectInput>
          {errors?.type && <Error>{errors.type.message}</Error>}
        </FormRow>

        {/* Goods Quantity */}
        <FormRow>
          <Label htmlFor="goods_quantity">
            {t('SupportsForm.form.goodsQuantity')}
          </Label>
          <Input
            type="number"
            id="goods_quantity"
            disabled={type === 'cash'}
            {...register('goods_quantity', {
              validate: (value) => {
                if (type === 'goods' || type === 'both') {
                  return value !== '' && value !== undefined
                    ? true
                    : t('SupportsForm.validation.goodsQuantityRequired')
                }
                return true
              },
              min: {
                value: 0,
                message: t('SupportsForm.validation.goodsQuantityMin'),
              },
            })}
          />
          {errors?.goods_quantity && (
            <Error>{errors.goods_quantity.message}</Error>
          )}
        </FormRow>

        {/* Cash Quantity */}
        <FormRow>
          <Label htmlFor="cash_quantity">
            {t('SupportsForm.form.cashQuantity')}
          </Label>
          <Input
            type="number"
            id="cash_quantity"
            disabled={type === 'goods'}
            {...register('cash_quantity', {
              validate: (value) => {
                if (type === 'cash' || type === 'both') {
                  return value !== '' && value !== undefined
                    ? true
                    : t('SupportsForm.validation.cashQuantityRequired')
                }
                return true
              },
              min: {
                value: 0,
                message: t('SupportsForm.validation.cashQuantityMin'),
              },
            })}
          />
          {errors?.cash_quantity && (
            <Error>{errors.cash_quantity.message}</Error>
          )}
        </FormRow>

        {/* Helper Full Name */}
        <FormRow>
          <Label htmlFor="helper_fullname">
            {t('SupportsForm.form.helperFullname')}
          </Label>
          <Input
            type="text"
            id="helper_fullname"
            {...register('helper_fullname', {
              required: t('SupportsForm.validation.helperFullnameRequired'),
            })}
          />
          {errors?.helper_fullname && (
            <Error>{errors.helper_fullname.message}</Error>
          )}
        </FormRow>

        {/* Helper Phone */}
        <FormRow>
          <Label htmlFor="helper_number">
            {t('SupportsForm.form.helperNumber')}
          </Label>
          <Input
            type="text"
            id="helper_number"
            placeholder="937XXXXXXXX"
            {...register('helper_number', {
              required: t('SupportsForm.validation.helperNumberRequired'),
              pattern: {
                value: /^\d{9,12}$/,
                message: t('SupportsForm.validation.helperNumberInvalid'),
              },
            })}
          />
          {errors?.helper_number && (
            <Error>{errors.helper_number.message}</Error>
          )}
        </FormRow>

        {/* Helper Email */}
        <FormRow>
          <Label htmlFor="helper_email">
            {t('SupportsForm.form.helperEmail')}
          </Label>
          <Input
            type="email"
            id="helper_email"
            {...register('helper_email', {
              required: t('SupportsForm.validation.helperEmailRequired'),
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: t('SupportsForm.validation.helperEmailInvalid'),
              },
            })}
          />
          {errors?.helper_email && <Error>{errors.helper_email.message}</Error>}
        </FormRow>

        {/* Help Date */}
        <FormRow>
          <Label htmlFor="help_date">{t('SupportsForm.form.helpDate')}</Label>
          <Controller
            name="help_date"
            control={control}
            rules={{
              required: t('SupportsForm.validation.helpDateRequired'),
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

        {/* Details */}
        <FullWidthRow>
          <Label htmlFor="details">{t('SupportsForm.form.details')}</Label>
          <TextArea
            id="details"
            {...register('details', {
              required: t('SupportsForm.validation.detailsRequired'),
            })}
          />
          {errors?.details && <Error>{errors.details.message}</Error>}
        </FullWidthRow>
      </FormGrid>

      {/* Buttons */}
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
          {isEditSession
            ? t('SupportsForm.form.editSupport')
            : t('SupportsForm.form.createSupport')}
        </Button>
      </div>
    </Form>
  )
}

export default CreateSupportForm
