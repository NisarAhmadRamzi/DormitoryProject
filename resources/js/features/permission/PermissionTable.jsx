import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { getPermission } from '../../services/apiPermission'
import Spinner from '../../ui/Spinner'
import PermissionRow from './PermissionRow'

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
`

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 1.4fr 2fr 2fr 2fr 1fr;
  align-items: center;
  background-color: var(--color-grey-50);
  padding: 1.4rem 1rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-grey-600);
`

function PermissionTable({ search = '' }) {
  const { t } = useTranslation()

  const { data, isLoading, isError, error } = useQuery(
    ['permissions'],
    getPermission,
    {
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    }
  )

  if (isLoading) return <Spinner />
  if (isError)
    return (
      <p>
        {t('errors.loading')} : {error.message}
      </p>
    )

  const permissions = Array.isArray(data?.data) ? data.data : []

  const filteredPermissions = permissions.filter((permission) =>
    permission.name.toLowerCase().includes(search.toLowerCase())
  )

  if (filteredPermissions.length === 0) return <p>{t('permission.notFound')}</p>

  return (
    <Table role="table">
      <TableHeader role="row">
        <div>{t('permission.id')}</div>
        <div>{t('permission.name')}</div>
        <div>{t('permission.createdAt')}</div>
        <div>{t('permission.updatedAt')}</div>
        <div>{t('permission.actions')}</div>
      </TableHeader>

      {filteredPermissions.map((permission) => (
        <PermissionRow key={permission.id} permission={permission} />
      ))}
    </Table>
  )
}

export default PermissionTable
