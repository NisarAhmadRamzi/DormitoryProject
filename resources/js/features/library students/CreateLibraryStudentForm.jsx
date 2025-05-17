// import {
//   createLibraryStudent,
//   editLibraryStudent,
// } from '../../services/apiLibraryStudents'
// import { useMutation, useQueryClient } from '@tanstack/react-query'

// import Button from '../../ui/Button'
// import Form from '../../ui/Form'
// import Input from '../../ui/Input'
// import React from 'react'
// import Select from '../../ui/Select'
// import styled from 'styled-components'
// import toast from 'react-hot-toast'
// import { useForm } from 'react-hook-form'

// const FormRow = styled.div`
//   display: grid;
//   align-items: center;
//   grid-template-columns: 24rem 1fr 1.2fr;
//   gap: 2.4rem;
//   padding: 1.2rem 0;

//   &:first-child {
//     padding-top: 0;
//   }
//   &:last-child {
//     padding-bottom: 0;
//   }
//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
//   &:has(button) {
//     display: flex;
//     justify-content: flex-end;
//     gap: 1.2rem;
//   }
// `

// const Label = styled.label`
//   font-weight: 500;
// `
// const Error = styled.span`
//   font-size: 1.4rem;
//   color: var(--color-red-700);
// `

// function CreateLibraryStudentForm({ studentToEdit = {}, onCloseModal }) {
//   const isEditSession = Boolean(studentToEdit.id)

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     defaultValues: isEditSession ? studentToEdit : {},
//   })

//   const queryClient = useQueryClient()

//   const { mutate, isLoading } = useMutation({
//     mutationFn: (data) =>
//       isEditSession
//         ? editLibraryStudent(studentToEdit.id, data)
//         : createLibraryStudent(data),
//     onSuccess: (res) => {
//       const student = res.data
//       toast.success(
//         isEditSession
//           ? `Student "${student.name} ${student.last_name}" updated successfully`
//           : `Student "${student.name} ${student.last_name}" created successfully`
//       )
//       queryClient.invalidateQueries({ queryKey: ['library-students'] })
//       reset()
//       onCloseModal?.()
//     },
//     onError: (err) => {
//       toast.error(err.message || 'Something went wrong')
//     },
//   })

//   const onSubmit = (data) => mutate(data)

//   React.useEffect(() => {
//     if (isEditSession && studentToEdit) {
//       reset(studentToEdit)
//     }
//   }, [isEditSession, studentToEdit, reset])

//   return (
//     <Form onSubmit={handleSubmit(onSubmit)}>
//       <FormRow>
//         <Label htmlFor="library_id">Library ID</Label>
//         <Input
//           type="number"
//           id="library_id"
//           {...register('library_id', { required: 'Library ID is required' })}
//         />
//         {errors?.library_id && <Error>{errors.library_id.message}</Error>}
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="name">First Name</Label>
//         <Input
//           type="text"
//           id="name"
//           {...register('name', {
//             required: 'First name is required',
//             maxLength: { value: 255, message: 'Max 255 characters' },
//           })}
//         />
//         {errors?.name && <Error>{errors.name.message}</Error>}
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="last_name">Last Name</Label>
//         <Input
//           type="text"
//           id="last_name"
//           {...register('last_name', {
//             required: 'Last name is required',
//             maxLength: { value: 255, message: 'Max 255 characters' },
//           })}
//         />
//         {errors?.last_name && <Error>{errors.last_name.message}</Error>}
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="email">Email</Label>
//         <Input
//           type="email"
//           id="email"
//           {...register('email', {
//             required: 'Email is required',
//           })}
//         />
//         {errors?.email && <Error>{errors.email.message}</Error>}
//       </FormRow>

//       {!isEditSession && (
//         <FormRow>
//           <Label htmlFor="password">Password</Label>
//           <Input
//             type="password"
//             id="password"
//             {...register('password', {
//               required: 'Password is required',
//               minLength: { value: 8, message: 'Min 8 characters' },
//             })}
//           />
//           {errors?.password && <Error>{errors.password.message}</Error>}
//         </FormRow>
//       )}

