import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import authApi from 'src/apis/auth.api'
import FacebookBtn from 'src/assets/icons/fb-btn.svg'
import GoogleBtn from 'src/assets/icons/google-btn.svg'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { ErrorResponseApi } from 'src/types/utils.type'
import { Schema, schema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

type FormData = Pick<Schema, 'email' | 'password'>
const LoginSchema = schema.pick(['email', 'password'])

export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation(['home'])
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(LoginSchema) })

  const loginAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.loginAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        const previousLocation = location.state?.from || '/'
        navigate(previousLocation)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponseApi<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })

  return (
    <>
      <Helmet>
        <title>{t('Authentication.login')}</title>
        <meta name='description' content='Đăng nhập vào dự án' />
      </Helmet>

      <div className='z-10 flex w-full flex-col gap-4 overflow-auto bg-black/80 px-6 pb-6 pt-8 sm:w-3/4 md:w-[500px] lg:px-12 lg:pb-6 lg:pt-9 '>
        <form noValidate onSubmit={onSubmit}>
          <h2 className='mb-4 text-center text-3xl font-bold text-white'>{t('Authentication.login')}</h2>
          <div className='flex flex-col gap-1'>
            <Input
              name='email'
              placeholder={t('Authentication.email')}
              className='text-base font-semibold'
              register={register}
              errorMessage={errors.email?.message && t(errors.email?.message)}
            />
            <Input
              name='password'
              placeholder={t('Authentication.password')}
              type='password'
              className='text-base font-semibold'
              classNameEye='absolute top-1/3 right-3 -translate-y-1/2 h5 w-6'
              register={register}
              errorMessage={errors.password?.message && t(errors.password?.message)}
            />
            <div className='flex flex-row items-center justify-between'>
              <Button
                classNameText='font-semibold text-white'
                className='rounded-full bg-main-color px-5 py-3 duration-300 hover:bg-slate-700 active:bg-blue-500'
                isLoading={loginAccountMutation.isLoading}
                disabled={loginAccountMutation.isLoading}
              >
                {t('Authentication.login')}
              </Button>
              <Button classNameText='font-semibold text-white underline hover:text-yellow-400 duration-100 active:text-main-color'>
                {t('Authentication.forgotPassword')}
              </Button>
            </div>
          </div>
        </form>
        <div className='relative text-center'>
          <div className='absolute top-[40%] z-20 w-full translate-y-1/2 border-[1px] border-t border-gray-100'></div>
          <div className='relative z-50 inline rounded-full bg-white px-3 py-1 '>
            <span className='text-base font-medium text-main-color'>{t('Authentication.orloginVia')}</span>
          </div>
        </div>
        <div className='flex flex-row justify-around'>
          <div className='h-[37px] cursor-pointer'>
            <img src={FacebookBtn} alt='fb' className='h-[37px] object-cover' />
          </div>
          <div className='h-[37px] cursor-pointer'>
            <img src={GoogleBtn} alt='gg' className='h-[37px] object-cover' />
          </div>
        </div>
        <div className='flex flex-col gap-3'>
          <h2 className='text-center text-3xl font-bold text-white'>{t('Authentication.register')}</h2>
          <div className='rounded border-[1px] border-white px-2 py-1 text-center text-white duration-150 hover:border-yellow-400 hover:text-yellow-400'>
            <span>{t('Authentication.reasonForCreatingAccounto')}</span>
          </div>
          <Link
            to={path.register}
            className='w-full rounded-full bg-gray-600 py-3 text-center font-semibold text-white hover:bg-main-color active:bg-blue-500'
          >
            <span>{t('Authentication.register')}</span>
          </Link>
          <Link
            to={path.home}
            className='w-full rounded-full bg-gray-600 py-3 text-center font-semibold text-white hover:bg-main-color active:bg-blue-500'
          >
            <span>{t('Authentication.backToHome')}</span>
          </Link>
        </div>
      </div>
    </>
  )
}
