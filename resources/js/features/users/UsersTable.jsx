// import UsersRow from './UsersRow'
// import styled from 'styled-components'

// const StyledTable = styled.div`
//   width: 100%;
//   margin-top: 2rem;
//   border: 1px solid var(--color-grey-100);
//   border-radius: 8px;
//   overflow: hidden;
// `

// const TableHeader = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 2fr 2.5fr 2fr 2fr 0.5fr;
//   background-color: var(--color-grey-100);
//   padding: 1.2rem 1rem;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   font-size: 1.4rem;
// `

// function UsersTable({ users }) {
//   return (
//     <StyledTable>
//       <TableHeader>
//         <div>ID</div>
//         <div>Name</div>
//         <div>Email</div>
//         <div>Role</div>
//         <div>Student Info</div>
//         <div></div>
//       </TableHeader>
//       {users.map((user) => (
//         <UsersRow user={user} key={user.id} />
//       ))}
//     </StyledTable>
//   )
// }

// export default UsersTable

import styled from 'styled-components'
import UsersRow from './UsersRow'

const StyledTable = styled.div`
  width: 100%;
  margin-top: 2rem;
  border: 1px solid var(--color-grey-100);
  border-radius: 8px;
  overflow: hidden;
`

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 2fr 2.5fr 2fr 2fr 0.5fr;
  background-color: var(--color-grey-100);
  padding: 1.2rem 1rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-size: 1.4rem;
`

function UsersTable({ users }) {
  return (
    <StyledTable>
      <TableHeader>
        <div>ID</div>
        <div>Name</div>
        <div>Email</div>
        <div>Role</div>
        <div>Student Info</div>
        <div></div>
      </TableHeader>
      {users.map((user) => (
        // <UsersRow user={user} key={user.id} />
        <UsersRow user={user} key={user.id} />
      ))}
    </StyledTable>
  )
}

export default UsersTable
