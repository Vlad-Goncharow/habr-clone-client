import React from 'react';
import { Link } from 'react-router-dom';
import s from './HabCreate.module.scss';

import classNames from 'classnames';
import { useForm } from "react-hook-form";
import axios from '../../axios';
import { Category } from '../../Types/PostType';

import { useNavigate } from 'react-router-dom';

const PostCategories = [
  {
    typeRu: 'Разработка',
    typeEng: 'develop'
  }, {
    typeRu: 'Администрирование',
    typeEng: 'admin'
  }, {
    typeRu: 'Дизайн',
    typeEng: 'design'
  }, {
    typeRu: 'Менеджмент',
    typeEng: 'management'
  }, {
    typeRu: 'Маркетинг',
    typeEng: 'marketing'
  }, {
    typeRu: 'Научпоп',
    typeEng: 'popsci'
  }
]

function HabCreate() {
  // ======== navigate
  const navigate = useNavigate()
  // ======== navigate

  // ======== use form hooks
  const { register, handleSubmit, watch, setError, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      descr: '',
    },
    mode: 'onTouched'
  });
  // ======== use form hooks

  // ======== check all inputs and off disable button submit
  const check = () => {
    const title = watch('title')

    if ((title.length > 0) && url.length > 0) {
      return true
    }
  }
  // ======== check all inputs and off disable button submit

  // ======== image file
  const [image,setImage] = React.useState<any>()
  // ======== image file

  // ======== showed image url
  const [url, setUrl] = React.useState('')
  // ======== showed image url

  // ======== onChangeFile
  const onChangeFile = (e: any) => {
    var fr: any = new FileReader();
    fr.onload = function () {
      setUrl(fr.result)
    };
    fr.readAsDataURL(e.target.files[0]);
    setImage(e.target.files[0]);
  };
  // ======== onChangeFile

  // ======== create hab
  const habCreate = async (values:any) => {
    let imageUrl = '/uploads/default.png'
    if (image) {
      const formData = new FormData();
      formData.append('image', image);
      const { data } = await axios.post('/upload', formData)
      imageUrl = data.url
    }

    const {data} = await axios.post('/hab/create',{
      ...values,
      category: PostCategory.typeEng,
      image:imageUrl
    })

    navigate(`/hab/${data._id}/posts/1`)
  }
  // ======== create hab

  // ======== post category
  const [PostCategory, setPostCategory] = React.useState<Category>({
    typeRu: 'Разработка',
    typeEng: 'develop'
  })
  // ======== post category

  return (
    <div className={s.page}>
      <div className={s.wrapper}>
        <form onSubmit={handleSubmit(habCreate)} action="" className={s.form}>
        {/* <form onSubmit={handleSubmit()} action="" className={s.form}> */}
          <h1 className={s.form__title}>Создание Хаба</h1>
          <div className={s.form__item}>
            <label htmlFor="" className={s.form__label}>Название Хаба</label>
            {
              errors?.title &&
              <span>{errors?.title.message}</span>
            }
            <input
              type="text"
              className={s.form__input}
              {...register('title', {
                required: 'Укажите название'
              })}
            />
          </div>
          <div className={s.form__item}>
            <label htmlFor="" className={s.form__label}>Описание Хаба</label>
            {
              errors?.descr &&
              <span>{errors?.descr.message}</span>
            }
            <input
              type="text"
              className={s.form__input}
              {...register('descr', {
                required: 'Укажите описание'
              })}
            />
          </div>
          <div className={s.form__item}>
            <label htmlFor="" className={s.form__label}>Категория хаба</label>
            <ul className={s.form__types}>
              {
                PostCategories.map((el: any) =>
                  <li key={el.typeRu}>
                    <button onClick={(e) => {
                      e.preventDefault()
                      setPostCategory(el)
                    }} className={classNames(s.form__type, {
                      [s.form__type_active]: PostCategory.typeRu === el.typeRu
                    })}>{el.typeRu}</button>
                  </li>
                )
              }
            </ul>
          </div>
          <div className={s.image}>
            <input name='image' id='image' onChange={onChangeFile} type="file" />
            {
              image
                ?
                <div className={s.image__preview}>
                  <img src={url} alt="" />
                </div>
                :
                <div className={s.image__upload}></div>
            }
          </div>
          <button
            // onClick={handleSubmit(loginSubmit)}
            onClick={handleSubmit(habCreate)}
            className={classNames(s.form__submit, {
              [s.form__submit_disabled]: !check()
            })}
          >
            Создать
          </button>
          <Link to='/reminder' className={s.form__forgot}>Прочтите перед созданием хаба</Link>
        </form>
      </div>
    </div>
  )
}

export default HabCreate