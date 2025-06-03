import { IoBedOutline, IoSettingsOutline } from 'react-icons/io5'
import {
  PiCurrencyDollarSimpleBold,
  PiGraduationCapDuotone,
  PiGraduationCapLight,
} from 'react-icons/pi'

import { BsCurrencyDollar } from 'react-icons/bs'
import { HiOutlineHomeModern } from 'react-icons/hi2'
import { LuUsers } from 'react-icons/lu'
import { MdOutlineLibraryBooks } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import { PiWarningLight } from 'react-icons/pi'
import { RxDashboard } from 'react-icons/rx'
import { TbDatabaseDollar } from 'react-icons/tb'
import { TfiSupport } from 'react-icons/tfi'
import { VscAccount } from 'react-icons/vsc'
import styled from 'styled-components'

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`

const StyledNavlink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
    border-left: 4px solid transparent; /* reserve space for border */
  }

  /* hover, active, and active class states */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-200);
    border-radius: var(--border-radius-sm);

    /* Add beautiful left border */
    border-left-color: var(--color-brand-600);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`

function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavlink to="/dashboard">
            <RxDashboard />
            <span>Dashboard</span>
          </StyledNavlink>
        </li>
        <li>
          <StyledNavlink to="/users">
            <LuUsers />
            <span> Users</span>
          </StyledNavlink>
        </li>
        <li>
          <StyledNavlink to="/students">
            <PiGraduationCapLight />
            <span>Students</span>
          </StyledNavlink>
        </li>
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
          <li>
            <StyledNavlink to="/books">
              <MdOutlineLibraryBooks />
              <span>Books</span>
            </StyledNavlink>
          </li>
          <li>
            <StyledNavlink to="/borrowed-books">
              <MdOutlineLibraryBooks />
              <span>Borrwed Books</span>
            </StyledNavlink>
          </li>
          <li>
            <StyledNavlink to="/complaints">
              <PiWarningLight />
              <span>Complaints</span>
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
        </li>
      </NavList>
    </nav>
  )
}
export default MainNav
