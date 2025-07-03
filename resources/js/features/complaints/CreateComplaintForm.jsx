import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createComplaint, editComplaint } from '../../services/apiComplaints'

import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
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

function CreateComplaintForm({ complaintToEdit = {}, onCloseModal }) {
  const { t } = useTranslation()
  const isEditSession = Boolean(complaintToEdit.id)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession
      ? {
          status: complaintToEdit.status || '',
          resolved_at: complaintToEdit.resolved_at || '',
        }
      : {
          title: '',
          description: '',
        },
  })

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) =>
      isEditSession
        ? editComplaint(complaintToEdit.id, data)
        : createComplaint(data),
    onSuccess: (res) => {
      const complaint = res.data
      toast.success(
        isEditSession
          ? t('createComplaintForm.editSuccess', { title: complaint.title }) ||
              `Complaint "${complaint.title}" updated successfully`
          : t('createComplaintForm.submitSuccess', {
              title: complaint.title,
            }) || `New complaint "${complaint.title}" submitted`
      )
      queryClient.invalidateQueries({ queryKey: ['complaints'] })
      reset()
      onCloseModal?.()
    },
    onError: (err) => {
      toast.error(err.message || t('createComplaintForm.errorGeneric'))
    },
  })

  const onSubmit = (data) => {
    mutate(data)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {!isEditSession && (
        <>
          <FormRow>
            <Label htmlFor="title">{t('createComplaintForm.title')}</Label>
            <Input
              type="text"
              id="title"
              {...register('title', {
                required: t('createComplaintForm.validation.titleRequired'),
                maxLength: {
                  value: 255,
                  message: t('createComplaintForm.validation.titleMaxLength'),
                },
              })}
            />
            {errors?.title && <Error>{errors.title.message}</Error>}
          </FormRow>

          <FormRow>
            <Label htmlFor="description">
              {t('createComplaintForm.description')}
            </Label>
            <Input
              type="text"
              id="description"
              {...register('description', {
                required: t(
                  'createComplaintForm.validation.descriptionRequired'
                ),
                maxLength: {
                  value: 1000,
                  message: t(
                    'createComplaintForm.validation.descriptionMaxLength'
                  ),
                },
              })}
            />
            {errors?.description && <Error>{errors.description.message}</Error>}
          </FormRow>
        </>
      )}

      {isEditSession && (
        <>
          <FormRow>
            <Label htmlFor="status">{t('createComplaintForm.status')}</Label>
            <Select
              id="status"
              {...register('status', {
                required: t('createComplaintForm.validation.statusRequired'),
              })}
            >
              <option value="">{t('createComplaintForm.selectStatus')}</option>
              <option value="Pending">
                {t('createComplaintForm.statusOptions.pending')}
              </option>
              <option value="Resolved">
                {t('createComplaintForm.statusOptions.resolved')}
              </option>
              <option value="In Progress">
                {t('createComplaintForm.statusOptions.inProgress')}
              </option>
            </Select>
            {errors?.status && <Error>{errors.status.message}</Error>}
          </FormRow>

          <FormRow>
            <Label htmlFor="resolved_at">
              {t('createComplaintForm.resolvedAt')}
            </Label>
            <Input
              type="datetime-local"
              id="resolved_at"
              {...register('resolved_at')}
            />
          </FormRow>
        </>
      )}

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          {t('createComplaintForm.cancel')}
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isEditSession
            ? t('createComplaintForm.editComplaint')
            : t('createComplaintForm.submitComplaint')}
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateComplaintForm
