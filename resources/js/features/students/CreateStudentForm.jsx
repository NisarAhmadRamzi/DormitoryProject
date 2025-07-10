import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { createStudent, editStudent } from '../../services/apiStudents'
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

function CreateStudentForm({ studentToEdit = {}, onCloseModal }) {
  const { t } = useTranslation()
  const isEditSession = Boolean(studentToEdit?.id)
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession
      ? {
          ...studentToEdit,
          registration_date: studentToEdit?.registration_date?.split('T')[0],
          registration_deadline:
            studentToEdit?.registration_deadline?.split('T')[0],
          dob: studentToEdit?.dob?.split('T')[0],
        }
      : {},
  })

  useEffect(() => {
    if (isEditSession) {
      reset({
        ...studentToEdit,
        registration_date: studentToEdit?.registration_date?.split('T')[0],
        registration_deadline:
          studentToEdit?.registration_deadline?.split('T')[0],
        dob: studentToEdit?.dob?.split('T')[0],
      })
    }
  }, [studentToEdit, reset])

  const { mutate, isLoading } = useMutation({
    mutationFn: isEditSession
      ? (data) => editStudent(studentToEdit.id, data)
      : createStudent,
    onSuccess: () => {
      toast.success(
        isEditSession
          ? t('studentForm.updatedSuccess')
          : t('studentForm.createdSuccess')
      )
      queryClient.invalidateQueries({ queryKey: ['students'] })
      onCloseModal?.()
      reset()
    },
    onError: (err) => {
      const errorData = err?.response?.data?.errors
      if (errorData) {
        Object.entries(errorData).forEach(([field, messages]) => {
          toast.error(`${field}: ${messages[0]}`)
        })
      } else {
        toast.error(err.message || t('studentForm.error'))
      }
    },
  })

  const onSubmit = (data) => {
    if (!isEditSession && !data.password) {
      toast.error(t('studentForm.errors.password'))
      return
    }
    if (!data.gender) {
      toast.error(t('studentForm.errors.gender'))
      return
    }
    mutate(data)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGrid>
        {/* Name */}
        <FormRow>
          <Label htmlFor="name">{t('studentForm.name')}</Label>
          <Input
            id="name"
            {...register('name', { required: t('studentForm.errors.name') })}
          />
          {errors.name && <Error>{errors.name.message}</Error>}
        </FormRow>

        {/* Father Name */}
        <FormRow>
          <Label htmlFor="f_name">{t('studentForm.fatherName')}</Label>
          <Input
            id="f_name"
            {...register('f_name', {
              required: t('studentForm.errors.fatherName'),
            })}
          />
          {errors.f_name && <Error>{errors.f_name.message}</Error>}
        </FormRow>

        {/* Last Name */}
        <FormRow>
          <Label htmlFor="last_name">{t('studentForm.lastName')}</Label>
          <Input
            id="last_name"
            {...register('last_name', {
              required: t('studentForm.errors.lastName'),
            })}
          />
          {errors.last_name && <Error>{errors.last_name.message}</Error>}
        </FormRow>

        {/* Email */}
        <FormRow>
          <Label htmlFor="email">{t('studentForm.email')}</Label>
          <Input
            id="email"
            type="email"
            {...register('email', {
              required: t('studentForm.errors.email'),
            })}
          />
          {errors.email && <Error>{errors.email.message}</Error>}
        </FormRow>

        {/* Password */}
        {!isEditSession && (
          <FormRow>
            <Label htmlFor="password">{t('studentForm.password')}</Label>
            <Input
              id="password"
              type="password"
              {...register('password', {
                required: t('studentForm.errors.password'),
              })}
            />
            {errors.password && <Error>{errors.password.message}</Error>}
          </FormRow>
        )}

        {/* From */}
        <FormRow>
          <Label htmlFor="from">{t('studentForm.origin')}</Label>
          <Input
            id="from"
            {...register('from', { required: t('studentForm.errors.origin') })}
          />
          {errors.from && <Error>{errors.from.message}</Error>}
        </FormRow>

        {/* DOB */}
        <FormRow>
          <Label htmlFor="dob">{t('studentForm.dob')}</Label>
          <Input
            id="dob"
            type="date"
            {...register('dob', {
              required: t('studentForm.errors.dob'),
              validate: (value) => {
                const selectedDate = new Date(value)
                const today = new Date()
                return selectedDate <= today
                  ? true
                  : t('studentForm.errors.dobFuture')
              },
            })}
          />
          {errors.dob && <Error>{errors.dob.message}</Error>}
        </FormRow>

        {/* ID Number */}
        <FormRow>
          <Label htmlFor="id_number">{t('studentForm.idNumber')}</Label>
          <Input
            id="id_number"
            type="text"
            {...register('id_number', {
              required: t('studentForm.errors.idNumber'),
              pattern: {
                value: /^\d+$/,
                message: t('studentForm.errors.idNumberInvalid'),
              },
              minLength: {
                value: 1,
                message: t('studentForm.errors.idNumberLength'),
              },
              maxLength: {
                value: 20,
                message: t('studentForm.errors.idNumberLength'),
              },
            })}
          />
          {errors.id_number && <Error>{errors.id_number.message}</Error>}
        </FormRow>

        {/* Academic Info */}
        <FormRow>
          <Label htmlFor="academic_info">{t('studentForm.academicInfo')}</Label>
          <SelectInput
            id="academic_info"
            {...register('academic_info', {
              required: t('studentForm.errors.academic_info'),
            })}
          >
            <option value="">{t('studentForm.errors.selectOption')}</option>
            <option value="School_Student">School_Student</option>
            <option value="University_Student">University_Student</option>
            <option value="Kankor_Student">Kankor_Student</option>
            <option value="Course_Student">Course_Student</option>
          </SelectInput>
          {errors.academic_info && (
            <Error>{errors.academic_info.message}</Error>
          )}
        </FormRow>

        {/* Registration Date */}
        <FormRow>
          <Label htmlFor="registration_date">
            {t('studentForm.registrationDate')}
          </Label>
          <Input
            id="registration_date"
            type="date"
            {...register('registration_date', {
              required: t('studentForm.errors.registrationDate'),
            })}
          />
          {errors.registration_date && (
            <Error>{errors.registration_date.message}</Error>
          )}
        </FormRow>
        <FormRow>
          <Label htmlFor="phone">{t('studentForm.phone')}</Label>
          <Input
            type="text"
            id="phone"
            placeholder="+93xxxxxxxxx"
            defaultValue="+93" // <-- This pre-fills the input with "+93"
            {...register('phone', {
              required: t('studentForm.errors.phone'),
              pattern: {
                value: /^\+93\d{9}$/,
                message: t('studentForm.errors.phoneLength'),
              },
              maxLength: {
                value: 13,
                message: t('studentForm.errors.phoneLength'),
              },
            })}
          />
          {errors?.phone && <Error>{errors.phone.message}</Error>}
        </FormRow>

        {/* Registration Deadline */}
        <FormRow>
          <Label htmlFor="registration_deadline">
            {t('studentForm.registrationDeadline')}
          </Label>
          <Input
            id="registration_deadline"
            type="date"
            {...register('registration_deadline', {
              required: t('studentForm.errors.registrationDeadline'),
              validate: (value) => {
                const deadline = new Date(value)
                const regDate = new Date(watch('registration_date'))
                return deadline >= regDate
                  ? true
                  : t('studentForm.errors.deadlineBeforeRegDate')
              },
            })}
          />
          {errors.registration_deadline && (
            <Error>{errors.registration_deadline.message}</Error>
          )}
        </FormRow>

        {/* Gender */}
        <FormRow>
          <Label htmlFor="gender">{t('studentForm.gender')}</Label>
          <SelectInput
            id="gender"
            {...register('gender', {
              required: t('studentForm.errors.gender'),
            })}
          >
            <option value="">{t('studentForm.selectGender')}</option>
            <option value="Male">{t('studentForm.male')}</option>
            <option value="Female">{t('studentForm.female')}</option>
            <option value="Other">{t('studentForm.other')}</option>
          </SelectInput>
          {errors.gender && <Error>{errors.gender.message}</Error>}
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
          {t('studentForm.reset')}
        </Button>
        <Button disabled={isLoading}>
          {isEditSession ? t('studentForm.update') : t('studentForm.add')}
        </Button>
      </div>
    </Form>
  )
}

export default CreateStudentForm
