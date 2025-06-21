import Heading from '../ui/Heading'
import Row from '../ui/Row'
import UpdateAccountForm from '../features/settings/UpdateAccountForm'

function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Row>
        <UpdateAccountForm />
      </Row>
    </>
  )
}

export default Account
