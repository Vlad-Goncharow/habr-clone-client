import classNames from 'classnames';
import moment from 'moment';
import 'moment/locale/ru';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { CommentType } from '../../Types/CommentType';
import s from './PostComments.module.scss';

import { useAppDispatch } from '../../Hooks/useAppDispatch';
import { useAppSelector } from '../../Hooks/useAppSelector';
import { fetchtAddComment } from '../../Redux/Slices/PostSlice';

interface PostCommentsProps {
  comments:CommentType[] | undefined
}

const PostComments: React.FC<PostCommentsProps> = ({ comments }) => {
  // ======== current user
  const {user} = useAppSelector(store => store.auth)
  // ======== current user

  // ======== dispatch
  const dispatch = useAppDispatch()
  // ======== dispatch

  // ======== post id
  const {id} = useParams()
  // ======== post id

  // ======== input value
  const [inputValue,setInputValue] = React.useState('')
  // ======== input value

  // ======== add new comment
  const clickSubmit = async (e:any) => {
    e.preventDefault()

    if (inputValue.length >= 5) {
      dispatch(fetchtAddComment({ id, inputValue }))
      setInputValue('')
    }
  }
  // ======== add new comment

  return (
    <div className={s.wrapper}>
      <div className={s.comments}>
        <h2 className={s.comments__title}>Коментарии</h2>
        <div className={s.row}>
          {
            comments &&
            comments.map(item => 
              <div key={`${item._id}`} className={s.comment}>
                <header className={s.comment__header}>
                  <div className={s.comment__authorImg}>
                    <img src={`${process.env.REACT_APP_SERVER_URL}${item.user.avatar}`} alt="" />
                  </div>
                  <div className={s.comment__authorName}>{item.user.nickName}</div>
                  <div className={s.comment__date}>{moment(item?.createdAt).locale('ru').format('LLL')}</div>
                </header>
                <main className={s.comment__text}>{item.text}</main>
              </div>
            )
          }
          
        </div>
        {
          user !== null &&
          <form onSubmit={clickSubmit} action="" className={s.form}>
            <h3 className={s.form__title}>Ваш Коментарий</h3>
            <textarea value={inputValue} onChange={(e) => setInputValue(e.target.value)} className={s.form__input} />
            <div className={s.form__bottom}>
              <div className={s.buttons}>
                <button onClick={clickSubmit} className={classNames(s.buttons__btn, {
                  [s.buttons__btn_disable]: inputValue.length < 5,
                  [s.buttons__btn_active]: inputValue.length >= 5
                })}>Отправить</button>
              </div>
              {/* <div className={s.form__checkbox}>
              <input id='mark' type="checkbox" />
              <label htmlFor="mark">Markdown</label>
            </div> */}
            </div>
          </form>
        }
      </div>
      {
        user === null &&
        <div className={s.auth}>
          <span>Только полноправные пользователи могут оставлять комментарии. <Link to='/login'>Войдите</Link>, пожалуйста.</span>
        </div>
      }
    </div>
  )
}

export default PostComments