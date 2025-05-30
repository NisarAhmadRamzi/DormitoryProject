import AddUser from '../features/users/AddUser'
import Heading from '../ui/Heading'
import Row from '../ui/Row'
import UsersTable from '../features/users/UsersTable'
import { getUsers } from '../services/apiUser'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
const OperationsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  gap: 2rem;
`
const SearchInput = styled.input`
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-200);
  border-radius: 4px;
  font-size: 1.4rem;
  max-width: 300px;
`
function Users() {
  const [search, setSearch] = useState('')
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })

  const users = data?.data || [] // Extract users array from response

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  )

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
        <Heading as="h1">Users</Heading>
        <OperationsWrapper>
          <SearchInput
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </OperationsWrapper>
      </Row>

      <Row>
        <UsersTable users={filteredUsers} />
        <AddUser />
      </Row>
    </>
  )
}

export default Users
