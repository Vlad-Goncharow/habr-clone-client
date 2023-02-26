import React from 'react'
import { Dna } from 'react-loader-spinner'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDebounce } from 'usehooks-ts'
import axios from '../../axios'
import { useAppDispatch } from '../../Hooks/useAppDispatch'
import { openModal } from '../../Redux/Slices/ErrorModalSlice'
import { HabType } from '../../Types/HabType'
import EmptyList from '../EmptyList'
import Pagination from '../Pagination'
import PostsNav from '../PostsNav'
import s from './HabsList.module.scss'


const HabsList: React.FC = () => {
  // ========navigate
  const navigate = useNavigate()
  // ======== navigate
  
  // ======== posts params
  const { category, page } = useParams()
  // ======== posts params

  // ======== dispatch
  const dispatch = useAppDispatch()
  // ======== dispatch

  // ======== habs loading
  const [habsLoading, sethabsLoading] = React.useState(true)
  // ======== habs loading

  // ======== habs list
  const [habs, setHabs] = React.useState<any>([])
  // ======== habs list

  // ======== input value
  const [value, setValue] = React.useState<string>('')
  // ======== input value

  // ======== deboubce input value
  let debouncedValue = useDebounce<string>(value, 500)
  // ======== deboubce input value
  
  // ======== load habs
  const findHabs = async () => {
    try {
      sethabsLoading(true)
      const { data } = await axios.get(`/habs/search/${category}/${value ? value : 'all'}/${page}`)
      setHabs(data)
      sethabsLoading(false)
    } catch (e) {
      dispatch(openModal('При загрузки хабов произошла ошибка!'))
    }
  }
  // ======== load habs

  // ======== load 1 page when user searched
  React.useEffect(() => {
    navigate(`/flows/${category}/habs/1`)
  }, [debouncedValue])
  // ======== load 1 page when user searched

  // ======== load habs
  React.useEffect(() => {
    findHabs()
  }, [debouncedValue, category, page])
  // ======== load habs

  return (
    <>
      <PostsNav
        value={value}
        setValue={setValue}
        type={'habs'}
      />
      <>
        { 
          habsLoading ?
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
            habs.length > 0 ?
              <>
                <div className={s.wrapper}>
                  <header className={s.header}>
                    <div className={s.header__left}>
                      <span>Названию</span>
                    </div>
                    <div className={s.header__right}>
                      <span>Рейтинг</span>
                      <span>Подписчики</span>
                    </div>
                  </header>
                  <div className={s.list}>
                    {
                      habs.items.map((hab: HabType) =>
                        <div key={`${hab._id}`} className={s.item}>
                          <div className={s.item__left}>
                            <div className={s.item__image}>
                              <img src={`${process.env.REACT_APP_SERVER_URL}${hab.image}`} alt="" />
                            </div>
                            <div className={s.item__info}>
                              <Link to={`/hab/${hab._id}/posts`} className={s.item__title}>{hab.title}</Link>
                              <p className={s.item__descr}>{hab.descr}</p>
                            </div>
                          </div>
                          <div className={s.item__right}>
                            <div className={s.item__stat}>
                              <span>{`${hab.rating}`}</span>
                            </div>
                            <div className={s.item__stat}>
                              <span>{hab.subscribers !== undefined ? `${hab.subscribers.length}` : '0'}</span>
                            </div>
                          </div>
                        </div>
                      )
                    }

                  </div>
                </div>
                <Pagination
                  postsLength={habs.length}
                  navigatePath={`/flows/${category}/habs`}
                />
              </>
            :
              <EmptyList />
        }
      </>
    </>
  )
}

export default HabsList