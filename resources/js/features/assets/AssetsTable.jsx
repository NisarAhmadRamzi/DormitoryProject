import AssetsRow from './AssetsRow'
import { PAGE_SIZE } from '../../utils/constants'
import Pagination from '../../ui/Pagination'
import Spinner from '../../ui/Spinner'
import { getAssets } from '../../services/apiAssets' // fetch assets API
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 2fr 2.5fr 2.5fr 0.5fr;
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

function AssetsTable({ search }) {
  const [searchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const { isLoading, data, error } = useQuery({
    queryKey: ['assets'],
    queryFn: getAssets,
  })

  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')

  if (isLoading) return <Spinner />
  if (error) return <div>Error loading assets!</div>

  let filteredAssets = data?.data || []

  // Search functionality
  if (search.trim() !== '') {
    filteredAssets = filteredAssets.filter((asset) => {
      const searchString =
        `${asset.id} ${asset.quantity} ${asset.description}`.toLowerCase()
      return searchString.includes(search.toLowerCase())
    })
  }

  // Sort functionality
  if (sortBy) {
    filteredAssets = [...filteredAssets].sort((a, b) => {
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
  const totalItems = filteredAssets.length
  const start = (currentPage - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE
  const paginatedAssets = filteredAssets.slice(start, end)

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
          <div></div>
          <SortableHeader
            onClick={() => handleSort('quantity')}
            className={sortBy === 'quantity' ? 'active' : ''}
          >
            Quantity <span className="icon">{renderSortIcon('quantity')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('description')}
            className={sortBy === 'description' ? 'active' : ''}
          >
            Description{' '}
            <span className="icon">{renderSortIcon('description')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('total_quantity')}
            className={sortBy === 'total_quantity' ? 'active' : ''}
          >
            Total Quantity{' '}
            <span className="icon">{renderSortIcon('total_quantity')}</span>
          </SortableHeader>
          <div>Action</div>
        </TableHeader>

        {paginatedAssets.map((asset) => (
          <AssetsRow asset={asset} key={asset.id} />
        ))}

        {filteredAssets.length === 0 && (
          <div style={{ padding: '1.6rem' }}>No matching assets found.</div>
        )}

        <Pagination count={totalItems} />
      </Table>
    </>
  )
}

export default AssetsTable