//       <FormRow>
//         <Label htmlFor="address">Address</Label>
//         <Input
//           type="text"
//           id="address"
//           {...register('address', { required: 'Address is required' })}
//         />
//         {errors?.address && <Error>{errors.address.message}</Error>}
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="phone">Phone</Label>
//         <Input
//           type="text"
//           id="phone"
//           {...register('phone', { required: 'Phone number is required' })}
//         />
//         {errors?.phone && <Error>{errors.phone.message}</Error>}
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="registration_date">Registration Date</Label>
//         <Input
//           type="date"
//           id="registration_date"
//           {...register('registration_date', {
//             required: 'Registration date is required',
//           })}
//         />
//         {errors?.registration_date && (
//           <Error>{errors.registration_date.message}</Error>
//         )}
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="registration_deadline">Registration Deadline</Label>
//         <Input
//           type="date"
//           id="registration_deadline"
//           {...register('registration_deadline', {
//             required: 'Deadline is required',
//           })}
//         />
//         {errors?.registration_deadline && (
//           <Error>{errors.registration_deadline.message}</Error>
//         )}
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="gender">Gender</Label>
//         <Select
//           id="gender"
//           {...register('gender', { required: 'Gender is required' })}
//           options={['Male', 'Female', 'Other']}
//         />
//         {errors?.gender && <Error>{errors.gender.message}</Error>}
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="membership_status">Membership Status</Label>
//         <Select
//           id="membership_status"
//           {...register('membership_status', {
//             required: 'Membership status is required',
//           })}
//           options={['Active', 'Expired']}
//         />
//         {errors?.membership_status && (
//           <Error>{errors.membership_status.message}</Error>
//         )}
//       </FormRow>

//       <FormRow>
//         <Button
//           variation="secondary"
//           type="reset"
//           onClick={() => onCloseModal?.()}
//         >
//           Cancel
//         </Button>
//         <Button type="submit" disabled={isLoading}>
//           {isEditSession ? 'Edit Student' : 'Add Student'}
//         </Button>
//       </FormRow>
//     </Form>
//   )
// }

// export default CreateLibraryStudentForm

import {
  createLibraryStudent,
  editLibraryStudent,
} from '../../services/apiLibraryStudents'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import Button from '../../ui/Button'
import Form from '../../ui/Form'
import Input from '../../ui/Input'
import React from 'react'
import Select from '../../ui/Select'
import styled from 'styled-components'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'

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
    mutationFn: (data) =>
      isEditSession
        ? editLibraryStudent(studentToEdit.id, data)
        : createLibraryStudent(data),
    onSuccess: (student) => {
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
      <FormRow>
        <Label htmlFor="library_id">Library ID</Label>
        <Input
          type="number"
          id="library_id"
          {...register('library_id', { required: 'Library ID is required' })}
        />
        {errors?.library_id && <Error>{errors.library_id.message}</Error>}
      </FormRow>

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
          {...register('email', {
            required: 'Email is required',
          })}
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
        <Label htmlFor="phone">Phone</Label>
        <Input
          type="text"
          id="phone"
          {...register('phone', { required: 'Phone number is required' })}
        />
        {errors?.phone && <Error>{errors.phone.message}</Error>}
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
        <Select
          id="gender"
          {...register('gender', { required: 'Gender is required' })}
          options={['Male', 'Female', 'Other']}
        />
        {errors?.gender && <Error>{errors.gender.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="membership_status">Membership Status</Label>
        <Select
          id="membership_status"
          {...register('membership_status', {
            required: 'Membership status is required',
          })}
          options={['Active', 'Expired']}
        />
        {errors?.membership_status && (
          <Error>{errors.membership_status.message}</Error>
        )}
      </FormRow>

      <FormRow>
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
      </FormRow>
    </Form>
  )
}

export default CreateLibraryStudentForm
