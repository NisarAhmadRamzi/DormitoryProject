import { useTranslation } from 'react-i18next'
import PermissionTable from '../features/permission/PermissionTable'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

function Permissions() {
  const { t } = useTranslation()

  return (
    <Row>
      <Heading as="h1" style={{ textAlign: 'center' }}>
        {t('permissions')}
      </Heading>
      <PermissionTable />
    </Row>
  )
}

export default Permissions
