import { useCallback, useRef, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { markdown } from '@codemirror/lang-markdown'

import { useAutoSave, STORAGE_KEY } from './hooks/useAutoSave'
import { useMarkdown } from './hooks/useMarkdown'

const defaultValue = localStorage.getItem(STORAGE_KEY) || ''

export function App() {
  const rawText = useRef(defaultValue)
  const [html, setHtml] = useState('')

  const onChange = useCallback((value: string) => {
    rawText.current = value
  }, [])

  useAutoSave(rawText)
  useMarkdown(rawText, setHtml)

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden">
      <div className="h-full flex-1 flex row">
        <div className="w-1/2">
          <CodeMirror
            value={rawText.current}
            height="100vh"
            extensions={[markdown()]}
            onChange={onChange}
            theme="dark"
            autoFocus
          />
        </div>
        <div
          className="markdown-body w-1/2 p-3 overflow-y-scroll"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}
