import styled from 'styled-components'

const Card = styled.div`
  background-color: ${({ theme }) => theme.cardBg || '#ffffff'};
  color: ${({ theme }) => theme.text || '#1f2937'};
  padding: 1.8rem;
  border-radius: 16px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  }
`

const IconWrapper = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.primary || '#2563eb'};
  margin-bottom: 0.8rem;
`

const Title = styled.h4`
  font-size: 1.3rem; /* Increased font size here */
  color: #4b5563;
  margin-bottom: 0.4rem;
  font-weight: 600;
`

const Value = styled.p`
  font-size: 1.6rem;
  font-weight: bold;
  color: ${({ theme }) => theme.accent || '#111827'};
`

function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <IconWrapper>{icon}</IconWrapper>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </Card>
  )
}

export default DashboardCard
