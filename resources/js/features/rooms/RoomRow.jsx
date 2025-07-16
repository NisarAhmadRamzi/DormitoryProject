// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { useEffect, useRef, useState } from 'react'
// import { HiEllipsisVertical, HiEye, HiPencil, HiTrash } from 'react-icons/hi2'

// import toast from 'react-hot-toast'
// import { useTranslation } from 'react-i18next'
// import styled from 'styled-components'
// import { useUser } from '../../context/UserContext'
// import { deleteRoom } from '../../services/apiCabins'
// import ConfirmDelete from '../../ui/ConfirmDelete'
// import Modal from '../../ui/Modal'
// import CreateRoomForm from './CreateRoomForm'
// import RoomDetails from './RoomDetails'

// // Styled Components (same as before)
// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 0.5rem;
//   align-items: center;
//   padding: 1.4rem 1rem;
//   position: relative;
//   border-bottom: 1px solid var(--color-grey-100);
//   transition: background-color 0.2s;

//   &:hover {
//     background-color: var(--color-grey-200);
//     cursor: pointer;

//     @media (prefers-color-scheme: dark) {
//       background-color: var(--color-grey-700);
//     }
//   }
// `

// const Cell = styled.div`
//   font-size: 1.4rem;
//   color: var(--color-grey-700);
// `

// const Id = styled.div`
//   font-size: 1.6rem;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   font-family: 'Sono';
// `

// const Price = styled.div`
//   font-family: 'Sono';
//   font-weight: 500;
//   color: var(--color-green-700);
// `

// const DropdownWrapper = styled.div`
//   position: relative;
//   display: inline-block;
// `

// const IconButton = styled.button`
//   background: none;
//   border: none;
//   cursor: pointer;
//   padding: 0.4rem;
//   border-radius: var(--border-radius-sm);
//   transform: translateX(0.8rem);
//   transition: all 0.2s;

//   &:hover {
//     background-color: var(--color-grey-100);
//   }

//   & svg {
//     width: 2.4rem;
//     height: 2.4rem;
//     color: var(--color-grey-700);
//   }
// `

// const DropdownMenu = styled.ul`
//   position: fixed;
//   background-color: var(--color-grey-0);
//   box-shadow: var(--shadow-md);
//   border-radius: var(--border-radius-md);
//   padding: 0.4rem 0;
//   z-index: 100;
//   right: ${({ position }) => position?.x}px;
//   top: ${({ position }) => position?.y}px;
//   display: ${({ show }) => (show ? 'block' : 'none')};
//   min-width: 180px;
// `

// const DropdownItem = styled.button`
//   width: 100%;
//   background: none;
//   border: none;
//   padding: 1.2rem 2.4rem;
//   text-align: left;
//   font-size: 1.4rem;
//   display: flex;
//   align-items: center;
//   gap: 1.6rem;
//   color: var(--color-grey-700);
//   cursor: pointer;
//   transition: background-color 0.2s;

//   &:hover {
//     background-color: var(--color-grey-50);
//   }
// `

// function RoomRow({ cabin }) {
//   const { user } = useUser()
//   const role = user?.role
//   const queryClient = useQueryClient()
//   const [isOpen, setIsOpen] = useState(false)
//   const [dropdownPosition, setDropdownPosition] = useState(null)
//   const dropdownRef = useRef()
//   const { t } = useTranslation()

//   const { isLoading: isDeleting, mutate } = useMutation({
//     mutationFn: deleteRoom,
//     onSuccess: () => {
//       toast.success(t('AlertRooms.deleteSuccess'))
//       queryClient.invalidateQueries({ queryKey: ['cabins'] })
//     },
//     onError: (err) => toast.error(err.message || t('AlertRooms.deleteError')),
//   })

//   function handleDeleteConfirm() {
//     mutate(cabin.id)
//   }

//   function toggleDropdown(e) {
//     e.stopPropagation()
//     const rect = e.currentTarget.getBoundingClientRect()
//     setDropdownPosition({
//       x: window.innerWidth - rect.right,
//       y: rect.bottom + 8,
//     })
//     setIsOpen((open) => !open)
//   }

//   function closeDropdown() {
//     setIsOpen(false)
//   }

//   useEffect(() => {
//     function handleClickOutside(e) {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         closeDropdown()
//       }
//     }

//     if (isOpen) {
//       document.addEventListener('mousedown', handleClickOutside)
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside)
//     }
//   }, [isOpen])
//   return (
//     <TableRow role="row">
//       <Id>{cabin.id}</Id>
//       <Cell>{cabin.room_number}</Cell>
//       <Cell>{cabin.type}</Cell>
//       <Cell>{cabin.capacity}</Cell>
//       <Price>{cabin.price}</Price>

//       <DropdownWrapper ref={dropdownRef}>
//         <IconButton onClick={toggleDropdown}>
//           <HiEllipsisVertical />
//         </IconButton>

//         <DropdownMenu show={isOpen} position={dropdownPosition}>
//           <Modal.Open opensWindowName={`view-${cabin.id}`}>
//             <DropdownItem onClick={closeDropdown}>
//               <HiEye /> {t('ContextActions.view')}
//             </DropdownItem>
//           </Modal.Open>

//           {role !== 'student' && (
//             <>
//               <Modal.Open opensWindowName={`edit-${cabin.id}`}>
//                 <DropdownItem onClick={closeDropdown}>
//                   <HiPencil /> {t('ContextActions.edit')}
//                 </DropdownItem>
//               </Modal.Open>

