import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import DashboardLayout from '../features/dashboard/DashboardLayout'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

function Dashboard() {
  const { t } = useTranslation()

  useEffect(() => {
    const loginSuccess = localStorage.getItem('loginSuccess')
    if (loginSuccess === 'true') {
      toast.success(t('dashboard1.loginSuccess'))
      localStorage.removeItem('loginSuccess')
    }
  }, [t])

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
        <Heading as="h1">{t('dashboard')}</Heading>
        {/* <DashboardFilter /> */}
      </Row>
      <Row>
        <DashboardLayout />
      </Row>
    </>
  )
}

export default Dashboard
