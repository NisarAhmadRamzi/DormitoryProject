// import '../pages/home/Home'

// import { FaXTwitter } from 'react-icons/fa6'

// const Footer = () => {
//   return (
//     <footer>
//       <div className="footer-top text-center">
//         <div className="container">
//           <div className="row justify-content-center">
//             <div className="col-lg-6 text-center">
//               <h4 className="navbar-brand">
//                 Fanos Dormitory<span className="dot">.</span>
//               </h4>
//               <p>
//                 Contrary to popular belief, Lorem Ipsum is not simply random
//                 text. It has roots in a piece of classical Latin literature from
//               </p>
//               <div className="col-auto social-icons">
//                 <a href="#">
//                   <i className="bx bxl-facebook" />
//                 </a>
//                 <a href="#">
//                   <FaXTwitter />
//                 </a>
//                 <a href="#">
//                   <i className="bx bxl-instagram" />
//                 </a>
//                 <a href="#">
//                   <i className="bx bxl-pinterest" />
//                 </a>
//               </div>
//               <div className="col-auto conditions-section">
//                 <a href="#">privacy</a>
//                 <a href="#">terms</a>
//                 <a href="#">disclaimer</a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }

// export default Footer

import { useTranslation } from 'react-i18next'
import { FaXTwitter } from 'react-icons/fa6'
import '../pages/home/Home'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer>
      <div className="footer-top text-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 text-center">
              <h4 className="navbar-brand">
                {t('dormName')}
                <span className="dot">.</span>
              </h4>
              <p>{t('footerDescription')}</p>

              <div className="col-auto social-icons">
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

              <div className="col-auto conditions-section">
                <a href="#">{t('privacy')}</a>
                <a href="#">{t('terms')}</a>
                <a href="#">{t('disclaimer')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
