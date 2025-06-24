import {
  HiOutlineArrowTrendingUp,
  HiOutlineCurrencyDollar,
  HiOutlineExclamationTriangle,
  HiOutlineUserGroup,
} from 'react-icons/hi2'
import styled from 'styled-components'
import Heading from '../../ui/Heading'
import Row from '../../ui/Row'

const StyledToday = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  position: relative;
  overflow: hidden;
`

const TodayList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  overflow-y: auto;
  max-height: 28rem;
  padding-right: 0.4rem;

  &::-webkit-scrollbar {
    width: 0;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`

const ScrollHint = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3rem;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    var(--color-grey-0) 100%
  );
  z-index: 10;
  pointer-events: none;
`

const TodayItem = styled.li`
  background-color: var(--color-grey-50);
  border-left: 4px solid var(--color-${(props) => props.color}-600);
  padding: 1.6rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 1.6rem;

  svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-${(props) => props.color}-600);
  }

  .info {
    display: flex;
    flex-direction: column;
  }

  .label {
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--color-grey-700);
  }

  .detail {
    font-size: 1.2rem;
    color: var(--color-grey-500);
  }
`

function Today() {
  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>

      <TodayList>
        <TodayItem color="indigo">
          <HiOutlineUserGroup />
          <div className="info">
            <span className="label">4 students checked in</span>
            <span className="detail">Rooms 301, 302, 303, 305</span>
          </div>
        </TodayItem>
        <TodayItem color="yellow">
          <HiOutlineExclamationTriangle />
          <div className="info">
            <span className="label">2 new complaints</span>
            <span className="detail">Leaky faucet in Room 201</span>
          </div>
        </TodayItem>
        <TodayItem color="green">
          <HiOutlineCurrencyDollar />
          <div className="info">
            <span className="label">3 fees paid</span>
            <span className="detail">Total: $450</span>
          </div>
        </TodayItem>
        <TodayItem color="blue">
          <HiOutlineArrowTrendingUp />
          <div className="info">
            <span className="label">1 support resolved</span>
            <span className="detail">The Door Firxed in Third Floor</span>
          </div>
        </TodayItem>
        <TodayItem color="indigo">
          <HiOutlineUserGroup />
          <div className="info">
            <span className="label">2 students checked out</span>
            <span className="detail">Room 301 & 308</span>
          </div>
        </TodayItem>
        <TodayItem color="yellow">
          <HiOutlineExclamationTriangle />
          <div className="info">
            <span className="label">1 complaint closed</span>
            <span className="detail">Water issue in First Floor resolved</span>
          </div>
        </TodayItem>
      </TodayList>

      <ScrollHint />
    </StyledToday>
  )
}

export default Today
