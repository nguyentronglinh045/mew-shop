import { Link } from 'react-router-dom'
import { Product as ProductType } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle, rateSale } from 'src/utils/utils'
import ProductRating from '../ProductRating'
import { useTranslation } from 'react-i18next'

interface ProductCardProps {
  className?: string
  isFlashSale?: boolean
  product: ProductType
}

const ProductCard = ({ className, isFlashSale, product }: ProductCardProps) => {
  const { t } = useTranslation()
  return (
    <div
      className={`group relative flex w-full flex-1 cursor-pointer flex-col gap-1 overflow-hidden rounded-xl bg-white px-3 py-3 shadow-lg ${className}`}
      title={product.name}
    >
      <div
        className='absolute -left-[2px] top-[5px] z-10 w-auto rounded-r-[13px] bg-main-color px-[6px] py-1 text-xs font-bold text-white shadow-[0_0_5px_1px_#fff] 
      after:absolute after:bottom-[-5px] after:left-0 after:h-0 after:w-0 after:border-b-[5px] after:border-l-0 after:border-r-[5px] after:border-t-0 after:border-solid 
      after:border-y-transparent after:border-l-transparent after:border-r-[#d80000] after:brightness-75'
      >
        <span>
          {t('ProductList.off')} {rateSale(product.price_before_discount, product.price)}
        </span>
      </div>

      <div className='relative w-full overflow-hidden pt-[100%]'>
        <img
          src={product.image}
          alt={product.name}
          className='absolute left-0 top-0 h-full w-full object-cover duration-150 group-hover:scale-110'
        />

        <span className='absolute bottom-0 left-0 z-[9] flex items-center gap-[5px] rounded-xl bg-gradient-to-r from-[#3bacf0] to-[#1b6dc1] pr-2 text-[10px] text-white'>
          <img src='src/assets/icons/label_img_3.webp' className='mr-1' width={20} height={20} alt='' />
          VNPAY giảm 500K
        </span>
        <div className='absolute bottom-0 right-0 rounded-full bg-rose-600 p-1 opacity-0 transition-all duration-200 group-hover:right-1 group-hover:opacity-100 max-sm:hidden '>
          <Link to='/'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='32'
              height='32'
              viewBox='0 0 24 24'
              fill='none'
              stroke='white'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='lucide lucide-cog multi-sprin'
            >
              <path d='M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z' />
              <path d='M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z' />
              <path d='M12 2v2' />
              <path d='M12 22v-2' />
              <path d='m17 20.66-1-1.73' />
              <path d='M11 10.27 7 3.34' />
              <path d='m20.66 17-1.73-1' />
              <path d='m3.34 7 1.73 1' />
              <path d='M14 12h8' />
              <path d='M2 12h2' />
              <path d='m20.66 7-1.73 1' />
              <path d='m3.34 17 1.73-1' />
              <path d='m17 3.34-1 1.73' />
              <path d='m11 13.73-4 6.93' />
            </svg>
          </Link>
        </div>
      </div>
      {isFlashSale && (
        <div className='relative z-[1] mt-2 flex h-[20px] w-full overflow-hidden rounded-xl bg-[#ff9a9a]'>
          <img src='src/assets/icons/hot-sale.webp' alt='' className='absolute left-[2px] z-[3] w-[18px]' />
          <div className='absolute z-[2] flex h-full w-full items-center justify-center text-[12px] uppercase text-white '>
            <span>Sắp cháy hàng</span>
          </div>
          <div
            className={`remain absolute left-0 top-0 z-[1] h-full w-3/4
          rounded-xl bg-gradient-to-r from-[#ec1a17] to-[#ffad00]`}
          ></div>
        </div>
      )}

      <Link to='/'>
        <h2 className='mt-1 truncate text-base font-bold'>{product.name}</h2>
      </Link>
      <div className='flex items-center gap-x-2'>
        <div className='text-main-color'>
          <span className='text-xs'>₫</span>
          <span className='text-[13px] font-bold sm:text-[16px]'>{formatCurrency(product.price)}</span>
        </div>
        <div className='flex items-center text-[#929292] line-through'>
          <span className='text-xs'>₫</span>
          <span className='text-[11px] sm:text-[13px]'>{formatCurrency(product.price_before_discount)}</span>
        </div>
      </div>
      <div className='flex items-center justify-between'>
        <div className='flex'>
          <ProductRating rating={product.rating} />
        </div>
        <p className='truncate text-[10px]'>
          {formatNumberToSocialStyle(product.sold)} {t('ProductList.sold')}
        </p>
      </div>
    </div>
  )
}

export default ProductCard
