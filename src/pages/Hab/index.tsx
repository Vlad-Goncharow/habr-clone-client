import React, { ChangeEvent } from 'react'
import { Dna } from 'react-loader-spinner'
import { useParams } from 'react-router-dom'
import { useDebounce } from 'usehooks-ts'
import axios from '../../axios'
import AuthorsList from '../../components/AuthorsList'
import HabNav from '../../components/HabNav'
import PostsComponents from '../../components/PostsComponents'
import Sidebar from '../../components/Sidebar'
import { useAppDispatch } from '../../Hooks/useAppDispatch'
import { openModal } from '../../Redux/Slices/ErrorModalSlice'
import { HabType } from '../../Types/HabType'
import { PostType } from '../../Types/PostType'
import { UserType } from '../../Types/UserType'
import s from './Hab.module.scss'
import { fetchCustomPosts } from '../../Redux/Slices/PostsSlice'
import { useAppSelector } from '../../Hooks/useAppSelector'
import Pagination from '../../components/Pagination'

function Hab() {
  // ======== dispatch
  const dispatch = useAppDispatch()
  // ======== dispatch

  // ======== posts params
  const { habId,type,page } = useParams()
  // ======== posts params

  // ======== loading
  const [loading,setLoading] = React.useState(false)
  // ======== loading

  const {posts} = useAppSelector(store => store.posts)

  // ======== authors
  const [authors,setAuthors] = React.useState<UserType[] | []>([])
  // ======== authors

  // ======== current hab
  const [hab, setHab] = React.useState<HabType | null>(null)
  // ======== current hab

  // ======== input value search authors
  const [value, setValue] = React.useState<string>('')
  const debouncedValue = useDebounce<string>(value, 500)
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }
  // ======== input value search authors

  // ======== load hab posts
  const loadPost = async () => {
    try {
      dispatch(fetchCustomPosts(`/habs/posts/${habId}/${page}`))
    } catch(e) {
      dispatch(openModal('При загрузке постов произошла ошибка!'))
    }
  }
  // ======== load hab posts

  // ======== load hab authors
  const loadAuthors = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/habs/authors/${habId}/${debouncedValue ? debouncedValue : 'all'}`)
      setAuthors(data)
      setLoading(false)
    } catch(e){
      dispatch(openModal('При загрузке авторов произошла ошибка!'))
    }
  }
  // ======== load hab authors

  // ======== load hab
  const loadHab = async () => {
    try {
      const { data } = await axios.get(`/habs/one/${habId}`)
      setHab(data)
    } catch(e){
      dispatch(openModal('При хаба произошла ошибка!'))
    }
  }
  // ======== load hab

  React.useEffect(() => {
    loadHab()
    if(type === 'authors'){
      loadAuthors()
    } else if(type === 'posts'){
      loadPost()
    }
    window.scrollTo(0, 0)
  }, [debouncedValue, type,habId,page])

  // ======== check post load or authors
  const check = () => {
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
      if (type === 'posts') {
        return (
          <>
            <PostsComponents posts={posts.items} />
            <Pagination postsLength={posts.length} navigatePath={`/hab/${habId}/posts`} />
          </>
        )
      } else if (type === 'authors') {
        return (
          <AuthorsList authors={authors} />
        )
      }
    }
  }
  // ======== check post load or authors
  return (
    <div className={s.page}>
      <div className={'container'}>
        <div className={s.wrapper}>
          <div className={s.left}>
            <HabNav handleChange={handleChange} hab={hab} />
            {check()}
          </div>
          <Sidebar category={hab?.category} />
        </div>
      </div>
    </div>
  )
}

export default Hab