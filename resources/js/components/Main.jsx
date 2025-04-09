import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Navigate, Route, Routes } from 'react-router-dom'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import Account from '../pages/Account'
import Bookings from '../pages/Bookings'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import PageNotFound from '../pages/PageNotFound'
import Rooms from '../pages/Rooms'
import Settings from '../pages/Settings'
import Users from '../pages/Users'
import GlobleStyles from '../styles/GlobledStyle'
import AppLayout from '../ui/AppLayout'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 100,
    },
  },
})

const Main = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobleStyles />
      <Routes>
        {' '}
        {/* Using Routes instead of direct router wrapping */}
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
          <Route path="accounts" element={<Account />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster
        position="top-center"
        gutter={15}
        containerStyle={{
          margin: '8px',
          marginTop: '30px',
        }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '20px  24px',
            backgroundColor: 'var(--color-grey-0)',
            color: 'var(--color-grey-700)',
          },
        }}
      />
    </QueryClientProvider>
  )
}

export default Main
