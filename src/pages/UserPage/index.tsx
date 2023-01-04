import React from 'react'
import { CirclesWithBar, Dna } from 'react-loader-spinner'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../axios'
import AuthorsList from '../../components/AuthorsList'
import PostsComponents from '../../components/PostsComponents'
import UserComments from '../../components/UserComments'
import UserNav from '../../components/UserNav'
import UserInfo from '../../components/UserProfile'
import UserSidebar from '../../components/UserSidebar'
import { useAppDispatch } from '../../Hooks/useAppDispatch'
import { useAppSelector } from '../../Hooks/useAppSelector'
import { openModal } from '../../Redux/Slices/ErrorModalSlice'
import { fetchUserPosts } from '../../Redux/Slices/PostsSlice'
import { CommentType } from '../../Types/CommentType'
import { PostType } from '../../Types/PostType'
import { UserType } from '../../Types/UserType'
import s from './UserPage.module.scss'

function UserPage() {
  // ======== navigate
  const navigate = useNavigate()
  // ======== navigate

  // ======== dispatch
  const dispatch = useAppDispatch()
  // ======== dispatch

  // ======== user posts
  const { posts } = useAppSelector(store => store.posts)
  // ======== user posts

  // ======== user ID
  const { id, category } = useParams()
  // ======== user ID

  // ======== User
  const [user, setUser] = React.useState<UserType | null>(null)
  // ======== User

  // ======== comments
  const [comments, setComments] = React.useState<CommentType[] | []>([])
  // ======== comments

  // ======== loading
  const [loading, setLoading] = React.useState(false)
  // ======== loading

  // ======== favorite posts
  const [favorites, setFavorites] = React.useState<PostType[] | []>([])
  // ======== favorite posts

  // ======== user subscribers | subscriptions
  const [subs, setSubs] = React.useState<UserType[] | []>([])
  // ======== user subscribers | subscriptions

  // ======== load user posts
  const loadPost = async () => {
    try {
      dispatch(fetchUserPosts({ id }))
    } catch(e){
      dispatch(openModal('При загрузки постов произошла ошибка'))
      navigate(-1)
    }
  }
  // ======== load user posts

  // ======== load user comments
  const loadComments = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/user/comments/${id}`)
      setComments(data);
      setLoading(false)
    } catch(e){
      dispatch(openModal('При коментариев постов произошла ошибка'))
      navigate(-1)
    }
  }
  // ======== load user comments

  // ======== load user favorite posts
  const loadFavorites = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/user/favorites/${id}`)
      setFavorites(data)
      setLoading(false)
    } catch (e) {
      dispatch(openModal('При загрузки избранных постов произошла ошибка'))
      navigate(-1)
    }
  }
  // ======== load user favorite posts

  // ======== load user subscribers
  const loadSubscribers = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/user/subs/${id}/subscribers`)
      setSubs(data)
      setLoading(false)
    } catch (e) {
      dispatch(openModal('При подписчиков постов произошла ошибка'))
      navigate(-1)
    }
  }
  // ======== load user subscribers

  // ======== load user subscriptions
  const loadSubscriptions = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/user/subs/${id}/subscriptions`)
      setSubs(data)
      setLoading(false)
    } catch (e) {
      dispatch(openModal('При подписок постов произошла ошибка'))
      navigate(-1)
    }
  }
  // ======== load user subscriptions

  // ======== load user profile
  const loadUser = async () => {
    try {
      const { data } = await axios.get(`/user/profile/${id}`)
      setUser(data)
      setLoading(false)
    } catch(e){
      dispatch(openModal('При загрузке пользователя произошла ошибка!'))
      navigate(-1)
    }
  }
  // ======== load user profile

  React.useEffect(() => {
    loadUser()
    if (category === 'posts') {
      loadPost()
    } else if (category === 'comments') {
      loadComments()
    } else if (category === 'favorites') {
      loadFavorites()
    } else if (category === 'subscribers') {
      loadSubscribers()
    } else if (category === 'subscriptions') {
      loadSubscriptions()
    }
  }, [id, category])
  // ======== laodUser

  const checkCategory = () => {
    if (category === 'profile') {
      if (user) {
        return (
          <UserInfo user={user} />
        )
      }
    } else if (category === 'posts') {
      if (posts.loading) {
        return (
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
        )
      } else {
        return (
          <PostsComponents posts={posts.items} />
        )
      }
    } else if (category === 'comments') {
      if (loading) {
        return (
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
        )
      } else {
        return (
          <UserComments comments={comments} />
        )
      }
    } else if (category === 'favorites') {
      if (loading) {
        return (
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
        )
      } else {
        return (
          <PostsComponents posts={favorites} />
        )
      }
    } else if (category === 'subscribers' || category === 'subscriptions') {
      if (loading) {
        return (
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
        )
      } else {
        return (
          <AuthorsList authors={subs} />
        )
      }
    }
  }

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
              {checkCategory()}
            </div>
            <UserSidebar user={user} />
          </div>
        </div>
      </div>
  )
}

export default UserPage