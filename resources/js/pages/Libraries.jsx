import AddLibrary from '../features/libraries/AddLibrary'
import Heading from '../ui/Heading'
import LibraryTable from '../features/libraries/LibraryTable'
import Row from '../ui/Row'

function Libraries() {
  return (
    <>
      <Row>
        <Heading as="h1" style={{ textAlign: 'center' }}>
          Libraries
        </Heading>
        <LibraryTable />
        <AddLibrary />
      </Row>
    </>
  )
}

export default Libraries
