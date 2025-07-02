import { useTranslation } from 'react-i18next'
export function useLanguageDirection() {
  const { i18n } = useTranslation()
  // include both 'fa' and 'pa' as RTL
  const dir = ['fa', 'pa'].includes(i18n.language) ? 'rtl' : 'ltr'
  return { dir }
}
