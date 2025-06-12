import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Route, Routes } from 'react-router-dom'

import Account from '../pages/Account'
import AppLayout from '../ui/AppLayout'
import Assets from '../pages/Assets'
import Bookings from '../pages/Bookings'
import Books from '../pages/Books'
import BorrowedBooks from '../pages/BorrowedBooks'
import Complaints from '../pages/Complaints'
import { DarkModeProvider } from '../context/DarkModeContext'
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
import Permissions from '../pages/Permissions'
import ProtectedRoute from './ProtectedRoute'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import RegisterForm from '../pages/home/RegisterForm'
import Roles from '../pages/Roles'
import Rooms from '../pages/Rooms'
import Settings from '../pages/Settings'
import Students from '../pages/Students'
import Supports from '../pages/Supports'
import { Toaster } from 'react-hot-toast'
import { UserProvider } from '../context/userContext'
import Users from '../pages/Users'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
})

const Main = () => {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <ModalProvider>
            <ReactQueryDevtools initialIsOpen={false} />
            <GlobleStyles />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<RegisterForm />} />

              {/* All protected routes wrapped in AppLayout */}
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="roles" element={<Roles />} />
                <Route path="permissions" element={<Permissions />} />
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

              {/* Catch-all 404 */}
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
        </UserProvider>
      </QueryClientProvider>
    </DarkModeProvider>
  )
}

export default Main
