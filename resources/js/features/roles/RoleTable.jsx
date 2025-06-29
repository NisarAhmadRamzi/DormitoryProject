import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import { getRoles } from '../../services/apiRoles'
import Spinner from '../../ui/Spinner'
import RoleRow from './RoleRow'

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
`
const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 1.4fr 2fr 2fr 2fr 1fr; // <-- Match this exactly with TableRow
  align-items: center;
  background-color: var(--color-grey-50);
  padding: 1.4rem 1rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-grey-600);
`

function RoleTable({ search = '' }) {
  const { data, isLoading, isError, error } = useQuery(['roles'], getRoles)

  if (isLoading) return <Spinner />
  if (isError) return <p>Error: {error.message}</p>

  // Check if data is available
  const roles = Array.isArray(data?.data) ? data.data : []

  // Filter roles based on the search input
  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(search.toLowerCase())
  )

  if (filteredRoles.length === 0) return <p>No matching roles found.</p>

  return (
    <Table role="table">
      <TableHeader role="row">
        <div>ID</div>
        <div>Name</div>
        <div>Created At</div>
        <div>Updated At</div>
        <div>Actions</div>
      </TableHeader>

      {filteredRoles.map((role) => (
        <RoleRow key={role.id} role={role} />
      ))}
    </Table>
  )
}

export default RoleTable
