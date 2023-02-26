import React from 'react'
import { CirclesWithBar } from 'react-loader-spinner'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import axios from '../../axios'
import UserNav from '../../components/UserNav'
import UserSidebar from '../../components/UserSidebar'
import { useAppDispatch } from '../../Hooks/useAppDispatch'
import { openModal } from '../../Redux/Slices/ErrorModalSlice'
import { UserType } from '../../Types/UserType'
import s from './UserPage.module.scss'

function UserPage() {
  // ======== navigate
  const navigate = useNavigate()
  // ======== navigate

  // ======== dispatch
  const dispatch = useAppDispatch()
  // ======== dispatch

  // ======== user ID
  const { id } = useParams()
  // ======== user ID

  // ======== User
  const [user, setUser] = React.useState<UserType | null>(null)
  // ======== User

  // ======== load user profile
  const loadUser = async () => {
    try {
      const { data } = await axios.get(`/user/profile/${id}`)
      setUser(data)
    } catch(e){
      dispatch(openModal('При загрузке пользователя произошла ошибка!'))
      navigate(-1)
    }
  }
  // ======== load user profile

  React.useEffect(() => {
    loadUser()
  }, [id])
  // ======== laodUser

  return (
    user === null ?
      <div className={s.loading}>
        <CirclesWithBar
          height="100"
          width="100"
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          outerCircleColor=""
          innerCircleColor=""
          barColor=""
          ariaLabel='circles-with-bar-loading'
        />
      </div>
      :
      <div className={s.page}>
        <div className="container">
          <div className={s.row}>
            <div className={s.wrapper}>
              <UserNav user={user} />
              <Outlet />
            </div>
            <UserSidebar user={user} />
          </div>
        </div>
      </div>
  )
}

export default UserPage