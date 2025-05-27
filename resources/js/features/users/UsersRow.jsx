import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { HiEllipsisVertical, HiEye, HiPencil, HiTrash } from 'react-icons/hi2'

import toast from 'react-hot-toast'
import styled from 'styled-components'
import { deleteUser } from '../../services/apiUser'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Modal from '../../ui/Modal'
import CreateUserForm from './CreateUserForm'
import UserDetails from './UserDetails'

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 2fr 2.5fr 2fr 2fr 0.5fr;
  column-gap: 0.5rem;
  align-items: center;
  padding: 1.4rem 1rem;
  position: relative;
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
  transition: background-color 0.2s; /* Smooth transition */

  &:hover {
    background-color: var(--color-grey-200);
    cursor: pointer; /* Light mode hover */

    /* For dark mode, you can adjust this accordingly */
    /* Use a different color if needed */
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
  display: flex;
  align-items: center;
  gap: 1rem;
`

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
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

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: color 0.3s;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`

function UserRow({ user }) {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState(null)
  const dropdownRef = useRef()

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('User deleted successfully')
    },
    onError: (err) => {
      console.error('Error deleting user:', err)
      toast.error(err.message || 'Failed to delete user')
    },
  })

  function handleDeleteConfirm() {
    mutate(user.id)
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
      <Id>{user.id}</Id>
      <Cell>
        <ProfileImg
          src={
            user?.profile
              ? `/uploads/${user.profile}`
              : 'https://www.gravatar.com/avatar/?d=mp&f=y'
          }
          alt="Profile"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = 'https://www.gravatar.com/avatar/?d=mp&f=y'
          }}
        />
        {user.name}
      </Cell>
      <Cell>{user.email}</Cell>
      <Cell>{user.role_name}</Cell>
      {/* <Cell>
        {user.role_name === 'student' && user.student
          ? `Student ID: ${user.student.id}`
          : '—'}
      </Cell> */}
      <Cell>
        {user.role_id ? (
          <div>
            <strong>Role ID:</strong> {user.role_id}
          </div>
        ) : user.role_name === 'student' && user.student ? (
          <>
            <div>
              <strong>Student ID:</strong> {user.student.id_number}
            </div>
            <div>
              <strong>Origin:</strong> {user.student.from}
            </div>
          </>
        ) : (
          '—'
        )}
      </Cell>

      <DropdownWrapper ref={dropdownRef}>
        <IconButton onClick={toggleDropdown}>
          <HiEllipsisVertical />
        </IconButton>
        <DropdownMenu show={isOpen} position={dropdownPosition}>
          <Modal.Open opensWindowName={`view-${user.id}`}>
            <DropdownItem onClick={closeDropdown}>
              <HiEye /> View
            </DropdownItem>
          </Modal.Open>
          <Modal.Open opensWindowName={`edit-${user.id}`}>
            <DropdownItem onClick={closeDropdown}>
              <HiPencil /> Edit
            </DropdownItem>
          </Modal.Open>
          <Modal.Open opensWindowName={`delete-${user.id}`}>
            <DropdownItem onClick={closeDropdown} disabled={isDeleting}>
              <HiTrash /> Delete
            </DropdownItem>
          </Modal.Open>
        </DropdownMenu>
      </DropdownWrapper>
      <Modal.Window name={`view-${user.id}`}>
        <UserDetails user={user} />
      </Modal.Window>
      <Modal.Window name={`edit-${user.id}`}>
        <CreateUserForm userToEdit={user} />
      </Modal.Window>
      <Modal.Window name={`delete-${user.id}`}>
        <ConfirmDelete onConfirm={handleDeleteConfirm} />
      </Modal.Window>
    </TableRow>
  )
}

export default UserRow
