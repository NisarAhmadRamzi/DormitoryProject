import { useContext, useState } from 'react'

import { AppContext } from '../context/AppContext'
import Button from '../ui/Button'
import Form from '../ui/Form'
import FormRowVertical from '../ui/FormRowVertical'
import Input from '../ui/Input'
import SpinnerMini from '../ui/SpinnerMini'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Register() {
  const { setToken } = useContext(AppContext)
  const [register, setRegister] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false) 
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()

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
    setRegister({ ...register, [e.target.name]: e.target.value })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Name">
        <Input
          name="name"
          onChange={handleInput}
          value={register.name}
          type="text"
          disabled={isLoading} // ✅ Disable while loading
        />
      </FormRowVertical>
      <FormRowVertical label="Email address">
        <Input
          name="email"
          onChange={handleInput}
          value={register.email}
          type="email"
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          name="password"
          onChange={handleInput}
          value={register.password}
          type="password"
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoading}>
          {!isLoading ? 'Register' : <SpinnerMini />} {/* ✅ Show Spinner */}
        </Button>
      </FormRowVertical>
    </Form>
  )
}

export default Register
