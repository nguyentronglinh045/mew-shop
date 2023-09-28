import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import Carousel from 'react-multi-carousel'
import { NavLink } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import Pagination from 'src/components/Pagination'
import ProductCard from 'src/components/ProductCard'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { ProductListConfig } from 'src/types/product.type'
import Slide1 from '../../assets/images/slide-product1.webp'
import Slide2 from '../../assets/images/slide-product2.webp'
import AsideFilter from './components/AsideFilter'
import SortProductList from './components/SortProductList'

interface CustomArrowProps {
  onClick?: () => void
}
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
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
export default function ProductList() {
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
    <div className='bg-[#f3f3f3]'>
      <div className='container p-4'>
        <div className='flex flex-col gap-4'>
          <Carousel
            responsive={responsive}
            infinite
            autoPlay
            swipeable
            draggable
            containerClass='max-w-[1440px] w-full h-full'
            itemClass='md:px-1 rounded-xl'
            customRightArrow={<CustomNextArrow />}
            customLeftArrow={<CustomPrevArrow />}
          >
            <div className='group relative h-auto w-full'>
              <img src={Slide1} alt='img' className='h-full w-full cursor-pointer' />
              <div className='absolute left-0 right-0 top-0 z-10 h-0 w-full origin-top bg-white bg-opacity-60 opacity-100 transition-all duration-700 ease-in-out group-hover:h-full group-hover:opacity-0'></div>
            </div>
            <div className='group relative h-auto w-full'>
              <img src={Slide2} alt='img' className='h-full w-full cursor-pointer' />
              <div className='absolute left-0 right-0 top-0 z-10 h-0 w-full origin-top bg-white bg-opacity-60 opacity-100 transition-all duration-700 ease-in-out group-hover:h-full group-hover:opacity-0'></div>
            </div>
          </Carousel>
          <div className='flex h-14 w-full flex-wrap items-center gap-1 rounded-md bg-[#ffa293] p-2 text-white'>
            <NavLink
              to='/'
              className={({ isActive }) =>
                classNames(
                  ' px-2 py-2 text-base font-bold text-white delay-150 duration-200 ease-in-out hover:rounded-full hover:bg-main-color',
                  {
                    'rounded-full bg-main-color': isActive
                  }
                )
              }
            >
              <span>Điện thoại</span>
            </NavLink>
          </div>
          <div className='grid grid-cols-12 gap-4'>
            <div className='col-span-12 sm:col-span-4 md:col-span-4 lg:col-span-3'>
              <AsideFilter />
            </div>

            {productData && (
              <div className='col-span-12 p-2 sm:col-span-8 md:col-span-8 lg:col-span-9'>
                <div className='flex flex-col gap-2'>
                  <SortProductList />
                  <div className='my-1 h-[1px] bg-gray-300 px-4' />
                </div>
                <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                  {productData.data.data.products.map((product) => (
                    <div className='col-span-1' key={product._id}>
                      <ProductCard isFlashSale={false} product={product} />
                    </div>
                  ))}
                </div>
                <Pagination pageSize={productData.data.data.pagination.page_size} queryConfig={queryConfig} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
