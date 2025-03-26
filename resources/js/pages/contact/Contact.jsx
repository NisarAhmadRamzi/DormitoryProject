import React, { useState } from "react";
import "./Contact.css";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import {
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkedAlt,
    FaFacebook,
    FaTwitter,
    FaInstagram,
} from "react-icons/fa";
import Footer from "../../components/footer/Footer";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [formError, setFormError] = useState(null);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple form validation
        if (!formData.name || !formData.email || !formData.message) {
            setFormError("Please fill in all the fields.");
        } else {
            setFormError(null);
            alert("Your message has been sent!");
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
            });
        }
    };

    return (
        <div className="contact-page">
            <Container>
                <h1 className="text-center my-5">Contact Us</h1>

                <Row className="mb-5">
                    <Col md={6}>
                        <h3>Get in Touch</h3>
                        <p>
                            If you have any questions or need assistance, please
                            feel free to contact us.
                        </p>

                        <Form onSubmit={handleSubmit}>
                            {formError && (
                                <div className="alert alert-danger">
                                    {formError}
                                </div>
                            )}

                            <Form.Group controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Your name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formEmail" className="mt-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Your email address"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group
                                controlId="formSubject"
                                className="mt-3"
                            >
                                <Form.Label>Subject</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Subject of your message"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group
                                controlId="formMessage"
                                className="mt-3"
                            >
                                <Form.Label>Message</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    placeholder="Your message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Button
                                variant="primary"
                                type="submit"
                                className="mt-3"
                            >
                                Send Message
                            </Button>
                        </Form>
                    </Col>

                    <Col md={6}>
                        <h3>Contact Details</h3>
                        <ul className="list-unstyled">
                            <li>
                                <FaPhoneAlt /> <strong>Phone:</strong> +123 456
                                7890
                            </li>
                            <li>
                                <FaEnvelope /> <strong>Email:</strong>{" "}
                                dormitory@example.com
                            </li>
                            <li>
                                <FaMapMarkedAlt /> <strong>Address:</strong> 123
                                Dormitory Street, City, Country
                            </li>
                        </ul>

                        <h3>Follow Us</h3>
                        <div className="social-links">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon"
                            >
                                <FaFacebook size={30} />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon"
                            >
                                <FaTwitter size={30} />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon"
                            >
                                <FaInstagram size={30} />
                            </a>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h3>Location</h3>
                        {/* Embed a Google Maps iframe (you can get this from Google Maps sharing options) */}
                        <div className="map-container">
                            <iframe
                                title="dormitory-location"
                                src="https://www.google.com/maps/embed?pb=YOUR_GOOGLE_MAPS_EMBED_URL"
                                width="100%"
                                height="350"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
};

export default Contact;
