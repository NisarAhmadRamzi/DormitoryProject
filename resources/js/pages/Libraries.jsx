import AddLibrary from '../features/libraries/AddLibrary'
import Heading from '../ui/Heading'
import LibraryTable from '../features/libraries/LibraryTable'
import Row from '../ui/Row'
import styled from 'styled-components'

const OperationsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  gap: 2rem;
`

function Libraries() {
  return (
    <>
      <Row
        type="horizontal"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Heading as="h1">Libraries</Heading>
      </Row>

      <Row>
        <LibraryTable />
        <AddLibrary />
      </Row>
    </>
  )
}

export default Libraries
