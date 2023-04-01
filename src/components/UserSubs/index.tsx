import React from 'react'
import { Dna } from 'react-loader-spinner'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../axios'
import { useAppDispatch } from '../../Hooks/useAppDispatch'
import { openModal } from '../../Redux/Slices/ErrorModalSlice'
import AuthorsList from '../AuthorsList'
import Pagination from '../Pagination'
import s from './UserSubs.module.scss'

function UserSubs() {
  // ======== navigate
  const navigate = useNavigate()
  // ======== navigate

  // ======== dispatch
  const dispatch = useAppDispatch()
  // ======== dispatch

  // ======== loading
  const [loading, setLoading] = React.useState(true)
  // ======== loading

  // ======== user ID
  const { id, page, category } = useParams()
  // ======== user ID

  // ======== user subscribers | subscriptions
  const [subs, setSubs] = React.useState<any | []>([])
  // ======== user subscribers | subscriptions

  // ======== loadSubscribers
  const loadSubscribers = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/user/subs/${id}/${category}/${page}`)
      setSubs(data)
      setLoading(false)
    } catch (e) {
      dispatch(openModal('При подписчиков постов произошла ошибка'))
      navigate(-1)
    }
  }

  React.useEffect(() => {
    loadSubscribers()
  },[category,page])
  // ======== loadSubscribers

  return (
    loading ?
      <div className={s.loader}>
        <Dna
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    :
      <>
        <AuthorsList authors={subs.users} />
        <Pagination navigatePath={`/user/${id}/${category}`} postsLength={subs.users.length} />
      </>
  )
}

export default UserSubs