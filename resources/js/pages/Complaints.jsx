import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import AddComplaints from '../features/complaints/AddComplaints'
import ComplaintsTable from '../features/complaints/ComplaintsTable'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

// Styled search input
const SearchInput = styled.input`
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-200);
  border-radius: 4px;
  font-size: 1.4rem;
  max-width: 300px;
`

// Wrapper for the search bar and table operations
const OperationsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  gap: 2rem;
`

function Complaints() {
  const { t } = useTranslation()

  return (
    <Row>
      <Heading as="h1" style={{ textAlign: 'center' }}>
        {t('complaints')}
      </Heading>
      <ComplaintsTable />
      <AddComplaints />
    </Row>
  )
}

export default Complaints
