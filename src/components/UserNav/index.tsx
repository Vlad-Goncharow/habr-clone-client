import classNames from 'classnames'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppDispatch } from '../../Hooks/useAppDispatch'
import { useAppSelector } from '../../Hooks/useAppSelector'
import { fetchUserSubscribe, fetchUserUnSubscribe } from '../../Redux/Slices/AuthSlice'
import { UserType } from '../../Types/UserType'
import s from './UserNav.module.scss'

interface UserNavProps {
  user:UserType | null
}

type categoriesType = {
  categoryRu: String,
  categoryEng: String
}

const categories: categoriesType[] = [
  {
    categoryRu:'Профиль',
    categoryEng:'profile'
  }, {
    categoryRu: 'Публикации',
    categoryEng: 'posts'
  }, {
    categoryRu: 'Коментарии',
    categoryEng: 'comments'
  }, {
    categoryRu: 'Закладки',
    categoryEng: 'favorites'
  }, {
    categoryRu: 'Подписчики',
    categoryEng: 'subscribers'
  }, {
    categoryRu: 'Подписки',
    categoryEng: 'subscriptions'
  },
]

const UserNav: React.FC<UserNavProps> = ({user}) => {
  // ======== dispatch
  const disaptch = useAppDispatch()
  // ======== dispatch

  // ======== auth user
  const authtUser = useAppSelector(store => store.auth)
  // ======== auth user

  // ======== user category
  const location = useLocation();
  // ======== user category

  // ======== is user subscribed 
  const [active, setActive] = React.useState(false)
  // ======== is user subscribed 

  // ======== subscribe
  const subscribe = React.useCallback(async () => {
    if (authtUser.user.auth !== null) {
      if (active) {
        disaptch(fetchUserUnSubscribe({_id:user?._id}))
      } else {
        disaptch(fetchUserSubscribe({_id:user?._id}))
      }
    }
  }, [authtUser.user.auth, active])
  // ======== subscribe
  
  // ======== is user subscribed 
  React.useEffect(() => {
    if (authtUser.user.auth?.userSubscriptions.some((el: any) => el === user?._id)) {
      setActive(true)
    } else {
      setActive(false)
    }
  }, [user, authtUser])
  // ======== is user subscribed 
  
  return (
    <div className={s.wrapper}>
      <header className={s.header}>
        <div className={s.left}>
          <div className={s.image}>
            <img src={`${process.env.REACT_APP_SERVER_URL}${user?.avatar}`} alt="" />
          </div>
          <div className={s.stat}>
            <div className={s.stat__item}>
              <span>`{`${user?.karma}`}</span>
              <p>Карма</p>
            </div>
            <div className={s.stat__item}>
              <span>`{`${user?.rating}`}</span>
              <p>Рейтинг</p>
            </div>
          </div>
        </div>
        {
          authtUser.user.auth?._id !== user?._id &&
          <div className={s.right}>
            {/* <div className={s.right__mess}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.75 21.75 23.25 12 .75 2.25v7.5l15 2.25-15 2.25v7.5Z" />
              </svg>
            </div> */}
            <button
              className={classNames(s.right__sub, {
                [s.right__sub_active]: active
              })}
              onClick={subscribe}
            >
              {active ? 'Отписаться' : 'Подписаться'}
              {
                active &&
                <span></span>
              }
            </button>
          </div>
        }
      </header>
      <h1 className={s.name}>
        {
          user?.fullName !== 'Не известно' ?
            `${user?.fullName} @${user?.nickName}`
          :
            `@${user?.nickName}`
        }
      </h1>
      <p className={s.descr}>{user?.description ? user?.description : 'description'}</p>
      <div className={s.category}>
        {
          categories.map((el: categoriesType) => 
            <Link 
              key={`${el.categoryEng}`} 
              to={`/user/${user?._id}/${el.categoryEng}/${el.categoryEng !== 'profile' ? 1 : ''}`} 
              className={classNames(s.category__item,{
                [s.category__item_active]: el.categoryEng === location.pathname.split('/')[location.pathname.split('/').length - 2]
            })}>{el.categoryRu}</Link>
          )
        }
      </div>
    </div>
  )
}

export default UserNav