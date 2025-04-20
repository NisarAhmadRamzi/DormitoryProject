import Heading from '../ui/Heading'
import axios from 'axios'
function Users() {
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/users')
        console.log('Users:', res.data)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchUsers()
  }, [])
  // Fetch users from the API
  // const fetchUsers = async () => {
  //   try {
  //     const response = await axios.get('http://127.0.0.1:8000/api/users')
  //     setUsers(response.data.data) // Store the users data in state
  //   } catch (error) {
  //     console.error('Error fetching user data:', error)
  //   }
  // }
  return <Heading as="h1">Create a new user</Heading>
}

export default Users
