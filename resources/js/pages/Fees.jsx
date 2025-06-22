import AddFees from '../features/fees/AddFee'
import FeesTable from '../features/fees/FeesTable'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

function Fees() {
  return (
    <>
      <Row>
        <Heading as="h1" style={{ textAlign: 'center' }}>
          Fees
        </Heading>
        <FeesTable />
        <AddFees />
      </Row>
    </>
  )
}

export default Fees
