import classNames from 'classnames'
import React from 'react'
import { useAppDispatch } from '../../Hooks/useAppDispatch'
import { useAppSelector } from '../../Hooks/useAppSelector'
import { closeModal } from '../../Redux/Slices/ErrorModalSlice'
import s from './ErrorModal.module.scss'

function ErrorModal() {
  // ======== modal
  const {text,isOpen} = useAppSelector(store => store.errorModal)
  // ======== modal

  // ======== dispatch
  const dispatch = useAppDispatch()
  // ======== dispatch

  // ======== close modal
  React.useEffect(() => {
    let timer:any;
    if (isOpen){
      timer = setTimeout(() => {
        dispatch(closeModal())
      }, 2000)
    }

    return () => {
      clearTimeout(timer)
    }
  },[isOpen])
  // ======== close modal

  return (
    <div className={classNames(s.wrapper,{
      [s.wrapper_active]:isOpen,
    })}>
      {text}
    </div>
  )
}

export default ErrorModal