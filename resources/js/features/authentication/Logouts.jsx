// import ButtonIcon from '../../ui/ButtonIcon'
// import { HiArrowRightOnRectangle } from 'react-icons/hi2'
// import SpinnerMini from '../../ui/SpinnerMini';
// import { useLogout } from './useLogouts'

// function Logouts() {
//  const {logout, isLoading}= useLogout();
//   return (
//     <ButtonIcon disabled = {isLoading} onClick={logout}>
//       {isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini/>}
//     </ButtonIcon>
//   )
// }

// export default Logouts

//v2

// import ButtonIcon from '../../ui/ButtonIcon'
// import { HiArrowRightOnRectangle } from 'react-icons/hi2'
// import SpinnerMini from '../../ui/SpinnerMini'
// import { useLogout } from './useLogouts'

// function Logouts() {
//   const { logout, isLoading } = useLogout()

//   return (
//     <ButtonIcon disabled={isLoading} onClick={logout}>
//       {isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
//     </ButtonIcon>
//   )
// }

// export default Logouts

//v3

// import ButtonIcon from '../../ui/ButtonIcon'
// import { HiArrowRightOnRectangle } from 'react-icons/hi2'
// import SpinnerMini from '../../ui/SpinnerMini'
// import { useLogout } from './useLogouts'

// function Logouts() {
//   // const { logout, isLoading } = useLogout()

//   return (
//     <ButtonIcon>
//       {/* {isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />} */}

//       <HiArrowRightOnRectangle />
//     </ButtonIcon>
//   )
// }

// export default Logouts

//v3

import ButtonIcon from '../../ui/ButtonIcon'
import { HiArrowRightOnRectangle } from 'react-icons/hi2'
import SpinnerMini from '../../ui/SpinnerMini'
import { useLogout } from './useLogout'

function Logouts() {
  const { logout, isLoading } = useLogout()

  return (
    <ButtonIcon onClick={logout} disabled={isLoading}>
      {isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  )
}

export default Logouts
