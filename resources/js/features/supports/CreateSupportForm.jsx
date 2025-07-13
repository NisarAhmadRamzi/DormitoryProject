import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { createSupport, editSupport } from '../../services/apiSupports'
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

const SelectInput = styled.select`
  font-size: 1.4rem;
  padding: 1.2rem;
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  color: var(--color-grey-700);
  width: 100%;

  &:focus {
    outline: 2px solid var(--color-brand-600);
    outline-offset: -1px;
  }

  &:disabled {
    background-color: var(--color-grey-200);
    color: var(--color-grey-500);
    cursor: not-allowed;
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
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: 2px solid var(--color-brand-600);
    outline-offset: -1px;
  }
`

function CreateSupportForm({ supportToEdit = {}, onCloseModal }) {
  const { t } = useTranslation()
  const isEditSession = Boolean(supportToEdit.id)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: isEditSession ? supportToEdit : {},
  })

  const type = watch('type')
  const helpDate = watch('help_date')

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) =>
      isEditSession ? editSupport(supportToEdit.id, data) : createSupport(data),
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

  React.useEffect(() => {
    if (isEditSession && supportToEdit) {
      reset(supportToEdit)
    }
  }, [isEditSession, supportToEdit, reset])

  const today = new Date().toISOString().split('T')[0]

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* Support Type */}
      <FormRow>
        <Label htmlFor="type">{t('SupportsForm.validation.type')}</Label>
        <SelectInput
          id="type"
          {...register('type', {
            required: t('SupportsForm.validation.typeRequired'),
          })}
        >
          <option value="cash">{t('SupportsForm.validation.cash')}</option>
          <option value="goods">{t('SupportsForm.validation.goods')}</option>
          <option value="both">{t('SupportsForm.validation.both')}</option>
        </SelectInput>

        {errors?.type && <Error>{errors.type.message}</Error>}
      </FormRow>

      {/* Details (textarea) */}
      <FormRow>
        <Label htmlFor="details">{t('SupportsForm.form.details')}</Label>
        <TextArea
          id="details"
          {...register('details', {
            required: t('SupportsForm.validation.detailsRequired'),
          })}
        />
        {errors?.details && <Error>{errors.details.message}</Error>}
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

        {errors?.cash_quantity && <Error>{errors.cash_quantity.message}</Error>}
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
      <FormRow>
        <Label htmlFor="helper_number">
          {t('SupportsForm.form.helperNumber')}
        </Label>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span
            style={{
              padding: '0.8rem 1rem',
              backgroundColor: 'var(--color-grey-200)',
              border: '1px solid var(--color-grey-300)',
              borderTopLeftRadius: 'var(--border-radius-sm)',
              borderBottomLeftRadius: 'var(--border-radius-sm)',
              fontSize: '1.4rem',
            }}
          >
            +
          </span>
          <Input
            type="tel"
            id="helper_number"
            style={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
            maxLength={13}
            placeholder={t('SupportsForm.validation.helperNumberPlaceholder')}
            {...register('helper_number', {
              required: t('SupportsForm.validation.helperNumberRequired'),
              pattern: {
                value: /^[1-9]\d{6,12}$/,
                message: t('SupportsForm.validation.helperNumberInvalid'),
              },
              maxLength: {
                value: 13,
                message: t('SupportsForm.validation.helperNumberInvalid'),
              },
            })}
          />
        </div>
        {errors?.helper_number && <Error>{errors.helper_number.message}</Error>}
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

      {/* Help Date - not in future */}
      <FormRow>
        <Label htmlFor="help_date">{t('SupportsForm.form.helpDate')}</Label>
        <Input
          type="date"
          id="help_date"
          max={today}
          {...register('help_date', {
            required: t('SupportsForm.validation.helpDateRequired'),
            validate: (value) =>
              value <= today || t('SupportsForm.validation.helpDateFuture'),
          })}
        />
        {errors?.help_date && <Error>{errors.help_date.message}</Error>}
      </FormRow>

      {/* Buttons */}
      <FormRow>
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
      </FormRow>
    </Form>
  )
}

export default CreateSupportForm
