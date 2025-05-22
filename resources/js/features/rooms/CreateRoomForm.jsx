import { createRoom, editRoom } from '../../services/apiCabins'
// export default CreateRoomForm
import { useMutation, useQueryClient } from '@tanstack/react-query'

import Button from '../../ui/Button'
import Form from '../../ui/Form'
import Input from '../../ui/Input'
import styled from 'styled-components'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'

const StyledSelect = styled.select`
  padding: 0.8rem;
  font-size: 1.6rem;
  border: 1px solid var(--color-grey-200);
  border-radius: 0.4rem;
  width: 100%;
  outline: none;
  background-color: var(--color-grey-0); /* Light mode background */
  color: var(--color-grey-700); /* Light mode text color */

  &:focus {
    border-color: var(--color-primary);
  }

  /* Dark mode styles */
  @media (prefers-color-scheme: dark) {
    background-color: var(--color-grey-800); /* Dark mode background */
    color: var(--color-grey-300); /* Dark mode text color */
    border: 1px solid var(--color-grey-600); /* Dark mode border */
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
          ? 'Room updated successfully'
          : 'New room successfully created'
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
        <Label htmlFor="room_number">Room Number</Label>
        <Input
          type="number"
          id="room_number"
          defaultValue={301}
          {...register('room_number', {
            required: 'This field is required',
            min: { value: 301, message: 'Room Number should be at least 301' },
            max: {
              value: 310,
              message: 'Room Number cannot be more than is 310',
            },
          })}
        />
        {errors?.room_number && <Error>{errors.room_number.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="type">Room Type</Label>
        <StyledSelect
          id="type"
          {...register('type', { required: 'This field is required' })}
        >
          <option value="">-- Select type --</option>
          <option value="4 people">4 people</option>
          <option value="6 people">6 people</option>
          <option value="8 people">8 people</option>
        </StyledSelect>
        {errors?.type && <Error>{errors.type.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="capacity">Capacity</Label>
        <Input
          type="number"
          id="capacity"
          defaultValue={4}
          {...register('capacity', {
            required: 'This field is required',
            validate: (value) => value >= 0 || 'Capacity cannot be less than 0',
          })}
        />
        {errors?.capacity && <Error>{errors.capacity.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="current_occupancy">Current Occupancy</Label>
        <Input
          type="number"
          id="current_occupancy"
          defaultValue={0}
          {...register('current_occupancy', {
            required: 'This field is required',
            validate: (value) =>
              value >= 0 || 'Current occupancy cannot be less than 0',
          })}
        />
        {errors?.current_occupancy && (
          <Error>{errors.current_occupancy.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="price">Price</Label>
        <Input
          type="number"
          id="price"
          defaultValue={0}
          {...register('price', {
            required: 'This field is required',
            validate: (value) => value >= 0 || 'Price cannot be less than 0',
          })}
        />
        {errors?.price && <Error>{errors.price.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="status">Status</Label>
        <StyledSelect
          id="status"
          {...register('status', { required: 'This field is required' })}
        >
          <option value="">-- Select status --</option>
          <option value="Available">Available</option>
          <option value="Occupied">Occupied</option>
        </StyledSelect>
        {errors?.status && <Error>{errors.status.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="floor">Floor</Label>
        <StyledSelect
          id="floor"
          {...register('floor', { required: 'This field is required' })}
        >
          <option value="">-- Select floor --</option>
          <option value="Third Floor">Third Floor</option>
          <option value="Fourth Floor">Fourth Floor</option>
        </StyledSelect>
        {errors?.floor && <Error>{errors.floor.message}</Error>}
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
          {isEditSession ? 'Edit room' : 'Create new room'}
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateRoomForm
