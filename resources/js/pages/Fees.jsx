import { useTranslation } from 'react-i18next'
import AddFees from '../features/fees/AddFee'
import FeesTable from '../features/fees/FeesTable'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

function Fees() {
  const { t } = useTranslation()

  return (
    <>
      <Row>
        <Heading as="h1" style={{ textAlign: 'center' }}>
          {t('fees')}
        </Heading>
        <FeesTable />
        <AddFees />
      </Row>
    </>
  )
}

export default Fees
