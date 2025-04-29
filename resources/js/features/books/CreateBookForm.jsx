import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createBook, editBook } from '../../services/apiBooks'

import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import styled from 'styled-components'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import Input from '../../ui/Input'

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

function CreateBookForm({ bookToEdit = {}, onCloseModal }) {
  const isEditSession = Boolean(bookToEdit.id)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? bookToEdit : {},
  })

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) =>
      isEditSession ? editBook(bookToEdit.id, data) : createBook(data),
    onSuccess: (res) => {
      const book = res.data
      toast.success(
        isEditSession
          ? `Book "${book.title}" updated successfully`
          : `New book "${book.title}" created successfully`
      )
      queryClient.invalidateQueries({ queryKey: ['books'] })
      reset()
      onCloseModal?.()
    },
    onError: (err) => {
      toast.error(err.message || 'Something went wrong')
    },
  })

  const onSubmit = (data) => {
    // Convert publication_year to string format (YYYY)
    data.publication_year = String(data.publication_year)
    mutate(data)
  }

  React.useEffect(() => {
    if (isEditSession && bookToEdit) {
      reset(bookToEdit)
    }
  }, [isEditSession, bookToEdit, reset])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="library_id">Library ID</Label>
        <Input
          type="number"
          id="library_id"
          {...register('library_id', {
            required: 'Library ID is required',
            valueAsNumber: true,
          })}
        />
        {errors?.library_id && <Error>{errors.library_id.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          {...register('title', {
            required: 'Title is required',
            maxLength: {
              value: 255,
              message: 'Title must be under 255 characters',
            },
          })}
        />
        {errors?.title && <Error>{errors.title.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="author">Author</Label>
        <Input
          type="text"
          id="author"
          {...register('author', {
            required: 'Author is required',
            maxLength: {
              value: 255,
              message: 'Author must be under 255 characters',
            },
          })}
        />
        {errors?.author && <Error>{errors.author.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="publication_year">Publication Year</Label>
        <Input
          type="number"
          id="publication_year"
          {...register('publication_year', {
            required: 'Publication year is required',
            validate: (value) =>
              /^\d{4}$/.test(value) || 'Must be a 4-digit year (YYYY)',
          })}
        />
        {errors?.publication_year && (
          <Error>{errors.publication_year.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="status">Status</Label>
        <select
          id="status"
          {...register('status', {
            required: 'Status is required',
            validate: (value) =>
              ['Available', 'Borrowed'].includes(value) || 'Invalid status',
          })}
        >
          <option value="">-- Select Status --</option>
          <option value="Available">Available</option>
          <option value="Borrowed">Borrowed</option>
        </select>
        {errors?.status && <Error>{errors.status.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="books_total_count">Total Copies</Label>
        <Input
          type="number"
          id="books_total_count"
          {...register('books_total_count', {
            required: 'Total number of copies is required',
            min: {
              value: 1,
              message: 'Must be at least 1 copy',
            },
            valueAsNumber: true,
          })}
        />
        {errors?.books_total_count && (
          <Error>{errors.books_total_count.message}</Error>
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
          {isEditSession ? 'Edit Book' : 'Create New Book'}
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateBookForm
