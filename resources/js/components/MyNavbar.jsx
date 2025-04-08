// import { Link, NavLink } from 'react-router-dom'

// import Button from 'react-bootstrap/Button'
// import Container from 'react-bootstrap/Container'
// import Form from 'react-bootstrap/Form'
// import Nav from 'react-bootstrap/Nav'
// import NavDropdown from 'react-bootstrap/NavDropdown'
// import Navbar from 'react-bootstrap/Navbar'
// import Offcanvas from 'react-bootstrap/Offcanvas'

// function MyNavbar() {
//   return (
//     <Navbar expand="lg" className="bg-body-tertiary">
//       <Container>
//         <Navbar.Brand href="#" style={{ fontWeight: 'bold' }}>
//           Dormitory
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="offcanvasNavbar" />
//         <Navbar.Offcanvas
//           id="offcanvasNavbar"
//           aria-labelledby="offcanvasNavbarLabel"
//           placement="end"
//         >
//           <Offcanvas.Header closeButton>
//             <Offcanvas.Title id="offcanvasNavbarLabel">Pages</Offcanvas.Title>
//           </Offcanvas.Header>
//           <Offcanvas.Body>
//             <Nav className="justify-content-center fw-b fs-5 flex-grow-1">
//               <NavLink to="#action1" className="nav-link ms-5">
//                 Home
//               </NavLink>
//               {/* <NavLink to="/dashboard" className="nav-link ms-5">
//                 Dashboard
//               </NavLink> */}
//               <Nav.Link
//                 className="text-dark px-3 fs-6"
//                 as={Link}
//                 to="dashboard"
//               >
//                 Dasboard
//               </Nav.Link>
//               <NavDropdown
//                 title="Menu"
//                 id="offcanvasNavbarDropdown"
//                 className="ms-5"
//               >
//                 <NavDropdown.Item href="#action3">menu1</NavDropdown.Item>
//                 <NavDropdown.Item href="#action4">menu2</NavDropdown.Item>
//                 <NavDropdown.Divider />
//                 <NavDropdown.Item href="#action5">menu3</NavDropdown.Item>
//               </NavDropdown>
//             </Nav>
//             <Form className="d-flex mt-2">
//               <Form.Control
//                 type="search"
//                 placeholder="Search"
//                 className="me-2"
//                 aria-label="Search"
//               />
//               <Button variant="outline-success">Search</Button>
//             </Form>
//           </Offcanvas.Body>
//         </Navbar.Offcanvas>
//       </Container>
//     </Navbar>
//   )
// }

// export default MyNavbar

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Navbar from 'react-bootstrap/Navbar'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { Link } from 'react-router-dom'

// function MyNavbar() {
//   const expand = 'md'
//   return (
//     <Navbar
//       key={expand}
//       expand={expand}
//       className="bg-body-tertiary mb-3"
//       style={{ position: 'sticky' }}
//     >
//       <Container>
//         <Navbar.Brand href="#" className="nav-brand">
//           <span>
//             <SiHomeassistantcommunitystore
//               style={{
//                 marginRight: '10px',
//                 fontSize: '30px',
//                 color: '#2dbd34',
//               }}
//             />
//           </span>
//           Dormitory
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
//         <Navbar.Offcanvas
//           id={`offcanvasNavbar-expand-${expand}`}
//           aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
//           placement="start"
//         >
//           <Offcanvas.Header closeButton>
//             <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
//               Offcanvas
//             </Offcanvas.Title>
//           </Offcanvas.Header>
//           <Offcanvas.Body>
//             <Nav className="justify-content-center flex-grow-1 pe-3">
//               {/* Use Link from react-router-dom to route to different components */}
//               <Nav.Link className="text-dark px-3 fs-6" as={Link} to="/">
//                 Home
//               </Nav.Link>
//               <Nav.Link className="text-dark px-3 fs-6" as={Link} to="/about">
//                 About
//               </Nav.Link>
//               <Nav.Link className="text-dark px-3 fs-6" as={Link} to="/contact">
//                 Contacts
//               </Nav.Link>
//               <Nav.Link
//                 className="text-dark px-3 fs-6"
//                 as={Link}
//                 to="/view-dorm"
//               >
//                 View Dorm
//               </Nav.Link>
//               <Nav.Link className="text-dark px-3 fs-6" as={Link} to="/member">
//                 Members
//               </Nav.Link>
//               <Nav.Link className="text-dark px-3 fs-6" as={Link} to="/admin">
//                 Admin
//               </Nav.Link>
//               <Nav.Link
//                 className="text-dark px-3 fs-6"
//                 as={Link}
//                 to="/dashboard/allUsers"
//               >
//                 Dashboard
//               </Nav.Link>
//             </Nav>
//             <div style={{ marginRight: '5px' }}>
//               <Button
//                 style={{
//                   backgroundColor: '#2dbd34',
//                   border: '1px solid #2dbd34',
//                 }}
//               >
//                 <span>
//                   <MdOutlineLogout
//                     style={{
//                       marginRight: '20px',
//                       fontSize: '20px',
//                       color: 'white',
//                     }}
//                   />
//                 </span>
//                 Log out
//               </Button>
//             </div>
//           </Offcanvas.Body>
//         </Navbar.Offcanvas>
//       </Container>
//     </Navbar>
//   )
// }

function MyNavbar() {
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
              {/* Fixing Home link to go to the root path */}
              <Link to="/" className="nav-link ms-5">
                Home
              </Link>
              {/* Dashboard link, fixed to navigate to /dashboard */}
              <Nav.Link
                className="text-dark px-3 fs-6"
                as={Link}
                to="/dashboard"
              >
                Dashboard
              </Nav.Link>
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

export default MyNavbar
