import AddPermission from '../features/permission/AddPermission'
import PermissionTable from '../features/permission/PermissionTable'
import Heading from '../ui/Heading'
import Row from '../ui/Row'
function Permissions() {
  return (
    <>
      <Row>
        <Heading as="h1" style={{ textAlign: 'center' }}>
          Permissions
        </Heading>
        <PermissionTable />
        <AddPermission />
      </Row>
    </>
  )
}

export default Permissions
