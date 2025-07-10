import { NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const MyNavbar = () => {
  const location = useLocation()
  const { t } = useTranslation()

  const isLoginPage = location.pathname === '/login'

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top">
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
    </nav>
  )
}

export default MyNavbar
