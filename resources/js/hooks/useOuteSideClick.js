import { useEffect, useRef } from 'react'

import { useContext } from 'react'
import { ModalContext } from '../ui/Modal'

export function useOuteSideClick(handler, listenCapturing = true) {
  const ref = useRef()
  const { openName, close } = useContext(ModalContext) // ⬅️ Move this up before useEffect

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler()
      }
    }

    document.addEventListener('click', handleClick, listenCapturing)
    return () =>
      document.removeEventListener('click', handleClick, listenCapturing)
  }, [handler, listenCapturing])
  return ref
}
