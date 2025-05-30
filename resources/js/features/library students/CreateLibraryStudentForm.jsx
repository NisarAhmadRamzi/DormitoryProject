import {
  createLibraryStudent,
  editLibraryStudent,
} from '../../services/apiLibraryStudents'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import Button from '../../ui/Button'
import Form from '../../ui/Form'
import Input from '../../ui/Input'
import React from 'react'
import styled from 'styled-components'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'

const StyledSelect = styled.select`
  padding: 0.8rem;
  font-size: 1.6rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 0.4rem;
  width: 100%;
  outline: none;
  background-color: var(
    --color-grey-0
  ); /* dynamic background for light/dark mode */
  color: var(--color-grey-700); /* text color for readability in both modes */

  &:focus {
    border-color: var(
      --color-brand-600
    ); /* assuming --color-primary is same as brand */
  }

  option {
    background-color: var(
      --color-grey-0
    ); /* for dropdown option background in dark mode */
    color: var(--color-grey-700); /* for dropdown text */
  }

  &:disabled {
    background-color: var(--color-grey-200); /* use consistent disabled style */
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
      data.library_id = 1 // Force library_id to 1
      return isEditSession
        ? editLibraryStudent(studentToEdit.id, data)
        : createLibraryStudent(data)
    },
    onSuccess: (res) => {
      const student = res.data
      toast.success(
        isEditSession
          ? `Student "${student.name} ${student.last_name}" updated successfully`
          : `Student "${student.name} ${student.last_name}" created successfully`
      )
      queryClient.invalidateQueries({ queryKey: ['library-students'] })
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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGrid>
        <FormRow>
          <Label htmlFor="name">First Name</Label>
          <Input
            type="text"
            id="name"
            {...register('name', {
              required: 'First name is required',
              maxLength: { value: 255, message: 'Max 255 characters' },
            })}
          />
          {errors?.name && <Error>{errors.name.message}</Error>}
        </FormRow>
        <FormRow>
          <Label>Library ID (Fixed)</Label>
          <Input type="number" value="1" disabled readOnly />
        </FormRow>

        <FormRow>
          <Label htmlFor="last_name">Last Name</Label>
          <Input
            type="text"
            id="last_name"
            {...register('last_name', {
              required: 'Last name is required',
              maxLength: { value: 255, message: 'Max 255 characters' },
            })}
          />
          {errors?.last_name && <Error>{errors.last_name.message}</Error>}
        </FormRow>

        <FormRow>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            {...register('email', { required: 'Email is required' })}
          />
          {errors?.email && <Error>{errors.email.message}</Error>}
        </FormRow>

        {!isEditSession && (
          <FormRow>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'Min 8 characters' },
              })}
            />
            {errors?.password && <Error>{errors.password.message}</Error>}
          </FormRow>
        )}

        <FormRow>
          <Label htmlFor="address">Address</Label>
          <Input
            type="text"
            id="address"
            {...register('address', { required: 'Address is required' })}
          />
          {errors?.address && <Error>{errors.address.message}</Error>}
        </FormRow>

        <FormRow>
          <Label htmlFor="id_number">ID Number</Label>
          <Input
            type="text"
            id="id_number"
            {...register('id_number', { required: 'ID Number is required' })}
          />
          {errors?.id_number && <Error>{errors.id_number.message}</Error>}
        </FormRow>

        <FormRow>
          <Label htmlFor="academic_info">Academic Info</Label>
          <Input
            type="text"
            id="academic_info"
            {...register('academic_info')}
          />
        </FormRow>

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

        <FormRow>
          <Label htmlFor="phone">Phone</Label>
          <Input
            type="text"
            id="phone"
            {...register('phone', { required: 'Phone number is required' })}
          />
          {errors?.phone && <Error>{errors.phone.message}</Error>}
        </FormRow>

        <FormRow>
          <Label htmlFor="registration_deadline">Registration Deadline</Label>
          <Input
            type="date"
            id="registration_deadline"
            {...register('registration_deadline', {
              required: 'Deadline is required',
            })}
          />
          {errors?.registration_deadline && (
            <Error>{errors.registration_deadline.message}</Error>
          )}
        </FormRow>

        <FormRow>
          <Label htmlFor="gender">Gender</Label>
          <StyledSelect
            id="gender"
            {...register('gender', { required: 'Gender is required' })}
          >
            <option value="">-- Select gender --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </StyledSelect>
          {errors?.gender && <Error>{errors.gender.message}</Error>}
        </FormRow>

        <FormRow>
          <Label htmlFor="membership_status">Membership Status</Label>
          <StyledSelect
            id="membership_status"
            {...register('membership_status', {
              required: 'Membership status is required',
            })}
          >
            <option value="">-- Select status --</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
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
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isEditSession ? 'Edit Student' : 'Add Student'}
          </Button>
        </ButtonRow>
      </FormGrid>
    </Form>
  )
}

export default CreateLibraryStudentForm
