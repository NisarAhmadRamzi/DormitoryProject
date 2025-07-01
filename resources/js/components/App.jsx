// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.bundle.min.js' // includes Popper

// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom'
// import AppProvider from '../context/AppContext'
// import Main from './Main'
// import './i18n'
// const container = document.getElementById('app')
// const root = ReactDOM.createRoot(container)

// root.render(
//   <AppProvider>
//     <React.StrictMode>
//       <BrowserRouter>
//         <Main />
//       </BrowserRouter>
//     </React.StrictMode>
//   </AppProvider>
// )

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js' // includes Popper

import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { useTranslation } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom'
import AppProvider from '../context/AppContext'
import Main from './Main'
import './i18n'

// Wrapper component to apply HTML dir/lang dynamically
function AppWrapper() {
  const { i18n } = useTranslation()

  useEffect(() => {
    const lang = i18n.language
    const dir = lang === 'fa' || lang === 'ps' ? 'rtl' : 'ltr'

    document.documentElement.lang = lang
    document.documentElement.dir = dir
  }, [i18n.language])

  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  )
}

const container = document.getElementById('app')
const root = ReactDOM.createRoot(container)

root.render(
  <AppProvider>
    <React.StrictMode>
      <AppWrapper />
    </React.StrictMode>
  </AppProvider>
)
