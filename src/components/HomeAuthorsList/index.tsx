import React from 'react'
import { Dna } from 'react-loader-spinner'
import { useNavigate, useParams } from 'react-router-dom'
import { useDebounce } from 'usehooks-ts'
import axios from '../../axios'
import { useAppDispatch } from '../../Hooks/useAppDispatch'
import { openModal } from '../../Redux/Slices/ErrorModalSlice'
import AuthorsList from '../AuthorsList'
import Pagination from '../Pagination'
import PostsNav from '../PostsNav'
import s from './HomeAuthorsList.module.scss'

function HomeAuthorsList() {
  // ========navigate
  const navigate = useNavigate()
  // ======== navigate
  
  // ======== dispatch
  const dispatch = useAppDispatch()
  // ======== dispatch

  // ======== posts params
  const { category,  page } = useParams()
  // ======== posts params
  
  // ======== authors list
  const [authors, setAuthors] = React.useState<any>([])
  // ======== authors list

  // ======== authors loading
  const [authorsLoading, setAuthorsLoading] = React.useState(true)
  // ======== authors loading

  // ======== input value
  const [value, setValue] = React.useState<string>('')
  // ======== input value

  // ======== deboubce input value
  let debouncedValue = useDebounce<string>(value, 500)
  // ======== deboubce input value

  // ======== load authors
  const findAuthors = async () => {
    try {
      setAuthorsLoading(true)
      const { data } = await axios.get(`/authors/search/${category}/${debouncedValue ? debouncedValue : 'all'}/${page}`)
      setAuthors(data)
      setAuthorsLoading(false)
    } catch (e) {
      dispatch(openModal('При загрузки авторов произошла ошибка!'))
    }
  }
  // ======== load authors

  // ======== load 1 page when user searched
  React.useEffect(() => {
    navigate(`/flows/${category}/authors/1`)
  }, [debouncedValue])
  // ======== load 1 page when user searched

  // ======== load authors
  React.useEffect(() => {
    findAuthors()
  }, [debouncedValue, category, page])
  // ======== load authors

  return (
    <>
      <PostsNav
        value={value}
        setValue={setValue}
        type={'authors'}
      />
      {
        authorsLoading ?
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
            <AuthorsList authors={authors.items} />
            <Pagination
              postsLength={authors.length}
              navigatePath={`/flows/${category}/authors`}
            />
          </>
      }
    </>
  )
}

export default HomeAuthorsList