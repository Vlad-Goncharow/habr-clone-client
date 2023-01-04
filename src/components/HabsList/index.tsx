import React from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from '../../axios'
import { HabType } from '../../Types/HabType'
import EmptyList from '../EmptyList'
import s from './HabsList.module.scss'

interface HabsListProps{
  habs:HabType[] | []
}

const HabsList: React.FC<HabsListProps> = ({habs}) => {
  return (
    habs.length > 0 ? 
      <div className={s.wrapper}>
        <header className={s.header}>
          <div className={s.header__left}>
            <span>Названию</span>
          </div>
          <div className={s.header__right}>
            <span>Рейтинг</span>
            <span>Подписчики</span>
          </div>
        </header>
        <div className={s.list}>
          {
            habs.length > 0 &&
            habs.map((hab: HabType) =>
              <div key={`${hab._id}`} className={s.item}>
                <div className={s.item__left}>
                  <div className={s.item__image}>
                    <img src={`${process.env.REACT_APP_SERVER_URL}${hab.image}`} alt="" />
                  </div>
                  <div className={s.item__info}>
                    <Link to={`/hab/${hab._id}/posts`} className={s.item__title}>{hab.title}</Link>
                    <p className={s.item__descr}>{hab.descr}</p>
                  </div>
                </div>
                <div className={s.item__right}>
                  <div className={s.item__stat}>
                    <span>{`${hab.rating}`}</span>
                  </div>
                  <div className={s.item__stat}>
                    <span>{hab.subscribers !== undefined ? `${hab.subscribers.length}` : '0'}</span>
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

export default HabsList