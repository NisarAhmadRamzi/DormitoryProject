// import React from "react";
// import Footer from "../../components/footer/Footer";
// import "./Home.css";
// import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import Loading from "../../components/loading/Loading";
// function Home() {
//     return (
//         <>
//             <section className="hero">
//                 <div className="hero-container">
//                     <div className="hero-text">
//                         <h1>Your Comfortable Home Away from Home</h1>
//                         <p className="subheadline">
//                             Modern Rooms. Exclusive Amenities. Prime Location.
//                         </p>
//                         <div className="cta-buttons">
//                             <Link to="/member">
//                                 <Button variant="primary">Apply Now</Button>
//                             </Link>
//                             <Button href="#tour" className="btn btn-secondary">
//                                 Book a Tour
//                             </Button>
//                         </div>
//                         <div className="social-proof">
//                             <p>
//                                 <i className="fas fa-quote-left"></i> "Best dorm
//                                 experience I’ve had. Great community and
//                                 fantastic amenities!" - John D.
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             <section id="about" className="about-section py-5">
//                 <Container>
//                     {/* About Header */}
//                     <div className="text-center mb-5">
//                         <h2 className="display-4 text-primary">
//                             About Our Dormitory
//                         </h2>
//                         <p className="lead text-muted">
//                             Your Comfortable Home Away from Home
//                         </p>
//                     </div>

//                     {/* Overview */}
//                     <Row className="mb-5">
//                         <Col md={6}>
//                             <h3 className="text-success">Why Choose Us?</h3>
//                             <p>
//                                 Our dormitory offers a modern and secure living
//                                 space for students. Located near the campus with
//                                 easy access to transportation, we provide fully
//                                 furnished private and shared rooms. Enjoy
//                                 high-speed internet, top-notch amenities, and a
//                                 vibrant community. Whether you're looking for
//                                 peace and quiet or social interaction, we have
//                                 something for everyone.
//                             </p>
//                         </Col>
//                         <Col md={6}>
//                             <img
//                                 src="https://png.pngtree.com/thumb_back/fh260/background/20230711/pngtree-contemporary-dorm-room-3d-render-of-grey-wall-yellow-bookcase-twin-image_3834185.jpg"
//                                 alt="Dormitory Image"
//                                 className="img-fluid rounded shadow-sm"
//                             />
//                         </Col>
//                     </Row>

//                     {/* Highlight Features */}
//                     <Row>
//                         <Col md={4}>
//                             <Card className="shadow-sm mb-4">
//                                 <Card.Body>
//                                     <h5 className="text-primary">Security</h5>
//                                     <p>
//                                         24/7 surveillance, keycard access, and
//                                         on-site security for your peace of mind.
//                                     </p>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                         <Col md={4}>
//                             <Card className="shadow-sm mb-4">
//                                 <Card.Body>
//                                     <h5 className="text-primary">
//                                         High-Speed Internet
//                                     </h5>
//                                     <p>
//                                         Stay connected with high-speed Wi-Fi in
//                                         your room and common areas.
//                                     </p>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                         <Col md={4}>
//                             <Card className="shadow-sm mb-4">
//                                 <Card.Body>
//                                     <h5 className="text-primary">
//                                         Private & Shared Rooms
//                                     </h5>
//                                     <p>
//                                         Choose between private or shared rooms,
//                                         both fully furnished for comfort.
//                                     </p>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                     </Row>

//                     <Row>
//                         <Col md={4}>
//                             <Card className="shadow-sm mb-4">
//                                 <Card.Body>
//                                     <h5 className="text-primary">
//                                         Utilities & Amenities
//                                     </h5>
//                                     <p>
//                                         On-site laundry, dining areas, study
//                                         lounges, and more to make your life
//                                         easier.
//                                     </p>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                         <Col md={4}>
//                             <Card className="shadow-sm mb-4">
//                                 <Card.Body>
//                                     <h5 className="text-primary">
//                                         Prime Location
//                                     </h5>
//                                     <p>
//                                         Located close to the campus and public
//                                         transport, making commuting a breeze.
//                                     </p>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                     </Row>
//                 </Container>
//             </section>