//               <Modal.Open opensWindowName={`delete-${cabin.id}`}>
//                 <DropdownItem onClick={closeDropdown} disabled={isDeleting}>
//                   <HiTrash /> {t('ContextActions.delete')}
//                 </DropdownItem>
//               </Modal.Open>
//             </>
//           )}
//         </DropdownMenu>
//       </DropdownWrapper>

//       {/* Modals */}
//       <Modal.Window name={`view-${cabin.id}`}>
//         <RoomDetails room={cabin} />
//       </Modal.Window>

//       <Modal.Window name={`edit-${cabin.id}`}>
//         <CreateRoomForm roomToEdit={cabin} />
//       </Modal.Window>

//       <Modal.Window name={`delete-${cabin.id}`}>
//         <ConfirmDelete
//           onConfirm={handleDeleteConfirm}
//           resourceName={t('room')}
//           itemLabel={cabin.room_number}
//         />
//       </Modal.Window>
//     </TableRow>
//   )
// }

// export default RoomRow



import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { HiEllipsisVertical, HiEye, HiPencil, HiTrash } from 'react-icons/hi2'

import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useUser } from '../../context/UserContext'
import { deleteRoom } from '../../services/apiCabins'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Modal from '../../ui/Modal'
import CreateRoomForm from './CreateRoomForm'
import RoomDetails from './RoomDetails'
import { hasPermission } from '../../components/permissions' // ✅ Make sure this is available

// Styled Components (unchanged)
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 0.5rem;
  align-items: center;
  padding: 1.4rem 1rem;
  position: relative;
  border-bottom: 1px solid var(--color-grey-100);
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-grey-200);
    cursor: pointer;

    @media (prefers-color-scheme: dark) {
      background-color: var(--color-grey-700);
    }
  }
`

const Cell = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-700);
`

const Id = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`

const DropdownMenu = styled.ul`
  position: fixed;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  padding: 0.4rem 0;
  z-index: 100;
  right: ${({ position }) => position?.x}px;
  top: ${({ position }) => position?.y}px;
  display: ${({ show }) => (show ? 'block' : 'none')};
  min-width: 180px;
`

const DropdownItem = styled.button`
  width: 100%;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  text-align: left;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  gap: 1.6rem;
  color: var(--color-grey-700);
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-grey-50);
  }
`

function RoomRow({ cabin }) {
  const { user } = useUser()
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState(null)
  const dropdownRef = useRef()
  const { t } = useTranslation()

  const canView = hasPermission(user, 'view room')
  const canEdit = hasPermission(user, 'edit room')
  const canDelete = hasPermission(user, 'delete room')
  const canDoAnything = canView || canEdit || canDelete

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteRoom,
    onSuccess: () => {
      toast.success(t('AlertRooms.deleteSuccess'))
      queryClient.invalidateQueries({ queryKey: ['cabins'] })
    },
    onError: (err) => toast.error(err.message || t('AlertRooms.deleteError')),
  })

  function handleDeleteConfirm() {
    mutate(cabin.id)
  }

  function toggleDropdown(e) {
    e.stopPropagation()
    const rect = e.currentTarget.getBoundingClientRect()
    setDropdownPosition({
      x: window.innerWidth - rect.right,
      y: rect.bottom + 8,
    })
    setIsOpen((open) => !open)
  }

  function closeDropdown() {
    setIsOpen(false)
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        closeDropdown()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <TableRow role="row">
      <Id>{cabin.id}</Id>
      <Cell>{cabin.room_number}</Cell>
      <Cell>{cabin.type}</Cell>
      <Cell>{cabin.capacity}</Cell>
      <Price>{cabin.price}</Price>

      {canDoAnything && (
        <DropdownWrapper ref={dropdownRef}>
          <IconButton onClick={toggleDropdown}>
            <HiEllipsisVertical />
          </IconButton>

          <DropdownMenu show={isOpen} position={dropdownPosition}>
            {canView && (
              <Modal.Open opensWindowName={`view-${cabin.id}`}>
                <DropdownItem onClick={closeDropdown}>
                  <HiEye /> {t('ContextActions.view')}
                </DropdownItem>
              </Modal.Open>
            )}

            {canEdit && (
              <Modal.Open opensWindowName={`edit-${cabin.id}`}>
                <DropdownItem onClick={closeDropdown}>
                  <HiPencil /> {t('ContextActions.edit')}
                </DropdownItem>
              </Modal.Open>
            )}

            {canDelete && (
              <Modal.Open opensWindowName={`delete-${cabin.id}`}>
                <DropdownItem onClick={closeDropdown} disabled={isDeleting}>
                  <HiTrash /> {t('ContextActions.delete')}
                </DropdownItem>
              </Modal.Open>
            )}
          </DropdownMenu>
        </DropdownWrapper>
      )}

      {canView && (
        <Modal.Window name={`view-${cabin.id}`}>
          <RoomDetails room={cabin} />
        </Modal.Window>
      )}

      {canEdit && (
        <Modal.Window name={`edit-${cabin.id}`}>
          <CreateRoomForm roomToEdit={cabin} />
        </Modal.Window>
      )}

      {canDelete && (
        <Modal.Window name={`delete-${cabin.id}`}>
          <ConfirmDelete
            onConfirm={handleDeleteConfirm}
            resourceName={t('room')}
            itemLabel={cabin.room_number}
          />
        </Modal.Window>
      )}
    </TableRow>
  )
}

export default RoomRow
