import gregorian from 'react-date-object/calendars/gregorian'
import persian from 'react-date-object/calendars/persian'
import { useTranslation } from 'react-i18next'
import DatePicker from 'react-multi-date-picker'
import pashto_locale from '../components/pashto_locale'
import persian_dari from '../components/persian_dari'
import CalendarInput from '../ui/CalendarInput'

function ShamsiDatePicker({ value, onChange, error }) {
  const { i18n } = useTranslation()
  const lang = i18n.language

  const isEnglish = lang.startsWith('en')
  const isPashto = lang.startsWith('ps')

  const calendar = isEnglish ? gregorian : persian
  const locale = isEnglish ? undefined : isPashto ? pashto_locale : persian_dari
  const isRTL = !isEnglish

  return (
    <CalendarInput $error={Boolean(error)}>
      <DatePicker
        calendar={calendar}
        locale={locale}
        value={value}
        onChange={onChange}
        inputClass="rmdp-input"
        calendarPosition="bottom-right"
        className={isRTL ? 'custom-rtl-datepicker' : ''}
        style={{
          direction: isRTL ? 'rtl' : 'ltr',
          textAlign: isRTL ? 'right' : 'left',
        }}
      />
    </CalendarInput>
  )
}

export default ShamsiDatePicker
