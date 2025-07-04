import { useTranslation } from 'react-i18next'
import AddSupports from '../features/supports/AddSupports'
import SupportTable from '../features/supports/SupportTable'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

function Supports() {
  const { t } = useTranslation()

  return (
    <>
      <Row>
        <Heading as="h1" style={{ textAlign: 'center' }}>
          {t('supports')}
        </Heading>
        <SupportTable />
        <AddSupports />
      </Row>
    </>
  )
}

export default Supports
