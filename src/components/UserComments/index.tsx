import moment from 'moment';
import 'moment/locale/ru';
import React from 'react';
import { Dna } from 'react-loader-spinner';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from '../../axios';
import { useAppDispatch } from '../../Hooks/useAppDispatch';
import { openModal } from '../../Redux/Slices/ErrorModalSlice';
import { CommentType } from '../../Types/CommentType';
import EmptyList from '../EmptyList';
import Pagination from '../Pagination';
import s from './UserComments.module.scss';

const UserComments: React.FC = () => {
  // ======== navigate
  const navigate = useNavigate()
  // ======== navigate

  // ======== dispatch
  const dispatch = useAppDispatch()
  // ======== dispatch

  // ======== comments
  const [data, setData] = React.useState<any | []>([])
  // ======== comments

  // ======== loading
  const [loading, setLoading] = React.useState(true)
  // ======== loading

  // ======== user ID
  const { id, page } = useParams()
  // ======== user ID

  // ======== loadComments
  const loadComments = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/user/comments/${id}/${page}`)
      setData(data);
      setLoading(false)
    } catch (e) {
      dispatch(openModal('При коментариев постов произошла ошибка'))
      navigate(-1)
    }
  }

  React.useEffect(() => {
    loadComments()
  }, [id, page])
  // ======== loadComments

  return (
    loading ?
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
      data?.comments.length > 0 ?
        <div className={s.wrapper}>
          {
            data?.comments.map((el: CommentType) =>
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
          }
          <Pagination postsLength={data.length} navigatePath={`/user/${id}/comments`} />
        </div>
      : 
        <EmptyList />
  )
}

export default UserComments