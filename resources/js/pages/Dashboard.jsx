import DashboardFilter from '../features/dashboard/DashboardFilter'
import DashboardLayout from '../features/dashboard/DashboardLayout'
import Heading from '../ui/Heading'
import Row from '../ui/Row'
import { toast } from 'react-hot-toast'
import { useEffect } from 'react'

function Dashboard() {
  useEffect(() => {
    const loginSuccess = localStorage.getItem('loginSuccess')
    if (loginSuccess === 'true') {
      toast.success('Login successful!')
      localStorage.removeItem('loginSuccess') // ✅ Clear the flag after showing toast
    }
  }, [])

  return (
    <>
      <Row
        type="horizontal"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>
      <Row>
        <DashboardLayout />
      </Row>
    </>
  )
}

export default Dashboard
