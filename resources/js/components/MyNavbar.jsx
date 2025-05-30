import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { Link } from 'react-router-dom'

function MyNavbar() {
  const expand = 'md'
  return (
    <Navbar
      key={expand}
      expand={expand}
      className="bg-body-tertiary"
      style={{
        position: 'sticky',
        top: 0, // Ensures it sticks to the top of the viewport
        zIndex: 1000, // Ensures the navbar stays on top of other content
      }}
    >
      <Container>
        <Navbar.Brand href="#" style={{ fontWeight: 'bold' }}>
          Dormitory
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Pages</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav
              className="justify-content-center fw-b fs-5 flex-grow-1"
              style={{ alignItems: 'center' }}
            >
              <Link to="/" className="nav-link ms-5 fs-3 fw-bold">
                Home
              </Link>
              <Link to="/login" className="nav-link ms-5 fs-3 fw-bold">
                Login
              </Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}

export default MyNavbar
