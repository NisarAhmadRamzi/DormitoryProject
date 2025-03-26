import React from "react";
import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./About.css"; // Make sure to add any custom styles in the CSS file
import Footer from "../../components/footer/Footer";

function About() {
    return (
        <>
            <section id="about" className="about-section py-5">
                <Container>
                    {/* About Header */}
                    <div className="text-center mb-5">
                        <h2 className="display-4 text-primary">
                            About Our Dormitory
                        </h2>
                        <p className="lead text-muted">
                            A Safe, Modern, and Comfortable Place to Call Home
                        </p>
                    </div>

                    {/* Our Mission and Overview */}
                    <Row className="mb-5">
                        <Col md={6}>
                            <h3 className="text-success">Our Mission</h3>
                            <p>
                                We are dedicated to providing students with a
                                secure, affordable, and comfortable living
                                space. Our mission is to create a supportive
                                environment where students can focus on their
                                studies, build connections, and thrive.
                            </p>
                            {/* Updated Apply Now Button with React Router Link */}
                            <Button variant="primary" as={Link} to="/member">
                                Apply Now
                            </Button>
                        </Col>
                        <Col md={6}>
                            <img
                                src="https://esg.hd.com/upload/admin/news/1712655213564/UP7460618F3CD04.jpg"
                                alt="Dormitory"
                                className="img-fluid rounded shadow-sm"
                            />
                        </Col>
                    </Row>

                    {/* Features and Highlights */}
                    <div className="text-center mb-5">
                        <h3 className="text-primary">Why Choose Us?</h3>
                        <p>
                            Discover why our dormitory stands out as the perfect
                            choice for students.
                        </p>
                    </div>

                    <Row>
                        <Col md={4}>
                            <Card className="shadow-sm mb-4 border-0">
                                <Card.Body>
                                    <h5 className="text-primary">Security</h5>
                                    <p>
                                        With 24/7 surveillance, secure keycard
                                        access, and on-site security, your
                                        safety is our priority.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="shadow-sm mb-4 border-0">
                                <Card.Body>
                                    <h5 className="text-primary">Community</h5>
                                    <p>
                                        Join a vibrant community of students,
                                        with regular events, social gatherings,
                                        and academic support.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="shadow-sm mb-4 border-0">
                                <Card.Body>
                                    <h5 className="text-primary">
                                        Modern Amenities
                                    </h5>
                                    <p>
                                        Enjoy high-speed internet, fitness
                                        centers, study lounges, and more, all at
                                        your fingertips.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    {/* Student Life Section */}
                    <div className="text-center mb-5">
                        <h3 className="text-success">Student Life & Events</h3>
                        <p>
                            We offer more than just a place to sleep. Our dorm
                            is an active hub with a variety of activities,
                            events, and a strong sense of community.
                        </p>
                    </div>

                    <Row>
                        <Col md={6}>
                            <h4 className="text-primary">
                                Activities & Social Events
                            </h4>
                            <ul>
                                <li>Weekly Movie Nights</li>
                                <li>Study Groups & Academic Support</li>
                                <li>Fitness & Yoga Classes</li>
                                <li>Game Nights & Socials</li>
                            </ul>
                        </Col>
                        <Col md={6}>
                            <h4 className="text-primary">
                                Support & Resources
                            </h4>
                            <ul>
                                <li>Resident Assistants (RAs) for support</li>
                                <li>Peer mentoring and academic tutoring</li>
                                <li>
                                    24/7 access to study lounges and kitchens
                                </li>
                            </ul>
                        </Col>
                    </Row>

                    {/* Call to Action */}
                    <div className="text-center mb-5">
                        <Button variant="primary" as={Link} to="/admin">
                            Join Our Community
                        </Button>
                    </div>
                </Container>
            </section>
            <Footer />
        </>
    );
}

export default About;
