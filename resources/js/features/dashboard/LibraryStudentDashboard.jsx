import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import {
  FaBook,
  FaBookOpen,
  FaCalendarAlt,
  FaClock,
  FaEnvelope,
  FaIdBadge,
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
  FaUserCheck,
} from 'react-icons/fa'
import styled from 'styled-components'

import { getLibraryStudentDashboardStats } from '../../services/apiLibraryStudent'
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
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
`

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin: 2rem 0 1rem;
  color: var(--color-primary-600);
`

const Loading = styled.div`
  text-align: center;
  font-size: 1.2rem;
  padding: 2rem;
`

function LibraryStudentDashboard() {
  const { t } = useTranslation()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['library-student-stats'],
    queryFn: getLibraryStudentDashboardStats,
  })

  if (isLoading) return <Spinner />
  if (isError) return <Loading>{t('dashboardError.errorLoading')}</Loading>

  const info = data.library_student_info
  const summary = data.borrowed_summary
  const borrowedBooks = data.borrowed_books

  return (
    <Container>
      <Title>{t('libraryStudentDashboard.title')}</Title>

      <SectionTitle>{t('libraryStudentDashboard.studentInfo')}</SectionTitle>
      <Grid>
        <DashboardCard
          title={t('libraryStudentDashboard.name')}
          value={`${info.name} ${info.last_name}`}
          icon={<FaUser />}
        />
        <DashboardCard
          title={t('libraryStudentDashboard.email')}
          value={info.email}
          icon={<FaEnvelope />}
        />
        <DashboardCard
          title={t('libraryStudentDashboard.phone')}
          value={info.phone}
          icon={<FaPhone />}
        />
        <DashboardCard
          title={t('libraryStudentDashboard.address')}
          value={info.address}
          icon={<FaMapMarkerAlt />}
        />
        <DashboardCard
          title={t('libraryStudentDashboard.gender')}
          value={info.gender}
          icon={<FaIdBadge />}
        />
        <DashboardCard
          title={t('libraryStudentDashboard.membershipStatus')}
          value={info.membership_status}
          icon={<FaUserCheck />}
        />
        <DashboardCard
          title={t('libraryStudentDashboard.academicInfo')}
          value={info.academic_info}
          icon={<FaBook />}
        />
        <DashboardCard
          title={t('libraryStudentDashboard.registrationDate')}
          value={info.registration_date}
          icon={<FaCalendarAlt />}
        />
        <DashboardCard
          title={t('libraryStudentDashboard.registrationDeadline')}
          value={info.registration_deadline}
          icon={<FaClock />}
        />
      </Grid>

      <SectionTitle>
        {t('libraryStudentDashboard.borrowedSummary')}
      </SectionTitle>
      <Grid>
        <DashboardCard
          title={t('libraryStudentDashboard.totalBorrowed')}
          value={summary.total}
          icon={<FaBookOpen />}
        />
        <DashboardCard
          title={t('libraryStudentDashboard.activeBorrowed')}
          value={summary.active}
          icon={<FaBookOpen />}
        />
        <DashboardCard
          title={t('libraryStudentDashboard.overdueBorrowed')}
          value={summary.overdue}
          icon={<FaBookOpen />}
        />
        <DashboardCard
          title={t('libraryStudentDashboard.returnedBorrowed')}
          value={summary.returned}
          icon={<FaBookOpen />}
        />
      </Grid>

      <SectionTitle>
        {t('libraryStudentDashboard.borrowedBooksList')}
      </SectionTitle>
      <Grid>
        {borrowedBooks.map((book) => (
          <DashboardCard
            key={book.id}
            title={`${t('libraryStudentDashboard.borrowDate')}: ${
              book.borrow_date
            }`}
            value={`${t('libraryStudentDashboard.returnDate')}: ${
              book.return_date
            }`}
            icon={<FaBookOpen />}
          />
        ))}
      </Grid>
    </Container>
  )
}

export default LibraryStudentDashboard
