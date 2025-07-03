import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { HiEllipsisVertical, HiEye, HiPencil, HiTrash } from 'react-icons/hi2'

import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { deleteLibraryStudent } from '../../services/apiLibraryStudents'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Modal from '../../ui/Modal'
import CreateLibraryStudentForm from './CreateLibraryStudentForm'
import LibraryStudentDetails from './LibraryStudentDetails'

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 2fr 2.5fr 2.5fr 2.5fr 0.5fr;
  column-gap: 0.5rem;
  align-items: center;
  padding: 1.4rem 1rem;
  position: relative;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-grey-200);
    cursor: pointer;

    @media (prefers-color-scheme: dark) {
      background-color: var(--color-grey-700);
      cursor: pointer;
    }
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

function LibraryStudentRow({ student }) {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState(null)
  const dropdownRef = useRef()
  const { t } = useTranslation()

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: () => deleteLibraryStudent(student.id),
    onSuccess: () => {
      toast.success(t('libraryStudentRow.deleteSuccess'))
      queryClient.invalidateQueries({ queryKey: ['library-students'] })
    },
    onError: () => {
      toast.error(t('libraryStudentRow.deleteError'))
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

  function handleDeleteConfirm() {
    mutate()
  }

  return (
    <TableRow>
      <Cell>{student.id}</Cell>
      <Cell>
        {student.name} {student.last_name}
      </Cell>
      <Cell>{student.email}</Cell>
      <Cell>{student.phone}</Cell>
      <Cell>{student.address}</Cell>

      <DropdownWrapper ref={dropdownRef}>
        <IconButton onClick={toggleDropdown}>
          <HiEllipsisVertical />
        </IconButton>

        <DropdownMenu show={isOpen} position={dropdownPosition}>
          <Modal.Open opensWindowName={`view-${student.id}`}>
            <DropdownItem onClick={closeDropdown}>
              <HiEye /> {t('libraryStudentRow.view')}
            </DropdownItem>
          </Modal.Open>

          <Modal.Open opensWindowName={`edit-${student.id}`}>
            <DropdownItem onClick={closeDropdown}>
              <HiPencil /> {t('libraryStudentRow.edit')}
            </DropdownItem>
          </Modal.Open>

          <Modal.Open opensWindowName={`delete-${student.id}`}>
            <DropdownItem onClick={closeDropdown} disabled={isDeleting}>
              <HiTrash /> {t('libraryStudentRow.delete')}
            </DropdownItem>
          </Modal.Open>
        </DropdownMenu>
      </DropdownWrapper>

      <Modal.Window name={`view-${student.id}`}>
        <LibraryStudentDetails student={student} />
      </Modal.Window>

      <Modal.Window name={`edit-${student.id}`}>
        <CreateLibraryStudentForm studentToEdit={student} />
      </Modal.Window>

      <Modal.Window name={`delete-${student.id}`}>
        <ConfirmDelete
          onConfirm={handleDeleteConfirm}
          resourceName={t('libraryStudentRow.resourceName')}
          itemLabel={student.name}
        />
      </Modal.Window>
    </TableRow>
  )
}

export default LibraryStudentRow
