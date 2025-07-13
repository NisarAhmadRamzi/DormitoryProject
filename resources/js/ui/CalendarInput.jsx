import styled from 'styled-components'
const CalendarInput = styled.div`
  .rmdp-input {
    border: 1px solid
      ${(props) => (props.$error ? 'red' : 'var(--color-grey-300)')};
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-sm);
    padding: 1rem 1.6rem;
    box-shadow: var(--shadow-sm);
    width: 315px; /* عرض ثابت */
    font-size: 1.6rem;
    color: var(--color-grey-700);
    transition: border-color 0.2s;
    height: 4.8rem;
  }

  .rmdp-input:focus {
    border-color: var(--color-blue-500);
    outline: none;
  }
`
export default CalendarInput
