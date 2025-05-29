import styled from 'styled-components'
import { useUser } from '../../context/UserContext'

const StyledUserAvatar = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 1rem; /* Space between avatar and name */
  cursor: pointer;
`

const Avatar = styled.img`
  width: 5.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-200);
  transition: outline-color 0.3s ease;

  &:hover {
    outline-color: var(--color-primary-600);
  }
`

const UserName = styled.span`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-900);
`

const ContextMenu = styled.ul`
  position: absolute;
  bottom: -1rem;
  left: 50%;
  transform: translate(-50%, 110%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  padding: 1rem 1.5rem;
  z-index: 100;
  min-width: 220px;
  text-align: left;
  font-size: 1.4rem;
  color: var(--color-grey-800);
  display: none;
  list-style: none;

  ${StyledUserAvatar}:hover & {
    display: block;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, 90%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 110%);
    }
  }

  li {
    margin-bottom: 0.6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:last-child {
      margin-bottom: 0;
    }

    span {
      font-weight: 500;
      color: var(--color-grey-600);
    }

    strong {
      color: var(--color-primary-600);
      font-weight: 600;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: -0.6rem;
    left: 50%;
    transform: translateX(-50%);
    border: 0.6rem solid transparent;
    border-bottom-color: var(--color-grey-0);
  }
`

const UserAvatar = () => {
  const { user } = useUser()
  const avatarSrc = user?.profile
    ? `/uploads/${user.profile}`
    : 'https://www.gravatar.com/avatar/?d=mp&f=y'
  const userName = user?.name || 'Guest'
  const userRole = user?.role || 'Guest'

  return (
    <StyledUserAvatar>
      <Avatar
        src={avatarSrc}
        alt="Profile"
        onError={(e) => {
          e.target.onerror = null
          e.target.src = 'https://www.gravatar.com/avatar/?d=mp&f=y'
        }}
      />
      <UserName>{userName}</UserName>

      <ContextMenu>
        <li>
          <span>Name</span>
          <strong>{userName}</strong>
        </li>
        <li>
          <span>Role</span>
          <strong>{userRole}</strong>
        </li>
        <li>
          <span>Status</span>
          <strong>Online</strong>
        </li>
      </ContextMenu>
    </StyledUserAvatar>
  )
}

export default UserAvatar
