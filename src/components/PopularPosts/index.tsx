import React from 'react'
import { PostType } from '../../Types/PostType'
import s from './PopularPosts.module.scss'
import moment from 'moment';
import 'moment/locale/ru';
import { Link, useParams } from 'react-router-dom';
import axios from '../../axios';

export const PopularPosts: React.FC = React.memo(() => {
  // ======== last popular posts
  const [lastPosts,setLastPost] = React.useState([])
  // ======== last popular posts

  // ======== current post
  const {id} = useParams()
  // ======== current post

  // ======== laod
  const load = async () => {
    const { data } = await axios.get(`/last/posts/${id}`)
    setLastPost(data)
  }

  React.useEffect(() => {
    load()
  },[id])
  // ======== laod

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>ПОСЛЕДНИЕ ЛУЧШИЕ ПУБЛИКАЦИИ</h2>
      <div className={s.items}>
        {
          lastPosts.length > 0 &&
          lastPosts.map((el:PostType) =>
            <div key={`${el._id}`} className={s.item}>
              <time className={s.item__date}>{moment(el?.createdAt).locale('ru').format('LLL')}</time>
              <Link to={`/post/${el._id}`} className={s.item__title}>{el.title}</Link>
              <footer className={s.item__footer}>
                <div className={s.item__footerItem}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M1.18 12C2.12 6.88 6.609 3 12 3s9.878 3.88 10.819 9c-.94 5.12-5.427 9-10.82 9-5.391 0-9.877-3.88-10.818-9ZM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                  </svg>
                  <span>{`${el.views}`}</span>
                </div>
                <div className={s.item__footerItem}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.25 4.5H3.75A1.5 1.5 0 0 0 2.25 6v14.887a1.472 1.472 0 0 0 .872 1.36 1.5 1.5 0 0 0 1.594-.206l2.972-2.503L20.25 19.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5Z" />
                  </svg>
                  <span>{`${el.comments ? el.comments.length : 0}`}</span>
                </div>
                <div className={s.item__footerItem}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.25 3H6.75a1.5 1.5 0 0 0-1.5 1.5V21a.76.76 0 0 0 .384.656.712.712 0 0 0 .366.094.74.74 0 0 0 .394-.113L12 18.131l5.597 3.506a.779.779 0 0 0 .769.02.76.76 0 0 0 .384-.657V4.5a1.5 1.5 0 0 0-1.5-1.5Z" />
                  </svg>
                  <span>{`${el.favorites}`}</span>
                </div>
              </footer>
            </div>
          )
        }
      </div>
    </div>
  )
})