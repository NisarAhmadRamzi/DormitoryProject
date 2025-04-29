import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Route, Routes } from 'react-router-dom'

import Account from '../pages/Account'
import AppLayout from '../ui/AppLayout'
import Assets from '../pages/Assets'
import Bookings from '../pages/Bookings'
import Books from '../pages/Books'
import BorrowedBooks from '../pages/BorrowedBooks'
import Dashboard from '../pages/Dashboard'
import Expenses from '../pages/Expenses'
import Fees from '../pages/Fees'
import GlobleStyles from '../styles/GlobledStyle'
import Home from '../pages/home/Home'
import Libraries from '../pages/Libraries'
import LibraryStudents from '../pages/LibraryStudents'
import Login from '../pages/Login'
import { ModalProvider } from '../ui/Modal'
import PageNotFound from '../pages/PageNotFound'
import React from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Rooms from '../pages/Rooms'
import Settings from '../pages/Settings'
import Students from '../pages/Students'
import Supports from '../pages/Supports'
import { Toaster } from 'react-hot-toast'
import Users from '../pages/Users'

// Ensure you are importing ModalProvider

// Create the React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // Corrected staleTime to 1 minute (in milliseconds)
    },
  },
})

const Main = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobleStyles />
        <Routes>
          <Route path="/" element={<Home />} />{' '}
          {/* Show Home component at root path */}
          <Route element={<AppLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="libraries" element={<Libraries />} />
            <Route path="library-students" element={<LibraryStudents />} />
            <Route path="rooms" element={<Rooms />} />
            <Route path="assets" element={<Assets />} />
            <Route path="fees" element={<Fees />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="supports" element={<Supports />} />
            <Route path="books" element={<Books />} />
            <Route path="borrowed-books" element={<BorrowedBooks />} />
            <Route path="users" element={<Users />} />
            <Route path="students" element={<Students />} />
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
              padding: '20px 24px',
              backgroundColor: 'var(--color-grey-0)',
              color: 'var(--color-grey-700)',
            },
          }}
        />
      </ModalProvider>
    </QueryClientProvider>
  )
}

export default Main
