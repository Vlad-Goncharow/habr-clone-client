import React from 'react'
import s from './PostAuthor.module.scss'
import Habr2 from '../../assets/images/habr2.png'
import { UserType } from '../../Types/UserType'

interface PostAuthorProps {
  user: UserType | undefined
}

const PostAuthor: React.FC<PostAuthorProps> = ({ user }) => {
  return (
    <div className={s.author}>
      <div className={s.author__top}>
        <div className={s.author__img}>
          <img src={`${process.env.REACT_APP_SERVER_URL}${user?.avatar}`} alt="" />
        </div>
        <div className={s.author__item}>
          <span>{`${user?.karma}`}</span>
          <p>Карма</p>
        </div>
        <div className={s.author__item}>
          <span>{`${user?.rating}`}</span>
          <p>Рейтинг</p>
        </div>
      </div>
      <div className={s.author__name}>{user?.nickName}</div>
    </div>
  )
}

export default PostAuthor