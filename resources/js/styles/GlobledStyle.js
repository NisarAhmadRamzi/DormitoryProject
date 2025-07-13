// // import { createGlobalStyle } from 'styled-components'

// // const GlobalStyles = createGlobalStyle`
// // :root {
// //   &, &.light-mode {
// //   /* Grey */
// //   --color-grey-0: #fff;
// //   --color-grey-50: #f9fafb;
// //   --color-grey-100: #f3f4f6;
// //   --color-grey-200: #e5e7eb;
// //   --color-grey-300: #d1d5db;
// //   --color-grey-400: #9ca3af;
// //   --color-grey-500: #6b7280;
// //   --color-grey-600: #4b5563;
// //   --color-grey-700: #374151;
// //   --color-grey-800: #1f2937;
// //   --color-grey-900: #111827;

// //   --color-blue-100: #e0f2fe;
// //   --color-blue-700: #0369a1;
// //   --color-green-100: #dcfce7;
// //   --color-green-700: #15803d;
// //   --color-yellow-100: #fef9c3;
// //   --color-yellow-700: #a16207;
// //   --color-silver-100: #e5e7eb;
// //   --color-silver-700: #374151;
// //   --color-indigo-100: #e0e7ff;
// //   --color-indigo-700: #4338ca;

// //   --color-red-100: #fee2e2;
// //   --color-red-700: #b91c1c;
// //   --color-red-800: #991b1b;

// //   --backdrop-color: rgba(255, 255, 255, 0.1);

// //   --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
// //   --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
// //   --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

// //     --image-grayscale: 0;
// //   --image-opacity: 100%;
// //   }

// //   &.dark-mode {
// //     --color-grey-0: #18212f;
// // --color-grey-50: #111827;
// // --color-grey-100: #1f2937;
// // --color-grey-200: #374151;
// // --color-grey-300: #4b5563;
// // --color-grey-400: #6b7280;
// // --color-grey-500: #9ca3af;
// // --color-grey-600: #d1d5db;
// // --color-grey-700: #e5e7eb;
// // --color-grey-800: #f3f4f6;
// // --color-grey-900: #f9fafb;

// // --color-blue-100: #075985;
// // --color-blue-700: #e0f2fe;
// // --color-green-100: #166534;
// // --color-green-700: #dcfce7;
// // --color-yellow-100: #854d0e;
// // --color-yellow-700: #fef9c3;
// // --color-silver-100: #374151;
// // --color-silver-700: #f3f4f6;
// // --color-indigo-100: #3730a3;
// // --color-indigo-700: #e0e7ff;

// // --color-red-100: #fee2e2;
// // --color-red-700: #b91c1c;
// // --color-red-800: #991b1b;

// // --backdrop-color: rgba(0, 0, 0, 0.3);

// // --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
// // --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
// // --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

// // --image-grayscale: 10%;
// // --image-opacity: 90%;
// //   }

// //   /* Indigo */
// //   --color-brand-50: #eef2ff;
// //   --color-brand-100: #e0e7ff;
// //   --color-brand-200: #c7d2fe;
// //   --color-brand-500: #6366f1;
// //   --color-brand-600: #4f46e5;
// //   --color-brand-700: #4338ca;
// //   --color-brand-800: #3730a3;
// //   --color-brand-900: #312e81;

// //   --border-radius-tiny: 3px;
// //   --border-radius-sm: 5px;
// //   --border-radius-md: 7px;
// //   --border-radius-lg: 9px;

// // }

// // *,
// // *::before,
// // *::after {
// //   box-sizing: border-box;
// //   padding: 0;
// //   margin: 0;

// //   /* Creating animations for dark mode */
// //   transition: background-color 0.3s, border 0.3s;
// // }

// // html {
// //   font-size: 62.5%;
// // }

// // body {
// //   font-family: "Poppins", sans-serif;
// //   color: var(--color-grey-700);

// //   transition: color 0.3s, background-color 0.3s;
// //   min-height: 100vh;
// //   line-height: 1.5;
// //   font-size: 1.6rem;
// // }

// // input,
// // button,
// // textarea,
// // select {
// //   font: inherit;
// //   color: inherit;
// // }

