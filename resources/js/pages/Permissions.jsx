import { useEffect, useState } from 'react'

import AddPermission from '../features/permission/AddPermission'
import Heading from '../ui/Heading'
import PermissionTable from '../features/permission/PermissionTable'
import Row from '../ui/Row'
import { getPermission } from '../services/apiPermission'
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

function Permissions() {
  const [search, setSearch] = useState('')
  const [permissions, setPermissions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPermissions() {
      setLoading(true)
      try {
        const data = await getPermission()
        setPermissions(data.data || [])
      } catch (error) {
        console.error('Failed to fetch Permissions:', error)
        setPermissions([])
      } finally {
        setLoading(false)
      }
    }
    fetchPermissions()
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
        <Heading as="h1">Permissions</Heading>

        <OperationsWrapper>
          <SearchInput
            type="text"
            placeholder="Search Permission..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </OperationsWrapper>
      </Row>

      <Row>
        <PermissionTable
          permissions={permissions}
          search={search}
          loading={loading}
        />
        <AddPermission />
      </Row>
    </>
  )
}

export default Permissions
