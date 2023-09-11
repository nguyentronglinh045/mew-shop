import { Link, NavLink } from 'react-router-dom'
import Logo from 'src/assets/images/logo.webp'
import path from 'src/constants/path'
import Button from '../Button'
import SelectLaguage from '../SelectLaguage'
interface MobileSideNavProps {
  isOpenSideNav: boolean
  setOpenSideNav: () => void
}
export default function MobileSideNav({ isOpenSideNav, setOpenSideNav }: MobileSideNavProps) {
  return (
    <div
      className={`absolute bottom-0 right-0 top-0 z-50 flex h-screen w-[320px]  max-w-[320px] flex-col bg-main-color transition-all duration-700 lg:hidden ${
        isOpenSideNav ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      } `}
    >
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
          <div className='flex gap-2'>
            <Link to={path.login} className='w-1/2 rounded-md bg-white px-1 py-2 hover:bg-[#E6C2AE]'>
              <p className='text-center font-bold text-black'>Đăng nhập</p>
            </Link>
            <Link to={path.register} className='w-1/2 rounded-md bg-white px-1 py-2 hover:bg-[#E6C2AE]'>
              <p className='text-center font-bold text-black'>Đăng ký</p>
            </Link>
          </div>
          <div className='flex w-full flex-row items-center gap-2'>
            <div className='h-auto w-6 shrink-0'>
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
            </div>
            <div className='block max-w-[70%] overflow-hidden truncate'>Nguyễn Văn Ân</div>
          </div>
          <Button
            className='cursor-pointer rounded-md bg-white px-3 py-2 hover:bg-[#E6C2AE]'
            classNameText='font-bold text-black'
          >
            Đăng xuất
          </Button>
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
