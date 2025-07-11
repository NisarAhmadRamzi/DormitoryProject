import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { createRoom, editRoom, getCabins } from '../../services/apiCabins'
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
  const { id: editId, ...editValues } = roomToEdit
  const isEditSession = Boolean(roomToEdit.id)

  const queryClient = useQueryClient()
  const { data: cabinData } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  })

  const existingRoomNumbers = (cabinData?.data || [])
    .filter((r) => r.id !== editId)
    .map((room) => Number(room.room_number))

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession
      ? { ...editValues, room_number: Number(editValues.room_number) }
      : { price: 1000 },
  })

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

  const type = watch('type')
  const roomNumber = Number(watch('room_number'))
  const capacity = Number(watch('capacity'))

  useEffect(() => {
    if (type === '4 people') setValue('capacity', 4)
    else if (type === '6 people') setValue('capacity', 6)
    else if (type === '8 people') setValue('capacity', 8)
  }, [type, setValue])

  const onSubmit = (data) => mutate(data)

  const renderRoomOptions = () => {
    const range = (start, end) =>
      Array.from({ length: end - start + 1 }, (_, i) => start + i)

    const allRoomNumbers = [...range(301, 314), ...range(401, 414)]
    let availableNumbers = allRoomNumbers.filter(
      (num) => !existingRoomNumbers.includes(num)
    )

    if (isEditSession && roomToEdit.room_number) {
      const current = Number(roomToEdit.room_number)
      if (!availableNumbers.includes(current)) {
        availableNumbers = [current, ...availableNumbers].sort((a, b) => a - b)
      }
    }

    return availableNumbers.map((num) => (
      <option key={num} value={num}>
        {num}
      </option>
    ))
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)} // ✅ Removed onError here
      type={onCloseModal ? 'modal' : 'regular'}
    >
      {/* Room Number */}
      <FormRow>
        <Label htmlFor="room_number">{t('roomForm.roomNumber')}</Label>
        <StyledSelect
          id="room_number"
          {...register('room_number', {
            required: t('form.required'),
            validate: (value) =>
              !existingRoomNumbers.includes(Number(value)) ||
              t('roomForm.roomNumberExists'),
          })}
        >
          <option value="">{t('roomForm.selectRoomNumber')}</option>
          {renderRoomOptions()}
        </StyledSelect>
        {errors?.room_number && <Error>{errors.room_number.message}</Error>}
      </FormRow>

      {/* Room Type */}
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

      {/* Capacity */}
      <FormRow>
        <Label htmlFor="capacity">{t('roomForm.capacity')}</Label>
        <Input
          type="number"
          id="capacity"
          disabled={['4 people', '6 people', '8 people'].includes(type)}
          {...register('capacity', {
            validate: (value) => {
              const isAutoType = ['4 people', '6 people', '8 people'].includes(
                type
              )
              const parsed = Number(value)
              if (isAutoType) return true
              if (!value) return t('form.required')
              if (parsed <= 0) return t('roomForm.capacityMin')
              return true
            },
          })}
        />
        {errors?.capacity && <Error>{errors.capacity.message}</Error>}
      </FormRow>

      {/* Occupancy */}
      <FormRow>
        <Label htmlFor="current_occupancy">{t('roomForm.occupancy')}</Label>
        <Input
          type="number"
          id="current_occupancy"
          defaultValue={0}
          {...register('current_occupancy', {
            required: t('form.required'),
            validate: (value) => {
              const val = Number(value)
              if (val > 8) return t('roomForm.occupancyHardLimit')
              if (val > capacity) return t('roomForm.occupancyMax')
              if (val < 0) return t('roomForm.occupancyMin')
              return true
            },
          })}
        />
        {errors?.current_occupancy && (
          <Error>{errors.current_occupancy.message}</Error>
        )}
      </FormRow>

      {/* Price */}
      <FormRow>
        <Label htmlFor="price">{t('roomForm.price')}</Label>
        <Input
          type="number"
          step="1"
          id="price"
          {...register('price', {
            required: t('form.required'),
            validate: (value) => {
              const parsed = Number(value)
              if (isNaN(parsed)) return t('roomForm.priceInvalid')
              if (!Number.isInteger(parsed))
                return t('roomForm.priceIntegerOnly')
              if (parsed < 0) return t('roomForm.priceMin')
              return true
            },
          })}
        />
        {errors?.price && <Error>{errors.price.message}</Error>}
      </FormRow>

      {/* Status */}
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

      {/* Floor */}
      <FormRow>
        <Label htmlFor="floor">{t('roomForm.floor')}</Label>
        <StyledSelect
          id="floor"
          {...register('floor', {
            required: t('form.required'),
            validate: (value) => {
              if (
                roomNumber >= 301 &&
                roomNumber <= 314 &&
                value === 'Fourth Floor'
              ) {
                return t('roomForm.invalidFloorThird')
              }
              if (
                roomNumber >= 401 &&
                roomNumber <= 414 &&
                value === 'Third Floor'
              ) {
                return t('roomForm.invalidFloorFourth')
              }
              return true
            },
          })}
        >
          <option value="">{t('roomForm.selectFloor')}</option>
          <option value="Third Floor">{t('roomForm.third')}</option>
          <option value="Fourth Floor">{t('roomForm.fourth')}</option>
        </StyledSelect>
        {errors?.floor && <Error>{errors.floor.message}</Error>}
      </FormRow>

      {/* Buttons */}
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
