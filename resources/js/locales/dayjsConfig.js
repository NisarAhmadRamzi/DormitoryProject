import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import 'dayjs/locale/en'
import 'dayjs/locale/fa'
import './locale-ps'

dayjs.extend(relativeTime)

export default dayjs
