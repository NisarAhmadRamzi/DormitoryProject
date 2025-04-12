// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { HiPencil, HiTrash } from 'react-icons/hi2'

// import React from 'react'
// import toast from 'react-hot-toast'
// import styled from 'styled-components'
// import { DeleteRooms } from '../../services/apiCabins'
// import Modal from '../../ui/Modal'
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

// const Discount = styled.div`
//   font-family: 'Sono';
//   font-weight: 500;
//   color: var(--color-green-700);
// `

// const RoomRow = ({ cabin }) => {
//   const queryClient = useQueryClient()

//   const { isLoading: isDeleting, mutate } = useMutation({
//     mutationFn: DeleteRooms,
//     onSuccess: () => {
//       toast.success('The room was deleted successfully')
//       queryClient.invalidateQueries({ queryKey: ['cabins'] })
//     },
//     onError: (err) => toast.error(err.message || 'Room could not be deleted'),
//   })

//   return (
//     <TableRow role="row">
//       <Id>{cabin.id}</Id>
//       <Id>{cabin.room_number}</Id>
//       <Id>{cabin.type}</Id>
//       <Id>{cabin.capacity}</Id>
//       <Discount>{formatCurrency(cabin.price)}</Discount>

//       <div style={{ display: 'flex', gap: '0.4rem' }}>
//         <Modal.Open opensWindowName={`edit-${cabin.id}`}>
//           <button>
//             <HiPencil />
//           </button>
//         </Modal.Open>

//         <button onClick={() => mutate(cabin.id)} disabled={isDeleting}>
//           <HiTrash />
//         </button>

//         <Modal.Window name={`edit-${cabin.id}`}>
//           <CreateRoomForm roomToEdit={cabin} />
//         </Modal.Window>
//       </div>
//     </TableRow>
//   )
// }

// export default RoomRow

import { HiPencil, HiTrash } from 'react-icons/hi2'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import ConfirmDelete from '../../ui/ConfirmDelete' // 👈 Import the confirmation modal
import CreateRoomForm from './CreateRoomForm'
import { DeleteRooms } from '../../services/apiCabins'
import Modal from '../../ui/Modal'
import React from 'react'
import { formatCurrency } from '../../utils/helpers'
import styled from 'styled-components'
import toast from 'react-hot-toast'

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

  function handleDeleteConfirm() {
    mutate(cabin.id)
  }

  return (
    <TableRow role="row">
      <Id>{cabin.id}</Id>
      <Id>{cabin.room_number}</Id>
      <Id>{cabin.type}</Id>
      <Id>{cabin.capacity}</Id>
      <Discount>{formatCurrency(cabin.price)}</Discount>

      <div style={{ display: 'flex', gap: '0.4rem' }}>
        <Modal.Open opensWindowName={`edit-${cabin.id}`}>
          <button>
            <HiPencil />
          </button>
        </Modal.Open>

        <Modal.Open opensWindowName={`delete-${cabin.id}`}>
          <button disabled={isDeleting}>
            <HiTrash />
          </button>
        </Modal.Open>

        {/* Edit Room Modal */}
        <Modal.Window name={`edit-${cabin.id}`}>
          <CreateRoomForm roomToEdit={cabin} />
        </Modal.Window>

        {/* Confirm Delete Modal */}
        <Modal.Window name={`delete-${cabin.id}`}>
          <ConfirmDelete onConfirm={handleDeleteConfirm} />
        </Modal.Window>
      </div>
    </TableRow>
  )
}

export default RoomRow
