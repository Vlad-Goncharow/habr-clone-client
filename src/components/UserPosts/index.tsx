import React from 'react'
import { Dna } from 'react-loader-spinner'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../Hooks/useAppDispatch'
import { useAppSelector } from '../../Hooks/useAppSelector'
import { openModal } from '../../Redux/Slices/ErrorModalSlice'
import { fetchUserPosts } from '../../Redux/Slices/PostsSlice'
import Pagination from '../Pagination'
import PostsComponents from '../PostsComponents'
import s from './UserPosts.module.scss'

function UserPosts() {
  // ======== dispatch
  const dispatch = useAppDispatch()
  // ======== dispatch

  // ======== navigate
  const navigate = useNavigate()
  // ======== navigate

  // ======== user posts
  const { posts } = useAppSelector(store => store.posts)
  // ======== user posts
  
  // ======== url params
  const {id,page} = useParams()
  // ======== url params

  // ======== load posts
  const loadPost = async () => {
    try {
      dispatch(fetchUserPosts({ id, page }))
    } catch (e) {
      dispatch(openModal('При загрузки постов произошла ошибка'))
      navigate(-1)
    }
  }

  React.useEffect(()=>{
    loadPost()
  },[id,page])
  // ======== load posts

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
      <Pagination postsLength={posts.length} navigatePath={`/user/${id}/posts`} />
    </>
  )
}

export default UserPosts