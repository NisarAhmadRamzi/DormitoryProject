import CountUp from 'react-countup'
import { useTranslation } from 'react-i18next'
import {
  FaBed,
  FaDumbbell,
  FaShieldAlt,
  FaUsers,
  FaUtensils,
  FaWifi,
} from 'react-icons/fa'
import { useInView } from 'react-intersection-observer'
import hero from '../../../../public/hero7.webp'
import Footer from '../../components/Footer'
import MyNavbar from '../../components/MyNavbar'
import './Home.css'

function Home() {
  const { t } = useTranslation()
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

        {/* About Section */}
        <section id="about">
          <h1 style={{ color: 'black', textAlign: 'center' }}>{t('title')}</h1>
          <div className="container">
            <div className="row justify-content-center align-items-center">
              <div className="col-lg-5 py-5">
                <div className="row g-4">
                  <div className="col-12">
                    <div className="info-box d-flex align-items-start gap-3">
                      <FaWifi
                        style={{ width: '50px', height: '50px', color: 'blue' }}
                      />
                      <div>
                        <h5>{t('wifiTitle')}</h5>
                        <p>{t('wifiDesc')}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="info-box d-flex align-items-start gap-3">
                      <FaUtensils
                        style={{ width: '50px', height: '50px', color: 'blue' }}
                      />
                      <div>
                        <h5>{t('mealsTitle')}</h5>
                        <p>{t('mealsDesc')}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="info-box d-flex align-items-start gap-3">
                      <FaBed
                        style={{ width: '50px', height: '50px', color: 'blue' }}
                      />
                      <div>
                        <h5>{t('bedTitle')}</h5>
                        <p>{t('bedDesc')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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

        {/* Milestones */}
        <section id="milestone" ref={ref}>
          <div className="container">
            <div className="row text-center justify-content-center gy-4">
              <div className="col-lg-2 col-sm-6">
                <h1 className="display-4">
                  {inView && <CountUp end={900} duration={2} separator="," />}+
                </h1>
                <p className="mb-0">{t('milestone1')}</p>
              </div>
              <div className="col-lg-2 col-sm-6">
                <h1 className="display-4">
                  {inView && (
                    <CountUp end={4500} duration={2.5} separator="," />
                  )}
                </h1>
                <p className="mb-0">{t('milestone2')}</p>
              </div>
              <div className="col-lg-2 col-sm-6">
                <h1 className="display-4">
                  {inView && <CountUp end={190} duration={1.5} />}
                </h1>
                <p className="mb-0">{t('milestone3')}</p>
              </div>
              <div className="col-lg-2 col-sm-6">
                <h1 className="display-4">
                  {inView && <CountUp end={3800} duration={2} separator="," />}
                </h1>
                <p className="mb-0">{t('milestone4')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Facilities */}
        <div className="row g-4" id="facilities">
          <div className="intro">
            <h1>{t('facilitiesTitle')}</h1>
            <p className="mx-auto text-dark">{t('facilitiesDesc')}</p>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="service text-center">
              <FaBed size={48} className="mb-3" style={{ color: 'blue' }} />
              <h5>{t('bedTitle')}</h5>
              <p>{t('bedDesc')}</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="service text-center">
              <FaWifi size={48} className="mb-3" style={{ color: 'blue' }} />
              <h5>{t('wifiTitle')}</h5>
              <p>{t('wifiDesc')}</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="service text-center">
              <FaDumbbell
                size={48}
                className="mb-3"
                style={{ color: 'blue' }}
              />
              <h5>{t('fitness')}</h5>
              <p>{t('fitnessDesc')}</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="service text-center">
              <FaUtensils
                size={48}
                className="mb-3"
                style={{ color: 'blue' }}
              />
              <h5>{t('dining')}</h5>
              <p>{t('diningDesc')}</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="service text-center">
              <FaUsers size={48} className="mb-3" style={{ color: 'blue' }} />
              <h5>{t('events')}</h5>
              <p>{t('eventsDesc')}</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="service text-center">
              <FaShieldAlt
                size={48}
                className="mb-3"
                style={{ color: 'blue' }}
              />
              <h5>{t('security')}</h5>
              <p>{t('securityDesc')}</p>
            </div>
          </div>
        </div>

        {/* Contact Modal */}
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
                          <h1>{t('contactTitle')}</h1>
                          <p>{t('contactSub')}</p>
                        </div>
                        <div className="col-lg-6">
                          <label htmlFor="userName" className="form-label">
                            {t('firstName')}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={t('firstNamePlaceholder')}
                            id="userName"
                          />
                        </div>
                        <div className="col-lg-6">
                          <label htmlFor="userName" className="form-label">
                            {t('lastName')}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={t('lastNamePlaceholder')}
                            id="userName"
                          />
                        </div>
                        <div className="col-12">
                          <label htmlFor="email" className="form-label">
                            {t('email')}
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder={t('emailPlaceholder')}
                            id="email"
                          />
                        </div>
                        <div className="col-12">
                          <label htmlFor="message" className="form-label">
                            {t('message')}
                          </label>

                          <textarea
                            placeholder={t('messagePlaceholder')}
                            className="form-control"
                            id="message"
                            rows={4}
                          />
                        </div>
                        <div className="col-12">
                          <button type="submit" className="btn btn-brand">
                            {t('sendMessage')}
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

        <Footer />
      </div>
    </>
  )
}

export default Home
