import DashboardFilter from '../features/dashboard/DashboardFilter'
import DashboardLayout from '../features/dashboard/DashboardLayout'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

function Dashboard() {
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
