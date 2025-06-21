import AddUser from '../features/users/AddUser'
import UsersTable from '../features/users/UsersTable'
import Heading from '../ui/Heading'
import Row from '../ui/Row'
function Users() {
  return (
    <>
      <Row>
        <Heading as="h1" style={{ textAlign: 'center' }}>
          Users
        </Heading>
        <UsersTable />
        <AddUser />
      </Row>
    </>
  )
}

export default Users
