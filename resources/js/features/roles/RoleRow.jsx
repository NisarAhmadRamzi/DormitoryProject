
import { useMutation, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import 'dayjs/locale/en'
import 'dayjs/locale/fa'
import relativeTime from 'dayjs/plugin/relativeTime'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { FaTrash } from 'react-icons/fa'
import { FiEdit } from 'react-icons/fi'
import styled from 'styled-components'
import { deleteRole } from '../../services/apiRoles'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Modal from '../../ui/Modal'
import EditRoleForm from './EditRoleForm'

dayjs.extend(relativeTime)

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.2fr 4fr 1fr 1fr 1fr;
  padding: 1rem;
  align-items: center;
  border-bottom: 1px solid var(--color-grey-200);
  transition: background-color 0.2s;
  &:hover {
    background-color: var(--color-grey-100);
  }
`

const PermissionsCell = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`

const Badge = styled.span`
  padding: 2px 6px;
  background: var(--color-grey-300);
  border-radius: 4px;
  font-size: 1.2rem;
`

const ActionGroup = styled.div`
  display: flex;
  gap: 0.8rem;
`

const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  color: var(--color-brand-600); /* Blue color for edit icon */

  & svg {
    width: 1.8rem;
    height: 1.8rem;
  }
`

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  color: #e53e3e; /* direct red color */

  & svg {
    width: 1.8rem;
    height: 1.8rem;
  }
`

export default function RoleRow({ role }) {
  const { t, i18n } = useTranslation()
  const qc = useQueryClient()

  const deleteMut = useMutation(() => deleteRole(role.id), {
    onSuccess: () => {
      qc.invalidateQueries(['roles'])
      toast.success(t('roleRow.deleteSuccess'))
    },
    onError: (err) => {
      toast.error(err.message || t('roleRow.deleteFail'))
    },
  })

  // Determine locale for dayjs: map 'ps' to 'fa', else use current or fallback to 'en'
  const supportedLocales = ['en', 'fa']
  const locale =
    i18n.language === 'ps'
      ? 'fa'
      : supportedLocales.includes(i18n.language)
      ? i18n.language
      : 'en'
  dayjs.locale(locale)

  return (
    <>
      <TableRow role="row">
        <div>{role.id}</div>
        <div>{role.name}</div>

        <PermissionsCell>
          {Array.isArray(role.permissions) && role.permissions.length > 0 ? (
            role.permissions.map((p) => <Badge key={p.id}>{p.name}</Badge>)
          ) : (
            <Badge>—</Badge>
          )}
        </PermissionsCell>

        <div>{dayjs(role.created_at).fromNow()}</div>
        <div>{dayjs(role.updated_at).fromNow()}</div>
        <ActionGroup>
          <Modal.Open opensWindowName={`edit-role-${role.id}`}>
            <EditButton aria-label={t('actions.edit')}>
              <FiEdit />
            </EditButton>
          </Modal.Open>
          <Modal.Open opensWindowName={`delete-role-${role.id}`}>
            <DeleteButton aria-label={t('actions.delete')}>
              <FaTrash />
            </DeleteButton>
          </Modal.Open>
        </ActionGroup>
      </TableRow>

      <Modal.Window name={`edit-role-${role.id}`}>
        <h2>{t('roleRow.editTitle', { name: role.name })}</h2>
        <EditRoleForm role={role} onCloseModal={() => {}} />
      </Modal.Window>

      <Modal.Window name={`delete-role-${role.id}`}>
        <h2>{t('roleRow.deleteTitle')}</h2>
        <ConfirmDelete
          resourceName={t('roleRow.resourceName')}
          itemLabel={role.name}
          onConfirm={() => deleteMut.mutate()}
        />
      </Modal.Window>
    </>
  )
}
