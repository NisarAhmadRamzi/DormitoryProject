// import { useEffect } from 'react'
// import AddRoom from '../features/rooms/AddRoom'
// import RoomTable from '../features/rooms/RoomTable'
// import RoomTableOperations from '../features/rooms/RoomTableOperations'
// import { getCabins } from '../services/apiCabins'
// import Heading from '../ui/Heading'
// import Row from '../ui/Row'

// function Rooms() {
//   useEffect(function () {
//     getCabins().then((data) => console.log(data))
//   }, [])
//   return (
//     <>
//       <Row type="horizontal">
//         <Heading as="h1">All Rooms</Heading>
//         <RoomTableOperations />
//       </Row>
//       <Row>
//         <RoomTable />
//         <AddRoom />
//       </Row>
//     </>
//   )
// }

// export default Rooms

import { useEffect, useState } from 'react'

import styled from 'styled-components'
import AddRoom from '../features/rooms/AddRoom'
import RoomTable from '../features/rooms/RoomTable'
import RoomTableOperations from '../features/rooms/RoomTableOperations'
import { getCabins } from '../services/apiCabins'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

// Styled search input
const SearchInput = styled.input`
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-200);
  border-radius: 4px;
  font-size: 1.4rem;
  max-width: 300px;
`

const OperationsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  gap: 2rem;
`

function Rooms() {
  const [search, setSearch] = useState('')

  useEffect(function () {
    getCabins().then((data) => console.log(data))
  }, [])

  return (
    <>
      {/* <Row type="horizontal">
        <Heading as="h1">Rooms</Heading>
        <OperationsWrapper>
          <SearchInput
            type="text"
            placeholder="Search rooms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginRight: '20px' }}
          />
          <RoomTableOperations />
        </OperationsWrapper>
      </Row> */}
      <Row
        type="horizontal"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '600px', // <-- This creates the 10px space between Heading and OperationsWrapper
        }}
      >
        <Heading as="h1">Rooms</Heading>

        <OperationsWrapper>
          <SearchInput
            type="text"
            placeholder="Search rooms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginRight: '20px' }} // Optional: extra space before RoomTableOperations
          />
          <RoomTableOperations />
        </OperationsWrapper>
      </Row>

      <Row>
        <RoomTable search={search} />
        <AddRoom />
      </Row>
    </>
  )
}

export default Rooms
