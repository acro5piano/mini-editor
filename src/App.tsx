import { useCallback, useMemo, useRef, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { EditorView } from '@codemirror/view'
import { Extension } from '@codemirror/state'

import { useAutoSave, STORAGE_KEY } from './hooks/useAutoSave'
import { useMarkdown } from './hooks/useMarkdown'
import clsx from 'clsx'

const defaultValue = localStorage.getItem(STORAGE_KEY) || ''

export function App() {
  const rawText = useRef(defaultValue)
  const [html, setHtml] = useState('')

  const [lineWrapping, setLineWrapping] = useState(true)
  const [showPreview, setShowPreview] = useState(true)

  const onChange = useCallback((value: string) => {
    rawText.current = value
  }, [])

  useAutoSave(rawText)
  useMarkdown(rawText, setHtml)

  const extensions = useMemo(() => {
    const exts: Extension[] = [markdown()]
    if (lineWrapping) {
      exts.push(EditorView.lineWrapping)
    }
    return exts
  }, [lineWrapping])

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden">
      <div className="w-full px-2">
        <label>
          <input
            type="checkbox"
            defaultChecked
            onChange={() => setLineWrapping(!lineWrapping)}
          />
          <span className="ml-2">Wrap</span>
        </label>
        <label className="ml-4">
          <input
            type="checkbox"
            defaultChecked
            onChange={() => setShowPreview(!showPreview)}
          />
          <span className="ml-2">Preview</span>
        </label>
      </div>
      <div className="h-full flex-1 flex row">
        <div className={clsx(showPreview ? 'w-1/2' : 'w-full')}>
          <CodeMirror
            value={rawText.current}
            height="100vh"
            extensions={extensions}
            onChange={onChange}
            theme="dark"
            indentWithTab
            autoFocus
          />
        </div>
        {showPreview && (
          <div className="markdown-body h-full w-1/2 p-3 overflow-y-scroll">
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        )}
      </div>
    </div>
  )
}
