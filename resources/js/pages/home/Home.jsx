import { Button, Card, Col, Container, Row } from 'react-bootstrap'

import { Link } from 'react-router-dom'
import React from 'react'

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="hero d-flex align-items-center justify-content-center text-center text-white position-relative"
        style={{
          backgroundImage:
            'url(https://png.pngtree.com/background/20240112/original/pngtree-sleek-and-sophisticated-modern-dark-living-room-with-luxury-interior-and-picture-image_7226270.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
        }}
      >
        {/* Overlay for Darkening the Background */}
        <div
          className="overlay position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)', // Adjust opacity for darker overlay
          }}
        ></div>

        <div className="hero-container container position-relative z-index-2">
          <div className="hero-text">
            <h1 className="display-3 fw-bold mb-3">
              Your Comfortable Home Away from Home
            </h1>
            <p className="subheadline fs-4 fw-light mb-4">
              Modern Rooms. Exclusive Amenities. Prime Location.
            </p>
            <div className="cta-buttons d-flex justify-content-center gap-4 mb-4">
              <Link to="/member">
                <Button
                  variant="primary"
                  className="px-4 py-3 shadow-lg"
                  style={{
                    borderRadius: '50px', // Rounded button corners
                  }}
                >
                  Apply Now
                </Button>
              </Link>
              <Button
                href="#tour"
                className="btn btn-outline-light px-4 py-3 shadow-lg"
                style={{
                  borderRadius: '50px', // Rounded button corners
                }}
              >
                Book a Tour
              </Button>
            </div>
            <div className="social-proof fs-5 fw-italic">
              <p>
                <i className="fas fa-quote-left text-danger"></i> "Best dorm
                experience I’ve had. Great community and fantastic amenities!" -
                John D.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-4 text-primary">About Our Dormitory</h2>
            <p className="lead text-muted">
              Your Comfortable Home Away from Home
            </p>
          </div>
          <Row className="mb-5">
            <Col md={6}>
              <h3 className="text-success">Why Choose Us?</h3>
              <p>
                Our dormitory offers a modern and secure living space for
                students. Located near the campus with easy access to
                transportation, we provide fully furnished private and shared
                rooms. Enjoy high-speed internet, top-notch amenities, and a
                vibrant community. Whether you're looking for peace and quiet or
                social interaction, we have something for everyone.
              </p>
            </Col>
            <Col md={6}>
              <img
                src="https://png.pngtree.com/thumb_back/fh260/background/20230711/pngtree-contemporary-dorm-room-3d-render-of-grey-wall-yellow-bookcase-twin-image_3834185.jpg"
                alt="Dormitory Image"
                className="img-fluid rounded shadow-sm"
              />
            </Col>
          </Row>

          {/* Highlight Features */}
          <Row>
            <Col md={4}>
              <Card className="shadow-sm mb-4">
                <Card.Body>
                  <h5 className="text-primary">Security</h5>
                  <p>
                    24/7 surveillance, keycard access, and on-site security for
                    your peace of mind.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow-sm mb-4">
                <Card.Body>
                  <h5 className="text-primary">High-Speed Internet</h5>
                  <p>
                    Stay connected with high-speed Wi-Fi in your room and common
                    areas.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow-sm mb-4">
                <Card.Body>
                  <h5 className="text-primary">Private & Shared Rooms</h5>
                  <p>
                    Choose between private or shared rooms, both fully furnished
                    for comfort.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Card className="shadow-sm mb-4">
                <Card.Body>
                  <h5 className="text-primary">Utilities & Amenities</h5>
                  <p>
                    On-site laundry, dining areas, study lounges, and more to
                    make your life easier.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow-sm mb-4">
                <Card.Body>
                  <h5 className="text-primary">Prime Location</h5>
                  <p>
                    Located close to the campus and public transport, making
                    commuting a breeze.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Available Rooms Section */}
      <section id="available-rooms" className="available-rooms py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-4 text-primary">
              Available Rooms & Pricing
            </h2>
            <p className="lead text-muted">
              Find the perfect room for your needs at affordable prices.
            </p>
          </div>

          {/* Room Types and Pricing */}
          <Row>
            {/* Single Room */}
            <Col md={4} sm={6} className="mb-4">
              <Card className="room-card shadow-sm">
                <Card.Img
                  variant="top"
                  src="https://img.freepik.com/premium-photo/living-room-modern-apartment-with-two-identical-sofas-opposite-each-other_974732-5779.jpg"
                  alt="Single Room"
                  className="card-img"
                />
                <Card.Body>
                  <Card.Title>Single Room</Card.Title>
                  <Card.Text>
                    A private room for one with all the essentials you need.
                  </Card.Text>
                  <ul>
                    <li>Bed size: Full</li>
                    <li>Furniture: Desk, chair, wardrobe</li>
                    <li>Air Conditioning</li>
                    <li>High-speed Wi-Fi</li>
                  </ul>
                  <p className="price">$400 / month</p>
                  <Link to="/member">
                    <Button variant="primary" className="w-100">
                      Apply Now
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>

            {/* Shared Room */}
            <Col md={4} sm={6} className="mb-4">
              <Card className="room-card shadow-sm">
                <Card.Img
                  variant="top"
                  src="https://img.freepik.com/premium-photo/black-contemporary-loft-living-room-interior-mock-up-featuring-sofa-accessories_872147-4035.jpg"
                  alt="Shared Room"
                  className="card-img"
                />
                <Card.Body>
                  <Card.Title>Shared Room</Card.Title>
                  <Card.Text>
                    Share a spacious room with one or more roommates.
                  </Card.Text>
                  <ul>
                    <li>Bed size: Twin</li>
                    <li>Furniture: Desk, chair, wardrobe</li>
                    <li>Air Conditioning</li>
                    <li>High-speed Wi-Fi</li>
                  </ul>
                  <p className="price">$300 / month per person</p>
                  <Link to="/member">
                    <Button variant="primary" className="w-100">
                      Apply Now
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>

            {/* Suite Room */}
            <Col md={4} sm={6} className="mb-4">
              <Card className="room-card shadow-sm">
                <Card.Img
                  variant="top"
                  src="https://www.shutterstock.com/image-illustration/corner-view-on-dark-living-260nw-2197571973.jpg"
                  alt="Suite Room"
                  className="card-img"
                />
                <Card.Body>
                  <Card.Title>Suite Room</Card.Title>
                  <Card.Text>
                    A luxurious private suite with extra space and premium
                    amenities.
                  </Card.Text>
                  <ul>
                    <li>Bed size: King</li>
                    <li>Furniture: Desk, chair, wardrobe, sofa</li>
                    <li>Air Conditioning</li>
                    <li>High-speed Wi-Fi</li>
                  </ul>
                  <p className="price">$600 / month</p>
                  <Link to="/member">
                    <Button variant="primary" className="w-100">
                      Apply Now
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Home
