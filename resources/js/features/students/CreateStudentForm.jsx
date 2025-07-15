import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import DateObject from 'react-date-object'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import ShamsiDatePicker from '../../components/ShamsiDatePicker'
import {
  createStudent,
  editStudent,
  getStudents,
} from '../../services/apiStudents'
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
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onChange',
    defaultValues: isEditSession
      ? {
          ...studentToEdit,
          dob: new DateObject(studentToEdit?.dob),
          registration_date: new DateObject(studentToEdit?.registration_date),
          registration_deadline: new DateObject(
            studentToEdit?.registration_deadline
          ),
        }
      : {},
  })

  useEffect(() => {
    if (isEditSession) {
      reset({
        ...studentToEdit,
        dob: new DateObject(studentToEdit?.dob),
        registration_date: new DateObject(studentToEdit?.registration_date),
        registration_deadline: new DateObject(
          studentToEdit?.registration_deadline
        ),
      })
    }
  }, [studentToEdit, reset])

  const toISO = (d) => d?.toDate?.().toISOString().split('T')[0]

  const validateEmail = async (value) => {
    if (!value) return t('userForm.errors.email')
    try {
      const { data: students } = await getStudents()
      const emailExists = students.some(
        (student) => student.email === value && student.id !== studentToEdit?.id
      )
      return !emailExists || t('userForm.emailExists')
    } catch {
      return t('userForm.errors.emailCheckFailed')
    }
  }

  const validateIdNumber = async (value) => {
    if (!value) return t('studentForm.errors.idNumber')
    if (!/^\d+$/.test(value)) return t('studentForm.errors.idNumberInvalid')
    try {
      const { data: students } = await getStudents()
      const idExists = students.some(
        (student) =>
          String(student.id_number) === String(value) &&
          student.id !== studentToEdit?.id
      )
      return !idExists || t('studentForm.errors.idNumberTaken')
    } catch {
      return t('studentForm.errors.idCheckFailed')
    }
  }

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
    data.dob = toISO(data.dob)
    data.registration_date = toISO(data.registration_date)
    data.registration_deadline = toISO(data.registration_deadline)
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
              required: t('userForm.errors.email'),
              validate: validateEmail,
            })}
          />
          {errors.email && <Error>{errors.email.message}</Error>}
        </FormRow>

        {/* Password (only create) */}
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
          <Controller
            inputClass="calendar-input"
            name="dob"
            control={control}
            rules={{
              required: t('studentForm.errors.dob'),
              validate: (value) =>
                value?.toDate?.() <=
                new Date(new Date().setFullYear(new Date().getFullYear() - 10))
                  ? true
                  : t('studentForm.errors.dobTooYoung'),
            }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <>
                <ShamsiDatePicker
                  value={value}
                  onChange={onChange}
                  error={error?.message}
                />
              </>
            )}
          />
        </FormRow>

        {/* ID Number */}
        <FormRow>
          <Label htmlFor="id_number">{t('studentForm.idNumber')}</Label>
          <Input
            id="id_number"
            type="text"
            {...register('id_number', {
              required: t('studentForm.errors.idNumber'),
              validate: validateIdNumber,
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
            <option value="School_Student">
              {t('studentForm.errors.school_student')}
            </option>
            <option value="University_Student">
              {t('studentForm.errors.university_student')}
            </option>
            <option value="Kankor_Student">
              {t('studentForm.errors.kankor_student')}
            </option>
            <option value="Course_Student">
              {t('studentForm.errors.course_student')}
            </option>
            <option value="Others">{t('studentForm.errors.others')}</option>
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
          <Controller
            name="registration_date"
            control={control}
            rules={{ required: t('studentForm.errors.registrationDate') }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <>
                <ShamsiDatePicker
                  value={value}
                  onChange={onChange}
                  error={error?.message}
                />
              </>
            )}
          />
        </FormRow>

        {/* Phone */}
        {/* Phone */}
        <FormRow>
          <Label htmlFor="phone">{t('studentForm.phone')}</Label>
          <Input
            type="text"
            id="phone"
            placeholder="+93xxxxxxxxx"
            defaultValue="+93"
            style={{ direction: 'ltr', textAlign: 'left' }} // ✅ این خط را اضافه کن
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
          <Controller
            name="registration_deadline"
            control={control}
            rules={{
              required: t('studentForm.errors.registrationDeadline'),
              validate: (value) => {
                const deadline = value?.toDate?.()
                const regDate = watch('registration_date')?.toDate?.()
                return deadline >= regDate
                  ? true
                  : t('studentForm.errors.deadlineBeforeRegDate')
              },
            }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <>
                <ShamsiDatePicker
                  value={value}
                  onChange={onChange}
                  error={error?.message}
                />
              </>
            )}
          />
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
        <Button disabled={isLoading || isSubmitting}>
          {isEditSession ? t('studentForm.update') : t('studentForm.add')}
        </Button>
      </div>
    </Form>
  )
}

export default CreateStudentForm
