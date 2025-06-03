// import styled from 'styled-components'

// const StyledFormRow = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.8rem;
//   padding: 1.2rem 0;
// `

// const Label = styled.label`
//   font-weight: 500;
// `

// const Error = styled.span`
//   font-size: 1.4rem;
//   color: var(--color-red-700);
// `

// function FormRowVertical({ label, error, children }) {
//   return (
//     <StyledFormRow>
//       {label && <Label htmlFor={children.props.id}>{label}</Label>}
//       {children}
//       {error && <Error>{error}</Error>}
//     </StyledFormRow>
//   )
// }

// export default FormRowVertical

import styled from 'styled-components'

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;
`

const Label = styled.label`
  font-weight: 500;
`

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`

function FormRowVertical({ label, error, children }) {
  // Safely extract id from first child (if it's a single React element or part of an array)
  const childArray = Array.isArray(children) ? children : [children]
  const inputId = childArray[0]?.props?.id || ''

  return (
    <StyledFormRow>
      {label && <Label htmlFor={inputId}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  )
}

export default FormRowVertical
