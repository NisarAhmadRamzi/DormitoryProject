import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getBooks } from '../../services/apiBooks'
import {
  createBorrowedBook,
  editBorrowedBook,
} from '../../services/apiBorrowedBooks'
import { getAllLibraryStudents } from '../../services/apiLibraryStudents'
import { getStudents } from '../../services/apiStudents'

import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import Input from '../../ui/Input'
import Select from '../../ui/Select'

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;
  padding: 1.2rem 0;

  input,
  select {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }

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

function CreateBorrowedBookForm({ borrowedBookToEdit = {}, onCloseModal }) {
  const { t } = useTranslation()
  const isEditSession = Boolean(borrowedBookToEdit.id)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? borrowedBookToEdit : {},
  })

  const queryClient = useQueryClient()
  const { data: studentsResponse } = useQuery(['students'], getStudents)
  const { data: libraryStudentsResponse } = useQuery(
    ['library-students'],
    getAllLibraryStudents
  )
  const { data: booksResponse } = useQuery(['books'], getBooks)

  const students = studentsResponse?.data || []
  const libraryStudents = libraryStudentsResponse?.data || []
  const books = booksResponse?.data || []
  const availableBooks = books.filter((b) => b.status === 'Available')

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) =>
      isEditSession
        ? editBorrowedBook(borrowedBookToEdit.id, data)
        : createBorrowedBook(data),
    onSuccess: () => {
      toast.success(
        isEditSession
          ? t('createBorrowedBookForm.successEdit')
          : t('createBorrowedBookForm.successCreate')
      )
      queryClient.invalidateQueries({ queryKey: ['borrowed-books'] })
      reset()
      onCloseModal?.()
    },
    onError: (err) => {
      const message = err?.response?.data?.errors
        ? Object.values(err.response.data.errors).flat().join(', ')
        : err?.response?.data?.message || t('createBorrowedBookForm.error')
      toast.error(message)
    },
  })

  const onSubmit = (data) => {
    mutate(data)
  }

  React.useEffect(() => {
    if (isEditSession && borrowedBookToEdit) {
      reset(borrowedBookToEdit)
    }
  }, [isEditSession, borrowedBookToEdit, reset])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="student_id">
          {t('createBorrowedBookForm.studentId')}
        </Label>
        <Select id="student_id" {...register('student_id')}>
          <option value="">{t('createBorrowedBookForm.selectOption')}</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.id} - {s.name}
            </option>
          ))}
        </Select>
        {errors?.student_id && <Error>{errors.student_id.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="library_student_id">
          {t('createBorrowedBookForm.libraryStudentId')}
        </Label>
        <Select
          id="library_student_id"
          {...register('library_student_id', {
            required: t('createBorrowedBookForm.libraryStudentId'),
          })}
        >
          <option value="">{t('createBorrowedBookForm.selectOption')}</option>
          {libraryStudents.map((ls) => (
            <option key={ls.id} value={ls.id}>
              {ls.id} - {ls.name} {ls.last_name}
            </option>
          ))}
        </Select>
        {errors?.library_student_id && (
          <Error>{errors.library_student_id.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="book_id">{t('createBorrowedBookForm.bookId')}</Label>
        <Select
          id="book_id"
          {...register('book_id', {
            required: t('createBorrowedBookForm.bookIdRequired'),
          })}
        >
          <option value="">{t('createBorrowedBookForm.selectOption')}</option>
          {availableBooks.map((b) => (
            <option key={b.id} value={b.id}>
              {b.id} - {b.title.slice(0, 30)}
              {b.title.length > 30 ? '...' : ''}
            </option>
          ))}
        </Select>
        {errors?.book_id && <Error>{errors.book_id.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="borrow_date">
          {t('createBorrowedBookForm.borrowDate')}
        </Label>
        <Input
          type="date"
          id="borrow_date"
          {...register('borrow_date', {
            required: t('createBorrowedBookForm.borrowDateRequired'),
          })}
        />
        {errors?.borrow_date && <Error>{errors.borrow_date.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="return_date">
          {t('createBorrowedBookForm.returnDate')}
        </Label>
        <Input
          type="date"
          id="return_date"
          {...register('return_date', {
            validate: (value) => {
              const borrowDate = new Date(watch('borrow_date'))
              const returnDate = new Date(value)
              if (value && returnDate < borrowDate) {
                return t('createBorrowedBookForm.returnDateValidation')
              }
              return true
            },
          })}
        />
        {errors?.return_date && <Error>{errors.return_date.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="status">{t('createBorrowedBookForm.status')}</Label>
        <Select
          id="status"
          {...register('status', {
            required: t('createBorrowedBookForm.statusRequired'),
          })}
        >
          <option value="">{t('createBorrowedBookForm.selectStatus')}</option>
          <option value="Borrowed">
            {t('createBorrowedBookForm.borrowed')}
          </option>
          <option value="Returned">
            {t('createBorrowedBookForm.returned')}
          </option>
          <option value="Overdue">{t('createBorrowedBookForm.overdue')}</option>
        </Select>
        {errors?.status && <Error>{errors.status.message}</Error>}
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
          disabled={isLoading}
        >
          {t('createBorrowedBookForm.cancel')}
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isEditSession
            ? t('createBorrowedBookForm.editButton')
            : t('createBorrowedBookForm.createButton')}
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateBorrowedBookForm
