import { useEffect, MutableRefObject } from 'react'
import markdown from 'markdown-it'

const md = markdown({ html: true })

export const useMarkdown = (
  textRef: MutableRefObject<string>,
  onChange: (html: string) => void,
) => {
  useEffect(() => {
    const timer = setInterval(() => {
      if (textRef.current) {
        onChange(md.render(textRef.current))
      }
    }, 500)
    return () => clearInterval(timer)
  }, [textRef.current])
}
