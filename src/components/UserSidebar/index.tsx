import moment from 'moment';
import 'moment/locale/ru';
import React from 'react';
import { UserType } from '../../Types/UserType';
import s from './UserSidebar.module.scss';

interface UserSidebarProps{
  user:UserType | null
}

const UserSidebar: React.FC<UserSidebarProps> = ({user}) => {
  const checkBirth = () => {
    if (user?.dayOfBirth !== 'Не известно' &&  user?.monthOfBirth !== 'Не известно' && user?.yearOfBirth !== 'Не известно'){
      return true
    } else {
      return false
    }
  }
  return (
    <div className={s.wrapper}>
      <div className={s.item}>
        <h2 className={s.item__title}>Информация</h2>
        <div className={s.info}>
          <div className={s.info__item}>
            <span>Рейтинг</span>  
            <p>{`${user?.rating}`}</p>
          </div>
          <div className={s.info__item}>
            <span>откуда</span>
            <p>{user?.country}</p>
          </div>
          {
            checkBirth() ?
            <div className={s.info__item}>
              <span>Дата рождения</span>
              <p>
                {`${user?.dayOfBirth} ${user?.monthOfBirth} ${user?.yearOfBirth}`}
              </p>
            </div>
            :
              <div className={s.info__item}>
                <span>Дата рождения</span>
                <p>Не известно</p>
              </div>
          }
          <div className={s.info__item}>
            <span>Зарегестрирован</span>
            <p>{moment(user?.register).locale('ru').format('LL')}</p>
          </div>
          <div className={s.info__item}>
            <span>Активность</span>
            <p>{moment(user?.register).locale('ru').format('LL')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserSidebar