import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { getSupports } from '../../services/apiSupports'
import Pagination from '../../ui/Pagination'
import Spinner from '../../ui/Spinner'
import { PAGE_SIZE } from '../../utils/constants'
import SupportRow from './SupportRow'

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

function SupportTable({ search }) {
  const [searchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const { isLoading, data, error } = useQuery({
    queryKey: ['supports'],
    queryFn: getSupports,
  })

  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')

  if (isLoading) return <Spinner />
  if (error) return <div>Error loading supports!</div>

  let filteredSupports = data?.data || []

  // Search functionality
  if (search.trim() !== '') {
    filteredSupports = filteredSupports.filter((support) => {
      const searchString =
        `${support.type} ${support.details} ${support.helper_fullname} ${support.helper_number} ${support.helper_email}`.toLowerCase()
      return searchString.includes(search.toLowerCase())
    })
  }

  // Sort functionality
  if (sortBy) {
    filteredSupports = [...filteredSupports].sort((a, b) => {
      let aVal = a[sortBy]
      let bVal = b[sortBy]

      if (typeof aVal === 'string') aVal = aVal.toLowerCase()
      if (typeof bVal === 'string') bVal = bVal.toLowerCase()

      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
      return 0
    })
  }

  // Pagination
  const totalItems = filteredSupports.length
  const start = (currentPage - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE
  const paginatedSupports = filteredSupports.slice(start, end)

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
          {/* <div></div> */}
          <SortableHeader
            onClick={() => handleSort('type')}
            className={sortBy === 'type' ? 'active' : ''}
          >
            Type <span className="icon">{renderSortIcon('type')}</span>
          </SortableHeader>

          <SortableHeader
            onClick={() => handleSort('details')}
            className={sortBy === 'details' ? 'active' : ''}
          >
            Details <span className="icon">{renderSortIcon('details')}</span>
          </SortableHeader>

          <SortableHeader
            onClick={() => handleSort('helper_fullname')}
            className={sortBy === 'helper_fullname' ? 'active' : ''}
          >
            Helper Fullname{' '}
            <span className="icon">{renderSortIcon('helper_fullname')}</span>
          </SortableHeader>

          <SortableHeader
            onClick={() => handleSort('helper_number')}
            className={sortBy === 'helper_number' ? 'active' : ''}
          >
            Helper Number{' '}
            <span className="icon">{renderSortIcon('helper_number')}</span>
          </SortableHeader>

          <SortableHeader
            onClick={() => handleSort('helper_email')}
            className={sortBy === 'helper_email' ? 'active' : ''}
          >
            Helper Email{' '}
            <span className="icon">{renderSortIcon('helper_email')}</span>
          </SortableHeader>

          <div>Action</div>
        </TableHeader>

        {paginatedSupports.map((support) => (
          <SupportRow support={support} key={support.id} />
        ))}

        {filteredSupports.length === 0 && (
          <div style={{ padding: '1.6rem' }}>No matching supports found.</div>
        )}

        <Pagination count={totalItems} />
      </Table>
    </>
  )
}

export default SupportTable
