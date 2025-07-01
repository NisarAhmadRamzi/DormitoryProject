import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HiEllipsisVertical, HiEye, HiPencil, HiTrash } from 'react-icons/hi2'

import toast from 'react-hot-toast'
import styled from 'styled-components'
import { useUser } from '../../context/UserContext'
import { deleteStudent } from '../../services/apiStudents'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Modal from '../../ui/Modal'
import CreateStudentForm from './CreateStudentForm'
import StudentDetails from './StudentDetails'

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 2fr 2.5fr 2.5fr 2.5fr 0.5fr;
  column-gap: 0.5rem;
  align-items: center;
  padding: 1.6rem 2.4rem;
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

function StudentRow({ student }) {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState(null)
  const dropdownRef = useRef()
  const { user } = useUser()
  const role = user?.role

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
      toast.success(t('studentRow.deleteSuccess'))
    },
    onError: (err) => {
      console.error('Error during deletion:', err)
      toast.error(err.message || t('studentRow.deleteFailed'))
    },
  })

  function handleDeleteConfirm() {
    mutate(student.id)
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
      <Id>{student.id}</Id>
      <Cell>{student.name}</Cell>
      <Cell>{student.email}</Cell>
      <Cell>{student.id_number}</Cell>
      <Cell>{student.phone}</Cell>

      <DropdownWrapper ref={dropdownRef}>
        <IconButton
          onClick={toggleDropdown}
          aria-label={t('studentRow.actions')}
        >
          <HiEllipsisVertical />
        </IconButton>

        <DropdownMenu show={isOpen} position={dropdownPosition}>
          <Modal.Open opensWindowName={`view-${student.id}`}>
            <DropdownItem onClick={closeDropdown}>
              <HiEye /> {t('studentRow.view')}
            </DropdownItem>
          </Modal.Open>

          {role !== 'student' && (
            <>
              <Modal.Open opensWindowName={`edit-${student.id}`}>
                <DropdownItem onClick={closeDropdown}>
                  <HiPencil /> {t('studentRow.edit')}
                </DropdownItem>
              </Modal.Open>

              <Modal.Open opensWindowName={`delete-${student.id}`}>
                <DropdownItem onClick={closeDropdown} disabled={isDeleting}>
                  <HiTrash /> {t('studentRow.delete')}
                </DropdownItem>
              </Modal.Open>
            </>
          )}
        </DropdownMenu>
      </DropdownWrapper>

      <Modal.Window name={`view-${student.id}`}>
        <StudentDetails student={student} />
      </Modal.Window>

      <Modal.Window name={`edit-${student.id}`}>
        <CreateStudentForm studentToEdit={student} />
      </Modal.Window>

      <Modal.Window name={`delete-${student.id}`}>
        <ConfirmDelete
          onConfirm={handleDeleteConfirm}
          resourceName={t('studentRow.student')}
          itemLabel={student.name}
        />
      </Modal.Window>
    </TableRow>
  )
}

export default StudentRow
