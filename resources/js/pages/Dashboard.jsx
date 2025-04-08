import Heading from '../ui/Heading'
import Row from '../ui/Row'

function Dashboard() {
  return (
    <Row
      type="horizontal"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <Heading as="h1">Dashboard</Heading>
      <p style={{ marginLeft: 'auto' }}>TEST</p>
    </Row>
  )
}

export default Dashboard
