import { createStudent, editStudent } from '../../services/apiStudents'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import Button from '../../ui/Button'
import Form from '../../ui/Form'
import Input from '../../ui/Input'
import styled from 'styled-components'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

// Updated grid layout for 2 columns
const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.4rem;
  max-height: 70vh;
  overflow-y: auto;
  padding-right: 1rem;

  // Ensure modal or container has sufficient padding
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
        `Student ${isEditSession ? 'updated' : 'created'} successfully`
      )
      queryClient.invalidateQueries({ queryKey: ['students'] })
      onCloseModal?.()
      reset()
    },
    onError: (err) => toast.error(err.message || 'Something went wrong'),
  })

  const onSubmit = (data) => {
    if (!isEditSession && !data.password) {
      toast.error('Password is required for new students')
      return
    }
    if (!data.gender) {
      toast.error('Gender is required')
      return
    }
    mutate(data)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGrid>
        <FormRow>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <Error>{errors.name.message}</Error>}
        </FormRow>

        <FormRow>
          <Label htmlFor="f_name">Father's Name</Label>
          <Input
            id="f_name"
            {...register('f_name', { required: "Father's name is required" })}
          />
          {errors.f_name && <Error>{errors.f_name.message}</Error>}
        </FormRow>

        <FormRow>
          <Label htmlFor="last_name">Last Name</Label>
          <Input
            id="last_name"
            {...register('last_name', { required: 'Last name is required' })}
          />
          {errors.last_name && <Error>{errors.last_name.message}</Error>}
        </FormRow>

        <FormRow>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <Error>{errors.email.message}</Error>}
        </FormRow>

        {!isEditSession && (
          <FormRow>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <Error>{errors.password.message}</Error>}
          </FormRow>
        )}

        <FormRow>
          <Label htmlFor="from">From</Label>
          <Input
            id="from"
            {...register('from', { required: 'From is required' })}
          />
          {errors.from && <Error>{errors.from.message}</Error>}
        </FormRow>

        <FormRow>
          <Label htmlFor="dob">Date of Birth</Label>
          <Input
            id="dob"
            type="date"
            {...register('dob', { required: 'DOB is required' })}
          />
          {errors.dob && <Error>{errors.dob.message}</Error>}
        </FormRow>

        <FormRow>
          <Label htmlFor="id_number">ID Number</Label>
          <Input
            id="id_number"
            type="number"
            {...register('id_number', { required: 'ID number is required' })}
          />
          {errors.id_number && <Error>{errors.id_number.message}</Error>}
        </FormRow>

        <FormRow>
          <Label htmlFor="academic_info">Academic Info</Label>
          <Input id="academic_info" {...register('academic_info')} />
        </FormRow>

        <FormRow>
          <Label htmlFor="registration_date">Registration Date</Label>
          <Input
            id="registration_date"
            type="date"
            {...register('registration_date', {
              required: 'Registration date is required',
            })}
          />
          {errors.registration_date && (
            <Error>{errors.registration_date.message}</Error>
          )}
        </FormRow>

        <FormRow>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            {...register('phone', { required: 'Phone is required' })}
          />
          {errors.phone && <Error>{errors.phone.message}</Error>}
        </FormRow>

        <FormRow>
          <Label htmlFor="registration_deadline">Registration Deadline</Label>
          <Input
            id="registration_deadline"
            type="date"
            {...register('registration_deadline', {
              required: 'Deadline is required',
            })}
          />
          {errors.registration_deadline && (
            <Error>{errors.registration_deadline.message}</Error>
          )}
        </FormRow>

        <FormRow>
          <Label htmlFor="gender">Gender</Label>
          <SelectInput
            id="gender"
            {...register('gender', { required: 'Gender is required' })}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </SelectInput>
          {errors.gender && <Error>{errors.gender.message}</Error>}
        </FormRow>
      </FormGrid>

      {/* Actions below the form grid */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '1.2rem',
          marginTop: '1.6rem',
        }}
      >
        <Button type="reset" variation="secondary" onClick={() => reset()}>
          Reset
        </Button>
        <Button disabled={isLoading}>
          {isEditSession ? 'Update Student' : 'Add Student'}
        </Button>
      </div>
    </Form>
  )
}

export default CreateStudentForm
