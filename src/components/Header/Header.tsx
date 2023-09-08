import { Link } from 'react-router-dom'
import Logo from 'src/assets/images/logo.webp'
import MobiLogo from 'src/assets/images/logo_mobi.webp'
import path from 'src/constants/path'
import MobileSideNav from '../MobileSideNav'
import { useState } from 'react'

export default function Header() {
  const [openSideNav, setOpenSideNav] = useState(false)
  return (
    <div className='relative z-40 bg-gradient-to-r from-red-800 to-red-600 px-2 py-2 text-white lg:px-8 lg:py-1'>
      <div className='container flex gap-2 py-1 max-sm:px-0 lg:flex-col lg:gap-3'>
        <div className='flex grow flex-row items-center gap-2 lg:gap-3'>
          <Link to={'/'} className='flex'>
            <img src={Logo} alt='Logo' className='hidden h-[32px] max-w-full md:block' title='Meo Mobile' />
            <img
              src={MobiLogo}
              alt='Logo'
              className='block h-[32px] w-full max-w-full shrink-0 md:hidden'
              title='Meo Mobile'
            />
          </Link>
          <div className='hidden rounded-[10px] bg-white/20 p-2 text-white lg:flex'>
            <Link
              to={'/'}
              className='text-white transition-colors duration-100 hover:text-yellow-400'
              title='Chi nhánh'
            >
              <p className='font-normal'>Hệ thống cửa hàng</p>
              <span className='font-bold'>(45 chi nhánh)</span>
            </Link>
          </div>
          <form className='relative flex flex-grow'>
            <input
              type='text'
              className='w-full rounded-l-md px-3 py-2 text-black outline-none'
              placeholder='Từ khóa'
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
          <Link
            to={'/'}
            className='hidden flex-row items-center gap-2 text-white duration-100 hover:text-yellow-400 lg:flex'
          >
            <div className='flex-1 animate-bounce'>
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
                className='lucide lucide-phone-call'
              >
                <path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' />
                <path d='M14.05 2a9 9 0 0 1 8 7.94' />
                <path d='M14.05 6A5 5 0 0 1 18 10' />
              </svg>
            </div>
            <div className='flex flex-col'>
              <div className='inline-block font-normal'>
                <span className=''>Gọi mua hàng</span>
              </div>
              <div className='inline-block font-bold'>
                <span>1234 5667</span>
              </div>
            </div>
          </Link>
          <div className='hidden flex-row items-center gap-2 lg:flex'>
            <div className='inline-block flex-1'>
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
            <div className='flex flex-col'>
              <Link to={path.login} className='font-bold text-white duration-100 hover:text-yellow-400'>
                <span>Đăng Nhập</span>
              </Link>
              <Link to={path.login} className='font-bold text-white duration-100 hover:text-yellow-400'>
                <span>Đăng Kí</span>
              </Link>
            </div>
          </div>
          <Link
            to={path.cart}
            className='hidden flex-row items-center gap-2 rounded-[10px] bg-white/20 p-2 text-white hover:text-yellow-400 lg:flex '
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
            <span className='font-semibold'>Giỏ hàng</span>
          </Link>
        </div>
        <div className='hidden flex-row lg:flex'>
          {[1, 2, 3, 4].map((index) => (
            <Link to={'/'} key={index} className='px-4 py-2 font-bold capitalize text-white hover:text-yellow-400'>
              <span>Trang chủ</span>
            </Link>
          ))}
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
        <div
          className='absolute inset-0 z-[49] h-screen w-screen bg-black/50 lg:hidden'
          onClick={() => setOpenSideNav(false)}
          tabIndex={0}
          role='button'
          aria-hidden='true'
        ></div>
      )}
    </div>
  )
}
