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

// import axios from 'axios'
// import { useState } from 'react'
// import toast from 'react-hot-toast' // Only import `toast`, not `Toaster`
// import Button from '../ui/Button'
// import Form from '../ui/Form'
// import FormRowVertical from '../ui/FormRowVertical'
// import Input from '../ui/Input'

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

import Button from '../ui/Button'
import Form from '../ui/Form'
import FormRowVertical from '../ui/FormRowVertical'
import Input from '../ui/Input'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useState } from 'react'

function Register() {
  const [register, setRegister] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student', // Default role
  })

  function handleSubmit(e) {
    e.preventDefault()

    const data = {
      name: register.name,
      email: register.email,
      password: register.password,
      role: register.role,
    }

    axios
      .post('http://127.0.0.1:8000/api/register', data)
      .then((res) => {
        toast.success('Registration successful!')
        setRegister({ name: '', email: '', password: '', role: 'student' })
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

      <FormRowVertical label="Role">
        <select
          name="role"
          value={register.role}
          onChange={handleInput}
          style={{
            padding: '0.5rem',
            fontSize: '1rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
      </FormRowVertical>

      <FormRowVertical>
        <Button size="large">Register</Button>
      </FormRowVertical>
    </Form>
  )
}

export default Register
