import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Navbar from 'react-bootstrap/Navbar'
import Offcanvas from 'react-bootstrap/Offcanvas'

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
              {/* Home link is set to navigate to the root path */}
              <Link to="/" className="nav-link ms-5 fs-3 fw-bold">
                Home
              </Link>
              <Link to="/register" className="nav-link ms-5 fs-3 fw-bold">
                Register
              </Link>
              <Link to="/login" className="nav-link ms-5 fs-3 fw-bold">
                Login
              </Link>
              {/* Dashboard link, fixed to navigate to /dashboard */}
              <Nav.Link
                className="text-dark px-3 fs-3 fw-bold"
                as={Link}
                to="/dashboard"
              >
                Dashboard
              </Nav.Link>
              <NavDropdown
                title="Menu"
                id="offcanvasNavbarDropdown"
                className="ms-5 fs-3 fw-bold"
              >
                <NavDropdown.Item href="#action3">menu1</NavDropdown.Item>
                <NavDropdown.Item href="#action4">menu2</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">menu3</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex mt-2">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}

export default MyNavbar
