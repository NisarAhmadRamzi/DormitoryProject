// import React, { cloneElement, createContext, useContext, useState } from 'react'

// import { createPortal } from 'react-dom'
// import { HiXMark } from 'react-icons/hi2'
// import styled from 'styled-components'
// import { useOuteSideClick } from '../hooks/useOuteSideClick'

// const StyledModal = styled.div`
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   z-index: 1001;
//   transform: translate(-50%, -50%);
//   background-color: var(--color-grey-0);
//   border-radius: var(--border-radius-lg);
//   box-shadow: var(--shadow-lg);
//   padding: 3.2rem 4rem;
//   transition: all 0.5s;
// `

// const Overlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100vh;
//   background-color: var(--backdrop-color);
//   backdrop-filter: blur(4px);
//   z-index: 1000;
//   transition: all 0.5s;
// `

// const Button = styled.button`
//   background: none;
//   border: none;
//   padding: 0.4rem;
//   border-radius: var(--border-radius-sm);
//   transform: translateX(0.8rem);
//   transition: all 0.2s;
//   position: absolute;
//   top: 1.2rem;
//   right: 1.9rem;

//   &:hover {
//     background-color: var(--color-grey-100);
//   }

//   & svg {
//     width: 2.4rem;
//     height: 2.4rem;
//     color: var(--color-grey-500);
//   }
// `

// // Create Modal Context
// const ModalContext = createContext()

// // ModalProvider - Wraps your app and provides context to Modal components
// function ModalProvider({ children }) {
//   const [openName, setOpenName] = useState('')
//   const close = () => setOpenName('')
//   const open = (name) => setOpenName(name)

//   return (
//     <ModalContext.Provider value={{ openName, close, open }}>
//       {children}
//     </ModalContext.Provider>
//   )
// }

// // Open - This component will trigger the modal open action when clicked
// function Open({ children, opensWindowName }) {
//   const { open } = useContext(ModalContext)
//   return cloneElement(children, { onClick: () => open(opensWindowName) })
// }

// // Window - This component represents the modal window
// const Window = ({ children, name }) => {
//   const { openName, close } = useContext(ModalContext)
//   const ref = useOuteSideClick(close)

//   if (name !== openName) return null

//   return createPortal(
//     <Overlay>
//       <StyledModal ref={ref}>
//         <Button onClick={close}>
//           <HiXMark />
//         </Button>
//         <div>{cloneElement(children, { onCloseModal: close })}</div>
//       </StyledModal>
//     </Overlay>,
//     document.body
//   )
// }

// // Add Open and Window as static components to ModalProvider
// ModalProvider.Open = Open
// ModalProvider.Window = Window

// export { ModalContext, ModalProvider }

// const Modal = {
//   Provider: ModalProvider,
//   Open,
//   Window,
// }

// export default Modal

import React, { cloneElement, createContext, useContext, useState } from 'react'

import { HiXMark } from 'react-icons/hi2'
import { createPortal } from 'react-dom'
import { isValidElement } from 'react'
import styled from 'styled-components'
import { useOuteSideClick } from '../hooks/useOuteSideClick'

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 1001;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;

  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
  }
`

const ModalContext = createContext()

function ModalProvider({ children }) {
  const [openName, setOpenName] = useState('')
  const close = () => setOpenName('')
  const open = (name) => setOpenName(name)

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  )
}

function Open({ children, opensWindowName }) {
  const { open } = useContext(ModalContext)
  return cloneElement(children, { onClick: () => open(opensWindowName) })
}

// const Window = ({ children, name }) => {
//   const { openName, close } = useContext(ModalContext)
//   const ref = useOuteSideClick(close)

//   if (name !== openName) return null

//   return createPortal(
//     <Overlay>
//       <StyledModal ref={ref}>
//         <Button onClick={close}>
//           <HiXMark />
//         </Button>
//         <div>{cloneElement(children, { onCloseModal: close })}</div>
//       </StyledModal>
//     </Overlay>,
//     document.body
//   )
// }
const Window = ({ children, name }) => {
  const { openName, close } = useContext(ModalContext)
  const ref = useOuteSideClick(close)

  if (name !== openName) return null

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>
          {isValidElement(children)
            ? cloneElement(children, { onCloseModal: close })
            : children}
        </div>
      </StyledModal>
    </Overlay>,
    document.body
  )
}

ModalProvider.Open = Open
ModalProvider.Window = Window

export { ModalContext, ModalProvider }

const Modal = {
  Provider: ModalProvider,
  Open,
  Window,
}

export default Modal
