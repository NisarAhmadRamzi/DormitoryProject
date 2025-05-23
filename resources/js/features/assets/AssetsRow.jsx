import { HiEllipsisVertical, HiEye, HiPencil, HiTrash } from 'react-icons/hi2'
import { useEffect, useRef, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import AssetsDetails from './AssetsDetails'
import ConfirmDelete from '../../ui/ConfirmDelete'
import CreateAssetsForm from './CreateAssetsForm'
import Modal from '../../ui/Modal'
import { deleteAsset } from '../../services/apiAssets' // delete asset API
import styled from 'styled-components'
import toast from 'react-hot-toast'

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

  /* Dark mode styles */
  @media (prefers-color-scheme: dark) {
    background-color: var(--color-grey-800); /* Dark background */
  }
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

function AssetsRow({ asset }) {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState(null)
  const dropdownRef = useRef()

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteAsset,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] })
      toast.success('Asset deleted successfully')
    },
    onError: (err) => {
      console.error('Error during deletion:', err)
      toast.error(err.message || 'Failed to delete asset')
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
      <Cell>{asset.quantity}</Cell>
      <Cell>{asset.description || '—'}</Cell>
      <Cell>{asset.total_quantity}</Cell>

      <DropdownWrapper ref={dropdownRef}>
        <IconButton onClick={toggleDropdown}>
          <HiEllipsisVertical />
        </IconButton>

        <DropdownMenu show={isOpen} position={dropdownPosition}>
          <Modal.Open opensWindowName={`view-${asset.id}`}>
            <DropdownItem onClick={closeDropdown}>
              <HiEye /> View
            </DropdownItem>
          </Modal.Open>

          <Modal.Open opensWindowName={`edit-${asset.id}`}>
            <DropdownItem onClick={closeDropdown}>
              <HiPencil /> Edit
            </DropdownItem>
          </Modal.Open>

          <Modal.Open opensWindowName={`delete-${asset.id}`}>
            <DropdownItem onClick={closeDropdown} disabled={isDeleting}>
              <HiTrash /> Delete
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
        <ConfirmDelete onConfirm={handleDeleteConfirm} />
      </Modal.Window>
    </TableRow>
  )
}

export default AssetsRow