//             <section id="available-rooms" className="available-rooms py-5">
//                 <Container>
//                     {/* Section Header */}
//                     <div className="text-center mb-5">
//                         <h2 className="display-4 text-primary">
//                             Available Rooms & Pricing
//                         </h2>
//                         <p className="lead text-muted">
//                             Find the perfect room for your needs at affordable
//                             prices.
//                         </p>
//                     </div>

//                     {/* Room Types and Pricing */}
//                     <Row>
//                         {/* Single Room */}
//                         <Col md={4} sm={6} className="mb-4">
//                             <Card className="room-card shadow-sm">
//                                 <Card.Img
//                                     variant="top"
//                                     src="https://img.freepik.com/premium-photo/living-room-modern-apartment-with-two-identical-sofas-opposite-each-other_974732-5779.jpg"
//                                     alt="Single Room"
//                                     className="card-img"
//                                 />
//                                 <Card.Body>
//                                     <Card.Title>Single Room</Card.Title>
//                                     <Card.Text>
//                                         A private room for one with all the
//                                         essentials you need.
//                                     </Card.Text>
//                                     <ul>
//                                         <li>Bed size: Full</li>
//                                         <li>
//                                             Furniture: Desk, chair, wardrobe
//                                         </li>
//                                         <li>Air Conditioning</li>
//                                         <li>High-speed Wi-Fi</li>
//                                     </ul>
//                                     <p className="price">$400 / month</p>
//                                     <Link to="/member">
//                                         <Button variant="primary">
//                                             Apply Now
//                                         </Button>
//                                     </Link>
//                                 </Card.Body>
//                             </Card>
//                         </Col>

//                         {/* Shared Room */}
//                         <Col md={4} sm={6} className="mb-4">
//                             <Card className="room-card shadow-sm">
//                                 <Card.Img
//                                     variant="top"
//                                     src="https://img.freepik.com/premium-photo/black-contemporary-loft-living-room-interior-mock-up-featuring-sofa-accessories_872147-4035.jpg"
//                                     alt="Shared Room"
//                                     className="card-img"
//                                 />
//                                 <Card.Body>
//                                     <Card.Title>Shared Room</Card.Title>
//                                     <Card.Text>
//                                         Share a spacious room with one or more
//                                         roommates.
//                                     </Card.Text>
//                                     <ul>
//                                         <li>Bed size: Twin</li>
//                                         <li>
//                                             Furniture: Desk, chair, wardrobe
//                                         </li>
//                                         <li>Air Conditioning</li>
//                                         <li>High-speed Wi-Fi</li>
//                                     </ul>
//                                     <p className="price">
//                                         $300 / month per person
//                                     </p>
//                                     <Link to="/member">
//                                         <Button variant="primary">
//                                             Apply Now
//                                         </Button>
//                                     </Link>
//                                 </Card.Body>
//                             </Card>
//                         </Col>

//                         {/* Suite Room */}
//                         <Col md={4} sm={6} className="mb-4">
//                             <Card className="room-card shadow-sm">
//                                 <Card.Img
//                                     variant="top"
//                                     src="https://www.shutterstock.com/image-illustration/corner-view-on-dark-living-260nw-2197571973.jpg"
//                                     alt="Suite Room"
//                                     className="card-img"
//                                 />
//                                 <Card.Body>
//                                     <Card.Title>Suite Room</Card.Title>
//                                     <Card.Text>
//                                         A luxurious private suite with extra
//                                         space and premium amenities.
//                                     </Card.Text>
//                                     <ul>
//                                         <li>Bed size: King</li>
//                                         <li>
//                                             Furniture: Desk, chair, wardrobe,
//                                             sofa
//                                         </li>
//                                         <li>Air Conditioning</li>
//                                         <li>High-speed Wi-Fi</li>
//                                     </ul>
//                                     <p className="price">$600 / month</p>
//                                     <Link to="/member">
//                                         <Button variant="primary">
//                                             Apply Now
//                                         </Button>
//                                     </Link>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                     </Row>
//                 </Container>
//             </section>

//             {/* Student Life and Events */}
//             <section id="student-life" className="student-life py-5">
//                 <Container>
//                     {/* Section Header */}
//                     <div className="text-center mb-5">
//                         <h2 className="display-4 text-primary">
//                             Student Life & Events
//                         </h2>
//                         <p className="lead text-muted">
//                             Engage with fellow students, participate in exciting
//                             events, and enjoy a vibrant community.
//                         </p>
//                     </div>

