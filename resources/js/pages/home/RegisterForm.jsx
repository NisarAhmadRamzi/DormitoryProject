import styled from 'styled-components'
import Heading from '../../ui/Heading'
import Register from '../../ui/Register'

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`

function RegisterForm() {
  return (
    <LoginLayout>
      <Heading as="h4">Registration</Heading>
      <Register />
    </LoginLayout>
  )
}

export default RegisterForm
