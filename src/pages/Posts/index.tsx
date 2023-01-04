import React, { ChangeEvent } from 'react'
import PostsNav from '../../components/PostsNav'
import Sidebar from '../../components/Sidebar'
import s from './Posts.module.scss'

import { Dna } from 'react-loader-spinner'
import { useParams } from 'react-router-dom'
import axios from '../../axios'
import AuthorsList from '../../components/AuthorsList'
import HabsList from '../../components/HabsList'
import PostsComponents from '../../components/PostsComponents'
import { useAppDispatch } from '../../Hooks/useAppDispatch'
import { useAppSelector } from '../../Hooks/useAppSelector'
import { openModal } from '../../Redux/Slices/ErrorModalSlice'
import { fetchGetAllPosts } from '../../Redux/Slices/PostsSlice'
import { HabType } from '../../Types/HabType'
import { UserType } from '../../Types/UserType'

import { useDebounce } from 'usehooks-ts'
function Posts() {
  // ======== posts params
  const { category, type } = useParams()
  // ======== posts params

  // ======== dispatch
  const dispatch = useAppDispatch()
  // ======== dispatch

  // ======== all posts
  const { posts } = useAppSelector(store => store.posts)
  // ======== all posts

  // ======== req loading
  const [loading, setLoading] = React.useState(false)
  // ======== req loading

  // ======== habs list
  const [habs, setHabs] = React.useState<HabType[] | []>([])
  // ======== habs list

  // ======== authors list
  const [authors, setAuthors] = React.useState<UserType[] | []>([])
  // ======== authors list

  // ======== input value
  const [value, setValue] = React.useState<string>('')
  // ======== input value

  // ======== deboubce input value
  const debouncedValue = useDebounce<string>(value, 500)
  // ======== deboubce input value

  // ======== change input value
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }
  // ======== change input value

  // ======== load post or news
  const loadPostOrNews = async () => {
    const data = await dispatch(fetchGetAllPosts({ category, type }))
    
    if (data.type === 'posts/fetchGetAllPosts/rejected') {
      dispatch(openModal(data.payload))
    }
  }
  // ======== load post or news

  // ======== load habs
  const findHabs = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/habs/search/${category}/${debouncedValue ? debouncedValue : 'all'}`)
      setLoading(false)
      setHabs(data)
    } catch(e){
      dispatch(openModal('При загрузки хабов произошла ошибка!'))
    }
  }
  // ======== load habs

  // ======== load authors
  const findAuthors = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/authors/search/${category}/${debouncedValue ? debouncedValue : 'all'}`)
      setLoading(false)
      setAuthors(data)
    } catch(e){
      dispatch(openModal('При загрузки авторов произошла ошибка!'))
    }
  }
  // ======== load authors

  // ======== load posts | news | habs | authors
  React.useEffect(() => {
    setValue('')

    if (type === 'all' || type === 'news') {
      loadPostOrNews()
    }
  }, [category, type])
  React.useEffect(() => {
    if (type === 'habs') {
      findHabs()
    } else if (type === 'authors') {
      findAuthors()
    }
  }, [debouncedValue, category, type])
  // ======== load posts | news | habs | authors

  // ======== return type posts | news | habs | authors
  const ReturnType = () => {
    if (type === 'all' || type === 'news') {
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
    }

    if (type === 'habs') {
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
          <HabsList habs={habs} />
        )
      }
    }

    if (type === 'authors') {
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
          <AuthorsList authors={authors} />
        )
      }
    }
  }
  // ======== return type posts | news | habs | authors

  return (
    <div className={s.page}>
      <div className={'container'}>
        <div className={s.wrapper}>
          <div className={s.left}>
            <PostsNav handleChange={handleChange} />
            {ReturnType()}
          </div>
          <Sidebar category={category} />
        </div>
      </div>
    </div>
  )
}

export default Posts