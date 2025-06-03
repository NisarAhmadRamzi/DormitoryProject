import ComplaintsRow from './ComplaintsRow'
import { PAGE_SIZE } from '../../utils/constants'
import Pagination from '../../ui/Pagination'
import Spinner from '../../ui/Spinner'
import { getComplaints } from '../../services/apiComplaints'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'

// --- Styled components ---
const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 2fr 3fr 1.5fr 2fr 0.5fr;
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

// --- Component ---
function ComplaintsTable({ search = '' }) {
  const [searchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const { isLoading, data, error } = useQuery({
    queryKey: ['complaints'],
    queryFn: getComplaints,
  })

  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')

  if (isLoading) return <Spinner />
  if (error) return <div>Error loading complaints!</div>

  // 1) FILTER
  let complaints = data?.data || []
  if (search.trim() !== '') {
    complaints = complaints.filter((c) => {
      const searchStr =
        `${c.id} ${c.title} ${c.description} ${c.status} ${c.student?.name}`.toLowerCase()
      return searchStr.includes(search.toLowerCase())
    })
  }

  // 2) SORT (if sortBy is set)
  if (sortBy) {
    complaints = [...complaints].sort((a, b) => {
      let aVal, bVal

      switch (sortBy) {
        case 'id':
          aVal = a.id
          bVal = b.id
          break
        case 'student':
          aVal = (a.student?.name || '').toLowerCase()
          bVal = (b.student?.name || '').toLowerCase()
          break
        case 'title':
          aVal = (a.title || '').toLowerCase()
          bVal = (b.title || '').toLowerCase()
          break
        case 'status':
          aVal = (a.status || '').toLowerCase()
          bVal = (b.status || '').toLowerCase()
          break
        case 'created_at':
          aVal = new Date(a.created_at).getTime()
          bVal = new Date(b.created_at).getTime()
          break
        default:
          aVal = ''
          bVal = ''
      }

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
      return 0
    })
  }

  // 3) PAGINATE
  const totalItems = complaints.length
  const start = (currentPage - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE
  const paginatedComplaints = complaints.slice(start, end)

  // --- Handlers for sorting ---
  function handleSort(column) {
    if (sortBy === column) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  const renderSortIcon = (column) => {
    if (sortBy === column) {
      return sortOrder === 'asc' ? '↑' : '↓'
    }
    return '↑↓'
  }

  return (
    <>
      <Table role="table">
        <TableHeader role="row">
          {/* ID */}
          <SortableHeader
            onClick={() => handleSort('id')}
            className={sortBy === 'id' ? 'active' : ''}
          >
            <div>ID</div>
            <span className="icon">{renderSortIcon('id')}</span>
          </SortableHeader>

          {/* Student Name */}
          <SortableHeader
            onClick={() => handleSort('student')}
            className={sortBy === 'student' ? 'active' : ''}
          >
            <div>Student Name</div>
            <span className="icon">{renderSortIcon('student')}</span>
          </SortableHeader>

          {/* Title */}
          <SortableHeader
            onClick={() => handleSort('title')}
            className={sortBy === 'title' ? 'active' : ''}
          >
            <div>Title</div>
            <span className="icon">{renderSortIcon('title')}</span>
          </SortableHeader>

          {/* Status */}
          <SortableHeader
            onClick={() => handleSort('status')}
            className={sortBy === 'status' ? 'active' : ''}
          >
            <div>Status</div>
            <span className="icon">{renderSortIcon('status')}</span>
          </SortableHeader>

          {/* Created At */}
          <SortableHeader
            onClick={() => handleSort('created_at')}
            className={sortBy === 'created_at' ? 'active' : ''}
          >
            <div>Created At</div>
            <span className="icon">{renderSortIcon('created_at')}</span>
          </SortableHeader>

          {/* Action (not sortable) */}
          <div>Action</div>
        </TableHeader>

        {paginatedComplaints.map((complaint) => (
          <ComplaintsRow key={complaint.id} complaint={complaint} />
        ))}

        {complaints.length === 0 && (
          <div style={{ padding: '1.6rem' }}>No matching complaints found.</div>
        )}

        <Pagination count={totalItems} />
      </Table>
    </>
  )
}

export default ComplaintsTable