//                     {/* Activities and Social Events */}
//                     <Row className="mb-4">
//                         <Col md={6}>
//                             <h3 className="text-center">
//                                 Activities & Social Events
//                             </h3>
//                             <p>
//                                 Our dormitory offers a range of fun and engaging
//                                 activities, from movie nights to study groups.
//                                 Whether you're looking for relaxation or
//                                 productivity, there's always something
//                                 happening.
//                             </p>
//                             <ul>
//                                 <li>Weekly Movie Nights</li>
//                                 <li>Study Groups and Academic Support</li>
//                                 <li>Fitness and Yoga Sessions</li>
//                                 <li>Game Nights & Social Gatherings</li>
//                             </ul>
//                         </Col>
//                         <Col md={6}>
//                             <h3 className="text-center">Community & Support</h3>
//                             <p>
//                                 At our dorm, you're not just a resident; you're
//                                 part of a thriving community. We offer support
//                                 through Resident Assistants (RAs), peer
//                                 mentoring, and a variety of social spaces like
//                                 study lounges to foster collaboration and
//                                 friendships.
//                             </p>
//                         </Col>
//                     </Row>

//                     {/* Gallery or Testimonials (Carousel) */}
//                     <div className="text-center mb-5">
//                         <h3>Gallery of Events</h3>
//                         <Carousel>
//                             <Carousel.Item>
//                                 <img
//                                     className="d-block w-100"
//                                     src="https://media.istockphoto.com/id/945296406/photo/charming-bedroom-features-white-walls.webp?a=1&b=1&s=612x612&w=0&k=20&c=FYfkZUWE5cOebMFyk8ZSrdSdVyj87fnxiokqIobl9Gg="
//                                     alt="Movie Night"
//                                 />
//                                 <Carousel.Caption>
//                                     <h5>Movie Night with Friends</h5>
//                                     <p>
//                                         Enjoying a cozy movie night in the
//                                         lounge with friends.
//                                     </p>
//                                 </Carousel.Caption>
//                             </Carousel.Item>
//                             <Carousel.Item>
//                                 <img
//                                     className="d-block w-100"
//                                     src="https://media.istockphoto.com/id/155151764/photo/empty-frame-on-wall.webp?a=1&b=1&s=612x612&w=0&k=20&c=f2xXplOj26Ga906J8MlVBmv3eyKzvJjP1Cx4gtRLT1s="
//                                     alt="Study Group"
//                                 />
//                                 <Carousel.Caption>
//                                     <h5>Study Group Session</h5>
//                                     <p>
//                                         Collaborating in study groups to ace our
//                                         exams together.
//                                     </p>
//                                 </Carousel.Caption>
//                             </Carousel.Item>
//                             <Carousel.Item>
//                                 <img
//                                     className="d-block w-100"
//                                     src="https://media.istockphoto.com/id/487046541/photo/beautiful-hallway-in-hotel.webp?a=1&b=1&s=612x612&w=0&k=20&c=GJoy-eOaq_EoDn1e_hHsUbra9RHjBYdRYSR9NEvCUiU="
//                                     alt="Game Night"
//                                 />
//                                 <Carousel.Caption>
//                                     <h5>Game Night</h5>
//                                     <p>
//                                         A fun-filled night of games and laughter
//                                         with fellow students.
//                                     </p>
//                                 </Carousel.Caption>
//                             </Carousel.Item>
//                         </Carousel>
//                     </div>

//                     {/* Call to Action Button */}
//                     <div className="text-center">
//                         <Button variant="primary" href="/member">
//                             Join Our Community
//                         </Button>
//                     </div>
//                 </Container>
//             </section>

//             <Footer />
//         </>
//     );
// }

// export default Home;

import React, { useState, useEffect } from "react";
import Footer from "../../components/footer/Footer";
import "./Home.css";
import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../../components/loading/Loading";

