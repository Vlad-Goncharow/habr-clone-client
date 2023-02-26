import Sidebar from '../../components/Sidebar'
import s from './Posts.module.scss'
import { Outlet, useParams } from 'react-router-dom'

function Posts() {
  // ======== posts params
  const { category} = useParams()
  // ======== posts params

  return (
    <div className={s.page}>
      <div className={'container'}>
        <div className={s.wrapper}>
          <div className={s.left}>
            <Outlet />
          </div>
          <Sidebar category={category} />
        </div>
      </div>
    </div>
  )
}

export default Posts