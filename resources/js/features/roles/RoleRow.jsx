import { useMutation, useQueryClient } from '@tanstack/react-query'

import toast from 'react-hot-toast'
import styled from 'styled-components'
import { deleteRole } from '../../services/apiRoles'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Modal from '../../ui/Modal'
import CreateRoleForm from './CreateRoleForm'

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

function RoleRow({ role }) {
  const queryClient = useQueryClient()

  const { mutate: deleteMutate, isLoading: isDeleting } = useMutation({
    mutationFn: deleteRole,
    onSuccess: () => {
      queryClient.invalidateQueries(['roles'])
      toast.success('Role deleted successfully')
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to delete role')
    },
  })

  const handleDeleteConfirm = () => {
    deleteMutate(role.id)
  }

  return (
    <TableRow>
      <div>{role.id}</div>
      <div>{role.name}</div>
      <div>{role.created_at}</div>
      <div>{role.updated_at}</div>

      <div>
        <Modal.Open opensWindowName={`delete-role-${role.id}`}>
          <DeleteButton disabled={isDeleting}>Delete Role</DeleteButton>
        </Modal.Open>

        <Modal.Window name={`delete-role-${role.id}`}>
          <ConfirmDelete
            onConfirm={handleDeleteConfirm}
            resourceName="role"
            itemLabel={role.name}
          />
        </Modal.Window>
      </div>

      <CreateRoleForm roleToEdit={role} />
    </TableRow>
  )
}

export default RoleRow
