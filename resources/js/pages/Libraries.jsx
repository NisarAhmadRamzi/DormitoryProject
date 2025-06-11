import styled from 'styled-components'
import AddLibrary from '../features/libraries/AddLibrary'
import LibraryTable from '../features/libraries/LibraryTable'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

const SearchInput = styled.input`
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-200);
  border-radius: 4px;
  font-size: 1.4rem;
  max-width: 300px;
`

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
