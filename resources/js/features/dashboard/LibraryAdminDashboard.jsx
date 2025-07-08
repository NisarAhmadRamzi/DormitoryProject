import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { FaBook, FaBookOpen, FaUsers } from 'react-icons/fa'
import styled from 'styled-components'

import { getLibraryAdminDashboardStats } from '../../services/apiLibraryAdmin'
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

const Loading = styled.div`
  text-align: center;
  font-size: 1.2rem;
  padding: 2rem;
`

function LibraryAdminDashboard() {
  const { t } = useTranslation()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['library-admin-stats'],
    queryFn: getLibraryAdminDashboardStats,
  })

  if (isLoading) return <Spinner />
  if (isError) return <Loading>{t('dashboard.errorLoading')}</Loading>

  return (
    <Container>
      <Title>{t('libraryDashboard.title')}</Title>
      <Grid>
        {/* Books */}
        <DashboardCard
          title={t('libraryDashboard.booksTotal')}
          value={data.books.total}
          icon={<FaBook />}
        />
        <DashboardCard
          title={t('libraryDashboard.booksBorrowed')}
          value={data.books.borrowed}
          icon={<FaBookOpen />}
        />
        <DashboardCard
          title={t('libraryDashboard.booksAvailable')}
          value={data.books.available}
          icon={<FaBook />}
        />

        {/* Library Students */}
        <DashboardCard
          title={t('libraryDashboard.libraryStudents')}
          value={data.library_students.total}
          icon={<FaUsers />}
        />

        {/* Borrowed Book Status */}
        {Object.entries(data.borrowed_book_status).map(([status, count]) => (
          <DashboardCard
            key={status}
            title={t(`libraryDashboard.borrowedBookStatus.${status}`, status)}
            value={count}
            icon={<FaBookOpen />}
          />
        ))}
      </Grid>
    </Container>
  )
}

export default LibraryAdminDashboard
