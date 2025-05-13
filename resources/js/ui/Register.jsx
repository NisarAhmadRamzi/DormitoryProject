// import { useState } from 'react'
// import Button from '../ui/Button'
// import Form from '../ui/Form'
// import FormRowVertical from '../ui/FormRowVertical'
// import Input from '../ui/Input'

// function Register() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState()
//   function handleSubmit() {}
//   return (
//     <Form onSubmit={handleSubmit}>
//       <FormRowVertical label="Email address">
//         <Input
//           type="email"
//           id="email"
//           autoComplete="username"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           //   disabled={isLoading}
//         />
//       </FormRowVertical>
//       <FormRowVertical label="Password">
//         <Input
//           type="password"
//           id="password"
//           autoComplete="current-password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           //   disabled={isLoading}
//         />
//       </FormRowVertical>
//       <FormRowVertical>
//         <Button size="large">
//           {/* {!isLoading ? 'Log in' : <SpinnerMini />} */}
//           Register
//         </Button>
//       </FormRowVertical>
//     </Form>
//   )
// }

// export default Register

//v2

// import Button from '../ui/Button'
// import Form from '../ui/Form'
// import FormRowVertical from '../ui/FormRowVertical'
// import Input from '../ui/Input'
// import axios from 'axios'
// import toast from 'react-hot-toast' // Only import `toast`, not `Toaster`
// import { useState } from 'react'

// function Register() {
//   const [register, setRegister] = useState({
//     name: '',
//     email: '',
//     password: '',
//   })

//   function handleSubmit(e) {
//     e.preventDefault()

//     const data = {
//       name: register.name,
//       email: register.email,
//       password: register.password,
//     }
//     console.log(data)

//     axios
//       .post('http://127.0.0.1:8000/api/register', data)
//       .then((res) => {
//         toast.success('Registration successful!')
//         setRegister({ name: '', email: '', password: '' }) // Reset form
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

//v3

// import Button from '../ui/Button'
// import Form from '../ui/Form'
// import FormRowVertical from '../ui/FormRowVertical'
// import Input from '../ui/Input'
// import axios from 'axios'
// import toast from 'react-hot-toast'
// import { useState } from 'react'

// function Register() {
//   const [register, setRegister] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: 'student', // Default role
//   })

//   function handleSubmit(e) {
//     e.preventDefault()

//     const data = {
//       name: register.name,
//       email: register.email,
//       password: register.password,
//       role: register.role,
//     }

//     axios
//       .post('http://127.0.0.1:8000/api/register', data)
//       .then((res) => {
//         toast.success('Registration successful!')
//         setRegister({ name: '', email: '', password: '', role: 'student' })
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

//       <FormRowVertical label="Role">
//         <select
//           name="role"
//           value={register.role}
//           onChange={handleInput}
//           style={{
//             padding: '0.5rem',
//             fontSize: '1rem',
//             borderRadius: '4px',
//             border: '1px solid #ccc',
//           }}
//         >
//           <option value="student">Student</option>
//           <option value="admin">Admin</option>
//         </select>
//       </FormRowVertical>

//       <FormRowVertical>
//         <Button size="large">Register</Button>
//       </FormRowVertical>
//     </Form>
//   )
// }

// export default Register

//v4

// import { useState } from 'react'
// import Button from '../ui/Button'
// import Form from '../ui/Form'
// import FormRowVertical from '../ui/FormRowVertical'
// import Input from '../ui/Input'

// function Register() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//   })
//   async function handleRegister(e) {
//     e.preventDefault()
//     //   const res = await fetch('/api/register', {
//     //     method: 'post',
//     //     body: JSON.stringify(formData),
//     //   })
//     //   const data = await res.json()
//     //   console.log(formData)
//     //
//     // const res = await fetch('/api/register', {
//     //   method: 'POST',
//     //   headers: {
//     //     'Content-Type': 'application/json',
//     //     Accept: 'application/json',
//     //   },
//     //   body: JSON.stringify(formData),
//     // })
//     const res = await fetch('/api/register', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//       },
//       credentials: 'include', // 👈 this is critical for Sanctum
//       body: JSON.stringify(formData),
//     })
//   }
//   return (
//     <Form onSubmit={handleRegister}>
//       <FormRowVertical label="Name">
//         <Input
//           placeholder="Enter your name"
//           name="name"
//           value={formData.name}
//           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//           type="text"
//         />
//       </FormRowVertical>

