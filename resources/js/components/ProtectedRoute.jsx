import { AppContext } from '../context/AppContext'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react'

function ProtectedRoute({ children }) {
  const { token } = useContext(AppContext)
  if (!token) return <Navigate to="/login" replace />
  return children
}

export default ProtectedRoute
