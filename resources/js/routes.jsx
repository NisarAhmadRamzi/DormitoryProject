import ComplaintsForm from './components/complaints/ComplaintsForm'
import ComplaintsList from './components/complaints/ComplaintsList'
import EditComplaint from './components/complaints/EditComplaint'
import About from './pages/about/About'
import Admin from './pages/admin/Admin'
import AddNewStudent from './pages/allStudents/AddNewStudent'
import AllStudents from './pages/allStudents/AllStudents'
import EditStudent from './pages/allStudents/EditStudent'
import AllUsers from './pages/allUsers/AllUsers'
import EditUser from './pages/allUsers/EditUser'
import UserForm from './pages/allUsers/UserForm'
import AddAsset from './pages/assets/AddAsset'
import AllAssets from './pages/assets/AllAssets'
import EditAsset from './pages/assets/EditAsset'
import AddBook from './pages/Books/AddBook'
import AllBooks from './pages/Books/AllBooks'
import EditBook from './pages/Books/EditBook'
import AddBorrowedBook from './pages/borrowed book/AddBorrowedBook'
import AllBorrowedBooks from './pages/borrowed book/AllBorrowedBooks'
import Contact from './pages/contact/Contact'
import Dashboard from './pages/dashboard/Dashboard'
import AllExpenses from './pages/expenses/AllExpenses'
import AddFee from './pages/fees/AddFee'
import EditFee from './pages/fees/EditFee'
import Fee from './pages/fees/Fee'
import Home from './pages/home/Home'
import AddStudentLibrary from './pages/library student/AddStudentLibrary'
import AllLibraryStudent from './pages/library student/AllLibraryStudent'
import EditLibraryStudent from './pages/library student/EditLibraryStudent'
import AddLibrary from './pages/library/AddLibrary'
import AllLibraries from './pages/library/AllLibraries'
import EditLibrary from './pages/library/EditLibrary'
import Member from './pages/member/Member'
import AddRoom from './pages/rooms/AddRoom'
import AllRooms from './pages/rooms/AllRooms'
import EditRoom from './pages/rooms/EditRoom'
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
  { path: '/dashboard/allUsers/addUser', element: <UserForm /> }, // New user creation
  { path: '/dashboard/allUsers/editUser/:userId', element: <EditUser /> }, // Edit user

  // Student Routes
  { path: '/allStudents', element: <AllStudents /> },
  {
    path: '/dashboard/allStudents/addNewStudent',
    element: <AddNewStudent />,
  }, // New student creation
  { path: '/editStudent/:studentId', element: <EditStudent /> }, // Edit student

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

  //Expenses Routes
  { path: '/dashboard/expenses', element: <AllExpenses /> },
]
