import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { FaUsersViewfinder } from 'react-icons/fa6'
import { HiOutlineCube } from 'react-icons/hi2'
import { PiStudent } from 'react-icons/pi'
import { SlBookOpen } from 'react-icons/sl'

import { getDashboardStats } from '../../services/apiDashboard'
import SpinnerMini from '../../ui/SpinnerMini'
import GroupedStat from './GroupedStat'
import Stat from './Stat'

const Stats = () => {
  const { t } = useTranslation()

  const {
    isLoading,
    data: dashboardData,
    error,
  } = useQuery({
    queryKey: ['DashboardData'],
    queryFn: getDashboardStats,
  })

  if (error) return <div>{t('stats.errorLoading')}</div>

  return (
    <>
      <Stat
        title={t('stats.allUsers')}
        color="blue"
        icon={<FaUsersViewfinder />}
        value={isLoading ? <SpinnerMini /> : dashboardData?.total_users}
      />

      <Stat
        title={t('stats.allStudents')}
        color="green"
        icon={<PiStudent />}
        value={isLoading ? <SpinnerMini /> : dashboardData?.total_students}
      />

      <Stat
        title={t('stats.allLibraryStudents')}
        color="indigo"
        icon={<SlBookOpen />}
        value={
          isLoading ? <SpinnerMini /> : dashboardData?.total_library_students
        }
      />

      <Stat
        title={t('stats.totalAssets')}
        color="green"
        icon={<HiOutlineCube />}
        value={
          isLoading ? <SpinnerMini /> : dashboardData?.assets.total_quantity
        }
      />

      <GroupedStat
        title={t('stats.roomOverview')}
        data={dashboardData?.rooms}
        isLoading={isLoading}
      />

      <GroupedStat
        title={t('stats.complaintsOverview')}
        data={dashboardData?.complaints}
        isLoading={isLoading}
      />

      <GroupedStat
        title={t('stats.donationsOverview')}
        data={dashboardData?.donations}
        isLoading={isLoading}
      />

      <GroupedStat
        title={t('stats.expensesOverview')}
        data={dashboardData?.expenses}
        isLoading={isLoading}
      />

      <GroupedStat
        title={t('stats.booksOverview')}
        data={dashboardData?.books}
        isLoading={isLoading}
        marginTop="3px"
      />

      <GroupedStat
        title={t('stats.feesOverview')}
        data={dashboardData?.fees}
        isLoading={isLoading}
        marginTop="3px"
      />
    </>
  )
}

export default Stats
