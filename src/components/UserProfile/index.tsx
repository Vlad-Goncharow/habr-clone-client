import React from 'react'
import s from './UserProfile.module.scss'
import { UserType } from '../../Types/UserType'
import { HabType } from '../../Types/HabType'
import UserHab from '../UserHab'
import axios from '../../axios'
import { useNavigate, useParams } from 'react-router-dom'
import { openModal } from '../../Redux/Slices/ErrorModalSlice'
import { useAppDispatch } from '../../Hooks/useAppDispatch'

const UserProfile: React.FC = () => {
  // ======== user
  const [user, setUser] = React.useState<UserType | null>(null)
  // ======== user

  // ======== user id
  const { id } = useParams()
  // ======== user id

  // ======== dispatch
  const dispatch = useAppDispatch()
  // ======== dispatch1

  // ======== navigate
  const navigate = useNavigate()
  // ======== navigate

  // ======== load user
  const loadUser = async () => {
    try {
      const { data } = await axios.get(`/user/profile/${id}`)
      setUser(data)
    } catch (e) {
      dispatch(openModal('При загрузке пользователя произошла ошибка!'))
      navigate(-1)
    }
  }
  React.useEffect(() => {
    loadUser()
  }, [id])
  // ======== load user

  return (
    <div className={s.wrapper}>
      <div className={s.item}>
        <h2 className={s.item__title}>
          Состоит в хабах
        </h2>
        <div className={s.habs}>
          {
            user !== null && user.habSubscribers.length > 0 ?
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