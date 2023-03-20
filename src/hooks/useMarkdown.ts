import { useEffect, MutableRefObject } from 'react'
import markdown from 'markdown-it'

const md = markdown()

export const useMarkdown = (
  textAreaRef: MutableRefObject<HTMLTextAreaElement>,
  onChange: (html: string) => void,
) => {
  useEffect(() => {
    const timer = setInterval(() => {
      if (textAreaRef.current) {
        onChange(md.render(textAreaRef.current.value))
      }
    }, 500)
    return () => clearInterval(timer)
  }, [textAreaRef.current])
}
