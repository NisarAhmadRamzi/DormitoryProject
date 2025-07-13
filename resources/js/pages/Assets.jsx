import { useTranslation } from 'react-i18next'

import AssetsTable from '../features/assets/AssetsTable'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

function Assets() {
  const { t } = useTranslation()

  return (
    <>
      <Row>
        <Heading as="h1" style={{ textAlign: 'center' }}>
          {t('assets')}
        </Heading>
        <AssetsTable />
      </Row>
    </>
  )
}

export default Assets
