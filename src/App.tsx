import { useEffect, useRef } from 'react'

const STORAGE_KEY = 'mini-editor:value'

export function App() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null!)

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.value = localStorage.getItem(STORAGE_KEY) || ''
    }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      if (textAreaRef.current) {
        localStorage.setItem(STORAGE_KEY, textAreaRef.current.value)
      }
    }, 500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-screen h-screen">
      <h1 className="text-3xl font-bold underline">Mini Editor</h1>
      <textarea
        ref={textAreaRef}
        autoFocus
        className="w-full h-full p-1"
      ></textarea>
    </div>
  )
}
