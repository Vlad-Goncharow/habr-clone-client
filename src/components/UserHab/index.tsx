import classNames from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../Hooks/useAppDispatch'
import { useAppSelector } from '../../Hooks/useAppSelector'
import { fetchHabSubscribe, fetchHabUnSubscribe } from '../../Redux/Slices/AuthSlice'
import { HabType } from '../../Types/HabType'
import s from './UserHab.module.scss'

interface UserHabProps{
  hab:HabType
}

const UserHab: React.FC<UserHabProps> = ({hab}) => {
  // ======== current user
  const { user } = useAppSelector(store => store.auth)
  // ======== current user

  // ======== dispatch
  const dispatch = useAppDispatch()
  // ======== dispatch

  // ======== is current user subsctibed
  const [active, setActive] = React.useState(false)
  // ======== is current user subsctibed

  // ======== subscribe
  const subscribe = async () => {
    if (hab) {
      if (!active) {
        const data = await dispatch(fetchHabSubscribe(hab))
        if (data.payload._id) {
          setActive(true)
        }
      } else {
        const data = await dispatch(fetchHabUnSubscribe(hab))
        if (data.payload._id) {
          setActive(false)
        }
      }
    }
  }
  // ======== subscribe

  // ======== is current user subsctibed
  React.useEffect(() => {
    if (user.auth?.habSubscribers.some((item: any) => item === hab._id)) {
      setActive(true)
    } else {
      setActive(false)
    }
  }, [hab._id, hab.subscribers, user.auth?.habSubscribers])
  // ======== is current user subsctibed
  
  return (
    <div className={s.hab}>
      <Link to={`/hab/${hab._id}/posts`} className={classNames(s.hab__name, {
        [s.hab__name_active]: active === true
      })}>
        {hab.title}
      </Link>
      <div className={s.menu}>
        <div className={s.menu__top}>
          <div className={s.menu__image}>
            <img src={`${process.env.REACT_APP_SERVER_URL}${hab.image}`} alt="" />
          </div>
          <div className={s.menu__rating}>
            <span>{`${hab.rating}`}</span>
            <p>Рейтинг</p>
          </div>
        </div>
        <h4 className={s.menu__name}>{hab.title}</h4>
        <h4 className={s.menu__descr}>{hab.descr}</h4>
        <button
          className={classNames(s.menu__subs, {
            [s.menu__subs_active]: active === true
          })}
          onClick={subscribe}
        >
          {active ? 'Отписаться' : 'Подписаться'}
          {
            active &&
            <span></span>
          }
        </button>
        <div className={s.menu__footer}>
          <div className={s.menu__stat}>Публикаций: {`${hab.postsCount}`}</div>
          <div className={s.menu__stat}>Авторов: {hab.authors.length}</div>
        </div>
      </div>
    </div>
  )
}

export default UserHab