import React from 'react';
import s from './SecondStepPost.module.scss';

import classNames from 'classnames';
import { useForm } from "react-hook-form";
import PostCreateImage from '../PostCreateImage';

import { useNavigate } from 'react-router-dom';
import axios from '../../axios';
import { Category } from '../../Types/PostType';

import { useAppDispatch } from '../../Hooks/useAppDispatch';
import { openModal } from '../../Redux/Slices/ErrorModalSlice';
import { HabType } from '../../Types/HabType';
import HabSearch from '../HabSearch';


const PostTypes = [
  {
    typeRu: 'Статья',
    typeEng: 'post'
  },
  {
    typeRu: 'Новость',
    typeEng: 'news'
  }
]

const PostCategories = [
  {
    typeRu: 'Разработка',
    typeEng: 'develop'
  },{
    typeRu: 'Администрирование',
    typeEng: 'admin'
  },{
    typeRu: 'Дизайн',
    typeEng: 'design'
  },{
    typeRu: 'Менеджмент',
    typeEng: 'management'
  },{
    typeRu: 'Маркетинг',
    typeEng: 'marketing'
  },{
    typeRu: 'Научпоп',
    typeEng: 'popsci'
  }
]

interface propTypes{
  setCreateStep:(num:Number) => void
  text:String
  titleValue:String
}

const SecondStepPost: React.FC<propTypes> = ({ setCreateStep, text, titleValue }) => {
  // ======== dispatch
  const dispatch = useAppDispatch()
  // ======== dispatch

  // ======== navigate
  const navigate = useNavigate()
  // ======== navigate

  // ======== post type
  const [postType, setPostType] = React.useState<Category>({
    typeRu: 'Статья',
    typeEng: 'post'
  })
  // ======== post type

  // ======== post category
  const [PostCategory, setPostCategory] = React.useState<Category>({
    typeRu: 'Разработка',
    typeEng: 'develop'
  })
  // ======== post category

  // ======== file image
  const [image, setImage] = React.useState<any>();
  // ======== file image

  // ======== use form hooks
  const { register, handleSubmit, watch, setError, formState: { errors } } = useForm({
    defaultValues: {
      tags: '',
    },
    mode: 'onTouched'
  });
  // ======== use form hooks

  // ======== check input values
  const check = () => {
    const tags = watch('tags')

    if (tags.length > 0) {
      return true
    }

    return false
  }
  // ======== check input values

  // ======== post habs
  const [habs,setHabs] = React.useState<HabType[] | []>([])
  // ======== post habs

  // ======== create post
  const submitForm = async (e:any) => {
    e.preventDefault()
    if (habs.length > 0 && watch('tags').split(' ').length > 0){
      let imageUrl = '/uploads/default.png'
      if (image) {
        const formData = new FormData();
        formData.append('image', image);
        const { data } = await axios.post('/upload', formData)
        imageUrl = data.url
      }

      if (habs.length > 0) {
        await axios.post('/posts/create', {
          title: titleValue,
          image: imageUrl,
          text,
          category: PostCategory.typeEng,
          postType: postType.typeEng,
          tags: watch('tags').split(' '),
          habs: habs
        })
        navigate('/flows/all/all/1')
      }
    } else {
      dispatch(openModal('Вы не заполнили хабы или теги'))
    }
  }
  // ======== create post

  return (
    <div className={s.wrapper}>
      <header className={s.header}>
        <div className={s.header__title}>Настройки публикации</div>
      </header>
      <form onSubmit={handleSubmit(submitForm)} className={s.form}>
        <div className={s.form__item}>
          <div className={s.form__name}>Категория публикации</div>
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
        <div className={s.form__item}>
          <div className={s.form__name}>Тип публикации</div>
          <ul className={s.form__types}>
            {
              PostTypes.map((el:any) => 
                <li key={el.typeRu}>
                  <button onClick={(e) => {
                    e.preventDefault()
                    setPostType(el)
                  }} className={classNames(s.form__type,{
                    [s.form__type_active]: postType.typeRu === el.typeRu
                  })}>{el.typeRu}</button>
                </li>
              )
            }
          </ul>
        </div>
        <HabSearch category={PostCategory.typeEng} habs={habs} setHabs={setHabs} />
        <div className={s.form__item}>
          <div className={s.form__name}>Ключевые слова</div>
          <input 
            type="text" 
            placeholder='Введите Теги через пробел' 
            className={s.form__input} 
            {...register('tags', {
              required: 'Укажите желаемые теги'
            })}
          />
        </div>
        <div className={s.form__item}>
          <div className={s.header__title}>Отображение публикации в ленте</div>
          <PostCreateImage image={image} setImage={setImage} />
        </div>
      </form>
      <footer className={s.footer}>
        <button onClick={() => setCreateStep(1)} className={classNames(s.footer__btn,{
          [s.footer__btn_active]:true,
          [s.footer__btn_disable]:false
        })}>Назад к публикации</button>
        <button 
          onClick={submitForm} 
          className={classNames(s.footer__btn,{
            [s.footer__btn_active]: check() === true,
            [s.footer__btn_disable]: check() === false,
          })}
        >
          Создать
        </button>
      </footer>
    </div>
  )
}

export default SecondStepPost