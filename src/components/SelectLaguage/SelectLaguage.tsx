import i18next from 'i18next'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { locales } from 'src/i18n/i18n'
import classNames from 'classnames'

export default function SelectLaguage() {
  const { i18n } = useTranslation()
  const currentLanguage = locales[i18next.language as keyof typeof locales]
  const [openBox, setOpenBox] = useState(false)

  const changeLanguage = (language: 'vi' | 'en') => {
    i18n.changeLanguage(language)
    setOpenBox(false)
  }
  return (
    <div className='w-full overflow-hidden rounded bg-white font-semibold text-black'>
      <button
        className='relative flex w-full gap-1 py-2 pl-2 focus:border-none active:border-none'
        onClick={() => setOpenBox(!openBox)}
      >
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
        <span>{currentLanguage}</span>
        <div
          className={`centered absolute right-0 top-0 h-9 w-9 text-center duration-100 ${openBox ? '-rotate-90' : ''}`}
        >
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
            className='lucide lucide-chevron-left'
          >
            <path d='m15 18-6-6 6-6' />
          </svg>
        </div>
      </button>
      <div className={`flex flex-col gap-2 transition-all duration-300 ${openBox ? 'h-[76px]' : 'h-0'}`}>
        <button
          className={classNames('flex items-center  gap-2 px-2 py-1 text-left focus:border-none active:border-none', {
            'bg-cyan-100 font-bold text-main-color': currentLanguage === 'VI',
            'text-black': currentLanguage !== 'VI'
          })}
          onClick={() => changeLanguage('vi')}
        >
          <span>Tiếng Việt</span>
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
          className={classNames('flex items-center gap-2 px-2 py-1 text-left focus:border-none active:border-none', {
            'bg-cyan-100 font-bold text-main-color': currentLanguage === 'EN',
            'text-black': currentLanguage !== 'EN'
          })}
          onClick={() => changeLanguage('en')}
        >
          <span>English</span>
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
  )
}
