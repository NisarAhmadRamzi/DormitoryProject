import { useTranslation } from 'react-i18next'
import AddRoom from '../features/rooms/AddRoom'
import RoomTable from '../features/rooms/RoomTable'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

function Rooms() {
  const { t } = useTranslation()

  return (
    <>
      <Row>
        <Heading as="h1" style={{ textAlign: 'center' }}>
          {t('rooms')}
        </Heading>
        <RoomTable />
        <AddRoom />
      </Row>
    </>
  )
}

export default Rooms
