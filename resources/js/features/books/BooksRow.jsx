import { HiEllipsisVertical, HiEye, HiPencil, HiTrash } from 'react-icons/hi2'
import { useEffect, useRef, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import BookDetails from './BookDetails'
import ConfirmDelete from '../../ui/ConfirmDelete'
import CreateBookForm from './CreateBookForm'
import Modal from '../../ui/Modal'
import { deleteBook } from '../../services/apiBooks'
import styled from 'styled-components'
import toast from 'react-hot-toast'

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 2.5fr 2.5fr 2fr 1.5fr 1fr;
  column-gap: 0.5rem;
  align-items: center;
  padding: 1.4rem 1rem;

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

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
  }
`

function BooksRow({ book }) {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState(null)
  const dropdownRef = useRef()

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
      toast.success('Book deleted successfully')
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to delete book')
    },
  })

  function handleDeleteConfirm() {
    mutate(book.id)
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
      <Cell style={{ textAlign: 'center' }}>{book.id}</Cell>
      <Cell>{book.title}</Cell>
      <Cell>{book.author}</Cell>
      <Cell>{book.publication_year}</Cell>
      <Cell>{book.status}</Cell>

      <DropdownWrapper ref={dropdownRef}>
        <IconButton onClick={toggleDropdown}>
          <HiEllipsisVertical />
        </IconButton>

        <DropdownMenu show={isOpen} position={dropdownPosition}>
          <Modal.Open opensWindowName={`view-${book.id}`}>
            <DropdownItem onClick={closeDropdown}>
              <HiEye /> View
            </DropdownItem>
          </Modal.Open>

          <Modal.Open opensWindowName={`edit-${book.id}`}>
            <DropdownItem onClick={closeDropdown}>
              <HiPencil /> Edit
            </DropdownItem>
          </Modal.Open>

          <Modal.Open opensWindowName={`delete-${book.id}`}>
            <DropdownItem onClick={closeDropdown} disabled={isDeleting}>
              <HiTrash /> Delete
            </DropdownItem>
          </Modal.Open>
        </DropdownMenu>
      </DropdownWrapper>

      <Modal.Window name={`view-${book.id}`}>
        <BookDetails book={book} />
      </Modal.Window>

      <Modal.Window name={`edit-${book.id}`}>
        <CreateBookForm bookToEdit={book} />
      </Modal.Window>

      <Modal.Window name={`delete-${book.id}`}>
        <ConfirmDelete onConfirm={handleDeleteConfirm} />
      </Modal.Window>
    </TableRow>
  )
}

export default BooksRow
