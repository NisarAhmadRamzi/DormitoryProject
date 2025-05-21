import { differenceInDays, parseISO } from 'date-fns'

export const subtractDates = (dateStr1, dateStr2) => {
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)))
}

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), { addSuffix: true })
    .replace('about ', '')
    .replace('in ', 'In')