// // button {
// //   cursor: pointer;
// // }

// // *:disabled {
// //   cursor: not-allowed;
// // }

// // select:disabled,
// // input:disabled {
// //   background-color: var(--color-grey-200);
// //   color: var(--color-grey-500);
// // }

// // input:focus,
// // button:focus,
// // textarea:focus,
// // select:focus {
// //   outline: 2px solid var(--color-brand-600);
// //   outline-offset: -1px;
// // }

// // /* Parent selector, finally 😃 */
// // button:has(svg) {
// //   line-height: 0;
// // }

// // a {
// //   color: inherit;
// //   text-decoration: none;
// // }

// // ul {
// //   list-style: none;
// // }

// // p,
// // h1,
// // h2,
// // h3,
// // h4,
// // h5,
// // h6 {
// //   overflow-wrap: break-word;
// //   hyphens: auto;
// // }

// // img {
// //   max-width: 100%;

// //   /* For dark mode */
// //   filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
// // }

// // `

// // export default GlobalStyles

// // /*
// // FOR DARK MODE

// // --color-grey-0: #18212f;
// // --color-grey-50: #111827;
// // --color-grey-100: #1f2937;
// // --color-grey-200: #374151;
// // --color-grey-300: #4b5563;
// // --color-grey-400: #6b7280;
// // --color-grey-500: #9ca3af;
// // --color-grey-600: #d1d5db;
// // --color-grey-700: #e5e7eb;
// // --color-grey-800: #f3f4f6;
// // --color-grey-900: #f9fafb;

// // --color-blue-100: #075985;
// // --color-blue-700: #e0f2fe;
// // --color-green-100: #166534;
// // --color-green-700: #dcfce7;
// // --color-yellow-100: #854d0e;
// // --color-yellow-700: #fef9c3;
// // --color-silver-100: #374151;
// // --color-silver-700: #f3f4f6;
// // --color-indigo-100: #3730a3;
// // --color-indigo-700: #e0e7ff;

// // --color-red-100: #fee2e2;
// // --color-red-700: #b91c1c;
// // --color-red-800: #991b1b;

// // --backdrop-color: rgba(0, 0, 0, 0.3);

// // --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
// // --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
// // --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

// // --image-grayscale: 10%;
// // --image-opacity: 90%;
// // */

// import { createGlobalStyle } from 'styled-components'

// const GlobalStyles = createGlobalStyle`
// :root {
//   &, &.light-mode {
//   /* Grey */
//   --color-grey-0: #fff;
//   --color-grey-50: #f9fafb;
//   --color-grey-100: #f3f4f6;
//   --color-grey-200: #e5e7eb;
//   --color-grey-300: #d1d5db;
//   --color-grey-400: #9ca3af;
//   --color-grey-500: #6b7280;
//   --color-grey-600: #4b5563;
//   --color-grey-700: #374151;
//   --color-grey-800: #1f2937;
//   --color-grey-900: #111827;

//   --color-blue-100: #e0f2fe;
//   --color-blue-700: #0369a1;
//   --color-green-100: #dcfce7;
//   --color-green-700: #15803d;
//   --color-yellow-100: #fef9c3;
//   --color-yellow-700: #a16207;
//   --color-silver-100: #e5e7eb;
//   --color-silver-700: #374151;
//   --color-indigo-100: #e0e7ff;
//   --color-indigo-700: #4338ca;

//   --color-red-100: #fee2e2;
//   --color-red-700: #b91c1c;
//   --color-red-800: #991b1b;

//   --backdrop-color: rgba(255, 255, 255, 0.1);

//   --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
//   --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
//   --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

//     --image-grayscale: 0;
//   --image-opacity: 100%;
//   }

//   &.dark-mode {
//     --color-grey-0: #18212f;
// --color-grey-50: #111827;
// --color-grey-100: #1f2937;
// --color-grey-200: #374151;
// --color-grey-300: #4b5563;
// --color-grey-400: #6b7280;
// --color-grey-500: #9ca3af;
// --color-grey-600: #d1d5db;
// --color-grey-700: #e5e7eb;
// --color-grey-800: #f3f4f6;
// --color-grey-900: #f9fafb;

