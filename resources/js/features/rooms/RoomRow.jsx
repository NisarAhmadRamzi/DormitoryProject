import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useRef, useState } from 'react'
import { HiEllipsisVertical, HiEye, HiPencil, HiTrash } from 'react-icons/hi2'

import toast from 'react-hot-toast'
import styled from 'styled-components'
import RoomDetails from '../../features/rooms/RoomDetails'
import { DeleteRooms } from '../../services/apiCabins'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Modal from '../../ui/Modal'
import { formatCurrency } from '../../utils/helpers'
import CreateRoomForm from './CreateRoomForm'

// === Styled Components ===

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 0.5rem;
  align-items: center;
  padding: 1.4rem 1rem;
  position: relative;

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

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.4rem;
  border-radius: 4px;
  color: var(--color-grey-700);

  &:hover {
    background-color: var(--color-grey-100);
  }
`

const DropdownMenu = styled.div`
  position: absolute;
  ${({ $dropUp }) => ($dropUp ? 'bottom: 100%;' : 'top: 100%;')}
  right: 0;
  background: white;
  border: 1px solid var(--color-grey-200);
  border-radius: 4px;
  padding: 0.5rem 0;
  box-shadow: var(--shadow-md);
  z-index: 100;
  display: ${({ $show }) => ($show ? 'block' : 'none')};
  min-width: 140px;

  /* Optional transition for smoothness */
  transition: opacity 0.2s ease, transform 0.2s ease;
  transform: ${({ $dropUp }) =>
    $dropUp ? 'translateY(-4px)' : 'translateY(4px)'};
  opacity: ${({ $show }) => ($show ? 1 : 0)};
`

const DropdownItem = styled.button`
  width: 100%;
  background: none;
  border: none;
  padding: 0.8rem 1.2rem;
  text-align: left;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: var(--color-grey-700);
  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-100);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`

// === RoomRow Component ===

const RoomRow = ({ cabin }) => {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const [dropUp, setDropUp] = useState(false)
  const dropdownRef = useRef(null)

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: DeleteRooms,
    onSuccess: () => {
      toast.success('The room was deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['cabins'] })
    },
    onError: (err) => toast.error(err.message || 'Room could not be deleted'),
  })

  const handleDeleteConfirm = () => {
    mutate(cabin.id)
  }

  const toggleDropdown = () => {
    setIsOpen((open) => !open)
  }

  const closeDropdown = () => {
    setIsOpen(false)
  }

  // Auto-flip logic
  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect()
      const dropdownHeight = dropdownRef.current.offsetHeight || 140
      const spaceBelow = window.innerHeight - rect.bottom
      setDropUp(spaceBelow < dropdownHeight + 20)
    }
  }, [isOpen])

  return (
    <TableRow role="row">
      <Id>{cabin.id}</Id>
      <Id>{cabin.room_number}</Id>
      <Id>{cabin.type}</Id>
      <Id>{cabin.capacity}</Id>
      <Discount>{formatCurrency(cabin.price)}</Discount>

      <DropdownWrapper onMouseLeave={closeDropdown}>
        <IconButton onClick={toggleDropdown}>
          <HiEllipsisVertical size={20} />
        </IconButton>

        <DropdownMenu ref={dropdownRef} $show={isOpen} $dropUp={dropUp}>
          <Modal.Open opensWindowName={`view-${cabin.id}`}>
            <DropdownItem onClick={closeDropdown}>
              <HiEye /> View
            </DropdownItem>
          </Modal.Open>

          <Modal.Open opensWindowName={`edit-${cabin.id}`}>
            <DropdownItem onClick={closeDropdown}>
              <HiPencil /> Edit
            </DropdownItem>
          </Modal.Open>

          <Modal.Open opensWindowName={`delete-${cabin.id}`}>
            <DropdownItem onClick={closeDropdown} disabled={isDeleting}>
              <HiTrash /> Delete
            </DropdownItem>
          </Modal.Open>
        </DropdownMenu>
      </DropdownWrapper>

      {/* Modals */}
      <Modal.Window name={`view-${cabin.id}`}>
        <RoomDetails room={cabin} />
      </Modal.Window>

      <Modal.Window name={`edit-${cabin.id}`}>
        <CreateRoomForm roomToEdit={cabin} />
      </Modal.Window>

      <Modal.Window name={`delete-${cabin.id}`}>
        <ConfirmDelete onConfirm={handleDeleteConfirm} />
      </Modal.Window>
    </TableRow>
  )
}

export default RoomRow
