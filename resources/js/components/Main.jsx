import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Route, Routes } from 'react-router-dom'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useContext } from 'react'
import { Toaster } from 'react-hot-toast'
import { AppContext } from '../context/AppContext'
import { DarkModeProvider } from '../context/DarkModeContext'
import Account from '../pages/Account'
import Assets from '../pages/Assets'
import Bookings from '../pages/Bookings'
import Books from '../pages/Books'
import BorrowedBooks from '../pages/BorrowedBooks'
import Complaints from '../pages/Complaints'
import Dashboard from '../pages/Dashboard'
import Expenses from '../pages/Expenses'
import Fees from '../pages/Fees'
import Home from '../pages/home/Home'
import RegisterForm from '../pages/home/RegisterForm'
import Libraries from '../pages/Libraries'
import LibraryStudents from '../pages/LibraryStudents'
import Login from '../pages/Login'
import PageNotFound from '../pages/PageNotFound'
import Rooms from '../pages/Rooms'
import Settings from '../pages/Settings'
import Students from '../pages/Students'
import Supports from '../pages/Supports'
import Users from '../pages/Users'
import GlobleStyles from '../styles/GlobledStyle'
import AppLayout from '../ui/AppLayout'
import { ModalProvider } from '../ui/Modal'
import ProtectedRoute from './ProtectedRoute'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
})

const Main = () => {
  const { user } = useContext(AppContext)

  return (
    <>
      <DarkModeProvider>
        <QueryClientProvider client={queryClient}>
          <ModalProvider>
            <ReactQueryDevtools initialIsOpen={false} />
            <GlobleStyles />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<RegisterForm />} />

              {/* Protected App layout for authenticated users only */}
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="rooms" element={<Rooms />} />
                <Route path="bookings" element={<Bookings />} />
                <Route path="libraries" element={<Libraries />} />
                <Route path="library-students" element={<LibraryStudents />} />
                <Route path="assets" element={<Assets />} />
                <Route path="fees" element={<Fees />} />
                <Route path="expenses" element={<Expenses />} />
                <Route path="supports" element={<Supports />} />
                <Route path="books" element={<Books />} />
                <Route path="borrowed-books" element={<BorrowedBooks />} />
                <Route path="users" element={<Users />} />
                <Route path="students" element={<Students />} />
                <Route path="complaints" element={<Complaints />} />
                <Route path="settings" element={<Settings />} />
                <Route path="accounts" element={<Account />} />
              </Route>

              {/* Catch-all route for 404s */}
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
                success: { duration: 3000 },
                error: { duration: 5000 },
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
      </DarkModeProvider>
    </>
  )
}

export default Main
