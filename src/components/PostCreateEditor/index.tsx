import React from 'react';

import { convertToRaw, Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

import classNames from 'classnames';
import { useAppDispatch } from '../../Hooks/useAppDispatch';
import { useAppSelector } from '../../Hooks/useAppSelector';
import { openModal } from '../../Redux/Slices/ErrorModalSlice';
import EditorControls from '../EditorControls';
import SecondStepPost from '../SecondStepPost';
import s from './PostCreateEditor.module.scss';

function PostCreateEditor() {
  // ======== dispatch
  const dispatch = useAppDispatch()
  // ======== dispatch

  // ======== current user
  const { user } = useAppSelector(store => store.auth)
  // ======== current user

  // ======== step post create
  const [createStep, setCreateStep] = React.useState<Number>(1)
  // ======== step post create

  // ======== name post input value
  const [titleValue, setTitleValue] = React.useState('')
  // ======== name post input value

  // ======== editor state
  const editorRef = React.useRef<any>()
  const [editorState, setEditorState] = React.useState<EditorState>(
    EditorState.createEmpty()
  );
  // ======== editor state

  // ======== editor text
  const [text, setText] = React.useState<String>('')
  // ======== editor text

  // ======== onChange editor text
  const onChange = (editorState: any): void => {
    setEditorState(editorState)
    setText(JSON.stringify(convertToRaw(editorState.getCurrentContent())))
  };
  // ======== onChange editor text

  // ======== change block type
  const toggleBlockType = (blockType: any) => {
    onChange(
      RichUtils.toggleBlockType(
        editorState,
        blockType
      )
    );
    editorRef.current.focus()
  }
  // ======== change block type

  // ======== check user can go next step
  let check = React.useMemo(() => {
    const leng = editorState.getCurrentContent().getPlainText('').length
    if (leng > 50 && titleValue.length > 5) {
      return true
    } else {
      return false
    }
  }, [editorState, titleValue.length])
  // ======== check user can go next step

  // ======== can user next step
  const nextStepOpen = () => {
    if (check) {
      if (titleValue.length > 80) {
        dispatch(openModal('Недопустимное название, максимум 80 символов'))
      } else {
        setCreateStep(2)
      }
    }
  }
  // ======== can user next step
  return (
    <>
      {
        createStep === 1 &&
        <div className={s.first}>
          <header className={s.first__header}>
            <div className={s.first__authorImg}>
              <img src={`${process.env.REACT_APP_SERVER_URL}${user.auth?.avatar}`} alt="" />
            </div>
            <div className={s.first__authorName}>{user.auth?.nickName}</div>
          </header>
          <div className={s.first__create}>
            <input
              type="text"
              placeholder='Заголовок'
              value={titleValue}
              className={s.first__title}
              onChange={e => setTitleValue(e.target.value)}
            />
            <div onClick={() => editorRef.current.focus()} className={s.editor}>
              <EditorControls toggleBlockType={toggleBlockType} editorRef={editorRef} editorState={editorState} />

              <div className={s.editor__text} >
                <Editor editorState={editorState} onChange={onChange} ref={editorRef} />
              </div>
            </div>
          </div>
          <footer className={s.first__footer}>
            <button
              className={classNames(s.first__footerBtn, {
                [s.first__footerBtn_active]: check,
                [s.first__footerBtn_disable]: check
              })}
              onClick={nextStepOpen}
            >
              Далее к настройкам
            </button>
          </footer>
        </div>
      }
      {
        createStep === 2 &&
        <SecondStepPost text={text} titleValue={titleValue} setCreateStep={setCreateStep} />
      }
    </>
  )
}

export default PostCreateEditor