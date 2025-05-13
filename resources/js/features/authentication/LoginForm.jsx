import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import FormRowVertical from '../../ui/FormRowVertical'
import Input from '../../ui/Input'
import SpinnerMini from '../../ui/SpinnerMini'
import { useLogins } from './useLogins'
function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading } = useLogins()
  function handleSubmit(e) {
    e.preventDefault()
    if (!email || !password) return
    login({ email, password })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>

      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoading}>
          {!isLoading ? 'Log in' : <SpinnerMini />}
          Log in
        </Button>
      </FormRowVertical>
      <FormRowVertical>
        <p>
          Don't have an account?{' '}
          <Link
            to="/register"
            style={{ color: 'blue', textDecoration: 'underline' }}
          >
            Create account
          </Link>
        </p>
      </FormRowVertical>
    </Form>
  )
}
export default LoginForm

//v2
// import Button from '../../ui/Button'
// import Form from '../../ui/Form'
// import FormRowVertical from '../../ui/FormRowVertical'
// import Input from '../../ui/Input'
// import { Link } from 'react-router-dom'
// import SpinnerMini from '../../ui/SpinnerMini'
// import { useLogin } from './useLogin'
// import { useState } from 'react'

// function LoginForm() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const { login, isLoading } = useLogin()

//   function handleSubmit(e) {
//     e.preventDefault()
//     if (!email || !password) return
//     login({ email, password })
//   }

//   return (
//     <Form onSubmit={handleSubmit}>
//       <FormRowVertical label="Email address">
//         <Input
//           type="email"
//           id="email"
//           autoComplete="username"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           disabled={isLoading}
//         />
//       </FormRowVertical>
//       <FormRowVertical label="Password">
//         <Input
//           type="password"
//           id="password"
//           autoComplete="current-password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           disabled={isLoading}
//         />
//       </FormRowVertical>
//       <FormRowVertical>
//         <Button size="large" disabled={isLoading}>
//           {!isLoading ? 'Log in' : <SpinnerMini />}
//         </Button>
//       </FormRowVertical>

//       <FormRowVertical>
//         <p>
//           Don't have an account?{' '}
//           <Link
//             to="/register"
//             style={{ color: 'blue', textDecoration: 'underline' }}
//           >
//             Create account
//           </Link>
//         </p>
//       </FormRowVertical>
//     </Form>
//   )
// }

// export default LoginForm
