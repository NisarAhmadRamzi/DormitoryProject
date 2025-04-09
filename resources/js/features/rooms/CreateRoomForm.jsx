import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import styled from 'styled-components'
import { createRoom } from '../../services/apiCabins'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import Input from '../../ui/Input'

// Custom styled Select component to match the input styling
const StyledSelect = styled.select`
  padding: 0.8rem;
  font-size: 1.6rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 0.4rem;
  width: 100%;
  outline: none;
  background-color: #fff;

  &:focus {
    border-color: var(--color-primary);
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

function CreateRoomForm() {
  const { register, handleSubmit, reset } = useForm()
  const queryClient = useQueryClient()

  // Set up mutation for creating a room
  const { mutate, isLoading } = useMutation({
    mutationFn: createRoom, // Using the createRoom function to send data
    onSuccess: () => {
      toast.success('New room successfully created')
      queryClient.invalidateQueries({
        queryKey: ['cabins'], // Invalidate the "cabins" query to refetch the list of rooms
      })
      reset() // Reset form fields
    },
    onError: (err) => toast.error(err.message),
  })

  const onSubmit = (data) => {
    mutate(data) // Trigger the mutation with form data
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="room_number">Room Number</Label>
        <Input
          type="number"
          id="room_number"
          defaultValue={301}
          {...register('room_number')}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="type">Room Type</Label>
        <StyledSelect id="type" {...register('type')}>
          <option value="4 people">4 people</option>
          <option value="6 people">6 people</option>
          <option value="8 people">8 people</option>
        </StyledSelect>
      </FormRow>

      <FormRow>
        <Label htmlFor="capacity">Capacity</Label>
        <Input
          type="number"
          id="capacity"
          defaultValue={4}
          {...register('capacity')}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="current_occupancy">Current Occupancy</Label>
        <Input
          type="number"
          id="current_occupancy"
          defaultValue={0}
          {...register('current_occupancy')}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="price">Price</Label>
        <Input
          type="number"
          id="price"
          defaultValue={0}
          {...register('price')}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="status">Status</Label>
        <StyledSelect id="status" {...register('status')}>
          <option value="Available">Available</option>
          <option value="Occupied">Occupied</option>
        </StyledSelect>
      </FormRow>

      <FormRow>
        <Label htmlFor="floor">Floor</Label>
        <StyledSelect id="floor" {...register('floor')}>
          <option value="Third Floor">Third Floor</option>
          <option value="Fourth Floor">Fourth Floor</option>
        </StyledSelect>
      </FormRow>

      <FormRow>
        <Label htmlFor="students">Students</Label>
        <Input
          type="text"
          id="students"
          defaultValue={[]}
          {...register('students')}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Room'}
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateRoomForm
