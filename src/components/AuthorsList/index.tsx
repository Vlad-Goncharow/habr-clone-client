import React from 'react'
import { Link } from 'react-router-dom'
import { UserType } from '../../Types/UserType'
import EmptyList from '../EmptyList'
import s from './AuthorsList.module.scss'

interface AuthorsListProps{
  authors:UserType[] | []
}

const AuthorsList: React.FC<AuthorsListProps> = ({ authors }) => {
  return (
    authors.length > 0 ? 
      <div className={s.wrapper}>
        <header className={s.header}>
          <div className={s.header__left}>
            <span>Названию</span>
          </div>
          <div className={s.header__right}>
            <span>Рейтинг</span>
          </div>
        </header>
        <div className={s.list}>
          {
            authors.length > 0 &&
            authors.map((user: UserType) =>
              <div key={`${user._id}`} className={s.item}>
                <div className={s.item__left}>
                  <div className={s.item__image}>
                    <img src={`${process.env.REACT_APP_SERVER_URL}${user.avatar}`} alt="" />
                  </div>
                  <div className={s.item__info}>
                    <Link to={`/user/${user._id}/profile`} className={s.item__title}>{user.nickName}</Link>
                    <p className={s.item__descr}>{user.description}</p>
                  </div>
                </div>
                <div className={s.item__right}>
                  <div className={s.item__stat}>
                    <span>{`${user.rating}`}</span>
                  </div>
                </div>
              </div>
            )
          }

        </div>
      </div>
    :
      <EmptyList />
  )
}

export default AuthorsList