import AddSupports from '../features/supports/AddSupports'
import SupportTable from '../features/supports/SupportTable'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

function Supports() {
  return (
    <>
      <Row>
        <Heading as="h1" style={{ textAlign: 'center' }}>
          Supports
        </Heading>
        <SupportTable />
        <AddSupports />
      </Row>
    </>
  )
}

export default Supports
