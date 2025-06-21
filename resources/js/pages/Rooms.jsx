import AddRoom from '../features/rooms/AddRoom'
import RoomTable from '../features/rooms/RoomTable'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

function Rooms() {
  return (
    <>
      <Row>
        <Heading as="h1" style={{ textAlign: 'center' }}>
          Rooms
        </Heading>
        <RoomTable />
        <AddRoom />
      </Row>
    </>
  )
}

export default Rooms
