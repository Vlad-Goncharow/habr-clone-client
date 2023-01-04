import { EditorState, SelectionState} from 'draft-js'

import React from 'react'

import TitleIcon from '../../assets/images/format-heading.svg'
import UlIcon from '../../assets/images/list-ul.svg'
import OlIcon from '../../assets/images/list-ol.svg'
import CodeIcon from '../../assets/images/code.svg'


import s from './EditorControls.module.scss'
import { useOnClickOutside } from 'usehooks-ts'

const BLOCK_TYPES = [
  { label: 'Загаловок 1', style: 'header-one', icon: TitleIcon },
  { label: 'Загаловок 2', style: 'header-two', icon: TitleIcon },
  { label: 'Загаловок 3', style: 'header-three', icon: TitleIcon },
  { label: 'Список', style: 'unordered-list-item', icon: UlIcon },
  { label: 'Нумерованый список', style: 'ordered-list-item', icon: OlIcon },
  { label: 'Код', style: 'code-block', icon: CodeIcon },
];

type propType = {
  toggleBlockType:any
  editorRef:any
  editorState: EditorState
}

const EditorControls: React.FC<propType> = React.memo(({ editorState, toggleBlockType, editorRef }) => {
  // ======== px to menu
  const [value, setValue] = React.useState<number>()
  // ======== px to menu

  // ======== menu is open
  const [open, setOpen] = React.useState(false)
  // ======== menu is open

  // ======== menu ref
  const buttonsRef = React.useRef<any>()
  useOnClickOutside(buttonsRef, () => setOpen(false))
  // ======== menu ref

  // ======== draft js data
  const selection: SelectionState = editorState.getSelection();
  let anchorKey = selection.getEndKey();
  let currentContent = editorState.getCurrentContent();
  let currentContentBlock = currentContent.getBlockForKey(anchorKey);
  // ======== draft js data

  // ======== calculate px value
  React.useEffect(() => {
    const doc: any = document.querySelectorAll(`[data-offset-key="${anchorKey}-0-0"]`)
    setValue(doc[0].offsetTop)
  }, [selection, currentContent, currentContentBlock])
  // ======== calculate px value

  return (
    <div
      style={{
        'top': `${value}px`
      }}
      className={s.buttons}
    >
      {
        open
          ?
          <div ref={buttonsRef} className={s.buttons__row}>
            {BLOCK_TYPES.map((type: any) =>
              <div
                className={s.item}
                key={type.label}
                onMouseDown={() => toggleBlockType(type.style)}
                onClick={() => {
                  editorRef.current.focus()
                  setOpen(false)
                }}

              >
                <img src={type.icon} alt="" />
                <span>
                  {type.label}
                </span>
              </div>
            )}
          </div>
          :
          <div onClick={() => setOpen(prev => !prev)} className={s.buttons__icon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
              <path d="M12 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
              <path d="M19 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
              <path d="M5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
              <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
              <path d="M19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
              <path d="M5 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
              <path d="M12 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
              <path d="M19 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
            </svg>
          </div>
      }
    </div>
  )
})

export default EditorControls