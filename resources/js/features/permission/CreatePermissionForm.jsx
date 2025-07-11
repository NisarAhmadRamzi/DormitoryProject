import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPermission, editPermission } from '../../services/apiPermission'

import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import Button from '../../ui/Button'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Label = styled.label`
  font-weight: 500;
`

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 4px;
  background-color: var(--color-grey-0);
  color: var(--color-grey-700);
  transition: background-color 0.3s, color 0.3s, border 0.3s;

  &:focus {
    border-color: var(--color-brand-600);
    outline: none;
  }

  &:disabled {
    background-color: var(--color-grey-200);
    color: var(--color-grey-500);
  }
`

function CreatePermissionForm({ permissionToEdit = {}, onCloseModal }) {
  const { t } = useTranslation()
  const isEditSession = Boolean(permissionToEdit?.id)
  const queryClient = useQueryClient()

  const { register, handleSubmit, reset } = useForm({
    defaultValues: isEditSession ? { name: permissionToEdit.name } : {},
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: isEditSession
      ? (data) => editPermission(permissionToEdit.id, data)
      : createPermission,
    onSettled: () => {
      queryClient.invalidateQueries(['permissions'])
      onCloseModal?.()
      reset()
    },
    onSuccess: () => {
      toast.success(
        t(`permissions5.${isEditSession ? 'updateSuccess' : 'createSuccess'}`)
      )
    },
    onError: (err) => toast.error(err.message || t('permissions5.submitError')),
  })

  const onSubmit = (data) => {
    mutate(data)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor="name">{t('permissions5.nameLabel')}</Label>
      <Input
        id="name"
        {...register('name', {
          required: t('permissions5.nameRequired'),
        })}
      />
      <Button type="submit" disabled={isLoading}>
        {isEditSession ? t('permissions5.updateBtn') : t('permissions5.addBtn')}
      </Button>
    </Form>
  )
}

export default CreatePermissionForm
