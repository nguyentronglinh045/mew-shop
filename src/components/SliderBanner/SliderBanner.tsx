import Carousel from 'react-multi-carousel'
import { useTranslation } from 'react-i18next'

interface CustomArrowProps {
  onClick?: () => void
}

const SliderBanner = () => {
  const { t } = useTranslation(['home'])

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  }

  // eslint-disable-next-line react/prop-types
  const CustomNextArrow: React.FC<CustomArrowProps> = ({ onClick }) => {
    return (
      <button
        className='group absolute right-2 flex h-[60px] w-[30px] items-center justify-center rounded-[30px_0_0_30px] 
        bg-white/50 max-sm:right-0'
        onClick={onClick}
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
          className='lucide lucide-chevron-right group-hover:stroke-red-500'
        >
          <path d='m9 18 6-6-6-6' />
        </svg>
      </button>
    )
  }
  // eslint-disable-next-line react/prop-types
  const CustomPrevArrow: React.FC<CustomArrowProps> = ({ onClick }) => {
    return (
      <button
        className='group absolute left-2 flex h-[60px] w-[30px] items-center justify-center rounded-[0_30px_30px_0] 
        bg-white/50 max-sm:left-0'
        onClick={onClick}
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
          className='lucide lucide-chevron-left group-hover:stroke-red-500'
        >
          <path d='m15 18-6-6 6-6' />
        </svg>
      </button>
    )
  }

  return (
    <>
      <div className='relative flex justify-center'>
        <img src='src/assets/images/big_bn_slide.webp' alt='banner' className='w-full max-sm:hidden' />
      </div>
      <div className='mx-auto -mt-16 flex h-auto w-full justify-center max-sm:mt-0'>
        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          swipeable
          draggable
          containerClass='max-w-[1440px] w-full'
          itemClass='md:px-2 rounded-xl'
          customRightArrow={<CustomNextArrow />}
          customLeftArrow={<CustomPrevArrow />}
        >
          <img src='src/assets/images/slide-img1.webp' alt='img' className='cursor-pointer' />
          <img src='src/assets/images/slide-img2.webp' alt='img' className='cursor-pointer' />
        </Carousel>
      </div>
      <div className='container my-1 flex flex-wrap md:my-2 lg:my-4'>
        <div className='flex flex-1 px-2 py-2 max-sm:flex-[0_0_50%]'>
          <div className='flex h-16 w-full items-center gap-4 rounded-xl border-dotted border-red-600 bg-white px-2 max-sm:border-2'>
            <img src='src/assets/icons/img_poli_1.webp' alt='' />
            <p>{t('Policy.safe')}</p>
          </div>
        </div>
        <div className='flex flex-1 px-2 py-2 max-sm:flex-[0_0_50%]'>
          <div className='flex h-16 w-full items-center gap-4 rounded-xl border-dotted border-red-600 bg-white px-2 max-sm:border-2'>
            <img src='src/assets/icons/img_poli_2.webp' alt='' />
            <p>{t('Policy.quality')}</p>
          </div>
        </div>
        <div className='flex flex-1 px-2 py-2 max-sm:flex-[0_0_50%]'>
          <div className='flex h-16 w-full items-center gap-4 rounded-xl border-dotted border-red-600 bg-white px-2 max-sm:border-2'>
            <img src='src/assets/icons/img_poli_3.webp' alt='' />
            <p>{t('Policy.service')}</p>
          </div>
        </div>
        <div className='flex flex-1 px-2 py-2 max-sm:flex-[0_0_50%]'>
          <div className='flex h-16 w-full items-center gap-4 rounded-xl border-dotted border-red-600 bg-white px-2 max-sm:border-2'>
            <img src='src/assets/icons/img_poli_4.webp' alt='' />
            <p>{t('Policy.delivery')}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SliderBanner
