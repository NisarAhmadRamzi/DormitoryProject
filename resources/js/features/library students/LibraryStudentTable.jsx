import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import styled from 'styled-components'
import { getAllLibraryStudents } from '../../services/apiLibraryStudents'
import Spinner from '../../ui/Spinner'
import LibraryStudentRow from './LibraryStudentRow'

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
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
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

const TableBody = styled.div`
  max-height: 400px;
  overflow-y: auto;
`

function LibraryStudentsTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['library-students'],
    queryFn: getAllLibraryStudents,
  })

  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')

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

  let students = data?.data || []

  if (sortBy) {
    students = [...students].sort((a, b) => {
      let aVal = a[sortBy]
      let bVal = b[sortBy]
      if (typeof aVal === 'string') aVal = aVal.toLowerCase()
      if (typeof bVal === 'string') bVal = bVal.toLowerCase()

      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
      return 0
    })
  }

  if (isLoading) return <Spinner />
  if (error) return <p>Error loading students</p>

  return (
    <Table>
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
          onClick={() => handleSort('phone')}
          className={sortBy === 'phone' ? 'active' : ''}
        >
          Phone <span className="icon">{renderSortIcon('phone')}</span>
        </SortableHeader>
        <SortableHeader
          onClick={() => handleSort('address')}
          className={sortBy === 'address' ? 'active' : ''}
        >
          Address <span className="icon">{renderSortIcon('address')}</span>
        </SortableHeader>
        <div>Actions</div>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <LibraryStudentRow key={student.id} student={student} />
        ))}
      </TableBody>
    </Table>
  )
}

export default LibraryStudentsTable
