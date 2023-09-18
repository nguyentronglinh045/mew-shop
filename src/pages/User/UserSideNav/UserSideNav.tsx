import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import Button from 'src/components/Button'
import path from 'src/constants/path'

export default function UserSideNav() {
  return (
    <div className='col-span-4 flex flex-col items-center gap-2 px-1 py-4 md:col-span-4 lg:col-span-3 md:items-start'>
      <div className='flex flex-col items-center gap-2 border-b border-white pb-4 pt-2 lg:py-2'>
        <div className='h-12 w-12'>
          <img
            src='https://down-vn.img.susercontent.com/file/3a590e0a7fc8f59111eeb7e4cf1781d3'
            alt=''
            className='rounded-md object-cover'
          />
        </div>
        <div className='line-clamp-1 flex shrink flex-col gap-1 truncate'>
          <p className='text-sm text-black'>nguyentronglinh045@gmail.com</p>
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
