import { useMutation } from '@tanstack/react-query'
import classNames from 'classnames'
import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'
import authApi from 'src/apis/auth.api'
import Logo from '../../assets/logo/logo.webp'
import MobiLogo from 'src/assets/images/logo_mobi.webp'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import useSearchProducts from 'src/hooks/useSearchProducts'
import { locales } from 'src/i18n/i18n'
import { getAvatarURL } from 'src/utils/utils'
import MobileSideNav from '../MobileSideNav'
import Popover from '../Popover'
import PortalComponent from '../PortalComponent'

export default function Header() {
  const { isAuthenticated, setIsAuthenticated, setProfile, profile } = useContext(AppContext)
  const { i18n, t } = useTranslation()
  const avatarURL = profile?.avatar && getAvatarURL(profile.avatar)
  const currentLanguage = locales[i18n.language as keyof typeof locales]
  const [openSideNav, setOpenSideNav] = useState(false)
  const { register, onSubmitSearch } = useSearchProducts()

  const changeLanguage = (language: 'vi' | 'en') => {
    i18n.changeLanguage(language)
  }

  const logoutMutation = useMutation({
    mutationFn: authApi.logoutAccount,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <div className='relative bg-gradient-to-r from-red-800 to-main-color px-2 py-2 text-white lg:px-8 lg:py-1'>
      <div className='container flex gap-2 py-1 max-sm:px-0 lg:flex-col lg:gap-3'>
        <div className='flex grow flex-row items-center gap-2 lg:gap-3'>
          <Link to={'/'} className='flex'>
            <img src={Logo} alt='Logo' className='hidden h-[32px] max-w-full md:block' title='Mew Shop' />
            <img
              src={MobiLogo}
              alt='Logo'
              className='block h-[32px] w-full max-w-full shrink-0 md:hidden'
              title='Mew Shop'
            />
          </Link>
          <div className='hidden rounded-md bg-white/20 p-2 text-white xl:flex'>
            <Link
              to={'/'}
              className='text-white transition-colors duration-100 hover:text-yellow-400'
              title={t('Header.shopSystem')}
            >
              <p className='text-base font-normal'>{t('Header.shopSystem')}</p>
              <span className='text-sm font-bold'>(45 {t('Header.brachs')})</span>
            </Link>
          </div>
          <form className='relative flex flex-grow' onSubmit={onSubmitSearch}>
            <input
              type='text'
              className='w-full rounded-l-md px-3 py-2 text-black outline-none'
              placeholder={t('Header.keyWord')}
              {...register('name')}
            />
            <button className='inline-flex cursor-pointer items-center rounded-r-md bg-white stroke-[#474747] px-3 py-2 hover:stroke-yellow-400'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width={24}
                height={24}
                viewBox='0 0 24 24'
                fill='none'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-search'
              >
                <circle cx={11} cy={11} r={8} />
                <path d='m21 21-4.3-4.3' />
              </svg>
            </button>
          </form>
          <div className='hidden flex-row items-center gap-2 lg:flex'>
            <div className='inline-block '>
              {avatarURL ? (
                <img src={avatarURL} alt={profile.name} className='h-10 w-10 rounded-md object-cover' />
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='white'
                  strokeWidth={2}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='lucide lucide-user-circle-2 h-10 w-10'
                >
                  <path d='M18 20a6 6 0 0 0-12 0' />
                  <circle cx={12} cy={10} r={4} />
                  <circle cx={12} cy={12} r={10} />
                </svg>
              )}
            </div>
            <div className='flex flex-col'>
              {!isAuthenticated ? (
                <>
                  <Link
                    to={path.login}
                    title={t('Authentication.login')}
                    className='font-bold text-white duration-100 hover:text-yellow-400'
                  >
                    <span>{t('Authentication.login')}</span>
                  </Link>
                  <Link
                    to={path.register}
                    title={t('Authentication.register')}
                    className='font-bold text-white duration-100 hover:text-yellow-400'
                  >
                    <span>{t('Authentication.register')}</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to={path.profile}
                    title={t('User.profile')}
                    className='w-fit max-w-[160px] truncate text-base font-semibold text-white duration-100 hover:text-yellow-400'
                  >
                    <span>{profile?.name || profile?.email}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    title={t('Authentication.register')}
                    className='text-left text-sm font-bold text-white underline duration-100 hover:text-yellow-400'
                  >
                    <span>{t('User.logout')}</span>
                  </button>
                </>
              )}
            </div>
          </div>
          <Popover
            as={'div'}
            renderPopover={
              <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
                <div className='flex w-40 flex-col py-2'>
                  <button
                    className={classNames(
                      'flex w-full items-center justify-between px-3 py-2 text-left hover:bg-slate-300 hover:text-main-color',
                      {
                        'cursor-not-allowed bg-cyan-100 font-bold text-main-color': currentLanguage === 'VI',
                        'bg-white text-black': currentLanguage !== 'VI'
                      }
                    )}
                    onClick={() => changeLanguage('vi')}
                  >
                    Tiếng Việt
                    {currentLanguage === 'VI' && (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width={24}
                        height={24}
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth={2}
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='lucide lucide-check'
                      >
                        <polyline points='20 6 9 17 4 12' />
                      </svg>
                    )}
                  </button>
                  <button
                    className={classNames(
                      'mt-2 flex w-full items-center justify-between px-3 py-2 text-left hover:bg-slate-300 hover:text-main-color',
                      {
                        'cursor-not-allowed bg-cyan-100 font-bold text-main-color': currentLanguage === 'EN',
                        'bg-white text-black': currentLanguage !== 'EN'
                      }
                    )}
                    onClick={() => changeLanguage('en')}
                  >
                    English
                    {currentLanguage === 'EN' && (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width={24}
                        height={24}
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth={2}
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='lucide lucide-check'
                      >
                        <polyline points='20 6 9 17 4 12' />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            }
          >
            <div className='hidden gap-1 lg:flex'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-5 w-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
                />
              </svg>
              <span className='font-bold'>{currentLanguage}</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-5 w-5'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
              </svg>
            </div>
          </Popover>
          <Link
            to={path.cart}
            title={t('Header.cart')}
            className='hidden flex-row items-center gap-2 rounded-md bg-white/20 p-2 text-white hover:text-yellow-400 lg:flex '
          >
            <div className='self-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width={24}
                height={24}
                viewBox='0 0 24 24'
                fill='none'
                stroke='white'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-shopping-basket'
              >
                <path d='m5 11 4-7' />
                <path d='m19 11-4-7' />
                <path d='M2 11h20' />
                <path d='m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4' />
                <path d='m9 11 1 9' />
                <path d='M4.5 15.5h15' />
                <path d='m15 11-1 9' />
              </svg>
            </div>
            <span className='font-semibold'>{t('Header.cart')}</span>
          </Link>
        </div>
        <div className='hidden flex-row lg:flex'>
          <NavLink
            to={path.home}
            key={path.home}
            className={({ isActive }) =>
              classNames('px-4 py-2 font-bold capitalize transition-all duration-200 hover:text-yellow-300', {
                'text-yellow-400': isActive,
                'text-white': isActive
              })
            }
          >
            <span>{t('Header.homePage')}</span>
          </NavLink>
          <NavLink
            to={path.productList}
            key={path.productList}
            className={({ isActive }) =>
              classNames('px-4 py-2 font-bold capitalize transition-all duration-200 hover:text-yellow-300', {
                'text-yellow-400': isActive,
                'text-white': isActive
              })
            }
          >
            <span>{t('Header.products')}</span>
          </NavLink>
        </div>
        <button className='centered cursor-pointer text-white lg:hidden' onClick={() => setOpenSideNav(true)}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width={24}
            height={24}
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth={2}
            strokeLinecap='round'
            strokeLinejoin='round'
            className='lucide lucide-menu'
          >
            <line x1={4} x2={20} y1={12} y2={12} />
            <line x1={4} x2={20} y1={6} y2={6} />
            <line x1={4} x2={20} y1={18} y2={18} />
          </svg>
        </button>
      </div>
      <MobileSideNav isOpenSideNav={openSideNav} setOpenSideNav={() => setOpenSideNav(false)} />
      {openSideNav && (
        <PortalComponent>
          <div
            className='absolute inset-0 z-10 h-full w-full bg-black/50 lg:hidden'
            onClick={() => setOpenSideNav(false)}
            tabIndex={0}
            role='button'
            aria-hidden='true'
          ></div>
        </PortalComponent>
      )}
    </div>
  )
}
