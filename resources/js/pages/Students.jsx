import { useEffect, useState } from 'react'

import AddStudent from '../features/students/AddStudent'
import Heading from '../ui/Heading'
import Row from '../ui/Row'
import StudentTable from '../features/students/StudentTable'
import { getStudents } from '../services/apiStudents'
import styled from 'styled-components'

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

function Students() {
  const [search, setSearch] = useState('')
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStudents() {
      setLoading(true)
      try {
        // Pass pagination parameters if you want (page, limit)
        const data = await getStudents()
        // Assuming data structure: { data: [...students], meta: {...} }
        setStudents(data.data || []) // fallback to empty array if undefined
      } catch (error) {
        console.error('Failed to fetch students:', error)
        setStudents([])
      } finally {
        setLoading(false)
      }
    }
    fetchStudents()
  }, [])

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
        <Heading as="h1">Students</Heading>

        <OperationsWrapper>
          <SearchInput
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* Add StudentTableOperations here if needed */}
        </OperationsWrapper>
      </Row>

      <Row>
        <StudentTable students={students} search={search} loading={loading} />
        <AddStudent />
      </Row>
    </>
  )
}

export default Students