// --color-blue-100: #075985;
// --color-blue-700: #e0f2fe;
// --color-green-100: #166534;
// --color-green-700: #dcfce7;
// --color-yellow-100: #854d0e;
// --color-yellow-700: #fef9c3;
// --color-silver-100: #374151;
// --color-silver-700: #f3f4f6;
// --color-indigo-100: #3730a3;
// --color-indigo-700: #e0e7ff;

// --color-red-100: #fee2e2;
// --color-red-700: #b91c1c;
// --color-red-800: #991b1b;

// --backdrop-color: rgba(0, 0, 0, 0.3);

// --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
// --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
// --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

// --image-grayscale: 10%;
// --image-opacity: 90%;
//   }

//   /* Indigo */
//   --color-brand-50: #eef2ff;
//   --color-brand-100: #e0e7ff;
//   --color-brand-200: #c7d2fe;
//   --color-brand-500: #6366f1;
//   --color-brand-600: #4f46e5;
//   --color-brand-700: #4338ca;
//   --color-brand-800: #3730a3;
//   --color-brand-900: #312e81;

//   --border-radius-tiny: 3px;
//   --border-radius-sm: 5px;
//   --border-radius-md: 7px;
//   --border-radius-lg: 9px;
// }

// /* ----------------------------------------- */
// /* بقیه استایل‌های عمومی تو */
// /* ----------------------------------------- */

// *,
// *::before,
// *::after {
//   box-sizing: border-box;
//   padding: 0;
//   margin: 0;

//   /* Creating animations for dark mode */
//   transition: background-color 0.3s, border 0.3s;
// }

// html {
//   font-size: 62.5%;
// }

// body {
//   font-family: "Poppins", sans-serif;
//   color: var(--color-grey-700);

//   transition: color 0.3s, background-color 0.3s;
//   min-height: 100vh;
//   line-height: 1.5;
//   font-size: 1.6rem;
// }

// input,
// button,
// textarea,
// select {
//   font: inherit;
//   color: inherit;
// }

// button {
//   cursor: pointer;
// }

// *:disabled {
//   cursor: not-allowed;
// }

// select:disabled,
// input:disabled {
//   background-color: var(--color-grey-200);
//   color: var(--color-grey-500);
// }

// input:focus,
// button:focus,
// textarea:focus,
// select:focus {
//   outline: 2px solid var(--color-brand-600);
//   outline-offset: -1px;
// }

// /* Parent selector, finally 😃 */
// button:has(svg) {
//   line-height: 0;
// }

// a {
//   color: inherit;
//   text-decoration: none;
// }

// ul {
//   list-style: none;
// }

// p,
// h1,
// h2,
// h3,
// h4,
// h5,
// h6 {
//   overflow-wrap: break-word;
//   hyphens: auto;
// }

// img {
//   max-width: 100%;

//   /* For dark mode */
//   filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
// }

//   /* سایر استایل‌های عمومی ... */

//   /* جهت RTL کلی برای کل تقویم */
//   .rmdp-wrapper,
//   .rmdp-calendar,
//   .rmdp-day-picker,
//   .rmdp-week,
//   .rmdp-week-day,
//   .rmdp-month-picker,
//   .rmdp-year-picker {
//     direction: rtl !important;
//     text-align: right !important;
//   }

//   /* جهت هفته از راست به چپ */
//   .rmdp-week {
//     display: flex !important;
//     flex-direction: row-reverse !important;
//     justify-content: space-between;
//   }

//   /* استایل روزهای هفته */
//   .rmdp-week-day {
//     font-size: 1.2rem;
//     min-width: 4.8rem;
//     text-align: center !important;
//     padding: 0.4rem 0.2rem;
//   }

//   /* جهت اعداد تقویم */
//   .rmdp-day {
//     direction: rtl !important;
//   }

//    /* استایل قبلی‌ها ... */

//   .calendar-input {
//     border: 1px solid var(--color-grey-300);
//     background-color: var(--color-grey-0);
//     border-radius: var(--border-radius-sm);
//     padding: 0.8rem 1.2rem;
//     box-shadow: var(--shadow-sm);
//     width: 100%;
//     font-size: 1.4rem;
//     color: var(--color-grey-700);
//     transition: border-color 0.2s;

