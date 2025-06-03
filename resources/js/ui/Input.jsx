// import styled from 'styled-components'

// const Input = styled.input`
//   border: 1px solid var(--color-grey-300);
//   background-color: var(--color-grey-0);
//   border-radius: var(--border-radius-sm);
//   padding: 0.8rem 1.2rem;
//   box-shadow: var(--shadow-sm);
// `

// export default Input

import styled from 'styled-components'

const Input = styled.input`
  border: 1px solid
    ${(props) => (props.error ? 'red' : 'var(--color-grey-300)')};
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
  width: 100%; /* Ensure full width for inputs */
  transition: border-color 0.2s;

  &:focus {
    border-color: var(--color-blue-500); /* Change border color on focus */
    outline: none; /* Remove default outline */
  }
`

export default Input
