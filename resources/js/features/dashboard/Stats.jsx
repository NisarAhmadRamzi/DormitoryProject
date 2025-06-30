import { useQuery } from '@tanstack/react-query'
import { FaUsersViewfinder } from 'react-icons/fa6'
import { HiOutlineCube } from 'react-icons/hi2'
import { PiStudent } from 'react-icons/pi'
import { SlBookOpen } from 'react-icons/sl'
import { getDashboardStats } from '../../services/apiDashboard'
import SpinnerMini from '../../ui/SpinnerMini'
import Stat from './Stat'

const Stats = () => {
  const {
    isLoading,
    data: dashboardData,
    error,
  } = useQuery({
    queryKey: ['DashboardData'],
    queryFn: getDashboardStats,
  })

  if (error) return <div>Error loading!</div>

  return (
    <>
      <Stat
        title="All users"
        color="blue"
        icon={<FaUsersViewfinder />}
        value={isLoading ? <SpinnerMini /> : dashboardData?.total_users}
      />
      <Stat
        title="All students"
        color="green"
        icon={<PiStudent />}
        value={isLoading ? <SpinnerMini /> : dashboardData?.total_students}
      />
      <Stat
        title="All library students"
        color="indigo"
        icon={<SlBookOpen />}
        value={
          isLoading ? <SpinnerMini /> : dashboardData?.total_library_students
        }
      />
      <Stat
        title="Total Assets"
        color="green"
        icon={<HiOutlineCube />}
        value={
          isLoading ? <SpinnerMini /> : dashboardData?.assets.total_quantity
        }
      />
    </>
  )
}

export default Stats
