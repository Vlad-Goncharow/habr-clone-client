import React from 'react'
import { Dna } from 'react-loader-spinner'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../axios'
import { useAppDispatch } from '../../Hooks/useAppDispatch'
import { openModal } from '../../Redux/Slices/ErrorModalSlice'
import Pagination from '../Pagination'
import PostsComponents from '../PostsComponents'
import s from './UserFavoritePosts.module.scss'

function UserFavoritePosts() {
  // ======== navigate
  const navigate = useNavigate()
  // ======== navigate

  // ======== dispatch
  const dispatch = useAppDispatch()
  // ======== dispatch

  // ======== comments
  const [data, setData] = React.useState<any | []>([])
  // ======== comments

  // ======== loading
  const [loading, setLoading] = React.useState(true)
  // ======== loading

  // ======== user ID
  const { id, page } = useParams()
  // ======== user ID

  // ======== load user favorite posts
  const loadFavorites = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/user/favorites/${id}/${page}`)
      setData(data)
      setLoading(false)
    } catch (e) {
      dispatch(openModal('При загрузки избранных постов произошла ошибка'))
      navigate(-1)
    }
  }

  React.useEffect(() => {
    loadFavorites()
  }, [id, page])
  // ======== load user favorite posts
  
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
        <PostsComponents posts={data.posts} />
        <Pagination postsLength={data.length} navigatePath={`/user/${id}/favorites`} />
      </>
  )
}

export default UserFavoritePosts