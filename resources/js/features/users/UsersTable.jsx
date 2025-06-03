import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import styled from 'styled-components'
import { getUsers } from '../../services/apiUser'
import Spinner from '../../ui/Spinner'
import UsersRow from './UsersRow'

const StyledTable = styled.div`
  width: 100%;
  margin-top: 2rem;
  border: 1px solid var(--color-grey-100);
  border-radius: 8px;
  overflow: hidden;
`

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 2fr 2.5fr 2fr 2fr 0.5fr;
  background-color: var(--color-grey-100);
  padding: 1.2rem 1rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-size: 1.4rem;
`

const SortableHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  user-select: none;

  .icon {
    font-size: 1.2rem;
    color: var(--color-grey-500);
  }

  &.active .icon {
    color: var(--color-grey-900);
    font-weight: bold;
  }
`

function UsersTable({ users }) {
  const { isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })

  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')

  if (isLoading) return <Spinner />
  if (error) return <div>Error loading users!</div>

  let sortedUsers = users ? [...users] : []

  // Sorting logic
  if (sortBy) {
    sortedUsers.sort((a, b) => {
      let aVal = a[sortBy]
      let bVal = b[sortBy]

      // For nested objects, eg. user.role.name or user.studentInfo.name (adjust as needed)
      if (sortBy === 'role') aVal = a.role?.name || ''
      else if (sortBy === 'studentInfo') aVal = a.studentInfo?.name || ''

      if (typeof aVal === 'string') aVal = aVal.toLowerCase()
      if (typeof bVal === 'string') bVal = bVal.toLowerCase()

      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
      return 0
    })
  }

  function handleSort(column) {
    if (sortBy === column) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  const renderSortIcon = (column) => {
    if (sortBy === column) return sortOrder === 'asc' ? '↑' : '↓'
    return '↑↓'
  }

  return (
    <StyledTable>
      <TableHeader>
        <div>ID</div>

        <SortableHeader
          onClick={() => handleSort('name')}
          className={sortBy === 'name' ? 'active' : ''}
        >
          Name <span className="icon">{renderSortIcon('name')}</span>
        </SortableHeader>

        <SortableHeader
          onClick={() => handleSort('email')}
          className={sortBy === 'email' ? 'active' : ''}
        >
          Email <span className="icon">{renderSortIcon('email')}</span>
        </SortableHeader>

        <SortableHeader
          onClick={() => handleSort('role')}
          className={sortBy === 'role' ? 'active' : ''}
        >
          Role <span className="icon">{renderSortIcon('role')}</span>
        </SortableHeader>

        <SortableHeader
          onClick={() => handleSort('studentInfo')}
          className={sortBy === 'studentInfo' ? 'active' : ''}
        >
          Student Info{' '}
          <span className="icon">{renderSortIcon('studentInfo')}</span>
        </SortableHeader>

        <div>Action</div>
      </TableHeader>

      {sortedUsers.map((user) => (
        <UsersRow user={user} key={user.id} />
      ))}

      {sortedUsers.length === 0 && (
        <div style={{ padding: '1.6rem' }}>No users found.</div>
      )}
    </StyledTable>
  )
}

export default UsersTable
