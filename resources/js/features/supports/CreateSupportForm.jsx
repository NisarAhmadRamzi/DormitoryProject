import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createSupport, editSupport } from '../../services/apiSupports'

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

function CreateSupportForm({ supportToEdit = {}, onCloseModal }) {
  const { t } = useTranslation()
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

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="type">{t('SupportsForm.form.type')}</Label>
        <Input
          type="text"
          id="type"
          {...register('type', {
            required: t('SupportsForm.validation.typeRequired'),
            maxLength: {
              value: 255,
              message: t('SupportsForm.validation.typeMaxLength'),
            },
          })}
        />
        {errors?.type && <Error>{errors.type.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="details">{t('SupportsForm.form.details')}</Label>
        <Input
          type="text"
          id="details"
          {...register('details', {
            required: t('SupportsForm.validation.detailsRequired'),
          })}
        />
        {errors?.details && <Error>{errors.details.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="goods_quantity">
          {t('SupportsForm.form.goodsQuantity')}
        </Label>
        <Input
          type="number"
          id="goods_quantity"
          {...register('goods_quantity', {
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

      <FormRow>
        <Label htmlFor="cash_quantity">
          {t('SupportsForm.form.cashQuantity')}
        </Label>
        <Input
          type="number"
          id="cash_quantity"
          {...register('cash_quantity', {
            min: {
              value: 0,
              message: t('SupportsForm.validation.cashQuantityMin'),
            },
          })}
        />
        {errors?.cash_quantity && <Error>{errors.cash_quantity.message}</Error>}
      </FormRow>

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
        <Input
          type="text"
          id="helper_number"
          {...register('helper_number', {
            required: t('SupportsForm.validation.helperNumberRequired'),
            pattern: {
              value: /^[0-9+\-() ]+$/,
              message: t('SupportsForm.validation.helperNumberInvalid'),
            },
          })}
        />
        {errors?.helper_number && <Error>{errors.helper_number.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="helper_email">
          {t('SupportsForm.form.helperEmail')}
        </Label>
        <Input
          type="email"
          id="helper_email"
          {...register('helper_email', {
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: t('SupportsForm.validation.helperEmailInvalid'),
            },
          })}
        />
        {errors?.helper_email && <Error>{errors.helper_email.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="help_date">{t('SupportsForm.form.helpDate')}</Label>
        <Input
          type="date"
          id="help_date"
          {...register('help_date', {
            required: t('SupportsForm.validation.helpDateRequired'),
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
