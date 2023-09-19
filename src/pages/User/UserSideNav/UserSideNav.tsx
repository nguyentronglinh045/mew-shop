import classNames from 'classnames'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import Button from 'src/components/Button'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { getAvatarURL } from 'src/utils/utils'

export default function UserSideNav() {
  const { profile } = useContext(AppContext)
  const avatarURL = profile?.avatar && getAvatarURL(profile.avatar)
  return (
    <div className='col-span-4 flex flex-col items-center gap-2 px-1 py-4 md:col-span-4 md:items-start lg:col-span-3'>
      <div className='flex flex-col items-center gap-2 border-b border-white pb-4 pt-2 md:flex-row lg:py-2'>
        <div className='h-12 w-12'>
          {avatarURL ? (
            <img src={avatarURL} alt={profile.name} className='h-12 w-12 rounded-md object-cover' />
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='black'
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
        <div className='line-clamp-1 flex shrink flex-col gap-1 truncate'>
          <p className='text-sm text-black'>{profile?.name || profile?.email}</p>
          <Button classNameText='text-sm' className='w-fit border border-slate-400 bg-transparent px-2'>
            Chọn ảnh
          </Button>
        </div>
      </div>
      {/* <div className='border-b border-white' /> */}
      <div className='flex'>
        <NavLink
          to={path.profile}
          className={({ isActive }) =>
            classNames(`text-base hover:text-main-color`, {
              'text-main-color': isActive,
              'text-black': !isActive
            })
          }
        >
          Thông tin người dùng
        </NavLink>
      </div>
      <div className='flex'>
        <NavLink
          to={path.changePassword}
          className={({ isActive }) =>
            classNames(`text-base hover:text-main-color`, {
              'text-main-color': isActive,
              'text-black': !isActive
            })
          }
        >
          Đổi mật khẩu
        </NavLink>
      </div>
    </div>
  )
}
