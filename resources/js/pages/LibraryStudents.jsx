import { useState } from 'react'
import styled from 'styled-components'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

// import AddLibraryStudent from '../features/libraries/AddLibraryStudent'
// import LibraryStudentTable from '../features/libraries/LibraryStudentTable'

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

function LibraryStudents() {
  const [search, setSearch] = useState('')

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
        <Heading as="h1">Library Students</Heading>

        <OperationsWrapper>
          <SearchInput
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </OperationsWrapper>
      </Row>

      <Row>
        {/* <LibraryStudentTable search={search} /> */}
        {/* <AddLibraryStudent /> */}
      </Row>
    </>
  )
}

export default LibraryStudents
