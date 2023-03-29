import { useEffect, MutableRefObject } from 'react'

export const STORAGE_KEY = 'mini-editor:value'

export const useAutoSave = (textRef: MutableRefObject<string>) => {
  useEffect(() => {
    if (textRef.current) {
      textRef.current = localStorage.getItem(STORAGE_KEY) || ''
    }
  }, [])
  useEffect(() => {
    const timer = setInterval(() => {
      if (textRef.current) {
        localStorage.setItem(STORAGE_KEY, textRef.current)
      }
    }, 500)
    return () => clearInterval(timer)
  }, [textRef.current])
}
