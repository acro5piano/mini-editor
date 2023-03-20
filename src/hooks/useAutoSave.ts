import { useEffect, MutableRefObject } from 'react'

export const STORAGE_KEY = 'mini-editor:value'

export const useAutoSave = (
  textAreaRef: MutableRefObject<HTMLTextAreaElement>,
) => {
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.value = localStorage.getItem(STORAGE_KEY) || ''
    }
  }, [])
  useEffect(() => {
    const timer = setInterval(() => {
      if (textAreaRef.current.value) {
        localStorage.setItem(STORAGE_KEY, textAreaRef.current.value)
      }
    }, 500)
    return () => clearInterval(timer)
  }, [textAreaRef.current])
}
