import classNames from 'classnames';
import draftToHtml from 'draftjs-to-html';
import parse from 'html-react-parser';
import moment from 'moment';
import 'moment/locale/ru';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../Hooks/useAppDispatch';
import { useAppSelector } from '../../Hooks/useAppSelector';
import { fetchPostAddFavorite, fetchPostRemoveFavorite } from '../../Redux/Slices/AuthSlice';
import { addPostFavorite, removePostFavorite } from '../../Redux/Slices/PostsSlice';
import { PostType } from '../../Types/PostType';
import s from './PostItem.module.scss';

type PostItemProps = {
  item: PostType
}

const PostItem: React.FC<PostItemProps> = ({item}) => {
  // ======== current user
  const {user} = useAppSelector(store => store.auth)
  // ======== current user

  // ======== dispatch
  const dispatch = useAppDispatch()
  // ======== dispatch

  // ======== add post favorite
  const addFavorite = async () => {
    const data = await dispatch(fetchPostAddFavorite(item))
    dispatch(addPostFavorite(data.payload))
  }
  // ======== add post favorite
  
  // ======== remove post favorite
  const removeFavorite = async () => {
    const data = await dispatch(fetchPostRemoveFavorite(item))
    dispatch(removePostFavorite(data.payload))
  }
  // ======== remove post favorite

  // ======== check is post add favofite
  const checkClickFavorite = () => {
    if(check){
      removeFavorite()
    } else {
      addFavorite()
    }
  }

  const check = React.useMemo(() => {
    const isCheck = user.auth?.favoritesPosts.some((el:any) => el === item._id)
    if (isCheck){
      return true
    } else {
      return false
    }
  }, [item._id, user.auth?.favoritesPosts])
  // ======== check is post add favofite
  
  return (
    <div className={s.item}>
      <header className={s.item__header}>
        <div className={s.item__authorImg}>
          <img src={`${process.env.REACT_APP_SERVER_URL}${item?.user?.avatar}`} alt=""/>
        </div>
        <Link to={`/user/${item.user._id}/profile`} className={s.item__authorName}>{item.user.nickName}</Link>
        <div className={s.item__date}>{moment(item?.createdAt).locale('ru').format('LLL')}</div>
      </header>
      <Link to={`/post/${item._id}`} className={s.item__title}>{item.title}</Link>
      <div className={s.item__tags}>
        {
          item.tags.map((tag:String) =>
            <span key={`${tag}`}>{tag}</span>
          )
        }
      </div>
      <div className={s.item__img}>
        <img src={`${process.env.REACT_APP_SERVER_URL}${item.image}`} alt=""/>
      </div>
      <div className={s.item__text}>
        {/* <Editor onChange={onChange} editorState={editorState} /> */}
        {
          parse(draftToHtml(
            JSON.parse(item.text),
          ))
        }
      </div>
      <Link to={`/post/${item._id}`} className={s.item__link}>Читать далее</Link>
      <footer className={s.item__footer}>
        <div className={s.item__footerItem}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M1.18 12C2.12 6.88 6.609 3 12 3s9.878 3.88 10.819 9c-.94 5.12-5.427 9-10.82 9-5.391 0-9.877-3.88-10.818-9ZM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
          </svg>
          <span>{`${item.views}`}</span>
        </div> 
        <div className={s.item__footerItem}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.25 4.5H3.75A1.5 1.5 0 0 0 2.25 6v14.887a1.472 1.472 0 0 0 .872 1.36 1.5 1.5 0 0 0 1.594-.206l2.972-2.503L20.25 19.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5Z" />
          </svg>
          <span>{`${item.comments ? item.comments.length : 0}`}</span>
        </div> 
        <div onClick={checkClickFavorite} className={classNames(s.item__footerItem,{
          [s.item__footerItem_active]:check
        })}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.25 3H6.75a1.5 1.5 0 0 0-1.5 1.5V21a.76.76 0 0 0 .384.656.712.712 0 0 0 .366.094.74.74 0 0 0 .394-.113L12 18.131l5.597 3.506a.779.779 0 0 0 .769.02.76.76 0 0 0 .384-.657V4.5a1.5 1.5 0 0 0-1.5-1.5Z" />
          </svg>
          <span>{`${Number(item.favorites)}`}</span>
        </div>
      </footer>
    </div>
  )
}

export default PostItem