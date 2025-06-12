import { useEffect, useRef, useState } from 'react'

import ButtonIcon from './ButtonIcon'
import DarkModeToggle from './DarkModeToggle'
import { LiaExpandSolid } from 'react-icons/lia'
import Logouts from '../features/authentication/Logouts'
import { MdOutlineLanguage } from 'react-icons/md'
import UserAvatar from '../features/authentication/UserAvatar'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const StyledHeaderMenu = styled.ul`
  display: flex;
  align-items: center;
  gap: 3rem; 
  position: relative;
  
`

const LanguageWrapper = styled.div`
  position: relative;
`

const LanguageMenu = styled.ul`
  position: absolute;
  right: 0;
  top: 3.4rem;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  padding: 0.4rem 0;
  z-index: 100;
  min-width: 200px;
`

const LanguageItem = styled.button`
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
    width: 20px;
    height: 20px;
    object-fit: cover;
    border-radius: 50%;
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
    name: 'Pashto',
    flag: 'https://flagcdn.com/af.svg',
  },
  {
    code: 'fa',
    name: 'Dari',
    flag: 'https://flagcdn.com/af.svg',
  },
]

const HeaderMenu = () => {
  const navigate = useNavigate()
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const langRef = useRef()

  const handleFullscreen = () => {
    const elem = document.documentElement
    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) elem.requestFullscreen()
      else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen()
      else if (elem.msRequestFullscreen) elem.msRequestFullscreen()
    } else {
      if (document.exitFullscreen) document.exitFullscreen()
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen()
      else if (document.msExitFullscreen) document.msExitFullscreen()
    }
  }

  const toggleLangMenu = () => {
    setLangMenuOpen((prev) => !prev)
  }

  const closeLangMenu = () => {
    setLangMenuOpen(false)
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (langRef.current && !langRef.current.contains(e.target)) {
        closeLangMenu()
      }
    }

    if (langMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [langMenuOpen])

  const handleLanguageSelect = (langCode) => {
    console.log(`Selected language: ${langCode}`)
    closeLangMenu()
  }

  return (
    <StyledHeaderMenu>
      <li>
        <UserAvatar />
      </li>
      <li>
        <ButtonIcon onClick={handleFullscreen}>
          <LiaExpandSolid />
        </ButtonIcon>
      </li>
      <li>
        <Logouts />
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <LanguageWrapper ref={langRef}>
          <ButtonIcon onClick={toggleLangMenu}>
            <MdOutlineLanguage />
          </ButtonIcon>

          {langMenuOpen && (
            <LanguageMenu>
              {languages.map((lang) => (
                <LanguageItem
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                >
                  <img src={lang.flag} alt={`${lang.name} flag`} />
                  {lang.name}
                </LanguageItem>
              ))}
            </LanguageMenu>
          )}
        </LanguageWrapper>
      </li>
    </StyledHeaderMenu>
  )
}

export default HeaderMenu
