import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import FormRowVertical from '../../ui/FormRowVertical'
import SpinnerMini from '../../ui/SpinnerMini'
import { useLogin } from './useLogin'

// Styled Input overrides for dark mode support
const StyledInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  font-size: 1.6rem;
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  color: var(--color-grey-700);
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;

  &:focus {
    outline: none;
    border-color: var(--color-brand-600);
    box-shadow: 0 0 0 3px var(--backdrop-color);
  }

  &:disabled {
    background-color: var(--color-grey-200);
    color: var(--color-grey-500);
    cursor: not-allowed;
  }

  &::placeholder {
    color: var(--color-grey-400);
  }
`

const PasswordToggle = styled.span`
  position: absolute;
  top: 50%;
  right: 0.75rem;
  transform: translateY(-50%);
  cursor: pointer;
  color: var(--color-grey-500);
  transition: color 0.3s;

  &:hover {
    color: var(--color-grey-700);
  }
`

const ErrorText = styled.span`
  color: var(--color-red-700);
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
`

const StyledLink = styled(Link)`
  color: var(--color-blue-700);
  text-decoration: underline;
  transition: color 0.3s;

  &:hover {
    color: var(--color-blue-100);
  }
`

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const resetInputs = () => {
    setEmail('')
    setPassword('')
  }

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
        <StyledInput
          type="email"
          id="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          placeholder="you@example.com"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && <ErrorText id="email-error">{errors.email}</ErrorText>}
      </FormRowVertical>

      <FormRowVertical label="Password">
        <div style={{ position: 'relative' }}>
          <StyledInput
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            placeholder="Enter your password"
            aria-invalid={errors.password ? 'true' : 'false'}
            aria-describedby={errors.password ? 'password-error' : undefined}
            style={{ paddingRight: '2.5rem' }}
          />
          <PasswordToggle
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setShowPassword((s) => !s)
              }
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </PasswordToggle>
        </div>
        {errors.password && (
          <ErrorText id="password-error">{errors.password}</ErrorText>
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
          <StyledLink to="/register">Create account</StyledLink>
        </p>
      </FormRowVertical>

      <FormRowVertical>
        <p>
          <StyledLink to="/">← Back to Home</StyledLink>
        </p>
      </FormRowVertical>
    </Form>
  )
}

export default LoginForm
