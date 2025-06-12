import PermissionRow from './PermissionRow'
import Spinner from '../../ui/Spinner'
import { getPermission } from '../../services/apiPermission'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'

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
  const { data, isLoading, isError, error } = useQuery(
    ['permissions'],
    getPermission,
    {
      refetchOnWindowFocus: true, // This ensures fresh data on window focus
      refetchOnReconnect: true, // Optional: refetch when reconnecting
    }
  )

  if (isLoading) return <Spinner />
  if (isError) return <p>Error: {error.message}</p>

  const permissions = Array.isArray(data?.data) ? data.data : []

  const filteredPermissions = permissions.filter((permission) =>
    permission.name.toLowerCase().includes(search.toLowerCase())
  )

  if (filteredPermissions.length === 0)
    return <p>No matching permissions found.</p>

  return (
    <Table role="table">
      <TableHeader role="row">
        <div>ID</div>
        <div>Name</div>
        <div>Created At</div>
        <div>Updated At</div>
        <div>Actions</div>
      </TableHeader>

      {filteredPermissions.map((permission) => (
        <PermissionRow key={permission.id} permission={permission} />
      ))}
    </Table>
  )
}

export default PermissionTable
