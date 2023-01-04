import moment from 'moment';
import 'moment/locale/ru';
import React from 'react';
import { Link } from 'react-router-dom';
import { CommentType } from '../../Types/CommentType';
import EmptyList from '../EmptyList';
import s from './UserComments.module.scss';

interface UserCommentsProps {
  comments: CommentType[] | []
}

const UserComments: React.FC<UserCommentsProps> = ({ comments }) => {
  return (
    <div className={s.wrapper}>
      {
        comments.length > 0 ?
          comments.map((el:CommentType) =>
            <div key={`${el._id}`} className={s.item}>
              <header className={s.item__header}>
                <Link to={`/post/${el.post._id}`}>{el.post.title}</Link>
              </header>
              <div className={s.author}>
                <div className={s.author__image}>
                  <img src={`${process.env.REACT_APP_SERVER_URL}${el.user.avatar}`} alt="" />
                </div>
                <Link to={`/user/${el.user._id}/profile`} className={s.author__name}>{el.user.nickName}</Link>
                <div className={s.item__date}>{moment(el.createdAt).locale('ru').format('LLL')}</div>
              </div>
              <p className={s.item__text}>
                {el.text}
              </p>
            </div>
          )
        :
          <EmptyList />
      }
    </div>
  )
}

export default UserComments