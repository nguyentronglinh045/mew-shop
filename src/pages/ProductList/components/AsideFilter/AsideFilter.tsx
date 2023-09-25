import Button from 'src/components/Button'
import InputNumber from 'src/components/InputNumber'
import RatingStars from '../RatingStars'

export default function AsideFilter() {
  return (
    <div className='p-2'>
      <div className='flex cursor-default items-center gap-1 text-base font-bold text-main-color md:text-lg'>
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
          className='lucide lucide-filter'
        >
          <polygon points='22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3' />
        </svg>
        <span>Lọc giá</span>
      </div>
      <form className='mt-2 flex flex-col gap-2'>
        <div className='flex items-start gap-1'>
          <InputNumber
            type='text'
            className='grow'
            placeholder='Giá tối thiểu'
            classNameInput='p-2 w-full outline-none border border-gray-400 focus:border-blue-300 rounded-md focus:shadow-sm'
            classNameError='hidden'
          />

          <InputNumber
            type='text'
            className='grow'
            placeholder='Giá tối đa'
            classNameInput='p-2 w-full outline-none border border-gray-400 focus:border-blue-300 rounded-md focus:shadow-sm'
            classNameError='hidden'
          />
        </div>
        {/* <div className='mt-1 min-h-[1.25rem] text-center text-sm text-red-600'>{errors.price_min?.message}</div> */}
        <Button className='flex w-full items-center justify-center rounded-md bg-main-color p-2 text-sm uppercase text-white hover:bg-main-color/80'>
          Áp dụng
        </Button>
      </form>
      <div className='my-4 h-[1px] bg-gray-300' />
      <div className='cursor-default text-base font-bold text-main-color md:text-lg'>
        <span>Đánh giá</span>
      </div>
      <RatingStars />
      <div className='my-4 h-[1px] bg-gray-300' />
      <Button className='flex w-full items-center justify-center rounded-md bg-main-color p-2 text-sm uppercase text-white hover:bg-main-color/80'>
        Xóa tất cả
      </Button>
    </div>
  )
}
