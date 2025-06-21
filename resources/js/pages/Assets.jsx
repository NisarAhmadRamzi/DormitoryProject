import AddAssets from '../features/assets/AddAssets'
import AssetsTable from '../features/assets/AssetsTable'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

function Assets() {
  return (
    <>
      <Row>
        <Heading as="h1" style={{ textAlign: 'center' }}>
          Assets
        </Heading>
        <AssetsTable />
        <AddAssets />
      </Row>
    </>
  )
}

export default Assets
