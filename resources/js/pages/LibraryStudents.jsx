import { useTranslation } from 'react-i18next'
import AddLibraryStudent from '../features/library students/AddLibraryStudent'
import LibraryStudentsTable from '../features/library students/LibraryStudentTable'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

function LibraryStudent() {
  const { t } = useTranslation()

  return (
    <Row>
      <Heading as="h1" style={{ textAlign: 'center' }}>
        {t('libraryStudents')}
      </Heading>
      <LibraryStudentsTable />
      <AddLibraryStudent />
    </Row>
  )
}

export default LibraryStudent
