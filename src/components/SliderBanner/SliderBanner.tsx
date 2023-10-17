import Carousel from 'react-multi-carousel'
import { useTranslation } from 'react-i18next'
import Slide1 from '../../assets/images/slide-img1.webp'
import Slide2 from '../../assets/images/slide-img2.webp'
import Banner from '../../assets/images/big_bn_slide.webp'
import Poli1 from '../../assets/icons/img_poli_1.webp'
import Poli2 from '../../assets/icons/img_poli_2.webp'
import Poli3 from '../../assets/icons/img_poli_3.webp'
import Poli4 from '../../assets/icons/img_poli_4.webp'

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
        <img src={Banner} alt='banner' title='Mew Shop' className='w-full max-sm:hidden' />
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
          <img src={Slide1} alt='img' className='cursor-pointer' />
          <img src={Slide2} alt='img' className='cursor-pointer' />
        </Carousel>
      </div>
      <div className='container my-1 flex flex-wrap md:my-2 lg:my-4'>
        <div className='flex flex-1 px-2 py-2 max-sm:flex-[0_0_50%]'>
          <div className='flex h-16 w-full items-center gap-4 rounded-xl border-dotted border-red-600 bg-white px-2 max-sm:border-2'>
            <img src={Poli1} alt={t('Policy.safe')} />
            <p>{t('Policy.safe')}</p>
          </div>
        </div>
        <div className='flex flex-1 px-2 py-2 max-sm:flex-[0_0_50%]'>
          <div className='flex h-16 w-full items-center gap-4 rounded-xl border-dotted border-red-600 bg-white px-2 max-sm:border-2'>
            <img src={Poli2} alt={t('Policy.quality')} />
            <p>{t('Policy.quality')}</p>
          </div>
        </div>
        <div className='flex flex-1 px-2 py-2 max-sm:flex-[0_0_50%]'>
          <div className='flex h-16 w-full items-center gap-4 rounded-xl border-dotted border-red-600 bg-white px-2 max-sm:border-2'>
            <img src={Poli3} alt={t('Policy.service')} />
            <p>{t('Policy.service')}</p>
          </div>
        </div>
        <div className='flex flex-1 px-2 py-2 max-sm:flex-[0_0_50%]'>
          <div className='flex h-16 w-full items-center gap-4 rounded-xl border-dotted border-red-600 bg-white px-2 max-sm:border-2'>
            <img src={Poli4} alt={t('Policy.delivery')} />
            <p>{t('Policy.delivery')}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SliderBanner
