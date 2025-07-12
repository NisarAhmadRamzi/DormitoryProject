// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import React from 'react'
// import { useForm } from 'react-hook-form'
// import toast from 'react-hot-toast'
// import { useTranslation } from 'react-i18next'
// import styled from 'styled-components'
// import { createBook, editBook } from '../../services/apiBooks'
// import Button from '../../ui/Button'
// import Form from '../../ui/Form'
// import Input from '../../ui/Input'

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

// const Select = styled.select`
//   font-size: 1.6rem;
//   padding: 0.8rem 1.2rem;
//   border: 1px solid var(--color-grey-300);
//   border-radius: 5px;
//   background-color: var(--color-grey-0);
//   color: var(--color-grey-800);
//   width: 100%;

//   &:focus {
//     outline: none;
//     border-color: var(--color-brand-600);
//     box-shadow: 0 0 0 3px var(--color-brand-100);
//   }
// `

// function CreateBookForm({ bookToEdit = {}, onCloseModal }) {
//   const isEditSession = Boolean(bookToEdit.id)
//   const { t } = useTranslation()

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     defaultValues: isEditSession ? bookToEdit : {},
//   })

//   const queryClient = useQueryClient()

//   const { mutate, isLoading } = useMutation({
//     mutationFn: (data) =>
//       isEditSession ? editBook(bookToEdit.id, data) : createBook(data),
//     onSuccess: (res) => {
//       const book = res.data
//       toast.success(
//         isEditSession
//           ? t('createBookForm.updateSuccess', { title: book.title })
//           : t('createBookForm.createSuccess', { title: book.title })
//       )
//       queryClient.invalidateQueries({ queryKey: ['books'] })
//       reset()
//       onCloseModal?.()
//     },
//     onError: (err) => {
//       toast.error(err.message || t('createBookForm.error'))
//     },
//   })

//   const onSubmit = (data) => {
//     data.publication_year = String(data.publication_year)
//     const validStatuses = {
//       available: 'Available',
//       borrowed: 'Borrowed',
//     }
//     data.status = validStatuses[data.status?.toLowerCase()] || data.status
//     mutate(data)
//   }

//   React.useEffect(() => {
//     if (isEditSession && bookToEdit) {
//       reset(bookToEdit)
//     }
//   }, [isEditSession, bookToEdit, reset])

//   return (
//     <Form onSubmit={handleSubmit(onSubmit)}>
//       <FormRow>
//         <Label htmlFor="library_id" style={{ fontWeight: 'bold' }}>
//           {t('createBookForm.libraryId')}
//         </Label>

//         <Input
//           type="number"
//           id="library_id"
//           value={1}
//           readOnly
//           style={{
//             backgroundColor: '#e0f7fa',
//             border: '2px solid #0288d1',
//             fontWeight: 'bold',
//             padding: '0.5rem',
//             borderRadius: '5px',
//           }}
//           {...register('library_id', {
//             required: t('createBookForm.libraryIdRequired'),
//             valueAsNumber: true,
//           })}
//         />

//         {errors?.library_id && (
//           <Error style={{ color: 'red', fontSize: '0.875rem' }}>
//             {errors.library_id.message}
//           </Error>
//         )}
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="title">{t('createBookForm.title')}</Label>
//         <Input
//           type="text"
//           id="title"
//           {...register('title', {
//             required: t('createBookForm.titleRequired'),
//             maxLength: {
//               value: 255,
//               message: t('createBookForm.titleMaxLength'),
//             },
//           })}
//         />
//         {errors?.title && <Error>{errors.title.message}</Error>}
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="author">{t('createBookForm.author')}</Label>
//         <Input
//           type="text"
//           id="author"
//           {...register('author', {
//             required: t('createBookForm.authorRequired'),
//             maxLength: {
//               value: 255,
//               message: t('createBookForm.authorMaxLength'),
//             },
//           })}
//         />
//         {errors?.author && <Error>{errors.author.message}</Error>}
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="publication_year">
//           {t('createBookForm.publicationYear')}
//         </Label>
//         <Input
//           type="number"
//           id="publication_year"
//           {...register('publication_year', {
//             required: t('createBookForm.publicationYearRequired'),
//             validate: (value) =>
//               /^\d{4}$/.test(value) ||
//               t('createBookForm.publicationYearInvalid'),
//           })}
//         />
//         {errors?.publication_year && (
//           <Error>{errors.publication_year.message}</Error>
//         )}
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="status">{t('createBookForm.status')}</Label>
//         <Select
//           id="status"
//           {...register('status', {
//             required: t('createBookForm.statusRequired'),
//             validate: (value) =>
//               ['Available', 'Borrowed'].includes(value) ||
//               t('createBookForm.statusInvalid'),
//           })}
//         >
//           <option value="">-- {t('createBookForm.selectStatus')} --</option>
//           <option value="Available">{t('createBookForm.available')}</option>
//           <option value="Borrowed">{t('createBookForm.borrowed')}</option>
//         </Select>
//         {errors?.status && <Error>{errors.status.message}</Error>}
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="books_total_count">
//           {t('createBookForm.totalCopies')}
//         </Label>
//         <Input
//           type="number"
//           id="books_total_count"
//           {...register('books_total_count', {
//             required: t('createBookForm.totalCopiesRequired'),
//             min: {
//               value: 1,
//               message: t('createBookForm.minCopies'),
//             },
//             valueAsNumber: true,
//           })}
//         />
//         {errors?.books_total_count && (
//           <Error>{errors.books_total_count.message}</Error>
//         )}
//       </FormRow>

