import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import ProductRating from 'src/components/ProductRating'
import { formatCurrency, formatNumberToSocialStyle, getIdFromNameId, rateSale } from 'src/utils/utils'
import DOMPurify from 'dompurify'
import { useEffect, useMemo, useState } from 'react'
import { Product, ProductListConfig } from 'src/types/product.type'
import ProductCard from 'src/components/ProductCard'
import ProductCardSkeleton from 'src/components/ProductCardSkeleton'
import QuantityController from 'src/components/QuantityController'

export default function ProductDetail() {
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const { data: productDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')
  const [buyCount, setBuyCount] = useState(1)
  const product = productDetailData?.data.data
  const currentImage = useMemo(
    () => (product ? product.images.slice(...currentIndexImages) : []),
    [currentIndexImages, product]
  )
  const queryConfig: ProductListConfig = { limit: '12', page: '1', category: product?.category._id }
  const { data: productsData, isFetching } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productApi.getProducts(queryConfig),
    staleTime: 3 * 60 * 1000,
    enabled: Boolean(product)
  })

  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [product])

  const chooseActive = (img: string) => {
    setActiveImage(img)
  }

  const next = () => {
    if (currentIndexImages[1] < (product as Product)?.images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }
  const prev = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }
  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }
  if (!product) {
    return null
  }
  return (
    <div className='bg-[#f3f3f3] py-2 md:py-6'>
      <Helmet>
        <title>{product.name}</title>
        <meta name='description' />
      </Helmet>

      <div className='container bg-white p-4 shadow'>
        <div className='flex flex-col gap-4 md:grid md:grid-cols-12 md:gap-9'>
          <div className='col-span-12 md:col-span-5'>
            <div className='relative w-full overflow-hidden pt-[100%] shadow'>
              <img
                src={activeImage}
                alt={product.name}
                className='absolute left-0 top-0 h-full w-full bg-white object-cover'
              />
            </div>
            <div className='relative mt-2 grid grid-cols-5 gap-1 md:mt-4'>
              <button
                className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                onClick={prev}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-5 w-5'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </button>
              {currentImage.map((img) => {
                const isActive = img === activeImage
                return (
                  <div className='relative w-full pt-[100%]' key={img} onClick={() => chooseActive(img)} aria-hidden>
                    <img
                      src={img}
                      alt={product.name}
                      className='absolute left-0 top-0 h-full w-full cursor-pointer bg-white object-cover'
                    />
                    {isActive && <div className='absolute inset-0 border-2 border-main-color' />}
                  </div>
                )
              })}
              <button
                className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                onClick={next}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-5 w-5'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </button>
            </div>
          </div>
          <div className='col-span-12 flex flex-col gap-4 md:col-span-7'>
            <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
            <div className='flex items-center gap-1'>
              <div className='flex items-center'>
                <span className='mr-1 border-b border-b-main-color text-main-color'>{product.rating}</span>
                <ProductRating
                  rating={product.rating}
                  activeClassname='fill-main-color text-main-color h-4 w-4'
                  noneActiveClassname='fill-gray-300 text-gray-300 h-4 w-4'
                />
              </div>
              <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
              <div>
                <span>{formatNumberToSocialStyle(product.sold)}</span>
                <span className='ml-1 text-gray-500'>Đã bán</span>
              </div>
            </div>
            <div className='mt-3 flex items-center bg-gray-100 px-5 py-4'>
              <div className='text-main-color line-through'>₫{formatCurrency(product.price_before_discount)}</div>
              <div className='ml-3 text-3xl font-medium text-main-color'>₫{formatCurrency(product.price)}</div>
              <div className='ml-4 rounded-md bg-main-color px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                {rateSale(product.price_before_discount, product.price)} giảm
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <div className='text-base capitalize text-gray-500'>Số lượng</div>
              <QuantityController
                onDecrease={handleBuyCount}
                onIncrease={handleBuyCount}
                onType={handleBuyCount}
                value={buyCount}
                max={product.quantity}
              />
              <div className='text-sm text-gray-500'>{product.quantity} khả dụng</div>
            </div>
            <div className='flex items-center'>
              <button className='flex h-12 items-center justify-center rounded-md border border-main-color bg-main-color/10 px-2 capitalize text-main-color shadow-sm hover:bg-main-color/5 md:px-5'>
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
                  className='lucide lucide-shopping-cart mr-2'
                >
                  <circle cx={8} cy={21} r={1} />
                  <circle cx={19} cy={21} r={1} />
                  <path d='M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12' />
                </svg>
                Thêm vào giỏ hàng
              </button>
              <button className='ml-4 flex h-12 items-center justify-center rounded-md bg-main-color px-2 capitalize text-white shadow-sm outline-none hover:bg-main-color/90 md:px-5'>
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='container mt-4 bg-white p-4 shadow'>
        <div className='rounded bg-gray-100 p-4 text-lg font-bold capitalize text-slate-700'>Mô tả sản phẩm</div>
        <div className='mx-4 mb-4 mt-4 text-sm leading-loose'>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(product.description)
            }}
          ></div>
        </div>
      </div>
      <div className='mt-4'>
        <div className='container'>
          <div className='uppercase text-gray-400'>CÓ THỂ BẠN CŨNG THÍCH</div>
          <div className='mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
            {!isFetching &&
              productsData &&
              productsData.data.data.products.map((product) => (
                <div className='col-span-1' key={product._id}>
                  <ProductCard isFlashSale={false} product={product} />
                </div>
              ))}
            {(isFetching || !productsData) &&
              Array(6)
                .fill(0)
                .map((_, index) => (
                  <div className='col-span-1' key={index}>
                    <ProductCardSkeleton />
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  )
}
