import About from './pages/about/About'
import AddAsset from './pages/assets/AddAsset'
import AddBook from './pages/Books/AddBook'
import AddBorrowedBook from './pages/borrowed book/AddBorrowedBook'
import AddExpenses from './pages/expenses/AddExpenses'
import AddFee from './pages/fees/AddFee'
import AddLibrary from './pages/library/AddLibrary'
import AddNewStudent from './pages/allStudents/AddNewStudent'
import AddRoom from './pages/rooms/AddRoom'
import AddStudentLibrary from './pages/library student/AddStudentLibrary'
import AddSupport from './pages/supports/AddSupport'
import Admin from './pages/admin/Admin'
import AllAssets from './pages/assets/AllAssets'
import AllBooks from './pages/Books/AllBooks'
import AllBorrowedBooks from './pages/borrowed book/AllBorrowedBooks'
import AllExpenses from './pages/expenses/AllExpenses'
import AllLibraries from './pages/library/AllLibraries'
import AllLibraryStudent from './pages/library student/AllLibraryStudent'
import AllRooms from './pages/rooms/AllRooms'
import AllStudents from './pages/allStudents/AllStudents'
import AllSupports from './pages/supports/AllSupports'
import AllUsers from './pages/allUsers/AllUsers'
import ComplaintsForm from './components/complaints/ComplaintsForm'
import ComplaintsList from './components/complaints/ComplaintsList'
import Contact from './pages/contact/Contact'
import Dashboard from './pages/dashboard/Dashboard'
import EditAsset from './pages/assets/EditAsset'
import EditBook from './pages/Books/EditBook'
import EditComplaint from './components/complaints/EditComplaint'
import EditExpense from './pages/expenses/EditExpense'
import EditFee from './pages/fees/EditFee'
import EditLibrary from './pages/library/EditLibrary'
import EditLibraryStudent from './pages/library student/EditLibraryStudent'
import EditRoom from './pages/rooms/EditRoom'
import EditStudent from './pages/allStudents/EditStudent'
import EditSupport from './pages/supports/EditSupport'
import EditUser from './pages/allUsers/EditUser'
import Fee from './pages/fees/Fee'
import Home from './pages/home/Home'
import Member from './pages/member/Member'
import UserForm from './pages/allUsers/UserForm'
import View_Dorm from './pages/view-dorm/View_Dorm'

export const allRoutes = [
  { path: '/', element: <Home /> },
  { path: '/admin', element: <Admin /> },
  { path: '/about', element: <About /> },
  { path: '/contact', element: <Contact /> },
  { path: '/view-dorm', element: <View_Dorm /> },
  { path: '/member', element: <Member /> },
  { path: '/dashboard', element: <Dashboard /> },

  // Users Routes
  { path: '/dashboard/allUsers', element: <AllUsers /> },
  { path: '/dashboard/allUsers/addUser', element: <UserForm /> },
  { path: '/dashboard/allUsers/editUser/:userId', element: <EditUser /> },

  // Student Routes
  { path: '/allStudents', element: <AllStudents /> },
  { path: '/dashboard/allStudents/addNewStudent', element: <AddNewStudent /> },
  { path: '/editStudent/:studentId', element: <EditStudent /> },

  // Complaints Routes
  { path: '/dashboard/complaints', element: <ComplaintsList /> },
  { path: '/dashboard/addComplaints', element: <ComplaintsForm /> },
  {
    path: '/dashboard/editComplaints/:complaintId',
    element: <EditComplaint />,
  },

  // Rooms Routes
  { path: '/dashboard/rooms', element: <AllRooms /> },
  { path: '/dashboard/addRoom', element: <AddRoom /> },
  { path: '/dashboard/editRoom/:roomId', element: <EditRoom /> },

  // Fees Routes
  { path: '/dashboard/fees', element: <Fee /> },
  { path: '/dashboard/addFee', element: <AddFee /> },
  { path: '/dashboard/editFee/:feeId', element: <EditFee /> },

  // Library Routes
  { path: '/dashboard/library', element: <AllLibraries /> },
  { path: '/dashboard/addLibrary', element: <AddLibrary /> },
  { path: '/dashboard/editLibrary/:libraryId', element: <EditLibrary /> },

  // Library Student Routes
  { path: '/dashboard/libraryStudent', element: <AllLibraryStudent /> },
  {
    path: '/dashboard/ibraryStudent/addLibraryStudent',
    element: <AddStudentLibrary />,
  },
  {
    path: '/dashboard/libraryStudent/:libraryStudentId',
    element: <EditLibraryStudent />,
  },

  // Books Routes
  { path: '/dashboard/books', element: <AllBooks /> },
  { path: '/dashboard/books/addBook', element: <AddBook /> },
  { path: '/dashboard/books/:bookId', element: <EditBook /> },

  // Borrowed Book Routes
  { path: '/dashboard/borrowedBooks', element: <AllBorrowedBooks /> },
  {
    path: '/dashboard/borrowedBooks/addBorrowedBook',
    element: <AddBorrowedBook />,
  },

  // Assets Routes
  { path: '/dashboard/assets', element: <AllAssets /> },
  { path: '/dashboard/assets/addAsset', element: <AddAsset /> },
  { path: '/dashboard/assets/:assetId', element: <EditAsset /> },

  // Expenses Routes
  { path: '/dashboard/expenses', element: <AllExpenses /> },
  { path: '/dashboard/expenses/addExpenses', element: <AddExpenses /> },
  { path: '/dashboard/expenses/:expenseId', element: <EditExpense /> },

  // Supports Routes
  { path: '/dashboard/supports', element: <AllSupports /> },
  { path: '/dashboard/supports/addSupports', element: <AddSupport /> },
  {
    path: '/dashboard/supports/editSupport/:supportId',
    element: <EditSupport />,
  }, // New route for editing support
]
