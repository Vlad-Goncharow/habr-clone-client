import React, { ChangeEvent } from 'react'
import { Link,useParams } from 'react-router-dom'

import s from './PostsNav.module.scss'
import classNames from 'classnames'

const PostCategories = [
  {
    typeRu: 'Разработка',
    typeEng: 'develop'
  }, {
    typeRu: 'Администрирование',
    typeEng: 'admin'
  }, {
    typeRu: 'Дизайн',
    typeEng: 'design'
  }, {
    typeRu: 'Менеджмент',
    typeEng: 'management'
  }, {
    typeRu: 'Маркетинг',
    typeEng: 'marketing'
  }, {
    typeRu: 'Научпоп',
    typeEng: 'popsci'
  }
]

interface PostsNavProps{
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const PostsNav: React.FC<PostsNavProps> = ({ handleChange }) => {
  // ======== posts params
  const {category,type} = useParams()
  // ======== posts params

  // ======== check current category
  const checkCategory = () => {
    const check = PostCategories.find(el => el.typeEng === category)

    if (check) {
      return (
        <h1 className={s.title}>{check.typeRu}</h1>
      )
    } else {
      return (
        <h1 className={s.title}>Все потоки</h1>
      )
    }
  }
  // ======== check current category

  return (
    <div className={s.wrapper}>
      <>
        {checkCategory()}
      </>
      <div className={s.category}>
        <Link
          to={`/flows/${category}/all`}
          className={classNames(s.category__item, {
            [s.category__item_active]: type === 'all'
          })}
        >
          Статьи
        </Link>
        <Link
          to={`/flows/${category}/news`}
          className={classNames(s.category__item, {
            [s.category__item_active]: type === 'news'
          })}
        // onClick={() => setCat('news')}
        >
          Новости
        </Link>
        <Link
          to={`/flows/${category}/habs`}
          className={classNames(s.category__item, {
            [s.category__item_active]: type === 'habs'
          })}
        >
          Хабы
        </Link>
        <Link
          to={`/flows/${category}/authors`}
          className={classNames(s.category__item, {
            [s.category__item_active]: type === 'authors'
          })}
        >
          Авторы
        </Link>
      </div>
      {
        type === 'habs' || type === 'authors'
        ?
          <div className={s.search}>
            <form action="" className={s.search__form}>
              <input type="text" placeholder='Пойск' onChange={handleChange} className={s.search__input}/>
              <button className={s.search__btn}>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="32" height="32" viewBox="0 0 32 32"><title>search</title><path d="M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"></path></svg>
              </button>
            </form>
          </div> 
        :
          <div className={s.filter}>
            Все подряд
          </div>
      }
    </div>
  )
}

export default PostsNav