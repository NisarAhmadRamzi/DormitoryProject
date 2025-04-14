import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom' // ✅ Added
import styled from 'styled-components'
import { getCabins } from '../../services/apiCabins'
import Spinner from '../../ui/Spinner'
import RoomRow from './RoomRow'

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
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

function CabinsTable({ search }) {
  const [searchParams] = useSearchParams() // ✅ Now works
  const filterValue = searchParams.get('price') || 'all'

  const { isLoading, data, error } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  })

  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')

  if (isLoading) return <Spinner />
  if (error) return <div>Error loading cabins!</div>

  let filteredRooms = data?.data || []

  // Filter by price
  if (filterValue === 'no-price') {
    filteredRooms = filteredRooms.map((room) => ({
      ...room,
      price: '-',
    }))
  } else if (filterValue === 'with-price') {
    filteredRooms = filteredRooms.filter((room) => room.price > 0)
  }

  // ✅ Search filter
  if (search.trim() !== '') {
    filteredRooms = filteredRooms.filter((room) => {
      const searchString =
        `${room.id} ${room.room_number} ${room.type} ${room.capacity}`.toLowerCase()
      return searchString.includes(search.toLowerCase())
    })
  }

  // Sort
  if (sortBy) {
    filteredRooms = [...filteredRooms].sort((a, b) => {
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
    if (sortBy === column) {
      return sortOrder === 'asc' ? '↑' : '↓'
    }
    return '↑↓'
  }

  return (
    <>
      <Table role="table">
        <TableHeader role="row">
          <div>
            <input type="checkbox" />
          </div>
          <SortableHeader
            onClick={() => handleSort('room_number')}
            className={sortBy === 'room_number' ? 'active' : ''}
          >
            Number <span className="icon">{renderSortIcon('room_number')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('type')}
            className={sortBy === 'type' ? 'active' : ''}
          >
            Type <span className="icon">{renderSortIcon('type')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('capacity')}
            className={sortBy === 'capacity' ? 'active' : ''}
          >
            Capacity <span className="icon">{renderSortIcon('capacity')}</span>
          </SortableHeader>
          <SortableHeader
            onClick={() => handleSort('price')}
            className={sortBy === 'price' ? 'active' : ''}
          >
            Price <span className="icon">{renderSortIcon('price')}</span>
          </SortableHeader>
          <div>Action</div>
        </TableHeader>

        {filteredRooms.map((cabin) => (
          <RoomRow cabin={cabin} key={cabin.id} />
        ))}

        {filteredRooms.length === 0 && (
          <div style={{ padding: '1.6rem' }}>No matching cabins found.</div>
        )}
      </Table>
    </>
  )
}

export default CabinsTable
