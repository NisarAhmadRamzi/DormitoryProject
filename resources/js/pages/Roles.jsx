import AddRole from '../features/roles/AddRole'
import RoleTable from '../features/roles/RoleTable'
import Heading from '../ui/Heading'
import Row from '../ui/Row'
function Roles() {
  return (
    <>
      <Row>
        <Heading as="h1" style={{ textAlign: 'center' }}>
          Rooms
        </Heading>
        <RoleTable />
        <AddRole />
      </Row>
    </>
  )
}

export default Roles
