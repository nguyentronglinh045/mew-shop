import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import FacebookBtn from 'src/assets/icons/fb-btn.svg'
import GoogleBtn from 'src/assets/icons/google-btn.svg'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import path from 'src/constants/path'

export default function Register() {
  const { t } = useTranslation(['home'])
  return (
    <div className='relative flex h-screen w-screen justify-end'>
      <Helmet>
        <title>{t('Authentication.register')}</title>
        <meta name='description' content='Đăng ký vào dự án' />
      </Helmet>
      <div className='absolute inset-0'>
        <img
          src='https://bizweb.dktcdn.net/100/459/533/themes/868331/assets/bg_custom.png?1689838116391'
          alt='background'
          className='h-full w-full object-cover'
        />
      </div>
      <div className='z-10 flex w-full flex-col gap-4 overflow-auto bg-black/80 px-6 pb-6 pt-8 sm:w-3/4 md:w-[500px] lg:px-12 lg:pb-6 lg:pt-9 '>
        <form noValidate>
          <h2 className='mb-4 text-center text-3xl font-bold text-white'>{t('Authentication.register')}</h2>
          <div className='flex flex-col gap-1'>
            <Input name='username' placeholder={t('Authentication.email')} className='text-base font-semibold' />
            <Input
              name='password'
              placeholder={t('Authentication.password')}
              type='password'
              className='text-base font-semibold'
              classNameEye='absolute top-1/3 right-3 -translate-y-1/2 h5 w-6'
            />
            <Input
              name='confirm_password'
              placeholder={t('Authentication.confirmPassword')}
              type='password'
              className='text-base font-semibold'
              classNameEye='absolute top-1/3 right-3 -translate-y-1/2 h5 w-6'
            />
            <div className='flex flex-row items-center justify-between'>
              <Button
                classNameText='font-semibold text-white'
                className='w-full rounded-full bg-main-color px-5 py-3 duration-300 hover:bg-slate-700 active:bg-blue-500'
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
    </div>
  )
}
