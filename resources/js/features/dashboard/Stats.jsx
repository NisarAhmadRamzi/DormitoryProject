import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2'

import Stat from './Stat'
import { formatCurrency } from '../../utils/helpers'

const Stats = ({ bookings, confirmedStays }) => {
  const numBookings = bookings.length

  return (
    <>
      <Stat
        title="bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value="56"
      />
      <Stat
        title="Fees"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(3000)}
      />
      <Stat
        title="Check Ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value="210"
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value="87"
      />
    </>
  )
}

export default Stats
