// import { useContext, useState } from 'react'

// import { AppContext } from '../context/AppContext'
// import Button from '../ui/Button'
// import Form from '../ui/Form'
// import FormRowVertical from '../ui/FormRowVertical'
// import Input from '../ui/Input'
// import axios from 'axios'
// import toast from 'react-hot-toast'
// import { useNavigate } from 'react-router-dom'

// function Register() {
//   const { setToken } = useContext(AppContext)
//   const [register, setRegister] = useState({
//     name: '',
//     email: '',
//     password: '',
//   })
//   const navigate = useNavigate()

//   function handleSubmit(e) {
//     e.preventDefault()

//     const data = {
//       name: register.name,
//       email: register.email,
//       password: register.password,
//     }

//     axios
//       .post('http://127.0.0.1:8000/api/register', data)
//       .then((res) => {
//         const token = res.data.token
//         toast.success('Registration successful!')
//         setRegister({ name: '', email: '', password: '' })
//         localStorage.setItem('token', token)
//         setToken(token)
//         navigate('/login')
//       })
//       .catch((err) => {
//         toast.error(err.response?.data?.message || 'Registration failed')
//         console.error('Registration error:', err.response?.data || err.message)
//       })
//   }

//   function handleInput(e) {
//     setRegister({ ...register, [e.target.name]: e.target.value })
//   }

//   return (
//     <Form onSubmit={handleSubmit}>
//       <FormRowVertical label="Name">
//         <Input
//           name="name"
//           onChange={handleInput}
//           value={register.name}
//           type="text"
//         />
//       </FormRowVertical>
//       <FormRowVertical label="Email address">
//         <Input
//           name="email"
//           onChange={handleInput}
//           value={register.email}
//           type="email"
//         />
//       </FormRowVertical>
//       <FormRowVertical label="Password">
//         <Input
//           name="password"
//           onChange={handleInput}
//           value={register.password}
//           type="password"
//         />
//       </FormRowVertical>
//       <FormRowVertical>
//         <Button size="large">Register</Button>
//       </FormRowVertical>
//     </Form>
//   )
// }

// export default Register

import { useContext, useState } from 'react'

import { AppContext } from '../context/AppContext'
import Button from '../ui/Button'
import Form from '../ui/Form'
import FormRowVertical from '../ui/FormRowVertical'
import Input from '../ui/Input'
import SpinnerMini from '../ui/SpinnerMini' // ✅ Add Spinner
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
  const [isLoading, setIsLoading] = useState(false) // ✅ Loading state
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()

    const data = {
      name: register.name,
      email: register.email,
      password: register.password,
    }

    setIsLoading(true) // ✅ Start loading

    axios
      .post('http://127.0.0.1:8000/api/register', data)
      .then((res) => {
        const token = res.data.token
        toast.success('Registration successful!')
        setRegister({ name: '', email: '', password: '' })
        localStorage.setItem('token', token)
        setToken(token)
        navigate('/login')
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || 'Registration failed')
        console.error('Registration error:', err.response?.data || err.message)
      })
      .finally(() => {
        setIsLoading(false) // ✅ Stop loading
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
