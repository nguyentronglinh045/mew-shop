import { useQuery } from '@tanstack/react-query'
import Carousel from 'react-multi-carousel'
import { Link } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { ProductListConfig } from 'src/types/product.type'
import ProductCard from '../ProductCard'
import Countdown from './Countdown'

interface CustomArrowProps {
  onClick?: () => void
}

const FlashSale = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  }

  // eslint-disable-next-line react/prop-types
  const CustomNextArrow: React.FC<CustomArrowProps> = ({ onClick }) => {
    return (
      <button
        className='group absolute -right-2 flex h-[60px] w-[40px] items-center justify-center rounded-[30px_0_0_30px] 
        bg-[#f7f7f7] max-sm:right-0'
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
        className='group absolute -left-2 flex h-[60px] w-[40px] items-center justify-center rounded-[0_30px_30px_0] 
        bg-[#f7f7f7] max-sm:left-0'
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

  const queryConfig = useQueryConfig()
  const { data: productData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  return (
    <div className='bg-flash-sale container flex flex-col p-4'>
      <div className='mb-4 flex items-center justify-between max-lg:flex-col max-lg:gap-y-2'>
        <h2 className='z-[7] text-[22px] font-bold uppercase text-[#ffd641]'>
          <Link to='/' className='flex items-center gap-2 '>
            <img src='src/assets/icons/flash.webp' alt='' width={24} height={24} />
            Flash Sale
          </Link>
        </h2>
        <a href='/' className='text-center text-white'>
          Giảm ngay 120k (áp dụng cho các đơn hàng trên 500k)
        </a>
        <Countdown />
      </div>
      {productData && (
        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          swipeable
          draggable
          containerClass=''
          itemClass='px-2'
          customLeftArrow={<CustomPrevArrow />}
          customRightArrow={<CustomNextArrow />}
        >
          {productData.data.data.products.map((product) => (
            <ProductCard isFlashSale key={product._id} product={product} />
          ))}
        </Carousel>
      )}
    </div>
  )
}

export default FlashSale
