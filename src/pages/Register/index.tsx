import React from 'react'

import s from './Register.module.scss'

import { Link, useNavigate } from 'react-router-dom'

import { useForm } from "react-hook-form";
import { useAppDispatch } from '../../Hooks/useAppDispatch';
import { fetchRegister } from '../../Redux/Slices/AuthSlice'
import { FormRegister } from '../../Types/FormValues';

const Register: React.FC = () => {
  // ======== dispatch
  const dispatch = useAppDispatch()
  // ======== dispatch

  // ======== navigate
  const navigate = useNavigate()
  // ======== navigate

  // ======== use form hooks
  const { register, handleSubmit, watch, setError, formState: { errors } } = useForm<FormRegister>({
    defaultValues: {
      email: '',
      nickName: '',
      password: '',
      passwordEqual: ''
    },
    mode: 'onTouched'
  });
  // ======== use form hooks

  // ======== check all inputs and off disable button submit
  const check = () => {
    const email = watch('email')
    const nickName = watch('nickName')
    const password = watch('password')
    const passwordEqual = watch('passwordEqual')

    if ((email.length && nickName.length && password.length && passwordEqual.length) > 0) {
      if (password === passwordEqual) {
        return true
      }
    }
  }
  // ======== check all inputs and off disable button submit

  // ======== register
  const registerSubmit = async (values: FormRegister) => {
    try {
      const data: any = await dispatch(fetchRegister(values))

      if (data.type === "auth/fetchRegister/rejected") {
        data.payload.forEach((err: any) => {
          setError(err.param, { type: 'custom', message: err.msg });
        })
      }

      if (data.type === "auth/fetchRegister/fulfilled") {
        navigate('/flows/all/all/1')
      }
    } catch (e) {
      alert('При регистрации произошла ошибка, попробуйте еще')
    }
  }
  // ======== register

  return (
    <div className={s.page}>
      <div className={s.wrapper}>
        <form onSubmit={handleSubmit(registerSubmit)} action="" className={s.form}>
          <h1 className={s.form__title}>Регистрация</h1>
          <div className={s.form__item}>
            <label htmlFor="email" className={s.form__label}>E-mail</label>
            {
              errors?.email &&
              <span>{errors?.email.message}</span>
            }
            <input
              type="text"
              id='email'
              className={errors?.email ? s.form__input + ' ' + s.form__input_error : s.form__input}
              {...register('email', {
                required: 'Укажите вашу почту'
              })}
            />
          </div>
          <div className={s.form__item}>
            <label htmlFor="nickName" className={s.form__label}>Никнейм</label>
            {
              errors?.nickName &&
              <span>{errors?.nickName.message}</span>
            }
            <input
              type="text"
              id='nickName'
              className={errors?.nickName ? s.form__input + ' ' + s.form__input_error : s.form__input}
              {...register('nickName', {
                required: 'Укажите ваш никнейм'
              })}
            />
          </div>
          <div className={s.form__item}>
            <label htmlFor="password" className={s.form__label}>Пароль</label>
            {
              errors?.password &&
              <span>{errors?.password.message}</span>
            }
            <input
              type="password"
              id='password'
              className={errors?.password ? s.form__input + ' ' + s.form__input_error : s.form__input}
              {...register('password', {
                required: 'Укажите ваш пароль'
              })}
            />
          </div>
          <div className={s.form__item}>
            <label htmlFor="passwordEqual" className={s.form__label}>Пароль еще раз</label>
            {
              errors?.passwordEqual &&
              <span>{errors?.passwordEqual.message}</span>
            }
            <input
              type="password"
              id='passwordEqual'
              className={errors?.passwordEqual ? s.form__input + ' ' + s.form__input_error : s.form__input}
              {...register('passwordEqual', {
                required: 'Повторите пароль',
                validate: (val) => {
                  if (watch('password') !== val) {
                    return 'Пароли не совпадают';
                  }
                },
              })}
            />
          </div>
          <button
            onSubmit={handleSubmit(registerSubmit)}
            className={check() ? s.form__submit : s.form__submit + ' ' + s.form__submit_disabled}
          >
            Зарегистрироваться
          </button>
        </form>
        <div className={s.login}>
          <span>Уже зарегистрированы? <Link to='/login'>Войти</Link></span>
        </div>
      </div>
    </div>
  )
}

export default Register