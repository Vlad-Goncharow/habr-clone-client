import React from 'react'
import s from './HabPosts.module.scss'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../Hooks/useAppSelector'
import { useAppDispatch } from '../../Hooks/useAppDispatch'
import { fetchCustomPosts } from '../../Redux/Slices/PostsSlice'
import { openModal } from '../../Redux/Slices/ErrorModalSlice'
import PostsComponents from '../PostsComponents'
import { Dna } from 'react-loader-spinner'
import Pagination from '../Pagination'

const HabPosts:React.FC = () => {
  // ======== dispatch
  const dispatch = useAppDispatch()
  // ======== dispatch
  
  // ======== posts params
  const { habId, page } = useParams()
  // ======== posts params

  // ======== posts
  const { posts } = useAppSelector(store => store.posts)
  // ======== posts

  const loadPost = async () => {
    try {
      dispatch(fetchCustomPosts(`/habs/posts/${habId}/${page}`))
    } catch (e) {
      dispatch(openModal('При загрузке постов произошла ошибка!'))
    }
  }

  React.useEffect(() => {
    loadPost()
    window.scrollTo(0, 0)
  }, [habId, page])

  return (
    posts.loading ?
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
        <PostsComponents posts={posts.items} />
        <Pagination postsLength={posts.length} navigatePath={`/hab/${habId}/posts`} />
      </>
  )
}

export default HabPosts