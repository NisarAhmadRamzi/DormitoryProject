import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { HiEllipsisVertical, HiEye, HiPencil, HiTrash } from 'react-icons/hi2'
import styled from 'styled-components'

import { hasPermission } from '../../components/permissions'
import { useUser } from '../../context/UserContext'
import { deleteExpense } from '../../services/apiExpenses'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Modal from '../../ui/Modal'
import CreateExpensesForm from './CreateExpesesForm'
import ExpensesDetails from './ExpensesDetails'

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 2fr 2fr 2fr 2fr 0.5fr;
  column-gap: 2.4rem;
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

const Cell = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-700);
  padding: 0.5rem 0;
  text-align: ${({ align }) => align || 'left'};
`

const TruncatedCell = styled(Cell)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  cursor: help;
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

function ExpenseRow({ expense }) {
  const { t } = useTranslation()
  const { user } = useUser()
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState(null)
  const dropdownRef = useRef()

  // Permission checks
  const canView = hasPermission(user, 'view expense')
  const canEdit = hasPermission(user, 'edit expense')
  const canDelete = hasPermission(user, 'delete expense')
  const hasAnyPermission = canView || canEdit || canDelete

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
      toast.success(t('ExpensesAlert.deleteSuccess'))
    },
    onError: (err) => {
      console.error('Error during deletion:', err)
      toast.error(err.message || t('ExpensesAlert.deleteError'))
    },
  })

  function handleDeleteConfirm() {
    mutate(expense.id)
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
      <Cell>{expense.type}</Cell>
      <Cell align="center">{expense.expense_cash}</Cell>
      <TruncatedCell title={expense.description || '—'}>
        {expense.description || '—'}
      </TruncatedCell>
      <Cell>{expense.expense_date}</Cell>

      {hasAnyPermission && (
        <DropdownWrapper ref={dropdownRef}>
          <IconButton onClick={toggleDropdown}>
            <HiEllipsisVertical />
          </IconButton>

          <DropdownMenu show={isOpen} position={dropdownPosition}>
            {canView && (
              <Modal.Open opensWindowName={`view-${expense.id}`}>
                <DropdownItem onClick={closeDropdown}>
                  <HiEye /> {t('actions.view')}
                </DropdownItem>
              </Modal.Open>
            )}

            {canEdit && (
              <Modal.Open opensWindowName={`edit-${expense.id}`}>
                <DropdownItem onClick={closeDropdown}>
                  <HiPencil /> {t('actions.edit')}
                </DropdownItem>
              </Modal.Open>
            )}

            {canDelete && (
              <Modal.Open opensWindowName={`delete-${expense.id}`}>
                <DropdownItem onClick={closeDropdown} disabled={isDeleting}>
                  <HiTrash /> {t('actions.delete')}
                </DropdownItem>
              </Modal.Open>
            )}
          </DropdownMenu>
        </DropdownWrapper>
      )}

      {canView && (
        <Modal.Window name={`view-${expense.id}`}>
          <ExpensesDetails expense={expense} />
        </Modal.Window>
      )}

      {canEdit && (
        <Modal.Window name={`edit-${expense.id}`}>
          <CreateExpensesForm expenseToEdit={expense} />
        </Modal.Window>
      )}

      {canDelete && (
        <Modal.Window name={`delete-${expense.id}`}>
          <ConfirmDelete
            onConfirm={handleDeleteConfirm}
            resourceName={t('resource.expense')}
            itemLabel={expense.name}
          />
        </Modal.Window>
      )}
    </TableRow>
  )
}

export default ExpenseRow
