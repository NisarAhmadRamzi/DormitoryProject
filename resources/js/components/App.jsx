import 'bootstrap/dist/css/bootstrap.min.css'

import AppProvider from '../context/AppContext'
import { BrowserRouter } from 'react-router-dom'
import Main from './Main'
import React from 'react'
import ReactDOM from 'react-dom/client'

const container = document.getElementById('app')
const root = ReactDOM.createRoot(container)

root.render(
  <AppProvider>
    <React.StrictMode>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </React.StrictMode>
  </AppProvider>
)
