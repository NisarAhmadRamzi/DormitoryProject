// import { useForm } from 'react-hook-form'
// import styled from 'styled-components'
// import Button from '../../ui/Button'
// import FileInput from '../../ui/FileInput'
// import Form from '../../ui/Form'
// import Input from '../../ui/Input'
// import Textarea from '../../ui/Textarea'

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

// function CreateRoomForm() {
//   const { register, handleSubmit } = useForm()
//   function onSubmit(data) {}
//   return (
//     <Form onSubmit={handleSubmit(onSubmit)}>
//       <FormRow>
//         <Label htmlFor="room_number">Number</Label>
//         <Input type="number" id="room_number" defaultValue={0} />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="maxCapacity">Maximum capacity</Label>
//         <Input type="number" id="maxCapacity" />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="regularPrice">Regular price</Label>
//         <Input type="number" id="regularPrice" />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="discount">Discount</Label>
//         <Input type="number" id="discount" defaultValue={0} />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="description">Description for website</Label>
//         <Textarea type="number" id="description" defaultValue="" />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="image">Cabin photo</Label>
//         <FileInput id="image" accept="image/*" />
//       </FormRow>

//       <FormRow>
//         {/* type is an HTML attribute! */}
//         <Button variation="secondary" type="reset">
//           Cancel
//         </Button>
//         <Button>Add Room</Button>
//       </FormRow>
//     </Form>
//   )
// }

// export default CreateRoomForm

// import { useForm } from 'react-hook-form'
// import styled from 'styled-components'
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

// function CreateRoomForm() {
//   const { register, handleSubmit } = useForm()

//   const onSubmit = (data) => {
//     // You can process the form data here
//     console.log(data)
//   }

//   return (
//     <Form onSubmit={handleSubmit(onSubmit)}>
//       <FormRow>
//         <Label htmlFor="room_number">Room Number</Label>
//         <Input
//           type="number"
//           id="room_number"
//           defaultValue={301} // Use the provided room number
//           {...register('room_number')}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="type">Room Type</Label>
//         <Input
//           type="text"
//           id="type"
//           defaultValue="8 people" // Default type value
//           {...register('type')}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="capacity">Capacity</Label>
//         <Input
//           type="number"
//           id="capacity"
//           defaultValue={4} // Default capacity value
//           {...register('capacity')}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="current_occupancy">Current Occupancy</Label>
//         <Input
//           type="number"
//           id="current_occupancy"
//           defaultValue={0} // Default occupancy value
//           {...register('current_occupancy')}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="price">Price</Label>
//         <Input
//           type="number"
//           id="price"
//           defaultValue={0} // Default price value
//           {...register('price')}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="status">Status</Label>
//         <Input
//           type="text"
//           id="status"
//           defaultValue="Available" // Default status value
//           {...register('status')}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="floor">Floor</Label>
//         <Input
//           type="text"
//           id="floor"
//           defaultValue="Third Floor" // Default floor value
//           {...register('floor')}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="students">Student</Label>
//         <Input
//           type="text"
//           id="students"
//           defaultValue={[]} // Default students value (empty array)
//           {...register('students')}
//         />
//       </FormRow>

//       {/* <FormRow>
//         <Label htmlFor="image">Cabin Photo</Label>
//         <FileInput id="image" accept="image/*" {...register('image')} />
//       </FormRow> */}

//       <FormRow>
//         <Button variation="secondary" type="reset">
//           Cancel
//         </Button>
//         <Button type="submit">Add Room</Button>
//       </FormRow>
//     </Form>
//   )
// }

// export default CreateRoomForm

// import { useForm } from 'react-hook-form'
// import styled from 'styled-components'
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

// function CreateRoomForm() {
//   const { register, handleSubmit } = useForm()

//   const onSubmit = (data) => {
//     // You can process the form data here
//     console.log(data)
//   }

//   return (
//     <Form onSubmit={handleSubmit(onSubmit)}>
//       <FormRow>
//         <Label htmlFor="room_number">Room Number</Label>
//         <Input
//           type="number"
//           id="room_number"
//           defaultValue={301} // Use the provided room number
//           {...register('room_number')}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="type">Room Type</Label>
//         <select id="type" {...register('type')}>
//           <option value="4 people">4 people</option>
//           <option value="6 people">6 people</option>
//           <option value="8 people" selected>
//             8 people
//           </option>
//         </select>
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="capacity">Capacity</Label>
//         <Input
//           type="number"
//           id="capacity"
//           defaultValue={4} // Default capacity value
//           {...register('capacity')}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="current_occupancy">Current Occupancy</Label>
//         <Input
//           type="number"
//           id="current_occupancy"
//           defaultValue={0} // Default occupancy value
//           {...register('current_occupancy')}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="price">Price</Label>
//         <Input
//           type="number"
//           id="price"
//           defaultValue={0} // Default price value
//           {...register('price')}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="status">Status</Label>
//         <select id="status" {...register('status')}>
//           <option value="Available">Available</option>
//           <option value="Occupied">Occupied</option>
//         </select>
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="floor">Floor</Label>
//         <select id="floor" {...register('floor')}>
//           <option value="Third Floor">Third Floor</option>
//           <option value="Fourth Floor">Fourth Floor</option>
//         </select>
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="students">Student</Label>
//         <Input
//           type="text"
//           id="students"
//           defaultValue={[]} // Default students value (empty array)
//           {...register('students')}
//         />
//       </FormRow>

//       {/* <FormRow>
//         <Label htmlFor="image">Cabin Photo</Label>
//         <FileInput id="image" accept="image/*" {...register('image')} />
//       </FormRow> */}

//       <FormRow>
//         <Button variation="secondary" type="reset">
//           Cancel
//         </Button>
//         <Button type="submit">Add Room</Button>
//       </FormRow>
//     </Form>
//   )
// }

// export default CreateRoomForm

import { useForm } from 'react-hook-form'
import styled from 'styled-components'
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
  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
    // You can process the form data here
    console.log(data)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="room_number">Room Number</Label>
        <Input
          type="number"
          id="room_number"
          defaultValue={301} // Use the provided room number
          {...register('room_number')}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="type">Room Type</Label>
        <StyledSelect id="type" {...register('type')}>
          <option value="4 people">4 people</option>
          <option value="6 people">6 people</option>
          <option value="8 people" selected>
            8 people
          </option>
        </StyledSelect>
      </FormRow>

      <FormRow>
        <Label htmlFor="capacity">Capacity</Label>
        <Input
          type="number"
          id="capacity"
          defaultValue={4} // Default capacity value
          {...register('capacity')}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="current_occupancy">Current Occupancy</Label>
        <Input
          type="number"
          id="current_occupancy"
          defaultValue={0} // Default occupancy value
          {...register('current_occupancy')}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="price">Price</Label>
        <Input
          type="number"
          id="price"
          defaultValue={0} // Default price value
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
        <Label htmlFor="students">Student</Label>
        <Input
          type="text"
          id="students"
          defaultValue={[]} // Default students value (empty array)
          {...register('students')}
        />
      </FormRow>

      {/* <FormRow>
        <Label htmlFor="image">Cabin Photo</Label>
        <FileInput id="image" accept="image/*" {...register('image')} />
      </FormRow> */}

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button type="submit">Add Room</Button>
      </FormRow>
    </Form>
  )
}

export default CreateRoomForm
