import { useEffect } from 'react'
import AddRoom from '../features/rooms/AddRoom'
import RoomTable from '../features/rooms/RoomTable'
import RoomTableOperations from '../features/rooms/RoomTableOperations'
import { getCabins } from '../services/apiCabins'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

function Rooms() {
  // const [showForm, setShowForm] = useState(false)
  useEffect(function () {
    getCabins().then((data) => console.log(data))
  }, [])
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Rooms</Heading>
        {/* <p>Filter/Sort</p> */}
        <RoomTableOperations />
      </Row>
      <Row>
        <RoomTable />
        <AddRoom />
      </Row>
    </>
  )
}

export default Rooms
