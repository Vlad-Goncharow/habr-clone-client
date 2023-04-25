import React, { ChangeEvent } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useDebounce } from 'usehooks-ts'
import { useAppDispatch } from '../../Hooks/useAppDispatch'
import { openModal } from '../../Redux/Slices/ErrorModalSlice'
import { HabType } from '../../Types/HabType'
import axios from '../../axios'
import HabNav from '../../components/HabNav'
import Sidebar from '../../components/Sidebar'
import s from './Hab.module.scss'

function Hab() {
  // ======== dispatch
  const dispatch = useAppDispatch()
  // ======== dispatch

  // ======== posts params
  const { habId } = useParams()
  // ======== posts params

  // ======== current hab
  const [hab, setHab] = React.useState<HabType | null>(null)
  // ======== current hab

  // ======== input value search authors
  const [value, setValue] = React.useState<string>('')
  const debouncedValue = useDebounce<string>(value, 500)
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }
  // ======== input value search authors

  // ======== load hab
  const loadHab = async () => {
    try {
      const { data } = await axios.get(`/habs/one/${habId}`)
      setHab(data)
    } catch(e){
      dispatch(openModal('При хаба произошла ошибка!'))
    }
  }
  // ======== load hab

  React.useEffect(() => {
    loadHab()
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className={s.page}>
      <div className={'container'}>
        <div className={s.wrapper}>
          <div className={s.left}>
            <HabNav handleChange={handleChange} hab={hab} />
            <Outlet context={[debouncedValue]} />
          </div>
          <Sidebar category={hab?.category} />
        </div>
      </div>
    </div>
  )
}

export default Hab