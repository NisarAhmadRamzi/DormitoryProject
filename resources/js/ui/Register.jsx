import axios from 'axios'
import { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { AppContext } from '../context/AppContext'
import Button from '../ui/Button'
import Form from '../ui/Form'
import FormRowVertical from '../ui/FormRowVertical'
import Input from '../ui/Input'
import SpinnerMini from '../ui/SpinnerMini'

const PasswordContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1rem;

  & > .password-field {
    flex: 1 1 300px;
    position: relative;
  }

  input {
    width: 100%;
    height: 42px;
    padding-right: 2.5rem;
    box-sizing: border-box;
  }

  .toggle-icon {
    position: absolute;
    top: 50%;
    right: 0.75rem;
    transform: translateY(-50%);
    cursor: pointer;
    color: #888;
  }

  .error-text {
    color: red;
    font-size: 0.875rem;
    margin-top: 4px;
    display: block;
  }
`

function Register() {
  const { setToken } = useContext(AppContext)
  const [register, setRegister] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    const newError = {}
    if (!register.name) newError.name = 'Name is required'
    if (!register.email) newError.email = 'Email is required'
    if (!register.password) newError.password = 'Password is required'
    if (!register.cpassword) newError.cpassword = 'Confirm password is required'
    else if (register.password !== register.cpassword) {
      newError.cpassword = 'Passwords do not matchs'
    }
    setErrors(newError)
    if (Object.keys(newError).length > 0) return

    const data = {
      name: register.name,
      email: register.email,
      password: register.password,
    }

    setIsLoading(true)

    axios
      .post('http://127.0.0.1:8000/api/register', data)
      .then((res) => {
        toast.success('Registration successful!')
        setRegister({ name: '', email: '', password: '' })
        navigate('/login')
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || 'Registration failed')
        console.error('Registration error:', err.response?.data || err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleInput(e) {
    setRegister((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Name">
        <Input
          name="name"
          onChange={handleInput}
          value={register.name}
          type="text"
          disabled={isLoading}
        />
      </FormRowVertical>
      {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}

      <FormRowVertical label="Email address">
        <Input
          name="email"
          onChange={handleInput}
          value={register.email}
          type="email"
          disabled={isLoading}
        />
      </FormRowVertical>
      {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}

      <div>
        <div style={{ position: 'relative' }}>
          <FormRowVertical label="Password">
            <Input
              name="password"
              onChange={handleInput}
              value={register.password}
              type={showPassword ? 'text' : 'password'}
              disabled={isLoading}
            />
          </FormRowVertical>
          <span
            onClick={() => setShowPassword((s) => !s)}
            style={{
              position: 'absolute',
              top: '65%',
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
          <span style={{ color: 'red' }}>{errors.password}</span>
        )}

        <div style={{ position: 'relative' }}>
          <FormRowVertical label="Confirm Password">
            <Input
              name="cpassword"
              onChange={handleInput}
              value={register.cpassword}
              type={showConfirmPassword ? 'text' : 'password'}
              disabled={isLoading}
            />
          </FormRowVertical>
          <span
            onClick={() => setShowConfirmPassword((s) => !s)}
            style={{
              position: 'absolute',
              top: '65%',
              right: '0.75rem',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              color: '#888',
            }}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {errors.cpassword && (
          <span style={{ color: 'red' }}>{errors.cpassword}</span>
        )}
      </div>
      <FormRowVertical>
        <Button size="large" disabled={isLoading}>
          {!isLoading ? 'Register' : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  )
}

export default Register