//       <FormRow>
//         <Button
//           variation="secondary"
//           type="reset"
//           onClick={() => onCloseModal?.()}
//         >
//           {t('createBookForm.cancel')}
//         </Button>
//         <Button type="submit" disabled={isLoading}>
//           {isEditSession
//             ? t('createBookForm.editBook')
//             : t('createBookForm.createBook')}
//         </Button>
//       </FormRow>
//     </Form>
//   )
// }

// export default CreateBookForm

import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { createBook, editBook } from '../../services/apiBooks'
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

const Select = styled.select`
  font-size: 1.6rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 5px;
  background-color: var(--color-grey-0);
  color: var(--color-grey-800);
  width: 100%;

  &:focus {
    outline: none;
    border-color: var(--color-brand-600);
    box-shadow: 0 0 0 3px var(--color-brand-100);
  }
`

function CreateBookForm({ bookToEdit = {}, onCloseModal }) {
  const isEditSession = Boolean(bookToEdit.id)
  const { t } = useTranslation()

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
          ? t('createBookForm.updateSuccess', { title: book.title })
          : t('createBookForm.createSuccess', { title: book.title })
      )
      queryClient.invalidateQueries({ queryKey: ['books'] })
      reset()
      onCloseModal?.()
    },
    onError: (err) => {
      toast.error(err.message || t('createBookForm.error'))
    },
  })

  const onSubmit = (data) => {
    data.publication_year = String(data.publication_year)
    const validStatuses = {
      available: 'Available',
      'not available': 'Not Available',
    }
    data.status = validStatuses[data.status?.toLowerCase()] || data.status
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
        <Label htmlFor="library_id" style={{ fontWeight: 'bold' }}>
          {t('createBookForm.libraryId')}
        </Label>

        <Input
          type="number"
          id="library_id"
          value={1}
          readOnly
          style={{
            backgroundColor: '#e0f7fa',
            border: '2px solid #0288d1',
            fontWeight: 'bold',
            padding: '0.5rem',
            borderRadius: '5px',
          }}
          {...register('library_id', {
            required: t('createBookForm.libraryIdRequired'),
            valueAsNumber: true,
          })}
        />

        {errors?.library_id && <Error>{errors.library_id.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="title">{t('createBookForm.title')}</Label>
        <Input
          type="text"
          id="title"
          {...register('title', {
            required: t('createBookForm.titleRequired'),
            maxLength: {
              value: 255,
              message: t('createBookForm.titleMaxLength'),
            },
          })}
        />
        {errors?.title && <Error>{errors.title.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="author">{t('createBookForm.author')}</Label>
        <Input
          type="text"
          id="author"
          {...register('author', {
            required: t('createBookForm.authorRequired'),
            maxLength: {
              value: 255,
              message: t('createBookForm.authorMaxLength'),
            },
          })}
        />
        {errors?.author && <Error>{errors.author.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="publication_year">
          {t('createBookForm.publicationYear')}
        </Label>
        <Input
          type="number"
          id="publication_year"
          {...register('publication_year', {
            required: t('createBookForm.publicationYearRequired'),
            validate: (value) => {
              if (!/^\d{4}$/.test(value)) {
                return t('createBookForm.publicationYearInvalid')
              }
              const currentYear = new Date().getFullYear()
              if (parseInt(value) > currentYear) {
                return t('createBookForm.publicationYearInvalid')
              }
              return true
            },
          })}
        />
        {errors?.publication_year && (
          <Error>{errors.publication_year.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="status">{t('createBookForm.status')}</Label>
        <Select
          id="status"
          {...register('status', {
            required: t('createBookForm.statusRequired'),
            validate: (value) =>
              ['Available', 'Not Available'].includes(value) ||
              t('createBookForm.statusInvalid'),
          })}
        >
          <option value="">-- {t('createBookForm.selectStatus')} --</option>
          <option value="Available">{t('createBookForm.available')}</option>
          <option value="Not Available">
            {t('createBookForm.notAvailable')}
          </option>
        </Select>
        {errors?.status && <Error>{errors.status.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="books_total_count">
          {t('createBookForm.totalCopies')}
        </Label>
        <Input
          type="number"
          id="books_total_count"
          {...register('books_total_count', {
            required: t('createBookForm.totalCopiesRequired'),
            min: {
              value: 1,
              message: t('createBookForm.minCopies'),
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
          {t('createBookForm.cancel')}
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isEditSession
            ? t('createBookForm.editBook')
            : t('createBookForm.createBook')}
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateBookForm
