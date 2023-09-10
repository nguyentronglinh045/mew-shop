import Carousel from 'react-multi-carousel'
import { useTranslation } from 'react-i18next'


const Slider = () => {
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

  return (
    <>
      <div className='relative flex justify-center'>
        <img src='src/assets/images/big_bn_slide.webp' alt='banner' className='max-sm:hidden max-w-[1440px] w-full' />
        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          swipeable
          draggable
          containerClass='max-w-[1440px] w-full absolute top-3/4'
          itemClass='md:px-2 rounded-xl'
        >
          <img src='src/assets/images/slide-img1.webp' alt='img' className='cursor-pointer' />
          <img src='src/assets/images/slide-img2.webp' alt='img' className='cursor-pointer' />
        </Carousel>
      </div>
      <div className='container xl:mt-[160px] lg:mt-[120px] md:mt-[80px] mt-[160px] flex flex-wrap'>
        <div className='px-2 py-2 flex flex-1 max-sm:flex-[0_0_50%]'>
          <div className='flex h-16 rounded-xl w-full items-center gap-4 bg-white px-2 max-sm:border-2 border-dotted border-red-600'>
            <img src='src/assets/icons/img_poli_1.webp' alt='' />
            <p>{t('Policy.safe')}</p>
          </div>
        </div>
        <div className='px-2 py-2 flex flex-1 max-sm:flex-[0_0_50%]'>
          <div className='flex h-16 rounded-xl w-full items-center gap-4 bg-white px-2 max-sm:border-2 border-dotted border-red-600'>
            <img src='src/assets/icons/img_poli_2.webp' alt='' />
            <p>{t('Policy.quality')}</p>
          </div>
        </div>
        <div className='px-2 py-2 flex flex-1 max-sm:flex-[0_0_50%]'>
          <div className='flex h-16 rounded-xl w-full items-center gap-4 bg-white px-2 max-sm:border-2 border-dotted border-red-600'>
            <img src='src/assets/icons/img_poli_3.webp' alt='' />
            <p>{t('Policy.service')}</p>
          </div>
        </div>
        <div className='px-2 py-2 flex flex-1 max-sm:flex-[0_0_50%]'>
          <div className='flex h-16 rounded-xl w-full items-center gap-4 bg-white px-2 max-sm:border-2 border-dotted border-red-600'>
            <img src='src/assets/icons/img_poli_4.webp' alt='' />
            <p>{t('Policy.delivery')}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Slider
