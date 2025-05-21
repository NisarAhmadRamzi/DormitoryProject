import { getBookingsAfterDate } from '../../services/apiBookings'
import { subDays } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

export function useRecentBookings() {
  const [searchParams] = useSearchParams()
  const numDay = !searchParams.get('last')
    ? 7
    : Number(searchParams.get('last'))
  const queryDate = subDays(new Date(), numDay).toISOString()

  const { isLoading, data: bookings } = useQuery({
    queryKey: ['bookings', `last-${numDay}`],
    queryFn: () => getBookingsAfterDate(queryDate),
  })

  return { isLoading, bookings }
}
