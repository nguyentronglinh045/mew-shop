import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import omit from 'lodash/omit'
import { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
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

type FormData = Schema

export default function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const { t } = useTranslation(['home'])
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(schema) })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponseApi<Omit<FormData, 'confirm_password'>>>(error)) {
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
        <title>{t('Authentication.register')}</title>
        <meta name='description' content='Đăng ký vào dự án' />
      </Helmet>

      <div className='z-10 flex w-full flex-col gap-4 overflow-auto bg-black/80 px-6 pb-6 pt-8 sm:w-3/4 md:w-[500px] lg:px-12 lg:pb-6 lg:pt-9 '>
        <form noValidate onSubmit={onSubmit}>
          <h2 className='mb-4 text-center text-3xl font-bold text-white'>{t('Authentication.register')}</h2>
          <div className='flex flex-col gap-1'>
            <Input
              name='email'
              placeholder={t('Authentication.email')}
              type='email'
              className='text-base font-semibold'
              errorMessage={errors.email?.message && t(errors.email?.message)}
              register={register}
            />
            <Input
              name='password'
              placeholder={t('Authentication.password')}
              type='password'
              className='text-base font-semibold'
              classNameEye='absolute top-1/3 right-3 -translate-y-1/2 h5 w-6'
              errorMessage={errors.password?.message && t(errors.password?.message)}
              register={register}
            />
            <Input
              name='confirm_password'
              placeholder={t('Authentication.confirmPassword')}
              type='password'
              className='text-base font-semibold'
              classNameEye='absolute top-1/3 right-3 -translate-y-1/2 h5 w-6'
              errorMessage={errors.confirm_password?.message && t(errors.confirm_password?.message)}
              register={register}
            />
            <div className='flex flex-row items-center justify-between'>
              <Button
                type='submit'
                classNameText='font-semibold text-white'
                className='w-full rounded-full bg-main-color px-5 py-3 duration-300 hover:bg-slate-700 active:bg-blue-500'
                isLoading={registerAccountMutation.isLoading}
                disabled={registerAccountMutation.isLoading}
              >
                {t('Authentication.register')}
              </Button>
            </div>
          </div>
        </form>
        <div className='relative mt-4 text-center'>
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
          <div className='rounded border-[1px] border-white px-2 py-1 text-center text-white duration-150 hover:border-yellow-400 hover:text-yellow-400'>
            <span>{t('Authentication.reasonForCreatingAccounto')}</span>
          </div>
          <Link
            to={path.login}
            className='w-full rounded-full bg-gray-600 py-3 text-center font-semibold text-white hover:bg-main-color active:bg-blue-500'
          >
            <span>{t('Authentication.login')}</span>
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
