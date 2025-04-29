import { createStudent, editStudent } from '../../services/apiStudents'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import Button from '../../ui/Button'
import Form from '../../ui/Form'
import Input from '../../ui/Input'
import React from 'react'
import styled from 'styled-components'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'

const FormWrapper = styled.div`
  background-color: var(--color-grey-0);
  padding: 2.4rem;
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  max-height: 80vh;
  overflow-y: auto;
`

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

function CreateStudentForm({ studentToEdit = {}, onCloseModal }) {
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
    mutationFn: (data) =>
      isEditSession ? editStudent(studentToEdit.id, data) : createStudent(data),
    onSuccess: (res) => {
      const student = res.data
      toast.success(
        isEditSession
          ? `Student "${student.name}" updated successfully`
          : `New student "${student.name}" created successfully`
      )
      queryClient.invalidateQueries({ queryKey: ['students'] })
      reset()
      onCloseModal?.()
    },
    onError: (err) => {
      toast.error(err.message || 'Something went wrong')
    },
  })

  const onSubmit = (data) => mutate(data)

  React.useEffect(() => {
    if (isEditSession && studentToEdit) {
      reset(studentToEdit)
    }
  }, [isEditSession, studentToEdit, reset])

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Username */}
        <FormRow>
          <Label htmlFor="name">Username</Label>
          <Input
            type="text"
            id="name"
            {...register('name', {
              required: 'Username is required',
              maxLength: {
                value: 255,
                message: 'Username must be under 255 characters',
              },
            })}
          />
          {errors?.name && <Error>{errors.name.message}</Error>}
        </FormRow>

        {/* Email */}
        <FormRow>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: 'Invalid email address',
              },
            })}
          />
          {errors?.email && <Error>{errors.email.message}</Error>}
        </FormRow>

        {/* First Name */}
        <FormRow>
          <Label htmlFor="f_name">First Name</Label>
          <Input
            type="text"
            id="f_name"
            {...register('f_name', {
              required: 'First name is required',
            })}
          />
          {errors?.f_name && <Error>{errors.f_name.message}</Error>}
        </FormRow>
        {/* ID Number */}
        <FormRow>
          <Label htmlFor="id_number">ID Number</Label>
          <Input
            type="number"
            id="id_number"
            {...register('id_number', {
              required: 'ID number is required',
              minLength: {
                value: 1,
                message: 'ID number must have at least 1 digit',
              },
              maxLength: {
                value: 20,
                message: 'ID number must not exceed 20 digits',
              },
            })}
          />
          {errors?.id_number && <Error>{errors.id_number.message}</Error>}
        </FormRow>

        {/* Password */}
        <FormRow>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            {...register('password', {
              required: !isEditSession ? 'Password is required' : false,
              minLength: {
                value: 6,
                message: 'Password should be at least 6 characters',
              },
            })}
          />
          {errors?.password && <Error>{errors.password.message}</Error>}
        </FormRow>

        {/* Last Name */}
        <FormRow>
          <Label htmlFor="last_name">Last Name</Label>
          <Input
            type="text"
            id="last_name"
            {...register('last_name', {
              required: 'Last name is required',
            })}
          />
          {errors?.last_name && <Error>{errors.last_name.message}</Error>}
        </FormRow>

        {/* From */}
        <FormRow>
          <Label htmlFor="from">From</Label>
          <Input
            type="text"
            id="from"
            {...register('from', {
              required: 'Origin is required',
            })}
          />
          {errors?.from && <Error>{errors.from.message}</Error>}
        </FormRow>

        {/* Date of Birth */}
        <FormRow>
          <Label htmlFor="dob">Date of Birth</Label>
          <Input
            type="date"
            id="dob"
            {...register('dob', {
              required: 'Date of birth is required',
            })}
          />
          {errors?.dob && <Error>{errors.dob.message}</Error>}
        </FormRow>

        {/* Phone */}
        <FormRow>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            type="text"
            id="phone"
            {...register('phone', {
              required: 'Phone number is required',
            })}
          />
          {errors?.phone && <Error>{errors.phone.message}</Error>}
        </FormRow>

        {/* Registration Date */}
        <FormRow>
          <Label htmlFor="registration_date">Registration Date</Label>
          <Input
            type="date"
            id="registration_date"
            {...register('registration_date', {
              required: 'Registration date is required',
            })}
          />
          {errors?.registration_date && (
            <Error>{errors.registration_date.message}</Error>
          )}
        </FormRow>

        {/* Registration Deadline */}
        <FormRow>
          <Label htmlFor="registration_deadline">Registration Deadline</Label>
          <Input
            type="date"
            id="registration_deadline"
            {...register('registration_deadline', {
              required: 'Registration deadline is required',
            })}
          />
          {errors?.registration_deadline && (
            <Error>{errors.registration_deadline.message}</Error>
          )}
        </FormRow>

        {/* Gender */}
        <FormRow>
          <Label htmlFor="gender">Gender</Label>
          <select
            id="gender"
            {...register('gender', { required: 'Gender is required' })}
            style={{
              padding: '0.8rem',
              borderRadius: '4px',
              border: '1px solid var(--color-grey-300)',
            }}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors?.gender && <Error>{errors.gender.message}</Error>}
        </FormRow>

        {/* Buttons */}
        <FormRow>
          <Button
            variation="secondary"
            type="reset"
            onClick={() => onCloseModal?.()}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isEditSession ? 'Edit Student' : 'Create New Student'}
          </Button>
        </FormRow>
      </Form>
    </FormWrapper>
  )
}

export default CreateStudentForm
