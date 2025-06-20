import { IoBedOutline, IoSettingsOutline } from 'react-icons/io5'
import { LuBadgeCheck, LuUsers } from 'react-icons/lu'
import {
  PiCurrencyDollarSimpleBold,
  PiGraduationCapDuotone,
  PiGraduationCapLight,
  PiWarningLight,
} from 'react-icons/pi'

import { BsCurrencyDollar } from 'react-icons/bs'
import { HiOutlineHomeModern } from 'react-icons/hi2'
import { IoIosArrowForward } from 'react-icons/io' // <-- import arrow here
import { IoKeyOutline } from 'react-icons/io5'
import { MdOutlineLibraryBooks } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import { RxDashboard } from 'react-icons/rx'
import { TbDatabaseDollar } from 'react-icons/tb'
import { TfiSupport } from 'react-icons/tfi'
import { VscAccount } from 'react-icons/vsc'
import styled from 'styled-components'
import { useState } from 'react'
import { useUser } from '../context/UserContext'

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

const ArrowIcon = styled(IoIosArrowForward)`
  margin-left: auto; /* push arrow to right */
  transition: transform 0.3s ease;
  color: var(--color-grey-400);
  width: 1.6rem;
  height: 1.6rem;
  flex-shrink: 0;

  /* rotate when open */
  ${({ open }) =>
    open && `transform: rotate(90deg); color: var(--color-brand-600);`}
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
  const { user } = useUser()
  const role = user?.role

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
            <ArrowIcon open={openCategory === 'general'} />
          </CategoryHeader>
          <SubMenu open={openCategory === 'general'}>
            {role !== 'student' && (
              <li>
                <StyledNavlink to="/dashboard">
                  <RxDashboard />
                  <span>Dashboard</span>
                </StyledNavlink>
              </li>
            )}
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
            <ArrowIcon open={openCategory === 'users'} />
          </CategoryHeader>
          <SubMenu open={openCategory === 'users'}>
            {role !== 'student' && (
              <li>
                <StyledNavlink to="/users">
                  <LuUsers />
                  <span>Users</span>
                </StyledNavlink>
              </li>
            )}
            {role !== 'student' && (
              <li>
                <StyledNavlink to="/roles">
                  <LuBadgeCheck />
                  <span>Roles</span>
                </StyledNavlink>
              </li>
            )}

            {role !== 'student' && (
              <li>
                <StyledNavlink to="/permissions">
                  <IoKeyOutline />
                  <span>Permissions</span>
                </StyledNavlink>
              </li>
            )}
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
            <ArrowIcon open={openCategory === 'dormitory'} />
          </CategoryHeader>
          <SubMenu open={openCategory === 'dormitory'}>
            <li>
              <StyledNavlink to="/rooms">
                <IoBedOutline />
                <span>Rooms</span>
              </StyledNavlink>
            </li>

            {role !== 'student' && (
              <li>
                <StyledNavlink to="/assets">
                  <TbDatabaseDollar />
                  <span>Assets</span>
                </StyledNavlink>
              </li>
            )}
            {role !== 'student' && (
              <li>
                <StyledNavlink to="/complaints">
                  <PiWarningLight />
                  <span>Complaints</span>
                </StyledNavlink>
              </li>
            )}
          </SubMenu>
        </Category>

        {/* Library Management */}
        <Category>
          <CategoryHeader onClick={() => toggleCategory('library')}>
            Library Management
            <ArrowIcon open={openCategory === 'library'} />
          </CategoryHeader>
          <SubMenu open={openCategory === 'library'}>
            {role !== 'student' && (
              <li>
                <StyledNavlink to="/libraries">
                  <HiOutlineHomeModern />
                  <span>Library</span>
                </StyledNavlink>
              </li>
            )}

            {role !== 'student' && (
              <li>
                <StyledNavlink to="/library-students">
                  <PiGraduationCapDuotone />
                  <span>Library Students</span>
                </StyledNavlink>
              </li>
            )}
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
        {role !== 'student' && (
          <Category>
            <CategoryHeader onClick={() => toggleCategory('finance')}>
              Finance
              <ArrowIcon open={openCategory === 'finance'} />
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
        )}
      </NavList>
    </nav>
  )
}

export default MainNav
