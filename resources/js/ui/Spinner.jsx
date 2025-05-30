import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`

const LdsSpinner = styled.div`
  color: var(--color-brand-600);
  display: block;
  position: relative;
  width: 80px;
  height: 80px;
  margin: 4.8rem auto; /* centers the spinner like the original */

  div {
    transform-origin: 40px 40px;
    animation: ${spin} 1.2s linear infinite;
    position: absolute;

    &:after {
      content: ' ';
      display: block;
      position: absolute;
      top: 3.2px;
      left: 36.8px;
      width: 6.4px;
      height: 17.6px;
      border-radius: 20%;
      background: currentColor;
    }
  }

  /* Generate all 12 child spinner arms with rotation and delay */
  ${Array.from({ length: 12 })
    .map(
      (_, i) => `
    div:nth-child(${i + 1}) {
      transform: rotate(${i * 30}deg);
      animation-delay: ${-1.1 + i * 0.1}s;
    }
  `
    )
    .join('')}
`

const Spinner = () => (
  <LdsSpinner>
    {Array.from({ length: 12 }).map((_, i) => (
      <div key={i} />
    ))}
  </LdsSpinner>
)

export default Spinner
