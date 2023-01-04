import React from 'react'
import Empty from '../../assets/images/empty.png'
import s from './EmptyList.module.scss'

function EmptyList() {
  return (
    <div className={s.item}>
      <img src={Empty} alt=""/>
      <span>Пока тут ничего нет</span>
    </div>
  )
}

export default EmptyList