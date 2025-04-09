import { useEffect } from 'react'
import RoomTable from '../features/rooms/RoomTable'
import { getCabins } from '../services/apiCabins'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

function Rooms() {
  useEffect(function () {
    getCabins().then((data) => console.log(data))
  }, [])
  return (
    <>
      <Row
        type="horizontal"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Heading as="h1">All Rooms</Heading>
        <p style={{ marginLeft: 'auto' }}>Filter/Sort</p>
      </Row>
      <Row>
        <RoomTable />
      </Row>
    </>
  )
}

export default Rooms
