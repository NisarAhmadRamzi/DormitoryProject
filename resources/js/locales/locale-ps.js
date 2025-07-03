import dayjs from 'dayjs'

const locale = {
  name: 'ps',
  relativeTime: {
    future: 'په %s کې',
    past: '%s مخکې',
    s: 'چند ثانیې',
    m: 'یو دقیقې',
    mm: '%d دقیقې',
    h: 'یو ساعت',
    hh: '%d ساعتونه',
    d: 'یوه ورځ',
    dd: '%d ورځې',
    M: 'یوه میاشت',
    MM: '%d میاشتې',
    y: 'یو کال',
    yy: '%d کاله',
  },
}

dayjs.locale(locale, null, true)

