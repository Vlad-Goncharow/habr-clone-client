import React from 'react'
import { HabType } from '../../Types/HabType'
import { UserType } from '../../Types/UserType'
import UserHab from '../UserHab'
import s from './UserProfile.module.scss'

interface UserProfileProps{
  user:UserType
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className={s.wrapper}>
      <div className={s.item}>
        <h2 className={s.item__title}>
          Состоит в хабах
        </h2>
        <div className={s.habs}>
          {
            user.habSubscribers.length > 0 ?
            user.habSubscribers.map((el: HabType) =>
              <UserHab key={`${el._id}`} hab={el} />
            ) :
            <div className={s.habs__none}>Пользователь пока не вступал в хабы</div>
          }
        </div>
      </div>
    </div>
  )
}

export default UserProfile