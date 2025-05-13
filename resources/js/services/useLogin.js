// // pages/home/useLogin.js

// import { useContext, useState } from 'react'

// import { AppContext } from '../../context/AppContext'
// import axios from 'axios'
// import toast from 'react-hot-toast'
// import { useNavigate } from 'react-router-dom'

// export function useLogin() {
//   const { setToken } = useContext(AppContext)
//   const [isLoading, setIsLoading] = useState(false)
//   const navigate = useNavigate()

//   async function login({ email, password }) {
//     try {
//       setIsLoading(true)
//       const res = await axios.post('http://127.0.0.1:8000/api/login', {
//         email,
//         password,
//       })

//       const token = res.data.token
//       if (token) {
//         localStorage.setItem('token', token)
//         setToken(token)
//         toast.success('Login successful')
//         navigate('/rooms') // ✅ Redirect to rooms
//       } else {
//         toast.error('No token received')
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Login failed')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return { login, isLoading }
// }

//v2

import { useContext, useState } from 'react'

import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'

export function useLogin() {
  const { setToken } = useContext(AppContext)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  async function login({ email, password }) {
    try {
      setIsLoading(true)
      const res = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password,
      })

      const token = res.data.token
      if (token) {
        localStorage.setItem('token', token)
        setToken(token)
        toast.success('Login successful')
        navigate('/rooms')
      } else {
        toast.error('No token received')
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return { login, isLoading }
}
