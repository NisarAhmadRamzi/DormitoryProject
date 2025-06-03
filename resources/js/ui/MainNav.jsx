// import { IoBedOutline, IoSettingsOutline } from 'react-icons/io5'
// import { LuBadgeCheck, LuUsers } from 'react-icons/lu'
// import {
//   PiCurrencyDollarSimpleBold,
//   PiGraduationCapDuotone,
//   PiGraduationCapLight,
// } from 'react-icons/pi'

// import { BsCurrencyDollar } from 'react-icons/bs'
// import { HiOutlineHomeModern } from 'react-icons/hi2'
// import { MdOutlineLibraryBooks } from 'react-icons/md'
// import { PiWarningLight } from 'react-icons/pi'
// import { RxDashboard } from 'react-icons/rx'
// import { TbDatabaseDollar } from 'react-icons/tb'
// import { TfiSupport } from 'react-icons/tfi'
// import { VscAccount } from 'react-icons/vsc'
// import { NavLink } from 'react-router-dom'
// import styled from 'styled-components'

// const NavList = styled.ul`
//   display: flex;
//   flex-direction: column;
//   gap: 0.8rem;
// `

// const StyledNavlink = styled(NavLink)`
//   &:link,
//   &:visited {
//     display: flex;
//     align-items: center;
//     gap: 1.2rem;

//     color: var(--color-grey-600);
//     font-size: 1.6rem;
//     font-weight: 500;
//     padding: 1.2rem 2.4rem;
//     transition: all 0.3s;
//     border-left: 4px solid transparent; /* reserve space for border */
//   }

//   /* hover, active, and active class states */
//   &:hover,
//   &:active,
//   &.active:link,
//   &.active:visited {
//     color: var(--color-grey-800);
//     background-color: var(--color-grey-200);
//     border-radius: var(--border-radius-sm);

//     /* Add beautiful left border */
//     border-left-color: var(--color-brand-600);
//   }

//   & svg {
//     width: 2.4rem;
//     height: 2.4rem;
//     color: var(--color-grey-400);
//     transition: all 0.3s;
//   }

//   &:hover svg,
//   &:active svg,
//   &.active:link svg,
//   &.active:visited svg {
//     color: var(--color-brand-600);
//   }
// `

// function MainNav() {
//   return (
//     <nav>
//       <NavList>
//         <li>
//           <StyledNavlink to="/dashboard">
//             <RxDashboard />
//             <span>Dashboard</span>
//           </StyledNavlink>
//         </li>
//         <li>
//           <StyledNavlink to="/users">
//             <LuUsers />
//             <span> Users</span>
//           </StyledNavlink>
//         </li>
//         <li>
//           <StyledNavlink to="/roles">
//             <LuBadgeCheck />
//             <span>Roles</span>
//           </StyledNavlink>
//         </li>
//         <li>
//           <StyledNavlink to="/students">
//             <PiGraduationCapLight />
//             <span>Students</span>
//           </StyledNavlink>
//         </li>
//         <li>
//           <StyledNavlink to="/libraries">
//             <HiOutlineHomeModern />
//             <span>Library</span>
//           </StyledNavlink>
//         </li>
//         <li>
//           <StyledNavlink to="/library-students">
//             <PiGraduationCapDuotone />
//             <span>Library Students</span>
//           </StyledNavlink>
//         </li>
//         <li>
//           <StyledNavlink to="/rooms">
//             <IoBedOutline />
//             <span>Rooms</span>
//           </StyledNavlink>
//         </li>
//         <li>
//           <StyledNavlink to="/assets">
//             <TbDatabaseDollar />
//             <span>Assets</span>
//           </StyledNavlink>
//         </li>
//         <li>
//           <li>
//             <StyledNavlink to="/fees">
//               <BsCurrencyDollar />
//               <span>Fees</span>
//             </StyledNavlink>
//           </li>
//           <li>
//             <StyledNavlink to="/expenses">
//               <PiCurrencyDollarSimpleBold />
//               <span>Expenses</span>
//             </StyledNavlink>
//           </li>
//           <li>
//             <StyledNavlink to="/supports">
//               <TfiSupport />
//               <span>Supports</span>
//             </StyledNavlink>
//           </li>
//           <li>
//             <StyledNavlink to="/books">
//               <MdOutlineLibraryBooks />
//               <span>Books</span>
//             </StyledNavlink>
//           </li>
//           <li>
//             <StyledNavlink to="/borrowed-books">
//               <MdOutlineLibraryBooks />
//               <span>Borrwed Books</span>
//             </StyledNavlink>
//           </li>
//           <li>
//             <StyledNavlink to="/complaints">
//               <PiWarningLight />
//               <span>Complaints</span>
//             </StyledNavlink>
//           </li>
//           <li>
//             <StyledNavlink to="/settings">
//               <IoSettingsOutline />
//               <span>Settings</span>
//             </StyledNavlink>
//           </li>
//           <li>
//             <StyledNavlink to="/accounts">
//               <VscAccount />
//               <span>Accounts</span>
//             </StyledNavlink>
//           </li>
//         </li>
//       </NavList>
//     </nav>
//   )
// }
// export default MainNav

//v2
import { IoBedOutline, IoSettingsOutline } from 'react-icons/io5'
import { LuBadgeCheck, LuUsers } from 'react-icons/lu'
import {
  PiCurrencyDollarSimpleBold,
  PiGraduationCapDuotone,
  PiGraduationCapLight,
  PiWarningLight,
} from 'react-icons/pi'

