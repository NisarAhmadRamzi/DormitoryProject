import { getBookingsAfterDate } from '../../services/apiBookings'
import { subDays } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

export function useRecentBookings() {
  const [searchParams] = useSearchParams()
  const numDays = searchParams.get('last')
    ? Number(searchParams.get('last'))
    : 7
  const queryDate = subDays(new Date(), numDays).toISOString()

  const { isLoading, data: bookings } = useQuery({
    queryKey: ['bookings', `last-${numDays}`],
    queryFn: () => getBookingsAfterDate(queryDate),
  })

  return { isLoading, bookings, numDays }
}
