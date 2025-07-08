import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { createRoom, editRoom } from '../../services/apiCabins'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import Input from '../../ui/Input'

const StyledSelect = styled.select`
  padding: 0.8rem;
  font-size: 1.6rem;
  border: 1px solid var(--color-grey-200);
  border-radius: 0.4rem;
  width: 100%;
  outline: none;
  background-color: var(--color-grey-0);
  color: var(--color-grey-700);

  &:focus {
    border-color: var(--color-primary);
  }

  @media (prefers-color-scheme: dark) {
    background-color: var(--color-grey-800);
    color: var(--color-grey-300);
    border: 1px solid var(--color-grey-600);
  }
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

function CreateRoomForm({ roomToEdit = {}, onCloseModal }) {
  const { t } = useTranslation()
  const { id, editId, ...editValues } = roomToEdit
  const isEditSession = Boolean(roomToEdit.id)

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  })

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) =>
      isEditSession ? editRoom(roomToEdit.id, data) : createRoom(data),
    onSuccess: () => {
      toast.success(
        isEditSession
          ? t('roomForm.successUpdated')
          : t('roomForm.successCreated')
      )
      queryClient.invalidateQueries({ queryKey: ['cabins'] })
      reset()
      onCloseModal?.()
    },
    onError: (err) => toast.error(err.message),
  })

  const onSubmit = (data) => mutate(data)
  const onError = (err) => console.log(err)

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow>
        <Label htmlFor="room_number">{t('roomForm.roomNumber')}</Label>
        <Input
          type="number"
          id="room_number"
          defaultValue={301}
          {...register('room_number', {
            required: t('form.required'),
            min: { value: 301, message: t('roomForm.roomNumberMin') },
            max: { value: 314, message: t('roomForm.roomNumberMax') },
          })}
        />
        {errors?.room_number && <Error>{errors.room_number.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="type">{t('roomForm.type')}</Label>
        <StyledSelect
          id="type"
          {...register('type', { required: t('form.required') })}
        >
          <option value="">{t('roomForm.selectType')}</option>
          <option value="4 people">{t('roomForm.4people')}</option>
          <option value="6 people">{t('roomForm.6people')}</option>
          <option value="8 people">{t('roomForm.8people')}</option>
        </StyledSelect>
        {errors?.type && <Error>{errors.type.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="capacity">{t('roomForm.capacity')}</Label>
        <Input
          type="number"
          id="capacity"
          defaultValue={4}
          {...register('capacity', {
            required: t('form.required'),
            validate: (value) => value >= 0 || t('roomForm.capacityMin'),
          })}
        />
        {errors?.capacity && <Error>{errors.capacity.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="current_occupancy">{t('roomForm.occupancy')}</Label>
        <Input
          type="number"
          id="current_occupancy"
          defaultValue={0}
          {...register('current_occupancy', {
            required: t('form.required'),
            validate: (value) => value >= 0 || t('roomForm.occupancyMin'),
          })}
        />
        {errors?.current_occupancy && (
          <Error>{errors.current_occupancy.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="price">{t('roomForm.price')}</Label>
        <Input
          type="number"
          id="price"
          defaultValue={0}
          {...register('price', {
            required: t('form.required'),
            validate: (value) => value >= 0 || t('roomForm.priceMin'),
          })}
        />
        {errors?.price && <Error>{errors.price.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="status">{t('roomForm.status')}</Label>
        <StyledSelect
          id="status"
          {...register('status', { required: t('form.required') })}
        >
          <option value="">{t('roomForm.selectStatus')}</option>
          <option value="Available">{t('roomForm.available')}</option>
          <option value="Occupied">{t('roomForm.occupied')}</option>
        </StyledSelect>
        {errors?.status && <Error>{errors.status.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="floor">{t('roomForm.floor')}</Label>
        <StyledSelect
          id="floor"
          {...register('floor', { required: t('form.required') })}
        >
          <option value="">{t('roomForm.selectFloor')}</option>
          <option value="Third Floor">{t('roomForm.third')}</option>
          <option value="Fourth Floor">{t('roomForm.fourth')}</option>
        </StyledSelect>
        {errors?.floor && <Error>{errors.floor.message}</Error>}
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          {t('form.cancel')}
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isEditSession ? t('roomForm.edit') : t('roomForm.create')}
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateRoomForm
