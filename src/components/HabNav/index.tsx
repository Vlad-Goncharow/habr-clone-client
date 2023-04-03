import classNames from 'classnames'
import React, { ChangeEvent } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../Hooks/useAppDispatch'
import { useAppSelector } from '../../Hooks/useAppSelector'
import { fetchHabSubscribe, fetchHabUnSubscribe } from '../../Redux/Slices/AuthSlice'
import { HabType } from '../../Types/HabType'
import s from './HabNav.module.scss'

const categories = [
  {
    categoryRu: 'Статьи',
    categoryEng: 'posts'
  }, {
    categoryRu: 'Авторы',
    categoryEng: 'authors'
  }
]

interface HabNavProps{
  hab:HabType | null
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const HabNav: React.FC<HabNavProps> = ({ hab, handleChange }) => {
  // ======== location
  const location = useLocation()
  // ======== location
  
  // ======== dispatch
  const dispatch = useAppDispatch()
  // ======== dispatch

  // ======== current user
  const {user} = useAppSelector(store => store.auth)
  // ======== current user

  // ======== hab category
  const { habId } = useParams()
  // ======== hab category

  // ======== is current user subsctibed
  const [active,setActive] = React.useState(false)
  // ======== is current user subsctibed

  // ======== subscribe
  const subscribe = async () => {
    if(hab){
      if(!active){
        const data = await dispatch(fetchHabSubscribe(hab))
        if (data.payload._id) {
          setActive(true)
        }
      } else{
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
    if (user.auth?.habSubscribers.some((hab:any) => hab === habId)){
      setActive(true)
    } else {
      setActive(false)
    }
  }, [hab?.subscribers, habId, user.auth?._id, user.auth?.habSubscribers])
  // ======== is current user subsctibed
  

  return (
    hab !== null ?
      <div className={s.hab}>
        <div className={s.hab__top}>
          <div className={s.hab__left}>
            <div className={s.hab__image}>
              <img src={`${process.env.REACT_APP_SERVER_URL}${hab.image}`} alt="" />
            </div>
            <div className={s.hab__rating}>
              <span>{`${hab.rating}`}</span>
              <p>Рейтинг</p>
            </div>
          </div>
          <button
            className={classNames(s.hab__subs, {
              [s.hab__subs_active]: active === true
            })}
            onClick={subscribe}
          >
            {active ?'Отписаться':'Подписаться'}
            {
              active &&
              <span></span>
            }
          </button>
        </div>
        <h1 className={s.hab__name}>{hab.title}</h1>
        <h2 className={s.hab__descr}>{hab.descr}</h2>
        <div className={s.category}>
          {
            categories.map((el) =>
              <Link key={`${el.categoryEng}`} to={`/hab/${habId}/${el.categoryEng}/1`} className={classNames(s.category__item, {
                [s.category__item_active]: el.categoryEng === location.pathname.split('/')[3]
              })}>{el.categoryRu}</Link>
            )
          }
        </div>
        {
          location.pathname.split('/')[3] === 'authors' &&
          <div className={s.search}>
            <form action="" className={s.search__form}>
              <input type="text" placeholder='Пойск' onChange={handleChange} className={s.search__input} />
              <button className={s.search__btn}>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="32" height="32" viewBox="0 0 32 32"><title>search</title><path d="M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"></path></svg>
              </button>
            </form>
          </div> 
        }
      </div>
      :
      null
  )
}

export default HabNav