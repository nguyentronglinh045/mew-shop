import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'
import authApi from 'src/apis/auth.api'
import Logo from 'src/assets/images/logo.webp'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import Button from '../Button'
import SelectLaguage from '../SelectLaguage'
import { getAvatarURL } from 'src/utils/utils'

interface MobileSideNavProps {
  isOpenSideNav: boolean
  setOpenSideNav: () => void
}
export default function MobileSideNav({ isOpenSideNav, setOpenSideNav }: MobileSideNavProps) {
  const { isAuthenticated, setIsAuthenticated, setProfile, profile } = useContext(AppContext)
  const { t } = useTranslation()
  const avatarURL = profile?.avatar && getAvatarURL(profile.avatar)
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
    <div
      className={`absolute bottom-0 right-0 top-0 z-50 flex h-screen w-[320px]  max-w-[320px] flex-col bg-main-color transition-all duration-700 lg:hidden ${
        isOpenSideNav ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      } `}
    >
      {/* <div
       className={classNames(
         `absolute bottom-0 right-0 top-0 z-50 flex h-screen w-[320px] max-w-[320px] flex-col bg-main-color transition-all duration-700 lg:hidden`,
         {
           'translate-x-0 opacity-100': isOpenMobileSideNav === true,
           'translate-x-full opacity-0': isOpenMobileSideNav === false
         }
       )}
     > */}
      <div className='flex w-full flex-col gap-4 px-4 py-2'>
        <div className='w-full px-2 py-2'>
          <img src={Logo} alt='Logo' title='Logo' className='h-auto w-3/4 text-center' />
        </div>

        <div className='flex flex-col'>
          <NavLink
            to={'/'}
            className={({ isActive }) =>
              `px-2 py-2 font-semibold capitalize duration-100 hover:text-yellow-400 ${
                isActive ? 'text-yellow-400' : 'text-white'
              }`
            }
          >
            <span>Trang chủ</span>
          </NavLink>
          <NavLink
            to={'/contact'}
            className={({ isActive }) =>
              `px-2 py-2 font-semibold capitalize duration-100 hover:text-yellow-400 ${
                isActive ? 'text-yellow-400' : 'text-white'
              }`
            }
          >
            <span>Liên hệ</span>
          </NavLink>
          <NavLink
            to={'/product'}
            className={({ isActive }) =>
              `px-2 py-2 font-semibold capitalize duration-100 hover:text-yellow-400 ${
                isActive ? 'text-yellow-400' : 'text-white'
              }`
            }
          >
            <span>Sản phẩm</span>
          </NavLink>
        </div>
        <div className='border-t border-white'></div>

        <div className='flex flex-col justify-between gap-4'>
          {!isAuthenticated ? (
            <div className='flex gap-2'>
              <Link to={path.login} className='w-1/2 rounded-md bg-white px-1 py-2 hover:bg-[#E6C2AE]'>
                <p className='text-center font-bold text-black'>{t('Authentication.login')}</p>
              </Link>
              <Link to={path.register} className='w-1/2 rounded-md bg-white px-1 py-2 hover:bg-[#E6C2AE]'>
                <p className='text-center font-bold text-black'>{t('Authentication.register')}</p>
              </Link>
            </div>
          ) : (
            <>
              <div className='flex w-full flex-row items-center gap-2'>
                <div className='inline-block'>
                  {avatarURL ? (
                    <img src={avatarURL} alt={profile.name} className='h-9 w-9 rounded-md object-cover' />
                  ) : (
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
                      className='lucide lucide-user-circle-2'
                    >
                      <path d='M18 20a6 6 0 0 0-12 0' />
                      <circle cx={12} cy={10} r={4} />
                      <circle cx={12} cy={12} r={10} />
                    </svg>
                  )}
                </div>
                <div className='block max-w-[70%] overflow-hidden truncate'>{profile?.name || profile?.email}</div>
              </div>
              <Button
                className='cursor-pointer rounded-md bg-white px-3 py-2 hover:bg-[#E6C2AE]'
                classNameText='font-bold text-black'
                onClick={handleLogout}
              >
                {t('User.logout')}
              </Button>
            </>
          )}
        </div>
        <SelectLaguage />
      </div>

      <button className='absolute right-4 top-4 cursor-pointer text-white' onClick={setOpenSideNav}>
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
          className='lucide lucide-x duration-200 hover:rotate-90'
        >
          <path d='M18 6 6 18' />
          <path d='m6 6 12 12' />
        </svg>
      </button>
    </div>
  )
}
