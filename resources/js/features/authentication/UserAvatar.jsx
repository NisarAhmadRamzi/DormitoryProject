// import img from '../../images/prfile.jpg'
// import styled from 'styled-components'
// const StyledUserAvatar = styled.div`
//   display: flex;
//   gap: 1.2rem;
//   align-items: center;
//   font-weight: 500;
//   font-size: 1.4rem;
//   color: var(--color-grey-600);
// `

// const Avatar = styled.img`
//   display: block;
//   width: 5.6rem; // Increased size
//   aspect-ratio: 1;
//   object-fit: cover;
//   object-position: center;
//   border-radius: 50%;
//   outline: 2px solid var(--color-grey-100);
// `

// const UserAvatar = () => {
//   return (
//     <StyledUserAvatar>
//       <Avatar src={img} />
//       <span>Admin</span>
//     </StyledUserAvatar>
//   )
// }

// export default UserAvatar

import img from '../../images/prfile.jpg' // Default fallback image
import styled from 'styled-components'
import { useUser } from '../../context/UserContext' // Import user context

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`

const Avatar = styled.img`
  display: block;
  width: 5.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`

const UserAvatar = () => {
  const { user } = useUser() // Get the logged-in user

  // Fallback values
  const avatarSrc = user?.profile || img
  const userRole = user?.role || 'Guest'
  const userName = user?.name || 'Guest'

  return (
    <StyledUserAvatar>
      <Avatar src={avatarSrc} alt={userName} />
      <span>{userRole}</span>
    </StyledUserAvatar>
  )
}

export default UserAvatar