function Home() {
    // State to handle loading
    const [loading, setLoading] = useState(true);

    // Simulate a loading delay (e.g., data fetching or processing)
    useEffect(() => {
        // Simulate fetching data (replace with your actual data-fetching logic)
        const timer = setTimeout(() => {
            setLoading(false); // Data is loaded after 3 seconds
        });

        // Clean up the timer on component unmount
        return () => clearTimeout(timer);
    }, []);

    // If loading is true, show the Loading component, otherwise show the page content
    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <section className="hero">
                <div className="hero-container">
                    <div className="hero-text">
                        <h1>Your Comfortable Home Away from Home</h1>
                        <p className="subheadline">
                            Modern Rooms. Exclusive Amenities. Prime Location.
                        </p>
                        <div className="cta-buttons">
                            <Link to="/member">
                                <Button variant="primary">Apply Now</Button>
                            </Link>
                            <Button href="#tour" className="btn btn-secondary">
                                Book a Tour
                            </Button>
                        </div>
                        <div className="social-proof">
                            <p>
                                <i className="fas fa-quote-left"></i> "Best dorm
                                experience I’ve had. Great community and
                                fantastic amenities!" - John D.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="about" className="about-section py-5">
                <Container>
                    {/* About Header */}
                    <div className="text-center mb-5">
                        <h2 className="display-4 text-primary">
                            About Our Dormitory
                        </h2>
                        <p className="lead text-muted">
                            Your Comfortable Home Away from Home
                        </p>
                    </div>

                    {/* Overview */}
                    <Row className="mb-5">
                        <Col md={6}>
                            <h3 className="text-success">Why Choose Us?</h3>
                            <p>
                                Our dormitory offers a modern and secure living
                                space for students. Located near the campus with
                                easy access to transportation, we provide fully
                                furnished private and shared rooms. Enjoy
                                high-speed internet, top-notch amenities, and a
                                vibrant community. Whether you're looking for
                                peace and quiet or social interaction, we have
                                something for everyone.
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
                                        24/7 surveillance, keycard access, and
                                        on-site security for your peace of mind.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="shadow-sm mb-4">
                                <Card.Body>
                                    <h5 className="text-primary">
                                        High-Speed Internet
                                    </h5>
                                    <p>
                                        Stay connected with high-speed Wi-Fi in
                                        your room and common areas.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="shadow-sm mb-4">
                                <Card.Body>
                                    <h5 className="text-primary">
                                        Private & Shared Rooms
                                    </h5>
                                    <p>
                                        Choose between private or shared rooms,
                                        both fully furnished for comfort.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <Card className="shadow-sm mb-4">
                                <Card.Body>
                                    <h5 className="text-primary">
                                        Utilities & Amenities
                                    </h5>
                                    <p>
                                        On-site laundry, dining areas, study
                                        lounges, and more to make your life
                                        easier.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="shadow-sm mb-4">
                                <Card.Body>
                                    <h5 className="text-primary">
                                        Prime Location
                                    </h5>
                                    <p>
                                        Located close to the campus and public
                                        transport, making commuting a breeze.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section id="available-rooms" className="available-rooms py-5">
                <Container>
                    {/* Section Header */}
                    <div className="text-center mb-5">
                        <h2 className="display-4 text-primary">
                            Available Rooms & Pricing
                        </h2>
                        <p className="lead text-muted">
                            Find the perfect room for your needs at affordable
                            prices.
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
                                        A private room for one with all the
                                        essentials you need.
                                    </Card.Text>
                                    <ul>
                                        <li>Bed size: Full</li>
                                        <li>
                                            Furniture: Desk, chair, wardrobe
                                        </li>
                                        <li>Air Conditioning</li>
                                        <li>High-speed Wi-Fi</li>
                                    </ul>
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
                                        Share a spacious room with one or more
                                        roommates.
                                    </Card.Text>
                                    <ul>
                                        <li>Bed size: Twin</li>
                                        <li>
                                            Furniture: Desk, chair, wardrobe
                                        </li>
                                        <li>Air Conditioning</li>
                                        <li>High-speed Wi-Fi</li>
                                    </ul>
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
                                        A luxurious private suite with extra
                                        space and premium amenities.
                                    </Card.Text>
                                    <ul>
                                        <li>Bed size: King</li>
                                        <li>
                                            Furniture: Desk, chair, wardrobe,
                                            sofa
                                        </li>
                                        <li>Air Conditioning</li>
                                        <li>High-speed Wi-Fi</li>
                                    </ul>
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

export default Home;
