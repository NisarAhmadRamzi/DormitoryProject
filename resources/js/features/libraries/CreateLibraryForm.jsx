import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { createLibrary, editLibrary } from '../../services/apiLibraries'
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

function CreateLibraryForm({ libraryToEdit = {}, onCloseModal }) {
  const { t } = useTranslation()
  const isEdit = Boolean(libraryToEdit.id)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: isEdit ? libraryToEdit : {},
  })

  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation({
    mutationFn: (data) =>
      isEdit ? editLibrary(libraryToEdit.id, data) : createLibrary(data),
    onSuccess: (res) => {
      const lib = res.data
      toast.success(
        isEdit
          ? t('libraryForm.editSuccess', { name: lib.name })
          : t('libraryForm.createSuccess', { name: lib.name })
      )
      queryClient.invalidateQueries(['libraries'])
      reset()
      onCloseModal?.()
    },
    onError: (err) => {
      toast.error(err.message || t('libraryForm.error'))
    },
  })

  React.useEffect(() => {
    if (isEdit) reset(libraryToEdit)
  }, [isEdit, libraryToEdit, reset])

  const onSubmit = (data) => mutate(data)

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="name">{t('libraryForm.fields.name')}</Label>
        <Input
          id="name"
          {...register('name', {
            required: t('libraryForm.validation.nameRequired'),
            maxLength: {
              value: 255,
              message: t('libraryForm.validation.nameMax'),
            },
          })}
        />
        {errors.name && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="location">{t('libraryForm.fields.location')}</Label>
        <Input
          id="location"
          {...register('location', {
            required: t('libraryForm.validation.locationRequired'),
          })}
        />
        {errors.location && <Error>{errors.location.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="contact_info">{t('libraryForm.fields.contact')}</Label>
        <Input id="contact_info" {...register('contact_info')} />
        {errors.contact_info && <Error>{errors.contact_info.message}</Error>}
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          {t('libraryForm.cancel')}
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isEdit
            ? t('libraryForm.buttons.edit')
            : t('libraryForm.buttons.create')}
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateLibraryForm
