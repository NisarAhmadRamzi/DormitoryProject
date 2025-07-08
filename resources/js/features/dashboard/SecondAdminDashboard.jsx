
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import {
  FaBook,
  FaBookDead,
  FaBookOpen,
  FaBoxOpen,
  FaBuilding,
  FaCheckCircle,
  FaClock,
  FaDoorClosed,
  FaDoorOpen,
  FaGift,
  FaMoneyBillWave,
  FaShieldAlt,
  FaTools,
  FaUsers,
} from 'react-icons/fa'
import { ImUsers } from 'react-icons/im'
import {
  MdDateRange,
  MdOutlineBedroomChild,
  MdOutlineLibraryBooks,
  MdPending,
  MdQueryStats,
} from 'react-icons/md'
import styled from 'styled-components'
import dayjs from '../../locales/dayjsConfig'
import { getSecondAdminDashboardStats } from '../../services/apiSecondAdminDashboard'
import Spinner from '../../ui/Spinner'
import DashboardCard from './DashboardCard'

const Container = styled.div`
  padding: 2rem;
  background-color: var(--color-grey-0);
`

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  color: var(--color-primary-700);
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
`

const Loading = styled.div`
  text-align: center;
  font-size: 1.2rem;
  padding: 2rem;
`

function SecondAdminDashboard() {
  const { t, i18n } = useTranslation()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['second-admin-stats'],
    queryFn: getSecondAdminDashboardStats,
  })

  dayjs.locale(i18n.language)

  if (isLoading) return <Spinner />
  if (isError) return <Loading>{t('dashboardError.errorLoading')}</Loading>

  return (
    <Container>
      <Title>{t('secondDashboard.title')}</Title>
      <Grid>
        {/* Users */}
        <DashboardCard
          title={t('secondDashboard.totalUsers')}
          value={data.total_users}
          icon={<ImUsers />}
        />
        <DashboardCard
          title={t('secondDashboard.totalStudents')}
          value={data.total_students}
          icon={<FaUsers />}
        />
        <DashboardCard
          title={t('secondDashboard.libraryStudents')}
          value={data.total_library_students}
          icon={<MdOutlineLibraryBooks />}
        />

        {/* Rooms */}
        <DashboardCard
          title={t('secondDashboard.roomsTotal')}
          value={data.rooms.total}
          icon={<MdOutlineBedroomChild />}
        />
        <DashboardCard
          title={t('secondDashboard.roomsAvailable')}
          value={data.rooms.available}
          icon={<FaDoorOpen />}
        />
        <DashboardCard
          title={t('secondDashboard.roomsOccupied')}
          value={data.rooms.occupied}
          icon={<FaDoorClosed />}
        />
        <DashboardCard
          title={t('secondDashboard.roomsUtilization')}
          value={`${data.rooms.utilization_rate_percent}%`}
          icon={<MdQueryStats />}
        />

        {/* Complaints */}
        <DashboardCard
          title={t('secondDashboard.complaintsPending')}
          value={data.complaints.pending}
          icon={<MdPending />}
        />
        <DashboardCard
          title={t('secondDashboard.complaintsInProgress')}
          value={data.complaints.in_progress}
          icon={<FaTools />}
        />
        <DashboardCard
          title={t('secondDashboard.complaintsResolved')}
          value={data.complaints.resolved}
          icon={<FaCheckCircle />}
        />

        {/* Donations */}
        <DashboardCard
          title={t('secondDashboard.cashDonated')}
          value={`$${data.donations.total_cash_donated}`}
          icon={<FaMoneyBillWave />}
        />
        <DashboardCard
          title={t('secondDashboard.goodsDonated')}
          value={data.donations.total_goods_quantity}
          icon={<FaGift />}
        />
        <DashboardCard
          title={t('secondDashboard.cashDonatedCumulative')}
          value={`$${data.donations.total_cash_donated_cumulative}`}
          icon={<MdQueryStats />}
        />
        <DashboardCard
          title={t('secondDashboard.latestDonation')}
          value={dayjs(data.donations.latest_donation_date).fromNow()}
          icon={<FaClock />}
        />

        {/* Expenses */}
        <DashboardCard
          title={t('secondDashboard.totalExpenses')}
          value={`$${data.expenses.total}`}
          icon={<FaMoneyBillWave />}
        />
        <DashboardCard
          title={t('secondDashboard.latestExpense')}
          value={dayjs(data.expenses.latest_expense_date).fromNow()}
          icon={<MdDateRange />}
        />

        {/* Assets */}
        <DashboardCard
          title={t('secondDashboard.totalAssets')}
          value={data.assets.total_quantity}
          icon={<FaBoxOpen />}
        />

        {/* Books */}
        <DashboardCard
          title={t('secondDashboard.booksTotal')}
          value={data.books.total}
          icon={<FaBook />}
        />
        <DashboardCard
          title={t('secondDashboard.booksBorrowed')}
          value={data.books.borrowed}
          icon={<FaBookOpen />}
        />
        <DashboardCard
          title={t('secondDashboard.booksAvailable')}
          value={data.books.available}
          icon={<FaBook />}
        />
        <DashboardCard
          title={t('secondDashboard.booksOverdue')}
          value={data.books.overdue}
          icon={<FaBookDead />}
        />

        {/* Fees */}
        <DashboardCard
          title={t('secondDashboard.feesOfficePaid')}
          value={`$${data.fees.total_office_paid}`}
          icon={<FaBuilding />}
        />
        <DashboardCard
          title={t('secondDashboard.feesWarrantyPaid')}
          value={`$${data.fees.total_warranty_paid}`}
          icon={<FaShieldAlt />}
        />
      </Grid>
    </Container>
  )
}

export default SecondAdminDashboard
