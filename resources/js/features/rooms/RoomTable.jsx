// CabinsTable.jsx

import { FiSearch } from 'react-icons/fi'
import Pagination from '../../ui/Pagination'
import RoomRow from './RoomRow'
import Spinner from '../../ui/Spinner'
import { getCabins } from '../../services/apiCabins'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'

const PAGE_SIZE = 10

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
  padding: 1.6rem 2.4rem;
  text-transform: uppercase;
  font-weight: 600;
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

const TopBarWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const SearchInputContainer = styled.div`
  position: relative;
  width: 300px;

  svg {
    position: absolute;
    top: 50%;
    left: 90%;
    transform: translateY(-50%);
    color: var(--color-grey-900);
    font-size: 1.4rem;
    pointer-events: none;
  }

  input {
    font-size: 1.4rem;
    padding: 0.6rem 1rem 0.6rem 2.8rem;
    border: 1px solid var(--color-grey-300);
    border-radius: 4px;
    width: 100%;
  }
`

function CabinsTable() {
  const [searchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const { isLoading, data, error } = useQuery(['cabins'], getCabins)
  const [searchText, setSearchText] = useState('')
  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')

  if (isLoading) return <Spinner />
  if (error) return <div>Error loading cabins!</div>

  let rooms = data?.data || []

  if (searchText.trim() !== '') {
    rooms = rooms.filter((room) => {
      const searchString =
        `${room.room_number} ${room.type} ${room.capacity} ${room.price}`.toLowerCase()
      return searchString.includes(searchText.toLowerCase())
    })
  }

  if (sortBy) {
    rooms = [...rooms].sort((a, b) => {
      let aVal = a[sortBy]
      let bVal = b[sortBy]

      if (typeof aVal === 'string') aVal = aVal.toLowerCase()
      if (typeof bVal === 'string') bVal = bVal.toLowerCase()

      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
      return 0
    })
  }

  const totalItems = rooms.length
  const start = (currentPage - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE
  const paginatedRooms = rooms.slice(start, end)

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
      <TopBarWrapper>
        <SearchInputContainer>
          <FiSearch />
          <input
            type="text"
            placeholder="Search rooms..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </SearchInputContainer>
      </TopBarWrapper>

      <Table role="table">
        <TableHeader role="row">
          <div>ID</div>
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

        {paginatedRooms.map((cabin) => (
          <RoomRow key={cabin.id} cabin={cabin} />
        ))}

        {rooms.length === 0 && (
          <div style={{ padding: '1.6rem' }}>No matching rooms found.</div>
        )}

        <Pagination count={totalItems} />
      </Table>
    </>
  )
}

export default CabinsTable
