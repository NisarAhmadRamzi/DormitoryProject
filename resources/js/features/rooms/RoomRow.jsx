// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import React, { useState } from 'react'
// import { HiPencil, HiTrash } from 'react-icons/hi2'

// import toast from 'react-hot-toast'
// import styled from 'styled-components'
// import { DeleteRooms } from '../../services/apiCabins'
// import { formatCurrency } from '../../utils/helpers'
// import CreateRoomForm from './CreateRoomForm'

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;

//   column-gap: 0.5rem;
//   align-items: center;
//   padding: 1.4rem 1rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `

// const Id = styled.div`
//   font-size: 1.6rem;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   font-family: 'Sono';
// `

// const IconButton = styled.button`
//   background: none;
//   border: none;
//   cursor: pointer;
//   padding: 0.4rem;
//   margin-right: 0.8rem;

//   svg {
//     width: 2.4rem;
//     height: 2.4rem;
//     color: var(--color-grey-500);
//     transition: color 0.2s ease;
//   }

//   &:hover svg {
//     color: var(
//       --color-brand-600
//     ); /* Change this to a theme variable or color you prefer */
//   }

//   &:last-child {
//     margin-right: 0;
//   }
// `

// const DeleteButton = styled(IconButton)`
//   svg {
//     color: var(--color-red-600);
//   }

//   &:hover svg {
//     color: var(--color-red-700);
//   }
// `

// const Price = styled.div`
//   font-family: 'Sono';
//   font-weight: 600;
// `

// const Discount = styled.div`
//   font-family: 'Sono';
//   font-weight: 500;
//   color: var(--color-green-700);
// `

// const RoomRow = ({ cabin }) => {
//   const [showForm, setShowForm] = useState(false)
//   const { id: roomId, room_number, type, capacity, price } = cabin
//   const queryClient = useQueryClient()
//   const { isLoading: isDeleting, mutate } = useMutation({
//     mutationFn: DeleteRooms,
//     onSuccess: () => {
//       toast.success('The room was deleted successfully')
//       queryClient.invalidateQueries({
//         queryKey: ['cabins'],
//       })
//     },
//     onError: (err) => toast.error(err.message || 'Room could not be deleted'), // Fixed error message
//   })

//   return (
//     <>
//       <TableRow role="row">
//         <Id>{roomId}</Id>
//         <Id>{room_number}</Id>
//         <Id>{type}</Id>
//         <Id>{capacity}</Id>
//         <Discount>{formatCurrency(price)}</Discount>
//         <div style={{ display: 'flex', gap: '0.4rem' }}>
//           <IconButton onClick={() => setShowForm((show) => !show)}>
//             <HiPencil />
//           </IconButton>
//           <DeleteButton onClick={() => mutate(roomId)} disabled={isDeleting}>
//             <HiTrash />
//           </DeleteButton>
//           <Modal.Window>
//             <CreateRoomForm croomRToEdit={room} />
//           </Modal.Window>
//         </div>
//       </TableRow>
//       {/* {showForm && <CreateRoomForm roomToEdit={room} />} */}
//       {showForm && <CreateRoomForm roomToEdit={cabin} />}
//     </>
//   )
// }

// export default RoomRow

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { HiPencil, HiTrash } from 'react-icons/hi2'

import React from 'react'
import toast from 'react-hot-toast'
import styled from 'styled-components'
import { DeleteRooms } from '../../services/apiCabins'
import Modal from '../../ui/Modal' // 🧠 Use the default export
import { formatCurrency } from '../../utils/helpers'
import CreateRoomForm from './CreateRoomForm'

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 0.5rem;
  align-items: center;
  padding: 1.4rem 1rem;
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`

const Id = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.4rem;
  margin-right: 0.8rem;
  svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
    transition: color 0.2s ease;
  }
  &:hover svg {
    color: var(--color-brand-600);
  }
  &:last-child {
    margin-right: 0;
  }
`

const DeleteButton = styled(IconButton)`
  svg {
    color: var(--color-red-600);
  }
  &:hover svg {
    color: var(--color-red-700);
  }
`

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`

const RoomRow = ({ cabin }) => {
  const queryClient = useQueryClient()
  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: DeleteRooms,
    onSuccess: () => {
      toast.success('The room was deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['cabins'] })
    },
    onError: (err) => toast.error(err.message || 'Room could not be deleted'),
  })

  return (
    <TableRow role="row">
      <Id>{cabin.id}</Id>
      <Id>{cabin.room_number}</Id>
      <Id>{cabin.type}</Id>
      <Id>{cabin.capacity}</Id>
      <Discount>{formatCurrency(cabin.price)}</Discount>
      <div style={{ display: 'flex', gap: '0.4rem' }}>
        <Modal.Open opensWindowName={`edit-${cabin.id}`}>
          <IconButton>
            <HiPencil />
          </IconButton>
        </Modal.Open>
        <DeleteButton onClick={() => mutate(cabin.id)} disabled={isDeleting}>
          <HiTrash />
        </DeleteButton>

        {/* One Modal.Window per row, unique name */}
        <Modal.Window name={`edit-${cabin.id}`}>
          <CreateRoomForm roomToEdit={cabin} />
        </Modal.Window>
      </div>
    </TableRow>
  )
}

export default RoomRow
