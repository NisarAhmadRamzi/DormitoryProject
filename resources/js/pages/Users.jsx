import { useTranslation } from 'react-i18next' // assuming you use react-i18next or similar
import UsersTable from '../features/users/UsersTable'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

function Users() {
  const { t } = useTranslation()

  return (
    <>
      <Row>
        <Heading as="h1" style={{ textAlign: 'center' }}>
          {t('users')}
        </Heading>
        <UsersTable />
      </Row>
    </>
  )
}

export default Users
