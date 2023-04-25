import moment from 'moment';
import 'moment/locale/ru';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { PopularPosts } from '../../components/PopularPosts';
import PostAuthor from '../../components/PostAuthor';
import PostComments from '../../components/PostComments';
import Sidebar from '../../components/Sidebar';
import s from './Post.module.scss';

import classNames from 'classnames';
import draftToHtml from 'draftjs-to-html';
import parse from 'html-react-parser';
import { CirclesWithBar } from 'react-loader-spinner';
import { useAppDispatch } from '../../Hooks/useAppDispatch';
import { useAppSelector } from '../../Hooks/useAppSelector';
import { fetchPostAddFavorite, fetchPostRemoveFavorite } from '../../Redux/Slices/AuthSlice';
import { openModal } from '../../Redux/Slices/ErrorModalSlice';
import { addFavorite, fetchtPost, removeFavorite } from '../../Redux/Slices/PostSlice';
import { HabType } from '../../Types/HabType';

function Post() {
  // ======== dispatch
  const dispatch = useAppDispatch()
  // ======== dispatch

  // ======== current user
  const { user } = useAppSelector(store => store.auth)
  // ======== current user

  // ======== current post
  const { post } = useAppSelector(store => store.post)
  // ======== current post

  // ======== current post id
  const {id} = useParams()
  // ======== current post id

  // ======== load post
  const load = async () => {
    const data = await dispatch(fetchtPost({id}))
    if (data.type === "post/fetchtPost/rejected"){
      dispatch(openModal(data.payload))
    }
  }

  React.useEffect(() => {
    load()
  }, [id])
  // ======== load post

  // ======== add post favorite
  const add = async () => {
    if(post.data){
      const data = await dispatch(fetchPostAddFavorite(post.data))
      dispatch(addFavorite(data.payload))
    }
  }
  // ======== add post favorite

  // ======== remove post favorite
  const remove = async () => {
    if(post.data){
      const data = await dispatch(fetchPostRemoveFavorite(post.data))
      dispatch(removeFavorite(data.payload))
    }
  }
  // ======== remove post favorite

  // ======== check is post add favofite
  const checkClickFavorite = async () => {
    if (check) {
      remove()
    } else {
      add()
    }
  }

  const check = React.useMemo(() => {
    if(post.data){
      const isCheck = user.auth?.favoritesPosts.some((el:any) => el === post.data?._id)

      if (isCheck) {
        return true
      } else {
        return false
      }
    }
  }, [post, user.auth?.favoritesPosts])
  // ======== check is post add favofite

  return (
    post.loading 
    ?
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
        <div className={'container'}>
          <div className={s.wrapper}>
            <div className={s.left}>
              <div className={s.post}>
                <header className={s.post__header}>
                  <div className={s.post__authorImg}>
                    <img src={`${process.env.REACT_APP_SERVER_URL}${post.data?.user.avatar}`} alt="" />
                  </div>
                  <Link to={`/user/${post.data?.user._id}/profile`} className={s.post__authorName}>{post.data?.user.nickName}</Link>
                  <div className={s.post__date}>{moment(post.data?.createdAt).locale('ru').format('LLL')}</div>
                </header>
                <h2 className={s.post__title}>{post.data?.title}</h2>
                <div className={s.post__img}>
                  <img src={`${process.env.REACT_APP_SERVER_URL}${post.data?.image}`} alt="" />
                </div>
                <div className={s.post__text}>
                  {
                    parse(draftToHtml(
                      JSON.parse(post.data?.text),
                    ))
                  }
                </div>
                <div className={s.post__info}>
                  <span>Теги</span>
                  <ul>
                    {
                      post.data?.tags.map((el:String) =>
                        <li key={`${el}`}>
                          <div>{el}</div>
                        </li>
                      )
                    }
                  </ul>
                </div>
                <div className={s.post__info}>
                  <span>Хабы</span>
                  <ul>
                    {
                      post.data?.habs.map((el: HabType) =>
                        <li key={`${el}`}>
                          <Link to={`/hab/${el._id}/posts/1`}>{el.title}</Link>
                        </li>
                      )
                    }
                  </ul>
                </div>
                <footer className={s.post__footer}>
                  <div className={s.post__footerItem}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M1.18 12C2.12 6.88 6.609 3 12 3s9.878 3.88 10.819 9c-.94 5.12-5.427 9-10.82 9-5.391 0-9.877-3.88-10.818-9ZM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                    </svg>
                    <span>{`${post.data?.views}`}</span>
                  </div>
                  <div className={s.post__footerItem}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.25 4.5H3.75A1.5 1.5 0 0 0 2.25 6v14.887a1.472 1.472 0 0 0 .872 1.36 1.5 1.5 0 0 0 1.594-.206l2.972-2.503L20.25 19.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5Z" />
                    </svg>
                    <span>{`${post.data?.comments ? post.data?.comments.length : 0}`}</span>
                  </div>
                  <div onClick={checkClickFavorite} className={classNames(s.post__footerItem, {
                    [s.post__footerItem_active]: check
                  })}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.25 3H6.75a1.5 1.5 0 0 0-1.5 1.5V21a.76.76 0 0 0 .384.656.712.712 0 0 0 .366.094.74.74 0 0 0 .394-.113L12 18.131l5.597 3.506a.779.779 0 0 0 .769.02.76.76 0 0 0 .384-.657V4.5a1.5 1.5 0 0 0-1.5-1.5Z" />
                    </svg>
                    <span>{`${post.data?.favorites}`}</span>
                  </div>
                </footer>
              </div>
              <PostAuthor user={post.data?.user} />
              <PostComments comments={post.data?.comments}/>
              <PopularPosts />
            </div>
            <Sidebar category={post.data?.category} />
          </div>
        </div>
      </div>
  )
}

export default Post