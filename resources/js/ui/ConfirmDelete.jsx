

import { useTranslation } from 'react-i18next'
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
  message,
  subMessage,
  onConfirm,
  onCloseModal,
  itemLabel,
}) {
  const { t } = useTranslation()

  // Default messages fallback to translations if not provided as props
  const defaultMessage = t('confirmDelete.message', {
    resource: t(resourceName),
  })
  const defaultSubMessage = t('confirmDelete.subMessage')

  return (
    <ConfirmBox>
      <h2 style={{ fontWeight: 'bold' }}>
        {t('confirmDelete.title', { resource: t(resourceName) })}
      </h2>

      <p>
        {message || defaultMessage.split('{{item}}')[0]}
        <span
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: 'var(--color-red-700)',
          }}
        >
          {itemLabel ||
            t('confirmDelete.thisResource', { resource: t(resourceName) })}
        </span>
        {message ? '' : defaultMessage.split('{{item}}')[1]}
      </p>

      <p>{subMessage || defaultSubMessage}</p>

      <ButtonGroup>
        <CancelButton onClick={onCloseModal}>
          {t('confirmDelete.cancel')}
        </CancelButton>
        <DeleteButton
          onClick={() => {
            onConfirm()
            onCloseModal()
          }}
        >
          {t('confirmDelete.delete')}
        </DeleteButton>
      </ButtonGroup>
    </ConfirmBox>
  )
}

export default ConfirmDelete
