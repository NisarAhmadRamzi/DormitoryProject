import { HiEllipsisVertical, HiEye, HiPencil, HiTrash } from 'react-icons/hi2'
import { useEffect, useRef, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import ConfirmDelete from '../../ui/ConfirmDelete'
import CreateFeeForm from './CreateFeeForm'
import FeeDetails from './FeeDetails'
import Modal from '../../ui/Modal'
import { deleteFee } from '../../services/apiFees'
import styled from 'styled-components'
import toast from 'react-hot-toast'

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 2fr 2fr 2fr 2fr 2fr 0.5fr;
  column-gap: 0.5rem;
  align-items: center;
  padding: 1.4rem 1rem;
  position: relative;
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`

const Cell = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-700);
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

function FeesRow({ fee }) {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState(null)
  const dropdownRef = useRef()

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteFee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fees'] })
      toast.success('Fee deleted successfully')
    },
    onError: (err) => {
      console.error('Error during deletion:', err)
      toast.error(err.message || 'Failed to delete fee')
    },
  })

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

  function handleDeleteConfirm() {
    mutate(fee.id)
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        closeDropdown()
      }
    }

    if (isOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  return (
    <TableRow role="row">
      <Cell>{fee.id}</Cell>
      <Cell>
        {fee.student?.name} {fee.student?.last_name}
      </Cell>
      <Cell>{fee.office_pay}</Cell>
      <Cell>{fee.office_paid}</Cell>
      <Cell>{fee.warranty_pay}</Cell>
      <Cell>{fee.total_fee}</Cell>

      <DropdownWrapper ref={dropdownRef}>
        <IconButton onClick={toggleDropdown}>
          <HiEllipsisVertical />
        </IconButton>
        <DropdownMenu show={isOpen} position={dropdownPosition}>
          <Modal.Open opensWindowName={`view-fee-${fee.id}`}>
            <DropdownItem onClick={closeDropdown}>
              <HiEye /> View
            </DropdownItem>
          </Modal.Open>

          <Modal.Open opensWindowName={`edit-fee-${fee.id}`}>
            <DropdownItem onClick={closeDropdown}>
              <HiPencil /> Edit
            </DropdownItem>
          </Modal.Open>

          <Modal.Open opensWindowName={`delete-${fee.id}`}>
            <DropdownItem onClick={closeDropdown} disabled={isDeleting}>
              <HiTrash /> Delete
            </DropdownItem>
          </Modal.Open>
        </DropdownMenu>
      </DropdownWrapper>

      <Modal.Window name={`view-fee-${fee.id}`}>
        <FeeDetails fee={fee} />
      </Modal.Window>

      <Modal.Window name={`edit-fee-${fee.id}`}>
        <CreateFeeForm feeToEdit={fee} />
      </Modal.Window>

      <Modal.Window name={`delete-${fee.id}`}>
        <ConfirmDelete onConfirm={handleDeleteConfirm} />
      </Modal.Window>
    </TableRow>
  )
}

export default FeesRow
