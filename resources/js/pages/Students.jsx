import { useTranslation } from 'react-i18next'
import AddStudent from '../features/students/AddStudent'
import StudentTable from '../features/students/StudentTable'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

function Students() {
  const { t } = useTranslation()

  return (
    <Row>
      <Heading as="h1" style={{ textAlign: 'center' }}>
        {t('students')}
      </Heading>
      <StudentTable />
      <AddStudent />
    </Row>
  )
}

export default Students
