import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createLibraryStudent,
  editLibraryStudent,
} from '../../services/apiLibraryStudents'

import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import Input from '../../ui/Input'

const StyledSelect = styled.select`
  padding: 0.8rem;
  font-size: 1.6rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 0.4rem;
  width: 100%;
  outline: none;
  background-color: var(--color-grey-0);
  color: var(--color-grey-700);

  &:focus {
    border-color: var(--color-brand-600);
  }

  option {
    background-color: var(--color-grey-0);
    color: var(--color-grey-700);
  }

  &:disabled {
    background-color: var(--color-grey-200);
    color: var(--color-grey-500);
  }
`

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.4rem;
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
  font-size: 1.4rem;
  color: var(--color-red-700);
`

const ButtonRow = styled.div`
  grid-column: span 2;
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
  margin-top: 2rem;
`

function CreateLibraryStudentForm({ studentToEdit = {}, onCloseModal }) {
  const { t } = useTranslation()
  const isEditSession = Boolean(studentToEdit.id)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? studentToEdit : {},
  })

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => {
      data.library_id = 1
      return isEditSession
        ? editLibraryStudent(studentToEdit.id, data)
        : createLibraryStudent(data)
    },
    onSuccess: (res) => {
      const student = res.data
      toast.success(
        isEditSession
          ? t('libraryStudentForm.updateSuccess', {
              name: student.name,
              lastName: student.last_name,
            })
          : t('libraryStudentForm.createSuccess', {
              name: student.name,
              lastName: student.last_name,
            })
      )
      queryClient.invalidateQueries({ queryKey: ['library-students'] })
      reset()
      onCloseModal?.()
    },
    onError: (err) => {
      toast.error(err.message || t('libraryStudentForm.genericError'))
    },
  })

  const onSubmit = (data) => mutate(data)

  React.useEffect(() => {
    if (isEditSession && studentToEdit) {
      reset(studentToEdit)
    }
  }, [isEditSession, studentToEdit, reset])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGrid>
        <FormRow>
          <Label htmlFor="name">{t('libraryStudentForm.name')}</Label>
          <Input
            type="text"
            id="name"
            {...register('name', {
              required: t('libraryStudentForm.validation.nameRequired'),
              maxLength: {
                value: 255,
                message: t('libraryStudentForm.validation.maxLength'),
              },
            })}
          />
          {errors?.name && <Error>{errors.name.message}</Error>}
        </FormRow>

        <FormRow>
          <Label>{t('libraryStudentForm.libraryIdFixed')}</Label>
          <Input type="number" value="1" disabled readOnly />
        </FormRow>

        <FormRow>
          <Label htmlFor="last_name">{t('libraryStudentForm.lastName')}</Label>
          <Input
            type="text"
            id="last_name"
            {...register('last_name', {
              required: t('libraryStudentForm.validation.lastNameRequired'),
              maxLength: {
                value: 255,
                message: t('libraryStudentForm.validation.maxLength'),
              },
            })}
          />
          {errors?.last_name && <Error>{errors.last_name.message}</Error>}
        </FormRow>

        <FormRow>
          <Label htmlFor="email">{t('libraryStudentForm.email')}</Label>
          <Input
            type="email"
            id="email"
            {...register('email', {
              required: t('libraryStudentForm.validation.emailRequired'),
            })}
          />
          {errors?.email && <Error>{errors.email.message}</Error>}
        </FormRow>

        {!isEditSession && (
          <FormRow>
            <Label htmlFor="password">{t('libraryStudentForm.password')}</Label>
            <Input
              type="password"
              id="password"
              {...register('password', {
                required: t('libraryStudentForm.validation.passwordRequired'),
                minLength: {
                  value: 8,
                  message: t('libraryStudentForm.validation.passwordMin'),
                },
              })}
            />
            {errors?.password && <Error>{errors.password.message}</Error>}
          </FormRow>
        )}

        <FormRow>
          <Label htmlFor="address">{t('libraryStudentForm.address')}</Label>
          <Input
            type="text"
            id="address"
            {...register('address', {
              required: t('libraryStudentForm.validation.addressRequired'),
            })}
          />
          {errors?.address && <Error>{errors.address.message}</Error>}
        </FormRow>

        <FormRow>
          <Label htmlFor="id_number">{t('libraryStudentForm.idNumber')}</Label>
          <Input
            type="text"
            id="id_number"
            {...register('id_number', {
              required: t('libraryStudentForm.validation.idNumberRequired'),
            })}
          />
          {errors?.id_number && <Error>{errors.id_number.message}</Error>}
        </FormRow>

        <FormRow>
          <Label htmlFor="academic_info">
            {t('libraryStudentForm.academicInfo')}
          </Label>
          <Input
            type="text"
            id="academic_info"
            {...register('academic_info')}
          />
        </FormRow>

        <FormRow>
          <Label htmlFor="registration_date">
            {t('libraryStudentForm.registrationDate')}
          </Label>
          <Input
            type="date"
            id="registration_date"
            {...register('registration_date', {
              required: t(
                'libraryStudentForm.validation.registrationDateRequired'
              ),
            })}
          />
          {errors?.registration_date && (
            <Error>{errors.registration_date.message}</Error>
          )}
        </FormRow>

        <FormRow>
          <Label htmlFor="phone">{t('libraryStudentForm.phone')}</Label>
          <Input
            type="text"
            id="phone"
            {...register('phone', {
              required: t('libraryStudentForm.validation.phoneRequired'),
            })}
          />
          {errors?.phone && <Error>{errors.phone.message}</Error>}
        </FormRow>

        <FormRow>
          <Label htmlFor="registration_deadline">
            {t('libraryStudentForm.registrationDeadline')}
          </Label>
          <Input
            type="date"
            id="registration_deadline"
            {...register('registration_deadline', {
              required: t('libraryStudentForm.validation.deadlineRequired'),
            })}
          />
          {errors?.registration_deadline && (
            <Error>{errors.registration_deadline.message}</Error>
          )}
        </FormRow>

        <FormRow>
          <Label htmlFor="gender">{t('libraryStudentForm.gender')}</Label>
          <StyledSelect
            id="gender"
            {...register('gender', {
              required: t('libraryStudentForm.validation.genderRequired'),
            })}
          >
            <option value="">{t('libraryStudentForm.selectGender')}</option>
            <option value="Male">
              {t('libraryStudentForm.genderOptions.male')}
            </option>
            <option value="Female">
              {t('libraryStudentForm.genderOptions.female')}
            </option>
            <option value="Other">
              {t('libraryStudentForm.genderOptions.other')}
            </option>
          </StyledSelect>
          {errors?.gender && <Error>{errors.gender.message}</Error>}
        </FormRow>

        <FormRow>
          <Label htmlFor="membership_status">
            {t('libraryStudentForm.membershipStatus')}
          </Label>
          <StyledSelect
            id="membership_status"
            {...register('membership_status', {
              required: t('libraryStudentForm.validation.statusRequired'),
            })}
          >
            <option value="">{t('libraryStudentForm.selectStatus')}</option>
            <option value="Active">
              {t('libraryStudentForm.statusOptions.active')}
            </option>
            <option value="Expired">
              {t('libraryStudentForm.statusOptions.expired')}
            </option>
          </StyledSelect>
          {errors?.membership_status && (
            <Error>{errors.membership_status.message}</Error>
          )}
        </FormRow>

        <ButtonRow>
          <Button
            variation="secondary"
            type="reset"
            onClick={() => onCloseModal?.()}
          >
            {t('libraryStudentForm.cancel')}
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isEditSession
              ? t('libraryStudentForm.editStudent')
              : t('libraryStudentForm.addStudent')}
          </Button>
        </ButtonRow>
      </FormGrid>
    </Form>
  )
}

export default CreateLibraryStudentForm
