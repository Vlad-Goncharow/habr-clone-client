import { Link, useNavigate } from 'react-router-dom';

import { useForm } from "react-hook-form";
import { useAppDispatch } from '../../Hooks/useAppDispatch';
import { fetchLogin } from '../../Redux/Slices/AuthSlice';

import { FormLogin } from '../../Types/FormValues';
import s from './Login.module.scss';

function Login() {
  // ======== dispatch
  const dispatch = useAppDispatch()
  // ======== dispatch

  // ======== navigate
  const navigate = useNavigate()
  // ======== navigate

  // ======== use form hooks
  const { register, handleSubmit, watch, setError, formState: { errors } } = useForm<FormLogin>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched'
  });
  // ======== use form hooks

  // ======== check all inputs and off disable button submit
  const check = () => {
    const email = watch('email')
    const password = watch('password')

    if ((email.length && password.length) > 0) {
      return true
    }
  }
  // ======== check all inputs and off disable button submit

  // ======== login
  const loginSubmit = async (values: FormLogin) => {
    try {
      const data: any = await dispatch(fetchLogin(values))
      if (data.type === "auth/fetchLogin/rejected") {
        return data.payload.forEach((err: any) => {
          setError(err.param, { type: 'custom', message: err.msg });
        })
      }

      if (data.type === "auth/fetchLogin/fulfilled") {
        localStorage.setItem('token',data.payload.accessToken)
        return navigate('/flows/all/all/1')
      }
    } catch (e) {
      alert('При авторизации произошла ошибка')
    }
  }
  // ======== login

  return (
    <div className={s.page}>
      <div className={s.wrapper}>
        <form onSubmit={handleSubmit(loginSubmit)} action="" className={s.form}>
          <h1 className={s.form__title}>Вход</h1>
          <div className={s.form__item}>
            <label htmlFor="" className={s.form__label}>E-mail</label>
            {
              errors?.email &&
              <span>{errors?.email.message}</span>
            }
            <input
              type="text"
              className={s.form__input}
              {...register('email', {
                required: 'Укажите вашу почту'
              })}
            />
          </div>
          <div className={s.form__item}>
            <label htmlFor="" className={s.form__label}>Пароль</label>
            {
              errors?.password &&
              <span>{errors?.password.message}</span>
            }
            <input
              type="password"
              className={s.form__input}
              {...register('password', {
                required: 'Укажите ваш пароль'
              })}
            />

          </div>
          <button
            onClick={handleSubmit(loginSubmit)}
            className={check() ? s.form__submit : s.form__submit + ' ' + s.form__submit_disabled}
          >
            Войти
          </button>
          <Link to='/reminder' className={s.form__forgot}>Забыли пароль?</Link>
        </form>
        <div className={s.login}>
          <span>Еще нет аккаунта? <Link to='/register'>Зарегистрируйтесь</Link></span>
        </div>
      </div>
    </div>
  )
}

export default Login