import { useEffect, useRef, useState } from 'react'

import { AiOutlineSetting } from 'react-icons/ai'
import { LiaExpandSolid } from 'react-icons/lia'
import { MdOutlineLanguage } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Logouts from '../features/authentication/Logouts'
import UserAvatar from '../features/authentication/UserAvatar'
import ButtonIcon from './ButtonIcon'
import DarkModeToggle from './DarkModeToggle'

const StyledHeaderMenu = styled.ul`
  display: flex;
  align-items: center;
  gap: 3rem;
  position: relative;
`

const DropdownWrapper = styled.div`
  position: relative;
`

const DropdownMenu = styled.ul`
  position: absolute;
  right: 0;
  top: 100%;
  background-color: var(--color-grey-0);
  border: 1px solid lightgray;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  padding: 0.4rem 0;
  z-index: 100;
  min-width: 200px;
`

const DropdownItem = styled.button`
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  padding: 1.2rem 2.4rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.4rem;
  color: var(--color-grey-700);
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  img {
    width: 24px;
    height: auto;
  }
`

const languages = [
  {
    code: 'en',
    name: 'English',
    flag: 'https://flagcdn.com/gb.svg',
  },
  {
    code: 'ps',
    name: 'پښتو',
    flag: 'https://flagcdn.com/af.svg',
  },
  {
    code: 'fa',
    name: 'دری',
    flag: 'https://flagcdn.com/af.svg',
  },
]

const HeaderMenu = () => {
  const navigate = useNavigate()
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const langRef = useRef()
  const userRef = useRef()

  const handleFullscreen = () => {
    const elem = document.documentElement
    if (!document.fullscreenElement) {
      elem.requestFullscreen?.()
    } else {
      document.exitFullscreen?.()
    }
  }

  const toggleLangMenu = () => setLangMenuOpen((prev) => !prev)
  const toggleUserMenu = () => setUserMenuOpen((prev) => !prev)

  const closeLangMenu = () => setLangMenuOpen(false)
  const closeUserMenu = () => setUserMenuOpen(false)

  useEffect(() => {
    function handleClickOutside(e) {
      if (langRef.current && !langRef.current.contains(e.target))
        closeLangMenu()
      if (userRef.current && !userRef.current.contains(e.target))
        closeUserMenu()
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageSelect = (langCode) => {
    console.log(`Selected language: ${langCode}`)
    closeLangMenu()
  }

  return (
    <StyledHeaderMenu>
      <li>
        <DropdownWrapper ref={userRef}>
          <div onClick={toggleUserMenu} style={{ cursor: 'pointer' }}>
            <UserAvatar />
          </div>
          {userMenuOpen && (
            <DropdownMenu>
              <DropdownItem
                onClick={() => navigate('/settings', closeUserMenu())}
              >
                <ButtonIcon>
                  <AiOutlineSetting />
                </ButtonIcon>{' '}
                Profile Settings
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  closeUserMenu()
                }}
              >
                <Logouts /> Log out
              </DropdownItem>
            </DropdownMenu>
          )}
        </DropdownWrapper>
      </li>

      <li>
        <ButtonIcon onClick={handleFullscreen}>
          <LiaExpandSolid />
        </ButtonIcon>
      </li>

      <li>
        <DarkModeToggle />
      </li>

      <li>
        <DropdownWrapper ref={langRef}>
          <ButtonIcon onClick={toggleLangMenu}>
            <MdOutlineLanguage />
          </ButtonIcon>
          {langMenuOpen && (
            <DropdownMenu>
              {languages.map((lang) => (
                <DropdownItem
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                >
                  <img src={lang.flag} alt={`${lang.name} flag`} />
                  {lang.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          )}
        </DropdownWrapper>
      </li>
    </StyledHeaderMenu>
  )
}

export default HeaderMenu
