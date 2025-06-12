import { useMutation, useQueryClient } from '@tanstack/react-query'

import ConfirmDelete from '../../ui/ConfirmDelete'
import CreatePermissionForm from './CreatePermissionForm'
import Modal from '../../ui/Modal'
import { deletePermission } from '../../services/apiPermission'
import styled from 'styled-components'
import toast from 'react-hot-toast'

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 2fr 2fr 2fr 1fr;
  padding: 1.4rem 1rem;
  align-items: center;
  justify-content: center;
  border-top: 1px solid var(--color-grey-200);
`

const DeleteButton = styled.button`
  background-color: var(--color-red-700);
  color: white;
  width: 150px;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: var(--border-radius-sm);
  font-size: 1.4rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-red-800);
  }
`

function PermissionRow({ permission }) {
  const queryClient = useQueryClient()

  const { mutate: deleteMutate, isLoading: isDeleting } = useMutation({
    mutationFn: deletePermission,
    onSuccess: () => {
      queryClient.invalidateQueries(['permissions'])
      toast.success('permission deleted successfully')
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to delete permission')
    },
  })

  const handleDeleteConfirm = () => {
    deleteMutate(permission.id)
  }

  return (
    <TableRow>
      <div>{permission.id}</div>
      <div>{permission.name}</div>
      <div>{permission.created_at}</div>
      <div>{permission.updated_at}</div>

      <div>
        <Modal.Open opensWindowName={`delete-permission-${permission.id}`}>
          <DeleteButton disabled={isDeleting}>Delete permission</DeleteButton>
        </Modal.Open>

        <Modal.Window name={`delete-permission-${permission.id}`}>
          <ConfirmDelete
            onConfirm={handleDeleteConfirm}
            resourceName="permission"
            itemLabel={permission.name}
          />
        </Modal.Window>
      </div>

      <CreatePermissionForm permissionToEdit={permission} />
    </TableRow>
  )
}

export default PermissionRow
