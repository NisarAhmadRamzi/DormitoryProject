import React from "react";
import "./View_Dorm.css";
import Footer from "../../components/footer/Footer";
import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function View_Dorm() {
    return (
        <>
            <section className="hero py-5 bg-primary text-white text-center">
                <div className="container">
                    <h1 className="display-4">Welcome to Our Dormitory</h1>
                    <p className="lead">
                        Your comfortable home away from home with modern
                        amenities.
                    </p>
                    <Button variant="light" href="#features" className="mt-3">
                        Explore Features
                    </Button>
                </div>
            </section>

            {/* Dormitory Features Section */}
            <section id="features" className="features py-5">
                <Container>
                    <div className="text-center mb-5">
                        <h2 className="display-4 text-primary">
                            Why Choose Our Dorm?
                        </h2>
                        <p className="lead text-muted">
                            Modern living spaces, community, and convenience all
                            in one.
                        </p>
                    </div>

                    <Row>
                        <Col md={4} sm={6} className="mb-4">
                            <Card className="box-shadow1">
                                <Card.Body>
                                    <h5 className="text-success">Security</h5>
                                    <p>
                                        24/7 surveillance, keycard access, and
                                        on-site security ensure your safety.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4} sm={6} className="mb-4">
                            <Card className="box-shadow1">
                                <Card.Body>
                                    <h5 className="text-success">
                                        High-Speed Internet
                                    </h5>
                                    <p>
                                        Stay connected with fast Wi-Fi available
                                        in all rooms and common areas.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4} sm={6} className="mb-4">
                            <Card className="box-shadow1">
                                <Card.Body>
                                    <h5 className="text-success">
                                        Prime Location
                                    </h5>
                                    <p>
                                        Located near campus and public transport
                                        for easy access.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4} sm={6} className="mb-4">
                            <Card className="box-shadow1">
                                <Card.Body>
                                    <h5 className="text-success">
                                        Private & Shared Rooms
                                    </h5>
                                    <p>
                                        Choose between private and shared rooms
                                        with all necessary amenities.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4} sm={6} className="mb-4">
                            <Card className="box-shadow1">
                                <Card.Body>
                                    <h5 className="text-success">
                                        Utilities & Amenities
                                    </h5>
                                    <p>
                                        Laundry, dining areas, study lounges,
                                        and more available on-site.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Room Carousel Section */}
            <section className="room-carousel py-5">
                <Container>
                    <div className="text-center mb-5">
                        <h2 className="display-4 text-primary">Our Rooms</h2>
                        <p className="lead text-muted">
                            A variety of room options to suit your needs and
                            preferences.
                        </p>
                    </div>

                    <Carousel>
                        {/* Single Room */}
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://media.istockphoto.com/id/1318363878/photo/luxury-modern-bedroom-interior-at-night.jpg?s=612x612&w=0&k=20&c=riYXhwiUWYzqv7iA060mb14a5b7QdjZhUeqoyNoyyts="
                                alt="Single Room"
                            />
                            <Carousel.Caption>
                                <h3>Single Room</h3>
                                <p>
                                    Enjoy privacy in our fully furnished single
                                    rooms with all essentials.
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>

                        {/* Shared Room */}
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://media.istockphoto.com/id/1454697447/photo/black-luxury-modern-retro-style-master-bedroom.jpg?s=612x612&w=0&k=20&c=zWXMq8oEAx5cSIF88bqiizwqAyeDmO9ihZyTlOFpHQQ="
                                alt="Shared Room"
                            />
                            <Carousel.Caption>
                                <h3>Shared Room</h3>
                                <p>
                                    Share a spacious room with fellow students
                                    while enjoying all modern comforts.
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>

                        {/* Suite Room */}
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://c4.wallpaperflare.com/wallpaper/159/802/513/room-interior-home-house-wallpaper-preview.jpg"
                                alt="Suite Room"
                            />
                            <Carousel.Caption>
                                <h3>Suite Room</h3>
                                <p>
                                    Experience luxury and comfort in our premium
                                    suite rooms with extra space.
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Container>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="pricing py-5 bg-light">
                <Container>
                    <div className="text-center mb-5">
                        <h2 className="display-4 text-primary">
                            Affordable Pricing
                        </h2>
                        <p className="lead text-muted">
                            Get great value for money with our competitive
                            pricing.
                        </p>
                    </div>

                    <Row>
                        {/* Single Room */}
                        <Col md={4} sm={6} className="mb-4">
                            <Card className="shadow-sm">
                                <Card.Img
                                    variant="top"
                                    src="https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4="
                                />
                                <Card.Body>
                                    <Card.Title>Single Room</Card.Title>
                                    <Card.Text>
                                        A private room for one, perfect for
                                        students seeking solitude.
                                    </Card.Text>
                                    <p className="price">$400 / month</p>
                                    <Link to="/member">
                                        <Button variant="primary">
                                            Apply Now
                                        </Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Shared Room */}
                        <Col md={4} sm={6} className="mb-4">
                            <Card className="shadow-sm">
                                <Card.Img
                                    variant="top"
                                    src="https://images.assetsdelivery.com/compings_v2/elnur/elnur1708/elnur170802371.jpg"
                                />
                                <Card.Body>
                                    <Card.Title>Shared Room</Card.Title>
                                    <Card.Text>
                                        Share a room with one or more roommates
                                        for a budget-friendly option.
                                    </Card.Text>
                                    <p className="price">
                                        $300 / month per person
                                    </p>
                                    <Link to="/member">
                                        <Button variant="primary">
                                            Apply Now
                                        </Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Suite Room */}
                        <Col md={4} sm={6} className="mb-4">
                            <Card className="shadow-sm">
                                <Card.Img
                                    variant="top"
                                    src="https://w0.peakpx.com/wallpaper/424/341/HD-wallpaper-luxury-hotel-living-room-hotels-living-room-suites-architecture-interior-design.jpg"
                                />
                                <Card.Body>
                                    <Card.Title>Suite Room</Card.Title>
                                    <Card.Text>
                                        Enjoy a luxurious suite with all premium
                                        amenities for added comfort.
                                    </Card.Text>
                                    <p className="price">$600 / month</p>
                                    <Link to="/member">
                                        <Button variant="primary">
                                            Apply Now
                                        </Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Footer />
        </>
    );
}

export default View_Dorm;
