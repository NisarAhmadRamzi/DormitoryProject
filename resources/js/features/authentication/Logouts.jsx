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