//     &:focus {
//       border-color: var(--color-blue-500);
//       outline: none;
//     }
//   }

//   /* اگر خطا وجود داشت، رنگ مرز قرمز شود */
//   .calendar-input.error {
//     border: 1px solid red !important;
//   }

//   /* استایل جهت راست‌چین تقویم */
//   .rmdp-wrapper,
//   .rmdp-calendar {
//     direction: rtl !important;
//     text-align: right !important;
//   }

//   .rmdp-week {
//     flex-direction: row-reverse !important;
//   }

//   .rmdp-week-day {
//     font-size: 1.2rem;
//     min-width: 4.8rem;
//     text-align: center;
//     padding: 0.4rem 0.2rem;
//   }

// /* تنظیم کامل برای وسط‌چین شدن عدد روز */
// .rmdp-day {
//   display: flex !important;
//   align-items: center !important;
//   justify-content: center !important;
//   text-align: center;
//   width: 4rem;
//   height: 4rem;
//   margin: auto;
//   font-size: 1.4rem;
//   border-radius: 50%; /* برای ظاهر گرد */
//   transition: all 0.2s ease;
//   cursor: pointer;
// }

// /* برای زمانی که روز انتخاب شده هاور شده */
// .rmdp-day:hover,
// .rmdp-day:focus {
//   background-color: var(--color-blue-100);
//   color: var(--color-blue-700);
// }

// .rmdp-wrapper,
// .rmdp-calendar {
//   direction: rtl !important;
//   text-align: right !important;
// }

// .rmdp-week {
//   flex-direction: row-reverse !important;
// }

// .rmdp-week-day {
//   font-size: 1.2rem;
//   min-width: 4.8rem;
//   text-align: center;
//   padding: 0.4rem 0.2rem;
// }

// .rmdp-wrapper,
// .rmdp-calendar {
//   direction: rtl !important;
//   text-align: right !important;
// }

// .rmdp-week {
//   display: flex !important;
//   flex-direction: row-reverse !important;
// }

// .rmdp-week-day {
//   font-size: 1.2rem;
//   min-width: 4.8rem;
//   text-align: center;
//   padding: 0.4rem 0.2rem;
// }
// .rtl-datepicker .rmdp-wrapper,
// .rtl-datepicker .rmdp-calendar {
//   direction: rtl !important;
//   text-align: right !important;
// }

// .rtl-datepicker .rmdp-week {
//   flex-direction: row-reverse !important;
// }

// .rtl-datepicker .rmdp-week-day {
//   font-size: 1.2rem;
//   min-width: 4.8rem;
//   text-align: center;
//   padding: 0.4rem 0.2rem;
// }
// .rtl-datepicker .rmdp-wrapper,
// .rtl-datepicker .rmdp-calendar {
//   direction: rtl !important;
//   text-align: right !important;
// }

// .rtl-datepicker .rmdp-week {
//   flex-direction: row-reverse !important;
// }

// .rtl-datepicker .rmdp-week-day {
//   font-size: 1.2rem;
//   min-width: 4.8rem;
//   text-align: center;
//   padding: 0.4rem 0.2rem;
// }

// `

// export default GlobalStyles

