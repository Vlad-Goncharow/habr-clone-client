import React from 'react'
import PostsComponents from '../../components/PostsComponents'
import s from './Search.module.scss'
import { useAppDispatch } from '../../Hooks/useAppDispatch'
import { fetchCustomPosts } from '../../Redux/Slices/PostsSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../../Hooks/useAppSelector'
import Pagination from '../../components/Pagination'

function Search() {
  // ======== navigate
  const navigate = useNavigate()
  // ======== navigate

  // ======== input ref
  const inputRef = React.useRef<any>()
  // ======== input ref

  // ======== page 
  const {page} = useParams()
  // ======== page 

  // ======== posts
  const {posts} = useAppSelector(store => store.posts)
  // ======== posts

  // ======== dispatch
  const dispatch = useAppDispatch()
  // ======== dispatch

  // ======== search
  const formSubmit = React.useCallback(async (e: any) => {
    e.preventDefault()
    navigate('/search/1')
    dispatch(fetchCustomPosts(`/posts/search/${inputRef.current.value}/${page}`))
    inputRef.current.focus()
  },[page])

  React.useEffect(() => {
    inputRef.current.focus()

    if (inputRef.current.value){
      dispatch(fetchCustomPosts(`/posts/search/${inputRef.current.value}/${page}`))
      inputRef.current.focus()
    }
  }, [page])
  // ======== search

  return (
    <div className={s.page}>
      <div className='container'>
        <div className={s.wrapper}>
          <form onSubmit={formSubmit} action="" className={s.form}>
            <input ref={inputRef} type="text" />
            <div onClick={formSubmit} className={s.form__search}>
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="32" height="32" viewBox="0 0 32 32">
                <title>search</title>
                <path d="M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" />
              </svg>
            </div>
          </form>
          {
            inputRef.current?.value.length > 0 ?
              posts.loading === false &&
              <div className={s.posts}>
                <PostsComponents posts={posts.items} />
                <Pagination postsLength={posts.length} navigatePath={'/search'} />
              </div>
            :
              null
          }
          
        </div>
      </div>
    </div>
  )
}

export default Search