// import { useQuery } from '@tanstack/react-query'
// import { useSearchParams } from 'react-router-dom'
// import styled from 'styled-components'
// import { getCabins } from '../../services/apiCabins'
// import Spinner from '../../ui/Spinner'
// import RoomRow from './RoomRow'

// // Styled components
// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);
//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 0.5rem;
//   align-items: center;
//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `

// function CabinsTable() {
//   const [searchparams] = useSearchParams()
//   const filterValue = searchparams.get('price') || 'all'

//   const { isLoading, data, error } = useQuery({
//     queryKey: ['cabins'],
//     queryFn: getCabins,
//   })

//   if (isLoading) return <Spinner />
//   if (error) {
//     console.error('Error fetching cabins:', error)
//     return <div>Error loading cabins!</div>
//   }

//   const cabinsData = data?.data || []

//   // Filter cabins based on the price value
//   let filteredRooms = cabinsData
//   if (filterValue === 'no-price') {
//     filteredRooms = cabinsData.map((room) => ({
//       ...room,
//       price: '-', // Replace price with a dash
//     }))
//   } else if (filterValue === 'with-price') {
//     filteredRooms = cabinsData.filter((room) => room.price > 0)
//   }

//   if (filteredRooms.length === 0) {
//     return <div>No cabins available.</div>
//   }

//   return (
//     <Table role="table">
//       <TableHeader role="row">
//         <div>
//           <input type="checkbox" />
//         </div>
//         <div>Number</div>
//         <div>Type</div>
//         <div>Capacity</div>
//         <div>Prices</div>
//         <div>Action</div>
//       </TableHeader>
//       {filteredRooms.map((cabin) => (
//         <RoomRow cabin={cabin} key={cabin.id} />
//       ))}
//     </Table>
//   )
// }

// export default CabinsTable

// import { HiChevronDown, HiChevronUp } from 'react-icons/hi2'

// import { useQuery } from '@tanstack/react-query'
// import { useState } from 'react'
// import { useSearchParams } from 'react-router-dom'
// import styled from 'styled-components'
// import { getCabins } from '../../services/apiCabins'
// import Spinner from '../../ui/Spinner'
// import RoomRow from './RoomRow'

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);
//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 0.5rem;
//   align-items: center;
//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `

// const SortableHeader = styled.div`
//   display: flex;
//   align-items: center;
//   cursor: pointer;
//   gap: 0.4rem;

//   svg {
//     width: 1.4rem;
//     height: 1.4rem;
//     color: var(--color-grey-500);
//   }

//   &.active svg {
//     color: var(--color-grey-900);
//   }
// `

// function CabinsTable() {
//   const [searchparams] = useSearchParams()
//   const filterValue = searchparams.get('price') || 'all'

//   const { isLoading, data, error } = useQuery({
//     queryKey: ['cabins'],
//     queryFn: getCabins,
//   })

//   const [sortBy, setSortBy] = useState(null)
//   const [sortOrder, setSortOrder] = useState('asc') // 'asc' or 'desc'

//   if (isLoading) return <Spinner />
//   if (error) {
//     console.error('Error fetching cabins:', error)
//     return <div>Error loading cabins!</div>
//   }

//   const cabinsData = data?.data || []

//   // Filter cabins based on the price value
//   let filteredRooms = cabinsData
//   if (filterValue === 'no-price') {
//     filteredRooms = cabinsData.map((room) => ({
//       ...room,
//       price: '-', // Replace price with a dash
//     }))
//   } else if (filterValue === 'with-price') {
//     filteredRooms = cabinsData.filter((room) => room.price > 0)
//   }

//   // Sort logic
//   if (sortBy) {
//     filteredRooms = [...filteredRooms].sort((a, b) => {
//       let aValue = a[sortBy]
//       let bValue = b[sortBy]

//       // Handle string vs number
//       if (typeof aValue === 'string') aValue = aValue.toLowerCase()
//       if (typeof bValue === 'string') bValue = bValue.toLowerCase()

//       if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
//       if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
//       return 0
//     })
//   }

//   function handleSort(column) {
//     if (sortBy === column) {
//       setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
//     } else {
//       setSortBy(column)
//       setSortOrder('asc')
//     }
//   }

//   const getIcon = (column) =>
//     sortBy === column ? (
//       sortOrder === 'asc' ? (
//         <HiChevronUp />
//       ) : (
//         <HiChevronDown />
//       )
//     ) : null

//   if (filteredRooms.length === 0) {
//     return <div>No cabins available.</div>
//   }

//   return (
//     <Table role="table">
//       <TableHeader role="row">
//         <div>
//           <input type="checkbox" />
//         </div>
//         <SortableHeader
//           onClick={() => handleSort('room_number')}
//           className={sortBy === 'room_number' ? 'active' : ''}
//         >
//           Number {getIcon('room_number')}
//         </SortableHeader>
//         <SortableHeader
//           onClick={() => handleSort('type')}
//           className={sortBy === 'type' ? 'active' : ''}
//         >
//           Type {getIcon('type')}
//         </SortableHeader>
//         <SortableHeader
//           onClick={() => handleSort('capacity')}
//           className={sortBy === 'capacity' ? 'active' : ''}
//         >
//           Capacity {getIcon('capacity')}
//         </SortableHeader>
//         <SortableHeader
//           onClick={() => handleSort('price')}
//           className={sortBy === 'price' ? 'active' : ''}
//         >
//           Price {getIcon('price')}
//         </SortableHeader>
//         <div>Action</div>
//       </TableHeader>
//       {filteredRooms.map((cabin) => (
//         <RoomRow cabin={cabin} key={cabin.id} />
//       ))}
//     </Table>
//   )
// }

// export default CabinsTable

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { getCabins } from '../../services/apiCabins'
import Spinner from '../../ui/Spinner'
import RoomRow from './RoomRow'

// Styled components
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

function CabinsTable() {
  const [searchParams] = useSearchParams()
  const filterValue = searchParams.get('price') || 'all'

  const { isLoading, data, error } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  })

  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')

  if (isLoading) return <Spinner />
  if (error) return <div>Error loading cabins!</div>

  const cabinsData = data?.data || []

  // Filter
  let filteredRooms = cabinsData
  if (filterValue === 'no-price') {
    filteredRooms = cabinsData.map((room) => ({
      ...room,
      price: '-',
    }))
  } else if (filterValue === 'with-price') {
    filteredRooms = cabinsData.filter((room) => room.price > 0)
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

  if (filteredRooms.length === 0) return <div>No cabins available.</div>

  return (
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
    </Table>
  )
}

export default CabinsTable
