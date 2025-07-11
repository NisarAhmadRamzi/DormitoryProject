import './Home.css'

import {
  FaBed,
  FaDumbbell,
  FaShieldAlt,
  FaUsers,
  FaUtensils,
  FaWifi,
} from 'react-icons/fa'

import CountUp from 'react-countup'
import { FaXTwitter } from 'react-icons/fa6'
import { useInView } from 'react-intersection-observer'
import hero from '../../../../public/hero7.webp'
import Footer from '../../components/Footer'
import MyNavbar from '../../components/MyNavbar'

function Home() {
  const { ref, inView } = useInView({ triggerOnce: true })
  return (
    <>
      <div>
        <MyNavbar />
        {/* HERO SECTION */}
        <section
          id="home"
          className="hero-section"
          style={{
            backgroundImage: `url(${hero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div className="container">
            <div className="row"></div>
          </div>
        </section>
        {/* About */}
        <section id="about">
          <h1 style={{ color: 'black', textAlign: 'center' }}>
            About our dormitory
          </h1>
          <div className="container">
            <div className="row justify-content-center align-items-center">
              {/* Left Content */}
              <div className="col-lg-5 py-5">
                <div className="row">
                  <div className="col-12">
                    <div className="info-box">
                      <FaWifi
                        style={{ width: '50px', height: '50px', color: 'blue' }}
                      />
                      <div className="ms-4">
                        <h5>High-Speed Wi-Fi</h5>
                        <p>
                          Reliable internet throughout the dormitory for all
                          residents.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 mt-4">
                    <div className="info-box">
                      <FaUtensils
                        style={{ width: '50px', height: '50px', color: 'blue' }}
                      />
                      <div className="ms-4">
                        <h5>Meal Services</h5>
                        <p>
                          Nutritious daily meals prepared with student health in
                          mind.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 mt-4">
                    <div className="info-box">
                      <FaBed
                        style={{ width: '50px', height: '50px', color: 'blue' }}
                      />
                      <div className="ms-4">
                        <h5>Comfortable Rooms</h5>
                        <p>
                          Furnished rooms with essential amenities for studying
                          and resting.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Image */}
              <div className="col-lg-5">
                <img
                  src="img/about.png"
                  alt="About Dormitory"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </section>
        {/* MILESTONE */}
        <section id="milestone" ref={ref}>
          <div className="container">
            <div className="row text-center justify-content-center gy-4">
              <div className="col-lg-2 col-sm-6">
                <h1 className="display-4">
                  {inView && <CountUp end={900} duration={2} separator="," />}+
                </h1>
                <p className="mb-0">Current Residents</p>
              </div>
              <div className="col-lg-2 col-sm-6">
                <h1 className="display-4">
                  {inView && (
                    <CountUp end={4500} duration={2.5} separator="," />
                  )}
                </h1>
                <p className="mb-0">Total Nights Booked</p>
              </div>
              <div className="col-lg-2 col-sm-6">
                <h1 className="display-4">
                  {inView && <CountUp end={190} duration={1.5} />}
                </h1>
                <p className="mb-0">Rooms Available</p>
              </div>
              <div className="col-lg-2 col-sm-6">
                <h1 className="display-4">
                  {inView && <CountUp end={3800} duration={2} separator="," />}
                </h1>
                <p className="mb-0">Guests Hosted</p>
              </div>
            </div>
          </div>
        </section>
        <div className="row g-4" id="facilities">
          <div className="intro">
            <h1>Our Facilities</h1>
            <p className="mx-auto text-dark">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old
            </p>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="service text-center">
              <FaBed size={48} className="mb-3" style={{ color: 'blue' }} />
              <h5>Comfortable Rooms</h5>
              <p>
                Spacious, well-furnished rooms designed for a relaxing stay.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="service text-center">
              <FaWifi size={48} className="mb-3" style={{ color: 'blue' }} />
              <h5>High-Speed Wi-Fi</h5>
              <p>
                Reliable internet access throughout the dormitory to keep you
                connected.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="service text-center">
              <FaDumbbell
                size={48}
                className="mb-3"
                style={{ color: 'blue' }}
              />
              <h5>Fitness Center</h5>
              <p>
                Fully equipped gym to maintain your fitness routine on campus.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="service text-center">
              <FaUtensils
                size={48}
                className="mb-3"
                style={{ color: 'blue' }}
              />
              <h5>Dining Hall</h5>
              <p>Healthy and delicious meals served daily for all residents.</p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="service text-center">
              <FaUsers size={48} className="mb-3" style={{ color: 'blue' }} />
              <h5>Community Events</h5>
              <p>
                Regular social activities to build friendships and a vibrant
                community.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="service text-center">
              <FaShieldAlt
                size={48}
                className="mb-3"
                style={{ color: 'blue' }}
              />
              <h5>24/7 Security</h5>
              <p>Round-the-clock safety measures to ensure peace of mind.</p>
            </div>
          </div>
        </div>
        <section id="rooms">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="intro">
                  <h1>Available Dormitory Rooms</h1>
                  <p className="mx-auto text-dark">
                    Choose from our range of comfortable rooms equipped with all
                    the essentials for a pleasant stay.
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <article className="room-card my-3">
                  <img src="img/project5.jpg" alt="Dorm Room 1" />
                  <div className="content">
                    <h5 className="text-dark">Single Room</h5>
                    <p className="text-dark">
                      Cozy single room with private bathroom, desk, and
                      wardrobe.
                    </p>
                    <ul>
                      <li>Price: $350/month</li>
                      <li>Wi-Fi included</li>
                      <li>24/7 Security</li>
                    </ul>
                    <a href="#" className="btn btn-primary mx-4 my-3">
                      Book Now
                    </a>
                  </div>
                </article>
              </div>
              <div className="col-md-4">
                <article className="room-card my-3">
                  <img src="img/project4.jpg" alt="Dorm Room 2" />
                  <div className="content">
                    <h5 className="text-dark">Double Room</h5>
                    <p className="text-dark">
                      Spacious double room suitable for two residents, shared
                      bathroom.
                    </p>
                    <ul>
                      <li>Price: $600/month</li>
                      <li>Wi-Fi included</li>
                      <li>Common lounge access</li>
                    </ul>
                    <a href="#" className="btn btn-primary mx-4 my-3">
                      Book Now
                    </a>
                  </div>
                </article>
              </div>
              <div className="col-md-4">
                <article className="room-card my-3">
                  <img src="img/project2.jpg" alt="Dorm Room 3" />
                  <div className="content">
                    <h5 className="text-dark">Suite Room</h5>
                    <p className="text-dark">
                      Luxury suite with private bathroom, kitchenette, and study
                      area.
                    </p>
                    <ul>
                      <li>Price: $900/month</li>
                      <li>Wi-Fi included</li>
                      <li>Private balcony</li>
                    </ul>
                    <a href="#" className="btn btn-primary mx-4 my-3">
                      Book Now
                    </a>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
        {/* staff */}
        <section id="staff">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="intro">
                  <h1>Dormitory staff</h1>
                  <p className="mx-auto text-dark">
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from 45 BC, making it over 2000 years old
                  </p>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-8">
                <div className="team-member">
                  <div className="image">
                    <img src="img/team_1.jpg" alt />
                    <div className="social-icons">
                      <a href="#">
                        <i className="bx bxl-facebook" />
                      </a>
                      <a href="#">
                        <FaXTwitter />
                      </a>
                      <a href="#">
                        <i className="bx bxl-instagram" />
                      </a>
                      <a href="#">
                        <i className="bx bxl-pinterest" />
                      </a>
                    </div>
                    <div className="overlay" />
                  </div>
                  <h5 className="text-dark">Allama</h5>
                  <p className="text-dark">Fanos administrator</p>
                </div>
              </div>
              <div className="col-lg-4 col-md-8">
                <div className="team-member">
                  <div className="image">
                    <img src="img/team_2.jpg" alt />
                    <div className="social-icons">
                      <a href="#">
                        <i className="bx bxl-facebook" />
                      </a>
                      <a href="#">
                        <FaXTwitter />
                      </a>
                      <a href="#">
                        <i className="bx bxl-instagram" />
                      </a>
                      <a href="#">
                        <i className="bx bxl-pinterest" />
                      </a>
                    </div>
                    <div className="overlay" />
                  </div>
                  <h5 className="text-dark">Ali Karimi</h5>
                  <p className="text-dark">Financial Officer</p>
                </div>
              </div>
              <div className="col-lg-4 col-md-8">
                <div className="team-member">
                  <div className="image">
                    <img src="img/team_3.jpg" alt />
                    <div className="social-icons">
                      <a href="#">
                        <i className="bx bxl-facebook" />
                      </a>
                      <a href="#">
                        <FaXTwitter />
                      </a>
                      <a href="#">
                        <i className="bx bxl-instagram" />
                      </a>
                      <a href="#">
                        <i className="bx bxl-pinterest" />
                      </a>
                    </div>
                    <div className="overlay" />
                  </div>
                  <h5 className="text-dark">Dawood Rahimi</h5>
                  <p className="text-dark">Reporter</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
        {/* Modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content">
              <div className="modal-body p-0">
                <div className="container-fluid">
                  <div className="row gy-4">
                    <div
                      className="col-lg-4 col-sm-12 bg-cover"
                      style={{
                        backgroundImage: 'url(img/c2.jpg)',
                        minHeight: 300,
                      }}
                    >
                      <div></div>
                    </div>
                    <div className="col-lg-8">
                      <form className="p-lg-5 col-12 row g-3">
                        <div>
                          <h1>Get in touch</h1>
                          <p>
                            Fell free to contact us and we will get back to you
                            as soon as possible
                          </p>
                        </div>
                        <div className="col-lg-6">
                          <label htmlFor="userName" className="form-label">
                            First name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Jon"
                            id="userName"
                            aria-describedby="emailHelp"
                          />
                        </div>
                        <div className="col-lg-6">
                          <label htmlFor="userName" className="form-label">
                            Last name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Doe"
                            id="userName"
                            aria-describedby="emailHelp"
                          />
                        </div>
                        <div className="col-12">
                          <label htmlFor="userName" className="form-label">
                            Email address
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Johndoe@example.com"
                            id="userName"
                            aria-describedby="emailHelp"
                          />
                        </div>
                        <div className="col-12">
                          <label
                            htmlFor="exampleInputEmail1"
                            className="form-label"
                          >
                            Enter Message
                          </label>
                          <textarea
                            name
                            placeholder="This is looking great and nice."
                            className="form-control"
                            id
                            rows={4}
                            defaultValue={''}
                          />
                        </div>
                        <div className="col-12">
                          <button type="submit" className="btn btn-brand">
                            Send Message
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
