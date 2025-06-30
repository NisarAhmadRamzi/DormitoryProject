import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { FaTrashArrowUp } from 'react-icons/fa6'
import { FiEdit } from 'react-icons/fi'
import styled from 'styled-components'
import { deleteRole } from '../../services/apiRoles'
import ConfirmDelete from '../../ui/ConfirmDelete' // Import ConfirmDelete
import Modal from '../../ui/Modal'
import EditRoleForm from './EditRoleForm'

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.2fr 4fr 1fr 1fr 1fr;
  padding: 1.2rem 1rem;
  align-items: center;
  border-bottom: 1px solid var(--color-grey-200);
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }
`

const ModalHeader = styled.h2`
  margin: 0 0 1rem;
  font-size: 1.6rem;
`

const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;

  & svg {
    width: 2.2rem;
    height: 2.2rem;
  }
`

const EditIcon = styled(FiEdit)`
  color: #2563eb; // blue
`

const DeleteIcon = styled(FaTrashArrowUp)`
  color: #dc2626; // red
`

export default function RoleRow({ role }) {
  const qc = useQueryClient()

  const deleteMut = useMutation(() => deleteRole(role.id), {
    onSuccess: () => {
      qc.invalidateQueries(['roles'])
      toast.success('Role deleted')
    },
    onError: (err) => toast.error(err.message || 'Delete failed'),
  })
  const handleCloseModal = () => {}

  return (
    <>
      <TableRow role="row">
        <div>{role.id}</div>
        <div>{role.name}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {role.permissions.map((p) => (
            <span
              key={p.id}
              style={{
                padding: '4px 6px',
                background: 'var(--color-grey-400)',
                borderRadius: '4px',
                fontSize: '1.2rem',
              }}
            >
              {p.name}
            </span>
          ))}
        </div>
        <div>{role.created_at}</div>
        <div>{role.updated_at}</div>
        <ActionGroup>
          <Modal.Open opensWindowName={`edit-role-${role.id}`}>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Modal.Open>

          <Modal.Open opensWindowName={`delete-role-${role.id}`}>
            <IconButton>
              <DeleteIcon style={{ marginLeft: '20px' }} />
            </IconButton>
          </Modal.Open>
        </ActionGroup>
      </TableRow>

      {/* Edit Role Modal */}
      <Modal.Window name={`edit-role-${role.id}`}>
        <ModalHeader>Edit Role: {role.name}</ModalHeader>
        <EditRoleForm role={role} />
      </Modal.Window>

      {/* Delete Confirmation Modal */}
      <Modal.Window name={`delete-role-${role.id}`}>
        <ModalHeader>Delete Role</ModalHeader>
        <ConfirmDelete
          resourceName="Role"
          itemLabel={role.name}
          onConfirm={() => deleteMut.mutate()}
          onCloseModal={handleCloseModal}
        />
      </Modal.Window>
    </>
  )
}
