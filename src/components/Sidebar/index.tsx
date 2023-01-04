import React from 'react';
import s from './Sidebar.module.scss';

import moment from 'moment';
import 'moment/locale/ru';
import { Link, useParams } from 'react-router-dom';
import axios from '../../axios';
import { HabType } from '../../Types/HabType';
import { PostType } from '../../Types/PostType';

interface SidebarProps{
  category:String | undefined
}

const Sidebar: React.FC<SidebarProps> = ({ category }) => {
  // ======== open posts
  const { id } = useParams()
  // ======== open posts

  // ======== habs list
  const [habs,setHabs] = React.useState<HabType[] | []>([])
  // ======== habs list

  // ======== popular posts
  const [posts,setPosts] = React.useState<PostType[] | []>([])
  // ======== popular posts

  // ======== load sidebar data
  const load = async () => {
    if (category && id === undefined){
      const { data } = await axios.get(`/habs/${category}`)
      setHabs(data)
    }
    
    if(category){
      const { data } = await axios.get(`/posts/popular/${category}`)
      setPosts(data)
    }
  }

  React.useEffect(() => {
    load()
  }, [id, category])
  // ======== load sidebar data

  return (
    <div className={s.sidebar}>
      {
        habs.length > 0 &&
        <section className={s.sidebar__section}>
          <header className={s.sidebar__title}>Хабы</header>
          <div className={s.sidebar__row}>
            {
              habs.map((hab: HabType) =>
                <div key={`${hab._id}`} className={s.hab}>
                  <div className={s.hab__img}>
                    <img src={`${process.env.REACT_APP_SERVER_URL}${hab.image}`} alt="" />
                  </div>
                  <div className={s.hab__info}>
                    <Link to={`/hab/${hab._id}/posts`} className={s.hab__title}>{hab.title}</Link>
                    <div className={s.hab__stats}>
                      <span>{hab.authors.length} авторов</span>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
          <Link to={`/flows/${category}/habs`} className={s.hab__all}>Все хабы</Link>
        </section>
      }
      {
        posts.length > 0 &&
        <section className={s.sidebar__section}>
          <header className={s.sidebar__title}>Лучшие публикации</header>
          <div className={s.sidebar__row}>
            {
              posts.map((el: PostType) =>
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
                  </footer>
                </div>
              )
            }
          </div>
        </section>
      }
    </div>
  )
}

export default Sidebar