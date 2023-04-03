import React from 'react'
import { Dna } from 'react-loader-spinner'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../../Hooks/useAppDispatch'
import { useAppSelector } from '../../Hooks/useAppSelector'
import { openModal } from '../../Redux/Slices/ErrorModalSlice'
import { fetchCustomPosts } from '../../Redux/Slices/PostsSlice'
import Pagination from '../Pagination'
import PostsComponents from '../PostsComponents'
import PostsNav from '../PostsNav'
import s from './HomePosts.module.scss'

function HomePosts() {
  // ======== posts params
  const { category, type, page } = useParams()
  // ======== posts params

  // ======== dispatch
  const dispatch = useAppDispatch()
  // ======== dispatch
  
  // ======== all posts
  const { posts } = useAppSelector(store => store.posts)
  // ======== all posts

  // ======== load post or news
  const loadPostOrNews = async () => {
    const data = await dispatch(fetchCustomPosts(`/posts/${category}/${type}/${page}`))

    if (data.type === 'posts/fetchCustomPosts/rejected') {
      dispatch(openModal(data.payload))
    }
  }

  React.useEffect(() => {
    if (type === 'all' || type === 'news') {
      window.scrollTo(0, 0)
      loadPostOrNews()
    }
  }, [ type, page, category])
  // ======== load post or news
  
  return (
    <>
      <>
        <PostsNav
          value={null}
          setValue={null}
          type={String(type)}
        />
        {
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
              <Pagination
                postsLength={posts.length}
                navigatePath={`/flows/${category}/${type}`}
              />
            </>
        }
      </>
    </>
  )
}

export default HomePosts