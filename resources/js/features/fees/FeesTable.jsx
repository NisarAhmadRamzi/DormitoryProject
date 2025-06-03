import { useEffect, useState } from 'react'

import FeesRow from './FeesRow'
import { PAGE_SIZE } from '../../utils/constants'
import Pagination from '../../ui/Pagination'
import Spinner from '../../ui/Spinner'
import { getFees } from '../../services/apiFees'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 2fr 2fr 2fr 2fr 2fr 0.5fr;
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

function FeesTable({ search = '' }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  // Default sortBy “field-order”. If none present, default to "id-asc"
  const sortParam = searchParams.get('sortBy') || 'id-asc'
  const [sortByCol, sortOrder] = sortParam.split('-')

  const { isLoading, data, error } = useQuery({
    queryKey: ['fees'],
    queryFn: getFees,
  })

  // We’ll rebuild the URL param whenever the user clicks a header:
  function handleSort(fieldName) {
    // If clicking same column, toggle between asc/desc; otherwise default to asc
    const newDirection =
      sortByCol === fieldName && sortOrder === 'asc' ? 'desc' : 'asc'
    searchParams.set('sortBy', `${fieldName}-${newDirection}`)
    // Reset to page 1 when sorting changes:
    searchParams.set('page', '1')
    setSearchParams(searchParams)
  }

  const renderSortIcon = (column) => {
    if (sortByCol === column) {
      return sortOrder === 'asc' ? '↑' : '↓'
    }
    return '↑↓'
  }

  if (isLoading) return <Spinner />
  if (error) return <div>Error loading fees!</div>

  // 1) Filter first:
  let filteredFees = data?.data || []
  if (search.trim() !== '') {
    filteredFees = filteredFees.filter((fee) => {
      const searchString = 
        `${fee.id} ${fee.student?.name} ${fee.student?.last_name}`.toLowerCase()
      return searchString.includes(search.toLowerCase())
    })
  }

  // 2) Sort next (before pagination):
  filteredFees = [...filteredFees].sort((a, b) => {
    let aVal = a[sortByCol]
    let bVal = b[sortByCol]

    // If sorting by “student”, compare full name string
    if (sortByCol === 'student') {
      aVal = `${a.student?.name} ${a.student?.last_name}`.toLowerCase() || ''
      bVal = `${b.student?.name} ${b.student?.last_name}`.toLowerCase() || ''
    }

    if (typeof aVal === 'string') aVal = aVal.toLowerCase()
    if (typeof bVal === 'string') bVal = bVal.toLowerCase()

    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
    return 0
  })

  // 3) Paginate last:
  const totalItems = filteredFees.length
  const startIndex = (currentPage - 1) * PAGE_SIZE
  const endIndex = startIndex + PAGE_SIZE
  const paginatedFees = filteredFees.slice(startIndex, endIndex)

  return (
    <>
      <Table role="table">
        <TableHeader role="row">
          {/* ID (sortable) */}
          <SortableHeader
            onClick={() => handleSort('id')}
            className={sortByCol === 'id' ? 'active' : ''}
          >
            ID <span className="icon">{renderSortIcon('id')}</span>
          </SortableHeader>

          {/* Student Name (sortable) */}
          <SortableHeader
            onClick={() => handleSort('student')}
            className={sortByCol === 'student' ? 'active' : ''}
          >
            Student Name{' '}
            <span className="icon">{renderSortIcon('student')}</span>
          </SortableHeader>

          {/* Office Pay (sortable) */}
          <SortableHeader
            onClick={() => handleSort('office_pay')}
            className={sortByCol === 'office_pay' ? 'active' : ''}
          >
            Office Pay <span className="icon">{renderSortIcon('office_pay')}</span>
          </SortableHeader>

          {/* Office Paid (sortable) */}
          <SortableHeader
            onClick={() => handleSort('office_paid')}
            className={sortByCol === 'office_paid' ? 'active' : ''}
          >
            Office Paid{' '}
            <span className="icon">{renderSortIcon('office_paid')}</span>
          </SortableHeader>

          {/* Warranty Pay (sortable) */}
          <SortableHeader
            onClick={() => handleSort('warranty_pay')}
            className={sortByCol === 'warranty_pay' ? 'active' : ''}
          >
            Warranty Pay{' '}
            <span className="icon">{renderSortIcon('warranty_pay')}</span>
          </SortableHeader>

          {/* Total Fee (sortable) */}
          <SortableHeader
            onClick={() => handleSort('total_fee')}
            className={sortByCol === 'total_fee' ? 'active' : ''}
          >
            Total Fee <span className="icon">{renderSortIcon('total_fee')}</span>
          </SortableHeader>

          {/* Action (not sortable) */}
          <div>Action</div>
        </TableHeader>

        {paginatedFees.map((fee) => (
          <FeesRow key={fee.id} fee={fee} />
        ))}

        {filteredFees.length === 0 && (
          <div style={{ padding: '1.6rem' }}>No matching fees found.</div>
        )}

        <Pagination count={totalItems} />
      </Table>
    </>
  )
}

export default FeesTable
