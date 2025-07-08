import { IoBedOutline } from 'react-icons/io5'
import { LuBadgeCheck, LuUsers } from 'react-icons/lu'
import {
  PiCurrencyDollarSimpleBold,
  PiGraduationCapDuotone,
  PiGraduationCapLight,
  PiWarningLight,
} from 'react-icons/pi'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsCurrencyDollar } from 'react-icons/bs'

import { HiOutlineHomeModern } from 'react-icons/hi2'
import { IoIosArrowForward } from 'react-icons/io'
import { IoKeyOutline } from 'react-icons/io5'
import { MdOutlineLibraryBooks } from 'react-icons/md'
import { RxDashboard } from 'react-icons/rx'
import { TbDatabaseDollar } from 'react-icons/tb'
import { TfiSupport } from 'react-icons/tfi'
import { VscAccount } from 'react-icons/vsc'
import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'
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

const directionStyles = ({ dir }) =>
  dir === 'rtl'
    ? css`
        border-right: 4px solid transparent;
        border-left: none;
        padding: 1.2rem 2.4rem 1.2rem 1rem;
      `
    : css`
        border-left: 4px solid transparent;
        border-right: none;
        padding: 1.2rem 1rem 1.2rem 2.4rem;
      `

const CategoryHeader = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-grey-600);
  transition: all 0.3s;
  ${({ dir }) => directionStyles({ dir })}

  &:hover {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
    ${({ dir }) =>
      dir === 'rtl'
        ? `border-right-color: var(--color-brand-600);`
        : `border-left-color: var(--color-brand-600);`}
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
  transition: transform 0.3s ease;
  color: var(--color-grey-400);
  width: 1.6rem;
  height: 1.6rem;
  flex-shrink: 0;

  ${({ dir }) =>
    dir === 'rtl'
      ? css`
          margin-right: auto;
          margin-left: 0;
          transform-origin: center;
        `
      : css`
          margin-left: auto;
          margin-right: 0;
          transform-origin: center;
        `}

  ${({ open, dir }) =>
    open
      ? dir === 'rtl'
        ? `transform: rotate(-90deg); color: var(--color-brand-600);`
        : `transform: rotate(90deg); color: var(--color-brand-600);`
      : ''}
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
  const { t, i18n } = useTranslation()
  const dir = i18n.dir()

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? '' : category)
  }

  // Map role to dashboard route
  const dashboardRouteMap = {
    student: '/students-dashboard',
    admin: '/dashboard',
    'second-admin': '/second-admin-dashboard',
    'library-admin': '/library-admin-dashboard',
    'library-student': '/library-student-dashboard',
  }

  // Compute dashboard route based on role
  const dashboardRoute = dashboardRouteMap[role] || '/dashboard' // fallback

  return (
    <nav>
      <NavList>
        {/* General */}
        <Category>
          <CategoryHeader onClick={() => toggleCategory('general')} dir={dir}>
            {t('general')}
            <ArrowIcon open={openCategory === 'general'} dir={dir} />
          </CategoryHeader>
          <SubMenu open={openCategory === 'general'}>
            {/* Show only the dashboard link appropriate to user role */}
            <li>
              <StyledNavlink to={dashboardRoute}>
                <RxDashboard />
                <span>{t('dashboard')}</span>
              </StyledNavlink>
            </li>

            <li>
              <StyledNavlink to="/accounts">
                <VscAccount />
                <span>{t('accounts')}</span>
              </StyledNavlink>
            </li>
          </SubMenu>
        </Category>

        {/* User Management */}
        <Category>
          <CategoryHeader onClick={() => toggleCategory('users')} dir={dir}>
            {t('userManagement')}
            <ArrowIcon open={openCategory === 'users'} dir={dir} />
          </CategoryHeader>
          <SubMenu open={openCategory === 'users'}>
            {/* Hide user management for students */}
            {role !== 'student' && (
              <li>
                <StyledNavlink to="/users">
                  <LuUsers />
                  <span>{t('users')}</span>
                </StyledNavlink>
              </li>
            )}
          </SubMenu>
        </Category>

        {/* Dormitory Management */}
        <Category>
          <CategoryHeader onClick={() => toggleCategory('dormitory')} dir={dir}>
            {t('dormitoryManagement')}
            <ArrowIcon open={openCategory === 'dormitory'} dir={dir} />
          </CategoryHeader>
          <SubMenu open={openCategory === 'dormitory'}>
            {role !== 'student' && (
              <li>
                <StyledNavlink to="/students">
                  <PiGraduationCapLight />
                  <span>{t('students')}</span>
                </StyledNavlink>
              </li>
            )}
            <li>
              <StyledNavlink to="/rooms">
                <IoBedOutline />
                <span>{t('rooms')}</span>
              </StyledNavlink>
            </li>
            {role !== 'student' && (
              <li>
                <StyledNavlink to="/assets">
                  <TbDatabaseDollar />
                  <span>{t('assets')}</span>
                </StyledNavlink>
              </li>
            )}
            {role !== 'student' && (
              <li>
                <StyledNavlink to="/complaints">
                  <PiWarningLight />
                  <span>{t('complaints')}</span>
                </StyledNavlink>
              </li>
            )}
          </SubMenu>
        </Category>

        {/* Library Management */}
        <Category>
          <CategoryHeader onClick={() => toggleCategory('library')} dir={dir}>
            {t('libraryManagement')}
            <ArrowIcon open={openCategory === 'library'} dir={dir} />
          </CategoryHeader>
          <SubMenu open={openCategory === 'library'}>
            {role !== 'student' && (
              <>
                <li>
                  <StyledNavlink to="/libraries">
                    <HiOutlineHomeModern />
                    <span>{t('library')}</span>
                  </StyledNavlink>
                </li>
                <li>
                  <StyledNavlink to="/library-students">
                    <PiGraduationCapDuotone />
                    <span>{t('libraryStudents')}</span>
                  </StyledNavlink>
                </li>
              </>
            )}
            <li>
              <StyledNavlink to="/books">
                <MdOutlineLibraryBooks />
                <span>{t('books')}</span>
              </StyledNavlink>
            </li>
            <li>
              <StyledNavlink to="/borrowed-books">
                <MdOutlineLibraryBooks />
                <span>{t('borrowedBooks')}</span>
              </StyledNavlink>
            </li>
          </SubMenu>
        </Category>

        {/* Finance */}
        {role !== 'student' && (
          <Category>
            <CategoryHeader onClick={() => toggleCategory('finance')} dir={dir}>
              {t('finance')}
              <ArrowIcon open={openCategory === 'finance'} dir={dir} />
            </CategoryHeader>
            <SubMenu open={openCategory === 'finance'}>
              <li>
                <StyledNavlink to="/fees">
                  <BsCurrencyDollar />
                  <span>{t('fees')}</span>
                </StyledNavlink>
              </li>
              <li>
                <StyledNavlink to="/expenses">
                  <PiCurrencyDollarSimpleBold />
                  <span>{t('expenses')}</span>
                </StyledNavlink>
              </li>
              <li>
                <StyledNavlink to="/supports">
                  <TfiSupport />
                  <span>{t('supports')}</span>
                </StyledNavlink>
              </li>
            </SubMenu>
          </Category>
        )}

        {/* Settings */}
        {role !== 'student' && (
          <Category>
            <CategoryHeader
              onClick={() => toggleCategory('settings')}
              dir={dir}
            >
              {t('settings')}
              <ArrowIcon open={openCategory === 'settings'} dir={dir} />
            </CategoryHeader>
            <SubMenu open={openCategory === 'settings'}>
              {role !== 'student' && (
                <>
                  <li>
                    <StyledNavlink to="/roles">
                      <LuBadgeCheck />
                      <span>{t('rolesTitle')}</span>
                    </StyledNavlink>
                  </li>
                  <li>
                    <StyledNavlink to="/permissions">
                      <IoKeyOutline />
                      <span>{t('permissions')}</span>
                    </StyledNavlink>
                  </li>
                </>
              )}
            </SubMenu>
          </Category>
        )}
      </NavList>
    </nav>
  )
}

export default MainNav
