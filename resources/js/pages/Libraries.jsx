import { useState } from 'react'

import styled from 'styled-components'
import AddLibrary from '../features/libraries/AddLibrary'
import LibraryTable from '../features/libraries/LibraryTable'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

// Styled search input
const SearchInput = styled.input`
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-200);
  border-radius: 4px;
  font-size: 1.4rem;
  max-width: 300px;
`

// Wrapper for the search bar and table operations
const OperationsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  gap: 2rem;
`

function Libraries() {
  const [search, setSearch] = useState('')

  // useEffect(() => {
  //   getLibraries().then((data) => console.log(data))
  // }, [])

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

        <OperationsWrapper>
          <SearchInput
            type="text"
            placeholder="Search libraries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* <LibraryTableOperations /> */}
        </OperationsWrapper>
      </Row>

      <Row>
        <LibraryTable search={search} />
        <AddLibrary />
      </Row>
    </>
  )
}

export default Libraries
