import { FaEye, FaEyeSlash } from 'react-icons/fa'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import FormRowVertical from '../../ui/FormRowVertical'
import Input from '../../ui/Input'
import SpinnerMini from '../../ui/SpinnerMini'
import { useLogin } from './useLogin'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

  // Reset function to clear inputs on error
  const resetInputs = () => {
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  // Pass resetInputs callback to useLogin
  const { login, isLoading } = useLogin({ onErrorReset: resetInputs })

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = {}

    if (!email) newErrors.email = 'Email is required'
    if (!password) newErrors.password = 'Password is required'
    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    login({ email, password })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          error={errors.email}
        />
        {errors.email && (
          <span style={{ color: 'red', fontSize: '0.875rem' }}>
            {errors.email}
          </span>
        )}
      </FormRowVertical>
        <FormRowVertical label="Password">
          <div style={{ position: 'relative' }}>
            <Input
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              style={{ paddingRight: '2.5rem' }}
              error={errors.password}
            />
            <span
              onClick={() => setShowPassword((s) => !s)}
              style={{
                position: 'absolute',
                top: '50%',
                right: '0.75rem',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                color: '#888',
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && (
            <span style={{ color: 'red', fontSize: '0.875rem' }}>
              {errors.password}
            </span>
          )}
        </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoading}>
          {!isLoading ? 'Log in' : <SpinnerMini />}
        </Button>
      </FormRowVertical>

      <FormRowVertical>
        <p>
          Don&apos;t have an account?{' '}
          <Link
            to="/register"
            style={{ color: 'blue', textDecoration: 'underline' }}
          >
            Create account
          </Link>
        </p>
      </FormRowVertical>

      <FormRowVertical>
        <p>
          <Link to="/" style={{ color: 'gray', textDecoration: 'underline' }}>
            ← Back to Home
          </Link>
        </p>
      </FormRowVertical>
    </Form>
  )
}

export default LoginForm
