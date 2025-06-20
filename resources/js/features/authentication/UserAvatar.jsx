import { useEffect, useState } from 'react'

import styled from 'styled-components'
import { useUser } from '../../context/UserContext'

const StyledUserAvatar = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
`

const AvatarWrapper = styled.div`
  position: relative;
`

const Avatar = styled.img`
  width: 5.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 50%;
  outline: 2px solid black;
`

const StatusDot = styled.span`
  position: absolute;
  bottom: 0.3rem;
  right: 0.3rem;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  background-color: ${(props) => (props.isOnline ? 'green' : 'gray')};
  border: 2px solid white;
`

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const UserName = styled.span`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-900);
`

const UserStatus = styled.span`
  font-size: 1.2rem;
  font-weight: 400;
  color: var(--color-grey-600);
`

const UserAvatar = () => {
  const { user } = useUser()
  const avatarSrc = user?.profile
    ? `/uploads/${user.profile}`
    : 'https://www.gravatar.com/avatar/?d=mp&f=y'
  const userName = user?.name || 'Guest'
  const userRole = user?.role || 'Guest'

  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {}, [])

  return (
    <StyledUserAvatar>
      <AvatarWrapper>
        <Avatar
          src={avatarSrc}
          alt="Profile"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = 'https://www.gravatar.com/avatar/?d=mp&f=y'
          }}
        />
        <StatusDot isOnline={isOnline} />
      </AvatarWrapper>
      <UserInfoWrapper>
        <UserName>{userName}</UserName>
        <UserStatus>{userRole}</UserStatus>
      </UserInfoWrapper>
    </StyledUserAvatar>
  )
}

export default UserAvatar
