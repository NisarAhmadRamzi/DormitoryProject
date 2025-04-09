import { useEffect, useState } from 'react'

import CreateRoomForm from '../features/rooms/CreateRoomForm'
import RoomTable from '../features/rooms/RoomTable'
import { getCabins } from '../services/apiCabins'
import Button from '../ui/Button'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

function Rooms() {
  const [showForm, setShowForm] = useState(false)
  useEffect(function () {
    getCabins().then((data) => console.log(data))
  }, [])
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Rooms</Heading>
        <p>Filter/Sort</p>
      </Row>
      <Row>
        <RoomTable />
        <Button onClick={() => setShowForm((show) => !show)}>
          Add new cabin
        </Button>
        {showForm && <CreateRoomForm />}
      </Row>
    </>
  )
}

export default Rooms