import { useState } from 'react'
import { BsCurrencyDollar } from 'react-icons/bs'
import { HiOutlineHomeModern } from 'react-icons/hi2'
import { MdOutlineLibraryBooks } from 'react-icons/md'
import { RxDashboard } from 'react-icons/rx'
import { TbDatabaseDollar } from 'react-icons/tb'
import { TfiSupport } from 'react-icons/tfi'
import { VscAccount } from 'react-icons/vsc'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`

const Category = styled.div`
  display: flex;
  flex-direction: column;
`
const CategoryHeader = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  font-size: 1.6rem;
  font-weight: 500;
  padding: 1.2rem 2.4rem;
  color: var(--color-grey-600);
  border-left: 4px solid transparent;
  transition: all 0.3s;

  &:hover {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
    border-left-color: var(--color-brand-600);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg {
    color: var(--color-brand-600);
  }
`

const SubMenu = styled.ul`
  display: ${({ open }) => (open ? 'block' : 'none')};
  list-style: none;
  margin: 0;
  padding: 0;
`

const StyledNavlink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.4rem;
    font-weight: 500;
    padding: 1rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg {
    color: var(--color-brand-600);
  }

  &.active {
    font-weight: 600;
    color: var(--color-brand-600);
  }
`

function MainNav() {
  const [openCategory, setOpenCategory] = useState('')

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? '' : category)
  }

  return (
    <nav>
      <NavList>
        {/* General */}
        <Category>
          <CategoryHeader onClick={() => toggleCategory('general')}>
            General
          </CategoryHeader>
          <SubMenu open={openCategory === 'general'}>
            <li>
              <StyledNavlink to="/dashboard">
                <RxDashboard />
                <span>Dashboard</span>
              </StyledNavlink>
            </li>
            <li>
              <StyledNavlink to="/settings">
                <IoSettingsOutline />
                <span>Settings</span>
              </StyledNavlink>
            </li>
            <li>
              <StyledNavlink to="/accounts">
                <VscAccount />
                <span>Accounts</span>
              </StyledNavlink>
            </li>
          </SubMenu>
        </Category>

        {/* User Management */}
        <Category>
          <CategoryHeader onClick={() => toggleCategory('users')}>
            User Management
          </CategoryHeader>
          <SubMenu open={openCategory === 'users'}>
            <li>
              <StyledNavlink to="/users">
                <LuUsers />
                <span>Users</span>
              </StyledNavlink>
            </li>
            <li>
              <StyledNavlink to="/roles">
                <LuBadgeCheck />
                <span>Roles</span>
              </StyledNavlink>
            </li>
            <li>
              <StyledNavlink to="/students">
                <PiGraduationCapLight />
                <span>Students</span>
              </StyledNavlink>
            </li>
          </SubMenu>
        </Category>

        {/* Dormitory Management */}
        <Category>
          <CategoryHeader onClick={() => toggleCategory('dormitory')}>
            Dormitory Management
          </CategoryHeader>
          <SubMenu open={openCategory === 'dormitory'}>
            <li>
              <StyledNavlink to="/rooms">
                <IoBedOutline />
                <span>Rooms</span>
              </StyledNavlink>
            </li>
            <li>
              <StyledNavlink to="/assets">
                <TbDatabaseDollar />
                <span>Assets</span>
              </StyledNavlink>
            </li>
            <li>
              <StyledNavlink to="/complaints">
                <PiWarningLight />
                <span>Complaints</span>
              </StyledNavlink>
            </li>
          </SubMenu>
        </Category>

        {/* Library Management */}
        <Category>
          <CategoryHeader onClick={() => toggleCategory('library')}>
            Library Management
          </CategoryHeader>
          <SubMenu open={openCategory === 'library'}>
            <li>
              <StyledNavlink to="/libraries">
                <HiOutlineHomeModern />
                <span>Library</span>
              </StyledNavlink>
            </li>
            <li>
              <StyledNavlink to="/library-students">
                <PiGraduationCapDuotone />
                <span>Library Students</span>
              </StyledNavlink>
            </li>
            <li>
              <StyledNavlink to="/books">
                <MdOutlineLibraryBooks />
                <span>Books</span>
              </StyledNavlink>
            </li>
            <li>
              <StyledNavlink to="/borrowed-books">
                <MdOutlineLibraryBooks />
                <span>Borrowed Books</span>
              </StyledNavlink>
            </li>
          </SubMenu>
        </Category>

        {/* Finance */}
        <Category>
          <CategoryHeader onClick={() => toggleCategory('finance')}>
            Finance
          </CategoryHeader>
          <SubMenu open={openCategory === 'finance'}>
            <li>
              <StyledNavlink to="/fees">
                <BsCurrencyDollar />
                <span>Fees</span>
              </StyledNavlink>
            </li>
            <li>
              <StyledNavlink to="/expenses">
                <PiCurrencyDollarSimpleBold />
                <span>Expenses</span>
              </StyledNavlink>
            </li>
            <li>
              <StyledNavlink to="/supports">
                <TfiSupport />
                <span>Supports</span>
              </StyledNavlink>
            </li>
          </SubMenu>
        </Category>
      </NavList>
    </nav>
  )
}

export default MainNav
