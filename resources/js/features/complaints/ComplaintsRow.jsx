import { HiEllipsisVertical, HiEye, HiPencil, HiTrash } from 'react-icons/hi2'
import { useEffect, useRef, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import ComplaintDetails from './ComplaintDetails'
import ConfirmDelete from '../../ui/ConfirmDelete'
import CreateComplaintForm from './CreateComplaintForm'
import Modal from '../../ui/Modal'
import { deleteComplaint } from '../../services/apiComplaints'
import styled from 'styled-components'
import toast from 'react-hot-toast'

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 2fr 3fr 1.5fr 2fr 0.5fr; /* Match header */
  column-gap: 0.5rem;
  align-items: center;
  padding: 1.4rem 1rem;
  position: relative;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  transition: background-color 0.2s; /* Smooth transition */

  &:hover {
    background-color: var(--color-grey-200); /* Light mode hover */
    cursor: pointer;

    /* Dark mode hover */
    @media (prefers-color-scheme: dark) {
      background-color: var(--color-grey-700); /* Dark mode hover */
      cursor: pointer;
    }
  }
`

const Id = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`

const Cell = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-700);
  padding: 0.5rem 0; /* Adjusted padding for better spacing */
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
  transition: background-color 0.2s;

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

function ComplaintsRow({ complaint }) {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState(null)
  const dropdownRef = useRef()

  const { mutate, isLoading: isDeleting } = useMutation({
    mutationFn: deleteComplaint,
    onSuccess: () => {
      queryClient.invalidateQueries(['complaints'])
      toast.success('Complaint deleted successfully')
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to delete complaint')
    },
  })

  function handleDeleteConfirm() {
    mutate(complaint.id)
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
    if (isOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const studentName =
    complaint.student?.name || `ID ${complaint.student?.id || '—'}`

  return (
    <TableRow role="row">
      <Id>{complaint.id}</Id>
      <Cell>{studentName}</Cell>
      <Cell>{complaint.title}</Cell>
      <Cell>{complaint.status}</Cell>
      <Cell>{complaint.created_at}</Cell>

      <DropdownWrapper ref={dropdownRef}>
        <IconButton onClick={toggleDropdown}>
          <HiEllipsisVertical />
        </IconButton>

        <DropdownMenu show={isOpen} position={dropdownPosition}>
          <Modal.Open opensWindowName={`view-${complaint.id}`}>
            <DropdownItem onClick={closeDropdown}>
              <HiEye /> View
            </DropdownItem>
          </Modal.Open>

          <Modal.Open opensWindowName={`edit-${complaint.id}`}>
            <DropdownItem onClick={closeDropdown}>
              <HiPencil /> Edit
            </DropdownItem>
          </Modal.Open>

          <Modal.Open opensWindowName={`delete-${complaint.id}`}>
            <DropdownItem onClick={closeDropdown} disabled={isDeleting}>
              <HiTrash /> Delete
            </DropdownItem>
          </Modal.Open>
        </DropdownMenu>
      </DropdownWrapper>

      <Modal.Window name={`view-${complaint.id}`}>
        <ComplaintDetails complaint={complaint} />
      </Modal.Window>

      <Modal.Window name={`edit-${complaint.id}`}>
        <CreateComplaintForm complaintToEdit={complaint} />
      </Modal.Window>

      <Modal.Window name={`delete-${complaint.id}`}>
        <ConfirmDelete onConfirm={handleDeleteConfirm} />
      </Modal.Window>
    </TableRow>
  )
}

export default ComplaintsRow
