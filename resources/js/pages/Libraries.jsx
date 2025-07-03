import { useTranslation } from 'react-i18next'
import AddLibrary from '../features/libraries/AddLibrary'
import LibraryTable from '../features/libraries/LibraryTable'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

function Libraries() {
  const { t } = useTranslation()

  return (
    <>
      <Row>
        <Heading as="h1" style={{ textAlign: 'center' }}>
          {t('libraries.title')}
        </Heading>
        <LibraryTable />
        <AddLibrary />
      </Row>
    </>
  )
}

export default Libraries
