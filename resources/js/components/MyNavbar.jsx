import { NavLink, useLocation } from 'react-router-dom' // Correct imports

const MyNavbar = () => {
  const location = useLocation()

  const isLoginPage = location.pathname === '/login'

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top">
      <div className="container">
        <a className="navbar-brand" href="#">
          Fanos Dormitory<span className="dot">.</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto d-flex justify-content-center">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#facilities">
                Facilities
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#rooms">
                Rooms
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#staff">
                Staff
              </a>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
          </ul>

          {/* Show Contact button only if NOT on login page */}
          {!isLoginPage && (
            <a
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              className="btn btn-brand ms-lg-3"
            >
              Contact
            </a>
          )}
        </div>
      </div>
    </nav>
  )
}

export default MyNavbar
