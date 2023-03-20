import { useRef, useState } from 'react'
import { useAutoSave } from './hooks/useAutoSave'
import { useEditingSupport } from './hooks/useEditingSupport'
import { useMarkdown } from './hooks/useMarkdown'

export function App() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null!)
  const [html, setHtml] = useState('')

  useAutoSave(textAreaRef)
  useMarkdown(textAreaRef, setHtml)
  useEditingSupport(textAreaRef)

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="flex-1 flex row">
        <textarea ref={textAreaRef} autoFocus className="h-full w-1/2 p-1" />
        <div className="markdown-body  w-1/2 p-1">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </div>
  )
}