import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
:root {
  &, &.light-mode {
    /* Color Palette */
    --color-grey-0: #fff;
    --color-grey-50: #f9fafb;
    --color-grey-100: #f3f4f6;
    --color-grey-200: #e5e7eb;
    --color-grey-300: #d1d5db;
    --color-grey-400: #9ca3af;
    --color-grey-500: #6b7280;
    --color-grey-600: #4b5563;
    --color-grey-700: #374151;
    --color-grey-800: #1f2937;
    --color-grey-900: #111827;

    --color-blue-100: #e0f2fe;
    --color-blue-700: #0369a1;
    --color-green-100: #dcfce7;
    --color-green-700: #15803d;
    --color-yellow-100: #fef9c3;
    --color-yellow-700: #a16207;
    --color-silver-100: #e5e7eb;
    --color-silver-700: #374151;
    --color-indigo-100: #e0e7ff;
    --color-indigo-700: #4338ca;
    --color-red-100: #fee2e2;
    --color-red-700: #b91c1c;
    --color-red-800: #991b1b;

    --color-brand-50: #eef2ff;
    --color-brand-100: #e0e7ff;
    --color-brand-200: #c7d2fe;
    --color-brand-500: #6366f1;
    --color-brand-600: #4f46e5;
    --color-brand-700: #4338ca;
    --color-brand-800: #3730a3;
    --color-brand-900: #312e81;

    --backdrop-color: rgba(255, 255, 255, 0.1);

    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
    --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

    --border-radius-tiny: 3px;
    --border-radius-sm: 5px;
    --border-radius-md: 7px;
    --border-radius-lg: 9px;

    --image-grayscale: 0;
    --image-opacity: 100%;
  }

  &.dark-mode {
    --color-grey-0: #18212f;
    --color-grey-50: #111827;
    --color-grey-100: #1f2937;
    --color-grey-200: #374151;
    --color-grey-300: #4b5563;
    --color-grey-400: #6b7280;
    --color-grey-500: #9ca3af;
    --color-grey-600: #d1d5db;
    --color-grey-700: #e5e7eb;
    --color-grey-800: #f3f4f6;
    --color-grey-900: #f9fafb;

    --color-blue-100: #075985;
    --color-blue-700: #e0f2fe;
    --color-green-100: #166534;
    --color-green-700: #dcfce7;
    --color-yellow-100: #854d0e;
    --color-yellow-700: #fef9c3;
    --color-silver-100: #374151;
    --color-silver-700: #f3f4f6;
    --color-indigo-100: #3730a3;
    --color-indigo-700: #e0e7ff;
    --color-red-100: #fee2e2;
    --color-red-700: #b91c1c;
    --color-red-800: #991b1b;

    --backdrop-color: rgba(0, 0, 0, 0.3);
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
    --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
    --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

    --image-grayscale: 10%;
    --image-opacity: 90%;
  }
}

/* ---------- Base Reset ---------- */
*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Poppins", sans-serif;
  font-size: 1.6rem;
  color: var(--color-grey-700);
  background-color: var(--color-grey-0);
  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}

button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

/* ---------- Date Picker Styles (RTL) ---------- */
.rmdp-wrapper,
.rmdp-calendar,
.rmdp-day-picker,
.rmdp-month-picker,
.rmdp-year-picker,
.rmdp-week {
  direction: rtl !important;
  text-align: right !important;
}

.rmdp-week {
  display: flex !important;
  flex-direction: row-reverse !important;
  justify-content: space-between;
}

.rmdp-week-day {
  font-size: 1.2rem;
  min-width: 4.8rem;
  text-align: center;
  padding: 0.4rem 0.2rem;
}

.rmdp-day {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 4rem;
  height: 4rem;
  margin: auto;
  font-size: 1.4rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
}

.rmdp-day:hover,
.rmdp-day:focus {
  background-color: var(--color-blue-100);
  color: var(--color-blue-700);
}

/* ---------- Custom Calendar Input ---------- */
.calendar-input {
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
  width: 100%;
  font-size: 1.4rem;
  color: var(--color-grey-700);
  transition: border-color 0.2s;
}

.calendar-input:focus {
  border-color: var(--color-blue-500);
  outline: none;
}

.calendar-input.error {
  border: 1px solid red !important;
}


.custom-rtl-datepicker .rmdp-wrapper,
.custom-rtl-datepicker .rmdp-calendar,
.custom-rtl-datepicker .rmdp-day-picker,
.custom-rtl-datepicker .rmdp-week,
.custom-rtl-datepicker .rmdp-week-day {
  direction: rtl !important;
  text-align: right !important;
}

.custom-rtl-datepicker .rmdp-week {
  display: flex !important;
  flex-direction: row-reverse !important;
}

.custom-rtl-datepicker .rmdp-week-day {
  font-size: 1.3rem;
  min-width: 4.8rem;
  text-align: center;
  padding: 0.4rem 0.2rem;
}

`

export default GlobalStyles
