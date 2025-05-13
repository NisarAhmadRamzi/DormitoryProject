// import 'bootstrap/dist/css/bootstrap.min.css'

// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom'
// import AppProvider from '../context/AppContext'
// import Main from './Main'
// import MyNavbar from './MyNavbar'

// const container = document.getElementById('app')
// const root = ReactDOM.createRoot(container)

// root.render(
//   <AppProvider>
//     <React.StrictMode>
//       <BrowserRouter>
//         <MyNavbar />
//         <Main />
//       </BrowserRouter>
//     </React.StrictMode>
//   </AppProvider>
// )

import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppProvider from '../context/AppContext'
import Main from './Main'
import MyNavbar from './MyNavbar'

const container = document.getElementById('app')
const root = ReactDOM.createRoot(container)

root.render(
  <AppProvider>
    <React.StrictMode>
      <BrowserRouter>
        <MyNavbar />
        <Main />
      </BrowserRouter>
    </React.StrictMode>
  </AppProvider>
)
