import DurationChart from './DurationChart'
import SalesChart from './SalesChart'
import Spinner from '../../ui/Spinner'
import Stats from './Stats'
import styled from 'styled-components'
import { useRecentBookings } from './useRecentBookings'
import { useRecentStays } from './useRecentStays'
import Today from '../check-in-out/TodayActivity'

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`

const DashboardLayout = () => {
  const { isLoading: isLoading1, bookings } = useRecentBookings()
  const { stays, confirmedStays, isLoading: isLoading2 } = useRecentStays()

  if (isLoading1 || isLoading2) return <Spinner />

  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmedStays={confirmedStays} />
      <Today/>
      <DurationChart confirmedStays = {confirmedStays}/>
      <SalesChart/>
    </StyledDashboardLayout>
  )
}

export default DashboardLayout
