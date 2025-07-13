import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { HiEllipsisVertical, HiEye, HiPencil, HiTrash } from 'react-icons/hi2'
import styled from 'styled-components'
import { deleteAsset } from '../../services/apiAssets'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Modal from '../../ui/Modal'
import AssetsDetails from './AssetsDetails'
import CreateAssetsForm from './CreateAssetsForm'

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 2fr 2fr 2fr 2fr 0.5fr;
  column-gap: 0.5rem;
  align-items: center;
  padding: 1.6rem 2.4rem;
  border-bottom: 1px solid var(--color-grey-100);
`

const Id = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
`

const Cell = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-700);
`

const DropdownWrapper = styled.div`
  position: relative;
`

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

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
`

function AssetsRow({ asset }) {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState(null)
  const dropdownRef = useRef()

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteAsset,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] })
      toast.success(t('assetsAlert.deletedSuccess'))
    },
    onError: (err) => {
      toast.error(err.message || t('assetsAlert.deleteFailed'))
    },
  })

  function handleDeleteConfirm() {
    mutate(asset.id)
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
      <Id>{asset.id}</Id>
      <Cell>{asset.total_quantity}</Cell>
      <Cell>{asset.total_amount_of_donations}</Cell>
      <Cell>{asset.total_amount_of_cash_before_expense}</Cell>
      <Cell>{asset.total_amount_of_cash_after_expense}</Cell>

      <DropdownWrapper ref={dropdownRef}>
        <IconButton onClick={toggleDropdown}>
          <HiEllipsisVertical />
        </IconButton>

        <DropdownMenu show={isOpen} position={dropdownPosition}>
          <Modal.Open opensWindowName={`view-${asset.id}`}>
            <DropdownItem onClick={closeDropdown}>
              <HiEye /> {t('actions.view')}
            </DropdownItem>
          </Modal.Open>

          <Modal.Open opensWindowName={`edit-${asset.id}`}>
            <DropdownItem onClick={closeDropdown}>
              <HiPencil /> {t('actions.edit')}
            </DropdownItem>
          </Modal.Open>

          <Modal.Open opensWindowName={`delete-${asset.id}`}>
            <DropdownItem onClick={closeDropdown} disabled={isDeleting}>
              <HiTrash /> {t('actions.delete')}
            </DropdownItem>
          </Modal.Open>
        </DropdownMenu>
      </DropdownWrapper>

      <Modal.Window name={`view-${asset.id}`}>
        <AssetsDetails asset={asset} />
      </Modal.Window>

      <Modal.Window name={`edit-${asset.id}`}>
        <CreateAssetsForm assetToEdit={asset} />
      </Modal.Window>

      <Modal.Window name={`delete-${asset.id}`}>
        <ConfirmDelete
          onConfirm={handleDeleteConfirm}
          resourceName={t('assetsAlert.asset')}
          itemLabel={`Asset #${asset.id}`}
        />
      </Modal.Window>
    </TableRow>
  )
}

export default AssetsRow
