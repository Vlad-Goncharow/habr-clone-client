import React from 'react'
import { Link } from 'react-router-dom'

import s from './Header.module.scss'
import { useOnClickOutside } from 'usehooks-ts'
import { useAppSelector } from '../../Hooks/useAppSelector'

import { useAppDispatch } from '../../Hooks/useAppDispatch'
import { fetchLogout } from '../../Redux/Slices/AuthSlice'
import useCheckMobileScreen from '../../Hooks/useCheckMobileScreen'
import { openModal } from '../../Redux/Slices/ErrorModalSlice'

function Header() {
  // ======== dispatch
  const dispatch = useAppDispatch()
  // ======== dispatch
  
  // ======== current user
  const { user } = useAppSelector(store => store.auth)
  // ======== current user

  // ======== auth menu is open
  const dropDownRef = React.useRef<HTMLDivElement>(null)
  const [dropDown,setDropDown] = React.useState<Boolean>(false)
  useOnClickOutside(dropDownRef, () => setDropDown(false))
  // ======== auth menu is open

  // ======== auth menu is open
  const menuRef = React.useRef<HTMLDivElement>(null)
  const [menuIsOpen, setMenuIsOpen] = React.useState<Boolean>(false)
  useOnClickOutside(menuRef, () => setMenuIsOpen(false))
  // ======== auth menu is open

  // ======== side auth menu is open
  const [sideAuth, setSideAuth] = React.useState<Boolean>(false)
  const sideAuthRef = React.useRef<HTMLDivElement>(null)
  useOnClickOutside(sideAuthRef, () => setSideAuth(false))
  // ======== side auth menu is open

  // ======== side nav menu is open
  const [sideNav, setSideNav] = React.useState<Boolean>(false)
  const sideNavRef = React.useRef<HTMLDivElement>(null)
  useOnClickOutside(sideNavRef, () => setSideNav(false))
  // ======== side nav menu is open

  // ======== check side menus is open and add open class
  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (sideAuth) {
      timer = setTimeout(() => {
        if (sideAuthRef.current) {
          sideAuthRef.current.classList.add(s.sideAuth_open)
        }
      }, 10)
    }

    if (sideNav) {
      timer = setTimeout(() => {
        if (sideNavRef.current) {
          sideNavRef.current.classList.add(s.sideInfo_open)
        }
      }, 10)
    }

    if (sideAuth === true || sideNav === true){
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      clearTimeout(timer)
    }
  }, [sideAuth, sideNav])
  // ======== check side menus is open and add open class

  // ======== logout
  const logout = async () => {
    try {
      dispatch(fetchLogout())
    } catch(e) {
      dispatch(openModal("При выходе произошла ошибка!"))
    }
  }
  // ======== logout

  // ======== isMobile
  const isMobile = useCheckMobileScreen()
  // ======== isMobile

  return (
    <header className={s.header}>
      <div className={s.header__top}>
        <div className={'container'}>
          <div className={s.row}>
            <div onClick={() => setSideNav(true)} className={s.burger}>
              <span></span>
            </div>
            <Link to='/flows/all/all/1' className={s.logo}>
              Хабр
            </Link>

            {
              isMobile &&
              <div className={s.topInfo}>
                <Link to='/search'>
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="32" height="32" viewBox="0 0 32 32">
                    <title>search</title>
                    <path d="M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" />
                  </svg>
                </Link>
                {
                  user.auth === null
                    ?
                    <div className={s.person}>
                        <svg onClick={() => setSideAuth(true)} xmlns="http://www.w3.org/2000/svg" version="1.1" width="32" height="32" viewBox="0 0 32 32">
                        <title>user</title>
                        <path d="M18 22.082v-1.649c2.203-1.241 4-4.337 4-7.432 0-4.971 0-9-6-9s-6 4.029-6 9c0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h28c0-4.030-5.216-7.364-12-7.918z" />
                      </svg>
                    </div>
                    :
                    <div className={s.user}>
                      <Link to='/post/create' className={s.user__icon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M4 20h4L18.5 9.5a2.829 2.829 0 0 0-4-4L4 16v4Z" />
                          <path d="m13.5 6.5 4 4" />
                        </svg>
                      </Link>
                      <div onClick={() => setSideAuth(prev => !prev)} className={s.user__icon + ' ' + s.user__icon_user}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                          <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                        </svg>
                      </div>
                    </div>
                }
              </div>
            }
          </div>
        </div>
      </div>
      <div className={'container'}>
        <div className={s.row}>
          <nav className={s.left}>
            <Link to='/flows/all/all/1'>Все потоки</Link>
            <Link to='/flows/develop/all/1'>Разработка</Link>
            <Link to='/flows/admin/all/1'>Администрирование</Link>
            <Link to='/flows/design/all/1'>Дизайн</Link>
            <Link to='/flows/management/all/1'>Менеджмент</Link>
            <Link to='/flows/marketing/all/1'>Маркетинг</Link>
            <Link to='/flows/popsci/all/1'>Научпоп</Link>
          </nav>
          {
            !isMobile &&
            <div className={s.right}>
              <Link to='/search'>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="32" height="32" viewBox="0 0 32 32">
                  <title>search</title>
                  <path d="M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" />
                </svg>
              </Link>
              {
                user.auth === null
                  ?
                  <div className={s.person}>
                    <svg onClick={() => setMenuIsOpen(true)} xmlns="http://www.w3.org/2000/svg" version="1.1" width="32" height="32" viewBox="0 0 32 32">
                      <title>user</title>
                      <path d="M18 22.082v-1.649c2.203-1.241 4-4.337 4-7.432 0-4.971 0-9-6-9s-6 4.029-6 9c0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h28c0-4.030-5.216-7.364-12-7.918z" />
                    </svg>
                    {
                      menuIsOpen &&
                      <div ref={menuRef} className={s.person__menu + ' ' + s.menu}>
                        <Link 
                          to='/login' 
                          onClick={() => setMenuIsOpen(false)} 
                          className={s.menu__btn}
                        >
                          Войти
                        </Link>
                        <Link 
                          to='/register'
                          onClick={() => setMenuIsOpen(false)} 
                          className={s.menu__btn + ' ' + s.menu__btn_register}
                        >
                          Регистрация
                        </Link>
                      </div>
                    }
                  </div>
                  :
                  <div className={s.user}>
                    <Link to='/post/create' className={s.user__icon}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M4 20h4L18.5 9.5a2.829 2.829 0 0 0-4-4L4 16v4Z" />
                        <path d="m13.5 6.5 4 4" />
                      </svg>
                    </Link>
                    <div onClick={() => setDropDown(prev => !prev)} className={s.user__icon + ' ' + s.user__icon_user}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                        <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                      </svg>
                    </div>
                  </div>
              }
            </div>
          }
        </div>

        {
          dropDown &&
          <div onClick={() => setDropDown(false)} ref={dropDownRef} className={s.userDropDown}>
            <Link to={`/user/${user.auth?._id}/profile`} className={s.userDropDown__header}>
              <div className={s.user__icon + ' ' + s.user__icon_user}>
                <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                  <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                </svg>
              </div>
              <span >{user.auth?.nickName}</span>
            </Link>
            <ul className={s.userDropDown__list}>
              <li>
                <Link to={`/user/${user.auth?._id}/posts/1`}>Статьи</Link>
              </li>
              <li>
                <Link to={`/user/${user.auth?._id}/comments/1`}>Коментарии</Link>
              </li>
              <li>
                <Link to={`/user/${user.auth?._id}/favorites/1`}>Закладки</Link>
              </li>
              <li>
                <Link to='/hab/create'>Создать Хаб</Link>
              </li>
            </ul>
            <ul className={s.userDropDown__list}>
              <li>
                <Link to='/user/settings'>
                  <svg className='setting-icon' xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.723 1.723 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37 1 .608 2.296.07 2.572-1.065Z" />
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                  </svg>
                  <span>
                    Настройка профиля
                  </span>
                </Link>
              </li>
              <li onClick={logout}>
                <Link to='/flows/all/all/1'>
                  <svg className='exit-icon' xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M14.4 17.4a.6.6 0 0 1-.6.6H4.2a.6.6 0 0 1-.6-.6V6.6a.6.6 0 0 1 .6-.6h9.6a.6.6 0 0 1 .6.6V9a.6.6 0 1 0 1.2 0V6.6a1.8 1.8 0 0 0-1.8-1.8H4.2a1.8 1.8 0 0 0-1.8 1.8v10.8a1.8 1.8 0 0 0 1.8 1.8h9.6a1.8 1.8 0 0 0 1.8-1.8V15a.6.6 0 1 0-1.2 0v2.4Z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M21.425 12.424a.6.6 0 0 0 0-.85l-3.6-3.6a.6.6 0 0 0-.85.85l2.577 2.576H9a.6.6 0 1 0 0 1.2h10.552l-2.576 2.575a.6.6 0 1 0 .85.85l3.6-3.6Z" clipRule="evenodd" />
                  </svg>
                  <span>Выход</span>
                </Link>
              </li>
            </ul>
          </div>
        }
      </div>
      
      {
        sideAuth &&
        <div className={s.overlay}>
          {
            user.auth === null ?
              <div ref={sideAuthRef} className={s.sideAuth}>
                <div className={s.person__menu + ' ' + s.menu}>
                  <Link
                    onClick={() => setSideAuth(false)}
                    to='/login'
                    className={s.menu__btn}
                  >
                    Войти
                  </Link>
                  <Link
                    onClick={() => setSideAuth(false)}
                    to='/register'
                    className={s.menu__btn + ' ' + s.menu__btn_register}
                  >
                    Регистрация
                  </Link>
                </div>
              </div>
            :
              <div onClick={() => setSideAuth(false)} ref={sideAuthRef} className={s.userDropDown}>
                <Link to={`/user/${user.auth?._id}/profile`} className={s.userDropDown__header}>
                  <div className={s.user__icon + ' ' + s.user__icon_user}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                      <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                    </svg>
                  </div>
                  <span >{user.auth?.nickName}</span>
                </Link>
                <ul className={s.userDropDown__list}>
                  <li>
                    <Link to={`/user/${user.auth?._id}/posts/1`}>Статьи</Link>
                  </li>
                  <li>
                    <Link to={`/user/${user.auth?._id}/comments/1`}>Коментарии</Link>
                  </li>
                  <li>
                    <Link to={`/user/${user.auth?._id}/favorites/1`}>Закладки</Link>
                  </li>
                  <li>
                    <Link to='/hab/create'>Создать Хаб</Link>
                  </li>
                </ul>
                <ul className={s.userDropDown__list}>
                  <li>
                    <Link  to='/user/settings'>
                      <svg className='setting-icon' xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.723 1.723 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37 1 .608 2.296.07 2.572-1.065Z" />
                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                      </svg>
                      <span>
                        Настройка профиля
                      </span>
                    </Link>
                  </li>
                  <li onClick={logout}>
                    <Link to='/flows/all/all/1'>
                      <svg className='exit-icon' xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M14.4 17.4a.6.6 0 0 1-.6.6H4.2a.6.6 0 0 1-.6-.6V6.6a.6.6 0 0 1 .6-.6h9.6a.6.6 0 0 1 .6.6V9a.6.6 0 1 0 1.2 0V6.6a1.8 1.8 0 0 0-1.8-1.8H4.2a1.8 1.8 0 0 0-1.8 1.8v10.8a1.8 1.8 0 0 0 1.8 1.8h9.6a1.8 1.8 0 0 0 1.8-1.8V15a.6.6 0 1 0-1.2 0v2.4Z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M21.425 12.424a.6.6 0 0 0 0-.85l-3.6-3.6a.6.6 0 0 0-.85.85l2.577 2.576H9a.6.6 0 1 0 0 1.2h10.552l-2.576 2.575a.6.6 0 1 0 .85.85l3.6-3.6Z" clipRule="evenodd" />
                      </svg>
                      <span>Выход</span>
                    </Link>
                  </li>
                </ul>
              </div>
          }
          
        </div>
      }

      {
        sideNav &&
        <div className={s.overlay}>
          <div ref={sideNavRef} className={s.sideInfo}>
            <nav onClick={() => setSideNav(false)}  className={s.left}>
              <Link to='/flows/all/all/1'>Все потоки</Link>
              <Link to='/flows/develop/all/1'>Разработка</Link>
              <Link to='/flows/admin/all/1'>Администрирование</Link>
              <Link to='/flows/design/all/1'>Дизайн</Link>
              <Link to='/flows/management/all/1'>Менеджмент</Link>
              <Link to='/flows/marketing/all/1'>Маркетинг</Link>
              <Link to='/flows/popsci/all/1'>Научпоп</Link>
            </nav>
          </div>
        </div>
      }
    </header >
  )
}

export default Header