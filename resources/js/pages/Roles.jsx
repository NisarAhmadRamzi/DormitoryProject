import { useTranslation } from 'react-i18next'
import RoleTable from '../features/roles/RoleTable'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

function Roles() {
  const { t } = useTranslation()

  return (
    <Row>
      <Heading as="h1" style={{ textAlign: 'center' }}>
        {t('rolesTitle')}
      </Heading>
      <RoleTable />
    </Row>
  )
}

export default Roles
