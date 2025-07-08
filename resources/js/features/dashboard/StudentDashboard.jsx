// StudentDashboard.jsx
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import {
  FaMoneyBillWave,
  FaRegCalendarCheck,
  FaUserGraduate,
} from 'react-icons/fa'
import { MdDoneAll, MdPending, MdRoomPreferences } from 'react-icons/md'
import { PiWarningCircleBold } from 'react-icons/pi'
import styled from 'styled-components'
import dayjs from '../../locales/dayjsConfig'

import { getStudentDashboardStats } from '../../services/apiStudentDashboard'
import Spinner from '../../ui/Spinner'
import DashboardCard from '../dashboard/DashboardCard'

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

function StudentDashboard() {
  const { t, i18n } = useTranslation()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['student-dashboard'],
    queryFn: getStudentDashboardStats,
  })

  dayjs.locale(i18n.language)

  if (isLoading) return <Spinner />
  if (isError)
    return (
      <div style={{ textAlign: 'center' }}>{t('dashboard.errorLoading')}</div>
    )

  const { student_info, complaints_summary, fees } = data

  return (
    <Container>
      <Title>{t('studentDashboard.title')}</Title>
      <Grid>
        <DashboardCard
          title={t('studentDashboard.name')}
          value={`${student_info.f_name} ${student_info.last_name}`}
          icon={<FaUserGraduate />}
        />
        <DashboardCard
          title={t('studentDashboard.gender')}
          value={
            student_info.gender === 'Male'
              ? t('genders.male')
              : student_info.gender === 'Female'
              ? t('genders.female')
              : student_info.gender
          }
          icon={<FaUserGraduate />}
        />

        <DashboardCard
          title={t('studentDashboard.registrationDate')}
          value={dayjs(student_info.registration_date).format('YYYY-MM-DD')}
          icon={<FaRegCalendarCheck />}
        />

        <DashboardCard
          title={t('studentDashboard.registrationDeadline')}
          value={dayjs(student_info.registration_deadline).format('YYYY-MM-DD')}
          icon={<FaRegCalendarCheck />}
        />

        <DashboardCard
          title={t('studentDashboard.officePaid')}
          value={
            fees.office_paid === 'Paid'
              ? t('paymentStatus.paid')
              : t('paymentStatus.notPaid')
          }
          icon={<FaMoneyBillWave />}
        />

        <DashboardCard
          title={t('studentDashboard.warrantyPaid')}
          value={
            fees.warranty_paid === 'Paid'
              ? t('paymentStatus.paid')
              : t('paymentStatus.notPaid')
          }
          icon={<FaMoneyBillWave />}
        />

        <DashboardCard
          title={t('studentDashboard.totalFee')}
          value={`$${fees.total_fee}`}
          icon={<FaMoneyBillWave />}
        />

        <DashboardCard
          title={t('studentDashboard.feeDueDate')}
          value={dayjs(fees.due_date).format('YYYY-MM-DD')}
          icon={<FaRegCalendarCheck />}
        />

        <DashboardCard
          title={t('studentDashboard.roomAssignment')}
          value={
            student_info.room
              ? student_info.room.name
              : t('studentDashboard.noRoom')
          }
          icon={<MdRoomPreferences />}
        />

        <DashboardCard
          title={t('studentDashboard.totalComplaints')}
          value={complaints_summary.total}
          icon={<PiWarningCircleBold />}
        />

        <DashboardCard
          title={t('studentDashboard.pendingComplaints')}
          value={complaints_summary.pending}
          icon={<MdPending />}
        />

        <DashboardCard
          title={t('studentDashboard.resolvedComplaints')}
          value={complaints_summary.resolved}
          icon={<MdDoneAll />}
        />
      </Grid>
    </Container>
  )
}

export default StudentDashboard
