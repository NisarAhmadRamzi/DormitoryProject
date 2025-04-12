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

function ConfirmDelete({ onConfirm, onCloseModal }) {
  return (
    <div>
      <h2 style={{ fontWeight: 'bold' }}>Delete room</h2>
      <p>Are you sure you want to delete this room?</p>
      <p>This action can not be undone.</p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end', // aligns buttons to the right
          gap: '1.5rem',
          marginTop: '1.5rem',
        }}
      >
        <button
          onClick={onCloseModal}
          style={{
            backgroundColor: '#eee',
            color: '#333',
            padding: '0.6rem 1.2rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => {
            onConfirm()
            onCloseModal()
          }}
          style={{
            backgroundColor: 'red',
            color: 'white',
            padding: '0.6rem 1.2rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default ConfirmDelete
