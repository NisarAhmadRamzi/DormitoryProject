import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { HiEllipsisVertical, HiEye, HiPencil, HiTrash } from 'react-icons/hi2'
import styled from 'styled-components'
import { hasPermission } from '../../components/permissions'
import { useUser } from '../../context/UserContext'
import { deleteLibrary } from '../../services/apiLibraries'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Modal from '../../ui/Modal'
import CreateLibraryForm from './CreateLibraryForm'
import LibraryDetails from './LibraryDetails'

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 2fr 2.5fr 2.5fr 0.5fr;
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

function LibraryRow({ library }) {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState(null)
  const dropdownRef = useRef()

  const { user } = useUser()

  const canView = hasPermission(user, 'view library')
  const canEdit = hasPermission(user, 'edit library')
  const canDelete = hasPermission(user, 'delete library')
  const hasAnyPermission = canView || canEdit || canDelete

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteLibrary,
    onSuccess: () => {
      queryClient.invalidateQueries(['libraries'])
      toast.success(t('libraryRow.deleteSuccess'))
    },
    onError: (err) => {
      console.error(err)
      toast.error(err.message || t('libraryRow.deleteError'))
    },
  })

  function handleDeleteConfirm() {
    mutate(library.id)
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

  return (
    <TableRow role="row">
      <Id>{library.id}</Id>
      <Cell>{library.name}</Cell>
      <Cell>{library.location}</Cell>
      <Cell>{library.contact_info || '—'}</Cell>

      {hasAnyPermission && (
        <DropdownWrapper ref={dropdownRef}>
          <IconButton onClick={toggleDropdown}>
            <HiEllipsisVertical />
          </IconButton>

          <DropdownMenu show={isOpen} position={dropdownPosition}>
            {canView && (
              <Modal.Open opensWindowName={`view-${library.id}`}>
                <DropdownItem onClick={closeDropdown}>
                  <HiEye /> {t('libraryRow.view')}
                </DropdownItem>
              </Modal.Open>
            )}

            {canEdit && (
              <Modal.Open opensWindowName={`edit-${library.id}`}>
                <DropdownItem onClick={closeDropdown}>
                  <HiPencil /> {t('libraryRow.edit')}
                </DropdownItem>
              </Modal.Open>
            )}

            {canDelete && (
              <Modal.Open opensWindowName={`delete-${library.id}`}>
                <DropdownItem onClick={closeDropdown} disabled={isDeleting}>
                  <HiTrash /> {t('libraryRow.delete')}
                </DropdownItem>
              </Modal.Open>
            )}
          </DropdownMenu>
        </DropdownWrapper>
      )}

      {/* Modal windows */}
      {canView && (
        <Modal.Window name={`view-${library.id}`}>
          <LibraryDetails library={library} />
        </Modal.Window>
      )}

      {canEdit && (
        <Modal.Window name={`edit-${library.id}`}>
          <CreateLibraryForm libraryToEdit={library} />
        </Modal.Window>
      )}

      {canDelete && (
        <Modal.Window name={`delete-${library.id}`}>
          <ConfirmDelete
            onConfirm={handleDeleteConfirm}
            resourceName={t('libraryRow.resource')}
            itemLabel={library.name}
          />
        </Modal.Window>
      )}
    </TableRow>
  )
}

export default LibraryRow
