import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { createUser, editUser } from '../../services/apiUser'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import Input from '../../ui/Input'

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;
  padding: 1.2rem 0;
  &:has(button) {
    display: flex;
    justify-content: flex-end;
  }
`

const Label = styled.label`
  font-weight: 500;
`

const Error = styled.span`
  font-size: 1.4rem;
  color: red;
`

const SelectInput = styled.select`
  font-size: 1.4rem;
  padding: 1.2rem;
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  color: var(--color-grey-700);
  width: 100%;
  transition: background-color 0.3s, color 0.3s, border 0.3s;

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

function CreateUserForm({ userToEdit = {}, onCloseModal }) {
  const { t } = useTranslation()
  const isEdit = Boolean(userToEdit.id)
  const [profileImage, setProfileImage] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      role: 'student',
    },
  })

  // Watch role for controlled select input
  const selectedRole = watch('role')

  // Set default values when editing
  useEffect(() => {
    if (isEdit && userToEdit) {
      reset({
        name: userToEdit.name || '',
        email: userToEdit.email || '',
      })
      const normalizedRole = userToEdit.role?.toLowerCase() || 'student'
      setValue('role', normalizedRole)
    }
  }, [isEdit, userToEdit, reset, setValue])

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) =>
      isEdit ? editUser(userToEdit.id, data) : createUser(data),
    onSuccess: () => {
      toast.success(
        t(isEdit ? 'userForm.updatedSuccess' : 'userForm.createdSuccess')
      )
      queryClient.invalidateQueries(['users'])
      onCloseModal?.()
    },
    onError: () => toast.error(t('userForm.error')),
  })

  const onSubmit = (data) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('email', data.email)
    if (data.password) formData.append('password', data.password)
    if (data.cpassword) formData.append('cpassword', data.cpassword)
    if (profileImage) formData.append('profile', profileImage)
    if (data.role) formData.append('role', data.role)
    mutate(formData)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label>{t('userForm.name')}</Label>
        <Input {...register('name', { required: t('userForm.errors.name') })} />
        {errors.name && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label>{t('userForm.email')}</Label>
        <Input
          type="email"
          {...register('email', { required: t('userForm.errors.email') })}
        />
        {errors.email && <Error>{errors.email.message}</Error>}
      </FormRow>

      {!isEdit && (
        <>
          <FormRow>
            <Label>{t('userForm.password')}</Label>
            <Input
              type="password"
              {...register('password', {
                required: t('userForm.errors.password'),
              })}
            />
            {errors.password && <Error>{errors.password.message}</Error>}
          </FormRow>

          <FormRow>
            <Label>{t('userForm.confirmPassword')}</Label>
            <Input
              type="password"
              {...register('cpassword', {
                required: t('userForm.errors.cpassword'),
              })}
            />
            {errors.cpassword && <Error>{errors.cpassword.message}</Error>}
          </FormRow>
        </>
      )}

      <FormRow>
        <Label>{t('userForm.role')}</Label>
        <SelectInput {...register('role')} value={selectedRole} onChange={(e) => setValue('role', e.target.value)}>
          <option value="admin">{t('roles.admin')}</option>
          <option value="second_admin">{t('roles.second_admin')}</option>
          <option value="student">{t('roles.student')}</option>
          <option value="library_admin">{t('roles.library_admin')}</option>
          <option value="library_student">{t('roles.library_student')}</option>
        </SelectInput>
      </FormRow>

      <FormRow>
        <Label>{t('userForm.profileImage')}</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setProfileImage(e.target.files[0])}
        />
      </FormRow>

      <FormRow>
        <Button type="submit" disabled={isLoading}>
          {isEdit ? t('userForm.update') : t('userForm.create')}
        </Button>
        <Button type="button" onClick={() => onCloseModal?.()}>
          {t('userForm.cancel')}
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateUserForm
