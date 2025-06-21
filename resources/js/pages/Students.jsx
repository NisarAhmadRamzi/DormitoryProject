import AddStudent from '../features/students/AddStudent'
import StudentTable from '../features/students/StudentTable'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

function Students() {
  return (
    <>
      <Row>
        <Heading as="h1" style={{ textAlign: 'center' }}>
          Students
        </Heading>
        <StudentTable />
        <AddStudent />
      </Row>
    </>
  )
}

export default Students
