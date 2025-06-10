import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js' // includes Popper

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppProvider from '../context/AppContext'
import Main from './Main'

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
