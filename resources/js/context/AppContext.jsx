import { createContext, useEffect, useState } from 'react'

export const AppContext = createContext()

export default function AppProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState({})
  async function getRoom() {
    const res = await fetch('127.0.0.1:8000/api/rooms', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await res.json()
    setUser(data)
  }

  useEffect(() => {
    if (token) {
      getRoom()
    }
  }, [token])
  return (
    <AppContext.Provider value={{ token, setToken, user }}>
      {children}
    </AppContext.Provider>
  )
}
