import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter, useRoutes } from 'react-router-dom'

import Home from '../pages/home/Home'
import MyNavbar from './MyNavbar'
import React from 'react'
import ReactDOM from 'react-dom/client'

export default function App() {
  const routes = useRoutes(allRoutes)
  return routes
}

const container = document.getElementById('app')
const root = ReactDOM.createRoot(container)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MyNavbar />
      {/* <App /> */}
      <Home />
    </BrowserRouter>
  </React.StrictMode>
)
