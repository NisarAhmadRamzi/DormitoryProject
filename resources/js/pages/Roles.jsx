import { useEffect, useState } from 'react'

import AddRole from '../features/roles/AddRole'
import Heading from '../ui/Heading'
import RoleTable from '../features/roles/RoleTable'
import Row from '../ui/Row'
import { getRoles } from '../services/apiRoles'
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

function Roles() {
  const [search, setSearch] = useState('')
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRoles() {
      setLoading(true)
      try {
        const data = await getRoles()
        setRoles(data.data || [])
      } catch (error) {
        console.error('Failed to fetch roles:', error)
        setRoles([])
      } finally {
        setLoading(false)
      }
    }
    fetchRoles()
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
        <Heading as="h1">Roles</Heading>

        <OperationsWrapper>
          <SearchInput
            type="text"
            placeholder="Search roles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </OperationsWrapper>
      </Row>

      <Row>
        <RoleTable roles={roles} search={search} loading={loading} />
        <AddRole />
      </Row>
    </>
  )
}

export default Roles
