import { useState } from 'react'
import { useTranslation } from 'react-i18next' // <-- import i18n
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
  /* Use right for LTR, left for RTL */
  right: ${({ dir }) => (dir === 'ltr' ? '0.75rem' : 'auto')};
  left: ${({ dir }) => (dir === 'rtl' ? '0.75rem' : 'auto')};
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
  const { t, i18n } = useTranslation()
  const dir = i18n.dir() // 'ltr' or 'rtl'

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

    if (!email)
      newErrors.email = t('loginForm.errors.emailRequired', 'Email is required')
    if (!password)
      newErrors.password = t(
        'loginForm.errors.passwordRequired',
        'Password is required'
      )
    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    login({ email, password })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label={t('loginForm.emailLabel', 'Email address')}>
        <StyledInput
          type="email"
          id="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          placeholder={t('loginForm.emailPlaceholder', 'you@example.com')}
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
          dir={dir}
        />
        {errors.email && <ErrorText id="email-error">{errors.email}</ErrorText>}
      </FormRowVertical>

      <FormRowVertical label={t('loginForm.passwordLabel', 'Password')}>
        <div style={{ position: 'relative' }}>
          <StyledInput
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            placeholder={t(
              'loginForm.passwordPlaceholder',
              'Enter your password'
            )}
            aria-invalid={errors.password ? 'true' : 'false'}
            aria-describedby={errors.password ? 'password-error' : undefined}
            style={{
              paddingRight: dir === 'ltr' ? '2.5rem' : undefined,
              paddingLeft: dir === 'rtl' ? '2.5rem' : undefined,
            }}
            dir={dir}
          />
          <PasswordToggle
            onClick={() => setShowPassword((s) => !s)}
            aria-label={
              showPassword
                ? t('loginForm.hidePassword', 'Hide password')
                : t('loginForm.showPassword', 'Show password')
            }
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setShowPassword((s) => !s)
              }
            }}
            dir={dir}
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
          {!isLoading ? t('loginForm.loginButton', 'Log in') : <SpinnerMini />}
        </Button>
      </FormRowVertical>
      <FormRowVertical>
        <p>
          <StyledLink to="/">
            {t('loginForm.backToHome', '← Back to Home')}
          </StyledLink>
        </p>
      </FormRowVertical>
    </Form>
  )
}

export default LoginForm