//       <FormRowVertical label="Email address">
//         <Input
//           name="email"
//           placeholder="Enter your email"
//           value={formData.email}
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//           type="email"
//         />
//       </FormRowVertical>

//       <FormRowVertical label="Password">
//         <Input
//           name="password"
//           placeholder="Enter your password"
//           value={formData.password}
//           onChange={(e) =>
//             setFormData({ ...formData, password: e.target.value })
//           }
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

//v5

// import { useContext, useState } from 'react'

// import axios from 'axios'
// import toast from 'react-hot-toast' // Only import `toast`, not `Toaster`
// import { useNavigate } from 'react-router-dom'
// import { AppContext } from '../context/AppContext'
// import Button from '../ui/Button'
// import Form from '../ui/Form'
// import FormRowVertical from '../ui/FormRowVertical'
// import Input from '../ui/Input'

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
//         // Log the token to the console
//         console.log('Registration successful, token:', res.data.token)

//         toast.success('Registration successful!')
//         setRegister({ name: '', email: '', password: '' }) // Reset form
//       })
//       .catch((err) => {
//         toast.error(err.response?.data?.message || 'Registration failed')
//         localStorage.setItem('token', res.data.token)
//         setToken(res.data.token)
//         navigate('/')
//         // console.error('Registration error:', err.response?.data || err.message)
//       })
//   }

//   function handleInput(e) {
//     setRegister({ ...register, [e.target.name]: e.target.value })
//   }

//   return (
//     <Form onSubmit={handleSubmit}>
//       {token}
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

//v6

// import { useContext, useState } from 'react'

// import { AppContext } from '../context/AppContext'
// import Button from '../ui/Button'
// import Form from '../ui/Form'
// import FormRowVertical from '../ui/FormRowVertical'
// import Input from '../ui/Input'
// import axios from 'axios'
// import toast from 'react-hot-toast' // Only import `toast`, not `Toaster`
// import { useNavigate } from 'react-router-dom'

// function Register() {
//   const { token, setToken } = useContext(AppContext) // Access token from context
//   const [register, setRegister] = useState({
//     name: '',
//     email: '',
//     password: '',
//   })
//   const navigate = useNavigate('rooms')

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
//         // Log the token to the console
//         console.log('Registration successful, token:', res.data.token)

//         toast.success('Registration successful!')
//         setRegister({ name: '', email: '', password: '' }) // Reset form

//         // Store token in local storage and context
//         localStorage.setItem('token', res.data.token)
//         setToken(res.data.token)

//         // navigate('/') // Navigate to the desired page
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
//       {token && <div>Token: {token}</div>} {/* Show token if available */}
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

//v7

import { useContext, useState } from 'react'

import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Button from '../ui/Button'
import Form from '../ui/Form'
import FormRowVertical from '../ui/FormRowVertical'
import Input from '../ui/Input'

function Register() {
  const { setToken } = useContext(AppContext)
  const [register, setRegister] = useState({
    name: '',
    email: '',
    password: '',
  })
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()

    const data = {
      name: register.name,
      email: register.email,
      password: register.password,
    }

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
        />
      </FormRowVertical>
      <FormRowVertical label="Email address">
        <Input
          name="email"
          onChange={handleInput}
          value={register.email}
          type="email"
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          name="password"
          onChange={handleInput}
          value={register.password}
          type="password"
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large">Register</Button>
      </FormRowVertical>
    </Form>
  )
}

export default Register

//v8

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
//       .then(() => {
//         toast.success('Registration successful! Please log in.')
//         setRegister({ name: '', email: '', password: '' })
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
