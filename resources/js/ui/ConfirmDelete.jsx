import styled from 'styled-components'

const ConfirmBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  font-size: 1.6rem;
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
`

const Button = styled.button`
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.4rem;
`

const CancelButton = styled(Button)`
  background-color: #eee;
  color: #333;
`

const DeleteButton = styled(Button)`
  background-color: red;
  color: white;
`

function ConfirmDelete({
  resourceName = 'item',
  message = `Are you sure you want to delete this ${resourceName}?`,
  subMessage = 'This action cannot be undone.',
  onConfirm,
  onCloseModal,
  itemLabel, // ✅ Add this prop
}) {
  return (
    <ConfirmBox>
      <h2 style={{ fontWeight: 'bold' }}>Delete {resourceName}</h2>
      <p>
        Are you sure you want to delete{' '}
        <span
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: 'var(--color-red-700)',
          }}
        >
          {itemLabel || `this ${resourceName}`}
        </span>
        ?
      </p>

      <p>{subMessage}</p>
      <ButtonGroup>
        <CancelButton onClick={onCloseModal}>Cancel</CancelButton>
        <DeleteButton
          onClick={() => {
            onConfirm()
            onCloseModal()
          }}
        >
          Delete
        </DeleteButton>
      </ButtonGroup>
    </ConfirmBox>
  )
}

export default ConfirmDelete
