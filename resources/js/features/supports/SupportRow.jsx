import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { HiEllipsisVertical, HiEye, HiPencil, HiTrash } from 'react-icons/hi2'

import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { hasPermission } from '../../components/permissions'
import { useUser } from '../../context/UserContext'

import { deleteSupport } from '../../services/apiSupports'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Modal from '../../ui/Modal'
import CreateSupportForm from './CreateSupportForm'
import SupportDetails from './SupportDetails'

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
  padding: 0.5rem 0;
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

function SupportRow({ support }) {
  const { t } = useTranslation()
  const { user } = useUser()
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState(null)
  const dropdownRef = useRef()

  const canView = hasPermission(user, 'view support')
  const canEdit = hasPermission(user, 'edit support')
  const canDelete = hasPermission(user, 'delete support')
  const hasAnyPermission = canView || canEdit || canDelete

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteSupport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supports'] })
      toast.success(t('AlertSupports.messages.deleted'))
    },
    onError: (err) => {
      console.error('Error during deletion:', err)
      toast.error(err.message || t('AlertSupports.messages.deleteError'))
    },
  })

  function handleDeleteConfirm() {
    mutate(support.id)
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
      <Id>{support.type}</Id>
      <Cell>{support.details.split(' ').slice(0, 4).join(' ')}...</Cell>
      <Cell>{support.helper_fullname}</Cell>
      <Cell>{support.helper_number}</Cell>
      <Cell>{support.helper_email || '—'}</Cell>

      {hasAnyPermission && (
        <DropdownWrapper ref={dropdownRef}>
          <IconButton
            onClick={toggleDropdown}
            aria-label={t('actions.actions')}
          >
            <HiEllipsisVertical />
          </IconButton>

          <DropdownMenu show={isOpen} position={dropdownPosition} role="menu">
            {canView && (
              <Modal.Open opensWindowName={`view-${support.id}`}>
                <DropdownItem onClick={closeDropdown} role="menuitem">
                  <HiEye /> {t('actions.view')}
                </DropdownItem>
              </Modal.Open>
            )}

            {canEdit && (
              <Modal.Open opensWindowName={`edit-${support.id}`}>
                <DropdownItem onClick={closeDropdown} role="menuitem">
                  <HiPencil /> {t('actions.edit')}
                </DropdownItem>
              </Modal.Open>
            )}

            {canDelete && (
              <Modal.Open opensWindowName={`delete-${support.id}`}>
                <DropdownItem
                  onClick={closeDropdown}
                  disabled={isDeleting}
                  role="menuitem"
                >
                  <HiTrash /> {t('actions.delete')}
                </DropdownItem>
              </Modal.Open>
            )}
          </DropdownMenu>
        </DropdownWrapper>
      )}

      {canView && (
        <Modal.Window name={`view-${support.id}`}>
          <SupportDetails support={support} />
        </Modal.Window>
      )}

      {canEdit && (
        <Modal.Window name={`edit-${support.id}`}>
          <CreateSupportForm supportToEdit={support} />
        </Modal.Window>
      )}

      {canDelete && (
        <Modal.Window name={`delete-${support.id}`}>
          <ConfirmDelete
            onConfirm={handleDeleteConfirm}
            resourceName={t('AlertSupports.resource')}
            itemLabel={support.type}
          />
        </Modal.Window>
      )}
    </TableRow>
  )
}

export default SupportRow
