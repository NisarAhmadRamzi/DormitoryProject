import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2'
import { MdOutlineLanguage } from 'react-icons/md'
import { NavLink, useLocation } from 'react-router-dom'
import { useDarkMode } from '../context/DarkModeContext'
import './MyNavbar.css'

const languages = [
  { code: 'en', name: 'English', flag: 'https://flagcdn.com/gb.svg' },
  { code: 'ps', name: 'پښتو', flag: 'https://flagcdn.com/af.svg' },
  { code: 'fa', name: 'دری', flag: 'https://flagcdn.com/af.svg' },
]

const MyNavbar = () => {
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'
  const { t, i18n } = useTranslation()
  const dir = i18n.dir()
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef()

  useEffect(() => {
    function handleClickOutside(e) {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageSelect = (langCode) => {
    i18n.changeLanguage(langCode)
    setLangOpen(false)
  }

  return (
    <nav className="navbar navbar-expand-lg sticky-top custom-navbar">
      <div className="container">
        <a className="navbar-brand" href="#">
          {t('navbar.brand')}
          <span className="dot">.</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label={t('navbar.toggle')}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto d-flex justify-content-center">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" end>
                {t('navbar.home')}
              </NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about">
                {t('navbar.about')}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#facilities">
                {t('navbar.facilities')}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#rooms">
                {t('navbar.rooms')}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#staff">
                {t('navbar.staff')}
              </a>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                {t('navbar.login')}
              </NavLink>
            </li>
          </ul>

          {/* Extra icons */}
          <div className="d-flex align-items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              className="btn btn-outline-secondary btn-sm rounded-circle"
              onClick={toggleDarkMode}
              title={t('navbar.darkMode')}
            >
              {isDarkMode ? (
                <HiOutlineSun style={{ fontSize: '20px' }} />
              ) : (
                <HiOutlineMoon style={{ fontSize: '20px' }} />
              )}
            </button>

            {/* Language Dropdown */}
            <div className="position-relative" ref={langRef}>
              <button
                className="btn btn-outline-secondary btn-sm rounded-circle"
                onClick={() => setLangOpen((prev) => !prev)}
                title={t('navbar.language')}
              >
                <MdOutlineLanguage style={{ fontSize: '20px' }} />
              </button>
              {langOpen && (
                <ul className={`language-dropdown ${dir}`}>
                  {languages.map((lang) => (
                    <li
                      key={lang.code}
                      onClick={() => handleLanguageSelect(lang.code)}
                    >
                      <img src={lang.flag} alt={`${lang.name} flag`} />
                      {lang.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {!isLoginPage && (
              <a
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className="btn btn-brand ms-lg-3"
              >
                {t('navbar.contact')}
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default MyNavbar
