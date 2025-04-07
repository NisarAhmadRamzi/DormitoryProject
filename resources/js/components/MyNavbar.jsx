import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { NavLink } from 'react-router-dom' // Add this import
import Navbar from 'react-bootstrap/Navbar'
import Offcanvas from 'react-bootstrap/Offcanvas'

function OffcanvasExample() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
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
            <Nav className="justify-content-center fw-b fs-5 flex-grow-1">
              <NavLink to="#action1" className="nav-link ms-5">
                Home
              </NavLink>
              <NavLink to="#action2" className="nav-link ms-5">
                Login
              </NavLink>
              <NavDropdown
                title="Menu"
                id="offcanvasNavbarDropdown"
                className="ms-5"
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

export default OffcanvasExample
