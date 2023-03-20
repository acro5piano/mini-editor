import { useEffect, MutableRefObject } from 'react'

export function shouldInsertListItem(text: string, position: number) {
  while (true) {
    position--
    const char = text[position]
    if (char === '\n') {
      const prevChar = text[position + 1]
      return prevChar === '-'
    }
    if (position === 0) {
      return char === '-'
    }
    if (position === -1) {
      return false
    }
  }
}

export const useEditingSupport = (
  textAreaRef: MutableRefObject<HTMLTextAreaElement>,
) => {
  useEffect(() => {
    if (textAreaRef.current) {
      function onKeydown(e: KeyboardEvent) {
        if (e.key === 'Enter') {
          const start = textAreaRef.current.selectionStart
          const end = textAreaRef.current.selectionEnd
          if (shouldInsertListItem(textAreaRef.current.value, end)) {
            textAreaRef.current.setRangeText('- ', start, end)
            setTimeout(() => {
              textAreaRef.current.selectionStart = end + 3
            }, 10)
          }
        }
        if (e.key === 'Tab') {
          alert('hoge')
        }
      }
      textAreaRef.current.addEventListener('keydown', onKeydown)
      return () => {
        textAreaRef.current.removeEventListener('keydown', onKeydown)
      }
    }
    return () => {}
  }, [textAreaRef.current])
}
