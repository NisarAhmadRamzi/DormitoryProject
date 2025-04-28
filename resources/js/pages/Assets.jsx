import { useState } from 'react'
import styled from 'styled-components'
import AssetsTable from '../features/assets/AssetsTable'
import CreateAssetsForm from '../features/assets/CreateAssetsForm'
import Button from '../ui/Button'
import Heading from '../ui/Heading'
import Modal from '../ui/Modal'
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

function Assets() {
  const [search, setSearch] = useState('')

  return (
    <>
      <Row
        type="horizontal"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Heading as="h1">Assets</Heading>

        <OperationsWrapper>
          <SearchInput
            type="text"
            placeholder="Search assets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* This is the button to open the modal */}
          <Modal.Open opensWindowName="create-asset">
            <Button>Add New Asset</Button>
          </Modal.Open>
        </OperationsWrapper>
      </Row>

      <Row>
        <AssetsTable search={search} />
      </Row>

      {/* Modal window containing the form */}
      <Modal.Window name="create-asset">
        <CreateAssetsForm />
      </Modal.Window>
    </>
  )
}

export default Assets
