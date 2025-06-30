import { useQuery } from '@tanstack/react-query'
import { FaUsersViewfinder } from 'react-icons/fa6'
import { HiOutlineCube } from 'react-icons/hi2'
import { PiStudent } from 'react-icons/pi'
import { SlBookOpen } from 'react-icons/sl'
import { getDashboardStats } from '../../services/apiDashboard'
import SpinnerMini from '../../ui/SpinnerMini'
import GroupedStat from './GroupedStat' // ✅ new import
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
        style={{ BiBorderLeft: '2px solid blue' }}
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

      {/* ✅ Add the grouped stat card for rooms */}
      <GroupedStat
        title="Room Overview"
        data={dashboardData?.rooms}
        isLoading={isLoading}
      />
      <GroupedStat
        title="Complaints Overview"
        data={dashboardData?.complaints}
        isLoading={isLoading}
      />
      <GroupedStat
        title="Donations Overview"
        data={dashboardData?.donations}
        isLoading={isLoading}
      />
      <GroupedStat
        title="Expenses Overview"
        data={dashboardData?.expenses}
        isLoading={isLoading}
      />
      <GroupedStat
        title="Books Overview"
        data={dashboardData?.books}
        isLoading={isLoading}
        marginTop="3px" // 0.4rem ≈ 6px
      />
      <GroupedStat
        title="Fees Overview"
        data={dashboardData?.fees}
        isLoading={isLoading}
        marginTop="3px" // 0.4rem ≈ 6px
      />
    </>
  )
}

export default Stats
