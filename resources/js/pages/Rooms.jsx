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

import AddRoom from '../features/rooms/AddRoom'
import Heading from '../ui/Heading'
import RoomTable from '../features/rooms/RoomTable'
import RoomTableOperations from '../features/rooms/RoomTableOperations'
import Row from '../ui/Row'
import { getCabins } from '../services/apiCabins'
import styled from 'styled-components'

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
      <Row type="horizontal">
        <Heading as="h1">All Rooms</Heading>
        <OperationsWrapper>
          <SearchInput
            type="text"
            placeholder="Search rooms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
