import React from 'react'
import s from './HabAuthors.module.scss'
import { useOutletContext, useParams } from 'react-router-dom'
import axios from '../../axios'
import { useAppDispatch } from '../../Hooks/useAppDispatch'
import { openModal } from '../../Redux/Slices/ErrorModalSlice'
import { Dna } from 'react-loader-spinner'
import AuthorsList from '../AuthorsList'
import Pagination from '../Pagination'

const HabAuthors:React.FC = () => {
  // ======== dispatch
  const dispatch = useAppDispatch()
  // ======== dispatch

  // ======== params
  const { habId, page } = useParams()
  // ======== params

  // ======== debouncedValue
  const [debouncedValue]:any = useOutletContext()
  // ======== debouncedValue

  // ======== laoding
  const [loading,setLoading] = React.useState(true)
  // ======== laoding

  // ======== authors
  const [authors, setAuthors] = React.useState<any>([])
  // ======== authors

  const loadAuthors = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/habs/authors/${habId}/${debouncedValue ? debouncedValue : 'all'}/${page}`)
      setAuthors(data)
      setLoading(false)
    } catch (e) {
      dispatch(openModal('При загрузке авторов произошла ошибка!'))
    }
  }

  React.useEffect(() => {
    loadAuthors()
    window.scrollTo(0, 0)
  }, [debouncedValue, habId, page])

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
      <>
        <AuthorsList authors={authors.authors} />
        <Pagination postsLength={authors.length} navigatePath={`/hab/${habId}/authors`} />
      </>
  )
}

export default HabAuthors