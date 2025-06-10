import Heading from '../ui/Heading'
import LibraryTable from '../features/libraries/LibraryTable'
import Row from '../ui/Row'
import styled from 'styled-components'

function Libraries() {
  return (
    <>
      <Heading as="h1" style={{ marginBottom: '5px' }}>
        Libraries
      </Heading>
      <Row>
        <LibraryTable />
      </Row>
    </>
  )
}

export default Libraries
