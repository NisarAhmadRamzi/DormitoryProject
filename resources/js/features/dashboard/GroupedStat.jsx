t

import { HiCheckCircle, HiExclamationCircle, HiXCircle } from 'react-icons/hi'
import styled, { keyframes } from 'styled-components'
import SpinnerMini from '../../ui/SpinnerMini'

// Fade animation
const fadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`

// Format date utility
function formatDate(dateStr) {
  const parsed = new Date(dateStr)
  return isNaN(parsed) ? dateStr : parsed.toLocaleString()
}

// Helpers
function isDateString(value) {
  return (
    typeof value === 'string' && !isNaN(Date.parse(value)) && value.length >= 10
  )
}

function getIcon(value) {
  if (typeof value !== 'number') return <HiExclamationCircle />
  if (value > 0) return <HiCheckCircle />
  if (value === 0) return <HiExclamationCircle />
  return <HiXCircle />
}

// Styled Components
const StyledGroupedStat = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 1.2rem 1.6rem;
  display: flex;
  flex-direction: column;
  grid-column: span 1;
  max-height: 270px;
  max-width: 400px;
  overflow-y: auto;
`

const Title = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-grey-500);
`

const StatList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 0;
  margin: 0;
`

const StatItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.4rem;
  color: var(--color-grey-700);
`

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  background-color: ${({ value }) =>
    typeof value === 'number' && value > 0
      ? 'var(--color-green-100)'
      : 'var(--color-red-100)'};
  color: ${({ value }) =>
    typeof value === 'number' && value > 0
      ? 'var(--color-green-700)'
      : 'var(--color-red-700)'};
`

const Label = styled.span`
  flex: 1;
  color: var(--color-grey-600);
  text-transform: capitalize;
`

const Value = styled.span`
  font-weight: 600;
  color: ${({ value }) =>
    typeof value === 'number'
      ? value > 0
        ? 'var(--color-green-700)'
        : 'var(--color-red-700)'
      : 'var(--color-grey-900)'};
`

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.5s ease forwards;
  padding: 0;
`

function GroupedStat({ title, data = {}, isLoading = false, marginTop }) {
  return (
    <StyledGroupedStat marginTop={marginTop}>
      <Title>{title}</Title>
      {isLoading ? (
        <LoadingWrapper>
          <SpinnerMini />
        </LoadingWrapper>
      ) : (
        <StatList>
          {Object.entries(data).map(([key, value]) => {
            const formattedValue = isDateString(value)
              ? formatDate(value)
              : value

            return (
              <StatItem key={key}>
                <IconWrapper value={typeof value === 'number' ? value : null}>
                  {getIcon(typeof value === 'number' ? value : 0)}
                </IconWrapper>
                <Label>{key.replace(/_/g, ' ')}</Label>
                <Value value={typeof value === 'number' ? value : null}>
                  {formattedValue}
                </Value>
              </StatItem>
            )
          })}
        </StatList>
      )}
    </StyledGroupedStat>
  )
}

export default GroupedStat
