import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import styled from 'styled-components'
import { getStudents } from '../../services/apiStudents'
import Spinner from '../../ui/Spinner'
import StudentRow from './StudentRow'

// Styled Components
const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 2fr 2.5fr 2.5fr 2.5fr 0.5fr;
  column-gap: 0.5rem;
  align-items: center;
  background-color: var(--color-grey-50);
  padding: 1.6rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-grey-600);
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

function StudentTable({ search = '' }) {
  const { data, isLoading, isError, error } = useQuery(
    ['students'],
    getStudents
  )

  const students = Array.isArray(data) ? data : data?.data ?? []

  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')

  if (isLoading) return <Spinner />
  if (isError) return <p>Error: {error.message}</p>

  // Filter
  let filteredStudents = students.filter(
    (student) =>
      student.name?.toLowerCase().includes(search.toLowerCase()) ||
      student.email?.toLowerCase().includes(search.toLowerCase())
  )

  // Sort
  if (sortBy) {
    filteredStudents = [...filteredStudents].sort((a, b) => {
      let aVal = a[sortBy]
      let bVal = b[sortBy]

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

  if (filteredStudents.length === 0) return <p>No matching students found.</p>

  return (
    <Table role="table">
      <TableHeader role="row">
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
          onClick={() => handleSort('id_number')}
          className={sortBy === 'id_number' ? 'active' : ''}
        >
          ID Number <span className="icon">{renderSortIcon('id_number')}</span>
        </SortableHeader>
        <SortableHeader
          onClick={() => handleSort('phone')}
          className={sortBy === 'phone' ? 'active' : ''}
        >
          Phone <span className="icon">{renderSortIcon('phone')}</span>
        </SortableHeader>
        <div>Actions</div>
      </TableHeader>

      {filteredStudents.map((student) => (
        <StudentRow key={student.id} student={student} />
      ))}
    </Table>
  )
}

export default StudentTable
