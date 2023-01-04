import React from 'react'
import { useAppSelector } from '../../Hooks/useAppSelector'
import s from './UserSettings.module.scss'
import Select from 'react-select'
import { days, months, males, years, countries } from './data';
import axios from '../../axios';
import { useAppDispatch } from '../../Hooks/useAppDispatch';
import { openModal } from '../../Redux/Slices/ErrorModalSlice';
import { fetchUpdateUser } from '../../Redux/Slices/AuthSlice';
import { useNavigate } from 'react-router-dom';

function UserSettings() {
  // ======== dispatch
  const dispatch = useAppDispatch()
  // ======== dispatch

  // ======== navigate
  const navigate = useNavigate()
  // ======== navigate

  // ======== user
  const {user} = useAppSelector(store => store.auth)
  // ======== user

  // ======== full name input
  const [fullName, setFullName] = React.useState(`${user.auth?.fullName}`)
  // ======== full name input
  
  // ======== profile descr
  const [descr, setDescr] = React.useState(`${user.auth?.description}`)
  // ======== profile descr

  // ======== choose gender
  const [gender, setGender] = React.useState({ value: user.auth?.gender, label: user.auth?.gender })
  // ======== choose gender

  // ======== choose day
  const [day, setDay] = React.useState({ value: user.auth?.dayOfBirth, label: user.auth?.dayOfBirth })
  // ======== choose day

  // ======== choose year
  const [year, setYear] = React.useState({ value: user.auth?.yearOfBirth, label: user.auth?.yearOfBirth })
  // ======== choose year

  // ======== choose month
  const [month, setMonth] = React.useState({ value: user.auth?.monthOfBirth, label: user.auth?.monthOfBirth })
  // ======== choose month

  // ======== choose country
  const [country, setCountry] = React.useState({ value: user.auth?.country, label: user.auth?.country })
  // ======== choose country

  // ======== load image ref
  const imgRef:any = React.useRef(null)
  // ======== load image ref

  // ======== load img url
  const [imgUrl, setImgUrl] = React.useState('')
  // ======== load img url
  
  // ======== laod image
  const [img, setImg] = React.useState('')
  // ======== laod image

  // ======== open file upload
  const handleClick = (e:any) => {
    e.preventDefault()
    if (imgRef.current !== null){
      imgRef.current.click();
    }
  };
  // ======== open file upload

  // ======== change gender
  const changeGender = (e:any) => {
    setGender(e)
  }
  // ======== change gender

  // ======== change day
  const changedDay = (e: any) => {
    setDay(e)
  }
  // ======== change day

  // ======== change year
  const changeYear = (e: any) => {
    setYear(e)
  }
  // ======== change year

  // ======== change month
  const changeMonth = (e: any) => {
    setMonth(e)
  }
  // ======== change month

  // ======== change country
  const changeCountry = (e: any) => {
    setCountry(e)
  }
  // ======== change country

  // ======== gender select
  const GenderComponents = () => {
    return (
      <div className={s.select}>
        <span>Пол</span>
        <Select
          value={gender}
          onChange={changeGender}
          options={males}
        />
      </div>
    )
  }
  // ======== gender select

  // ======== day select
  const DayComponents = () => {
    return (
      <div className={s.select}>
        <span>Дата рождения</span>
        <Select
          value={day}
          onChange={changedDay}
          options={days}
        />
      </div>
    )
  }
  // ======== day select

  // ======== year select
  const YearComponents = () => {
    return (
      <div className={s.select}>
        <Select
          value={year}
          onChange={changeYear}
          options={years}
        />
      </div>
    )
  }
  // ======== year select

  // ======== month select
  const MonthComponents = () => {
    return (
      <div className={s.select}>
        <Select
          value={month}
          onChange={changeMonth}
          options={months}
        />
      </div>
    )
  }
  // ======== month select

  // ======== country select
  const CountyComponents = () => {
    return (
      <div className={s.select}>
        <span>Страна</span>
        <Select
          value={country}
          onChange={changeCountry}
          options={countries}
        />
      </div>
    )
  }
  // ======== country select

  // ======== change file
  const onChangeFile = (e: any) => {
    let fr: any = new FileReader();
    fr.onload = function () {
      setImgUrl(fr.result)
    };
    fr.readAsDataURL(e.target.files[0]);
    setImg(e.target.files[0]);
  };
  // ======== change file

  // ======== gender select
  const update = async (e:any) => {
    try {
      e.preventDefault()

      let imageUrl = user.auth?.avatar
      if (img) {
        const formData = new FormData();
        formData.append('image', img);
        const { data } = await axios.post('/upload', formData)
        imageUrl = data.url
      }
      await dispatch(fetchUpdateUser({
        avatar: imageUrl,
        description: descr,
        fullName: fullName,
        gender: gender.value,
        dayOfBirth: day.value,
        yearOfBirth: year.value,
        monthOfBirth: month.value,
        country: country.value,
      }))
      navigate(`/user/${user.auth?._id}/profile`)
    } catch(e){
      dispatch(openModal('При обновлении произошла ошибка'))
    }
  }
  // ======== gender select
  return (
    <div className={s.page}>
      <div className="container">
        <div className={s.wrapper}>
          <h1 className={s.header}>Настройки профиля</h1>
          <form action="" className={s.form}>
            <div className={s.top}>
              <div className={s.top__inputs}>
                <div className={s.inpitItem}>
                  <label htmlFor="">Настоящее имя</label>
                  <input 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)} 
                    type="text" 
                  />
                  <p>Укажите ваши имя и фамилию, чтобы другие пользователи смогли узнать, как вас зовут</p>
                </div>
                <div className={s.inpitItem}>
                  <label htmlFor="">Опишите себя</label>
                  <input 
                    value={descr}
                    type="text"
                    onChange={(e) => setDescr(e.target.value)}  
                  />
                  <p>Укажите свою специализацию. Например: Администратор баз данных</p>
                </div>
              </div>
              <div className={s.user}>
                <h4 className={s.user__title}>Аватар</h4>
                <div className={s.user__image}>
                  <input ref={imgRef} onChange={onChangeFile} type="file"/>
                  <img src={imgUrl ? imgUrl : `${process.env.REACT_APP_SERVER_URL}${user.auth?.avatar}`} alt="" />
                </div>
                <p className={s.user__info}>
                  Формат: jpg, gif, png. <br />
                  Максимальный размер файла: 1Mb. <br />
                  Разрешение: до 96x96px.
                </p>
                <button onClick={handleClick} className={s.user__btn}>Загрузить</button>
              </div>
            </div>
            <div className={s.row}>
              {GenderComponents()}
              {DayComponents()}
              {YearComponents()}
              {MonthComponents()}
            </div>
            <div className={s.row}>
              {CountyComponents()}
            </div>
            <button onClick={update} className={s.form__submit}>Сохранить изменения</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserSettings