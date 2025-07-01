import { useTranslation } from 'react-i18next'
import UpdateAccountForm from '../features/settings/UpdateAccountForm'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

function Account() {
  const { t } = useTranslation()

  return (
    <>
      <Heading as="h1">{t('account.updateTitle')}</Heading>

      <Row>
        <UpdateAccountForm />
      </Row>
    </>
  )
}

export default Account
