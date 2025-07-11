import styled, { css } from 'styled-components'

const regularStyle = css`
  padding: 2.4rem 4rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
`

const modalStyle = css`
  width: 80rem;
`

const Form = styled.form`
  ${(props) => props.type === 'regular' && regularStyle}
  ${(props) => props.type === 'modal' && modalStyle}

  overflow: hidden;
  font-size: 1.4rem;
`

Form.defaultProps = {
  type: 'regular',
}

export default Form
