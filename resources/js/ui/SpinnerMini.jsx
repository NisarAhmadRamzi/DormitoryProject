import { BiLoaderAlt } from 'react-icons/bi'
import styled, { keyframes } from 'styled-components'

// Define the keyframes for rotation animation
const rotate = keyframes`
  to {
    transform: rotate(1turn);
  }
`

// Styled icon with rotation animation
const SpinnerMini = styled(BiLoaderAlt)`
  width: 2.4rem;
  height: 2.4rem;
  animation: ${rotate} 1.5s infinite linear;
  color: var(--color-brand-600); /* Optional: Use your theme's color */
`

export default SpinnerMini
