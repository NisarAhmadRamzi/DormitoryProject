// components/persian_dari.js
const persian_dari = {
  name: 'faAf',
  months: [
    { name: 'حمل', short: 'حم' },
    { name: 'ثور', short: 'ثو' },
    { name: 'جوزا', short: 'جو' },
    { name: 'سرطان', short: 'سر' },
    { name: 'اسد', short: 'اس' },
    { name: 'سنبله', short: 'سن' },
    { name: 'میزان', short: 'می' },
    { name: 'عقرب', short: 'عق' },
    { name: 'قوس', short: 'قو' },
    { name: 'جدی', short: 'جد' },
    { name: 'دلو', short: 'دل' },
    { name: 'حوت', short: 'حو' },
  ],
  weekDays: [
    { name: 'شنبه', short: 'شن', isWeekend: false },
    { name: 'یک‌شنبه', short: 'یک', isWeekend: false },
    { name: 'دوشنبه', short: 'دو', isWeekend: false },
    { name: 'سه‌شنبه', short: 'سه', isWeekend: false },
    { name: 'چهارشنبه', short: 'چهار', isWeekend: false },
    { name: 'پنج‌شنبه', short: 'پنج', isWeekend: false },
    { name: 'جمعه', short: 'جم', isWeekend: true },
  ],
  digits: ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'],
  meridiem: {
    am: 'قبل‌ازظهر',
    pm: 'بعدازظهر',
  },
  ordinal: (n) => n,
}

export default persian_dari
