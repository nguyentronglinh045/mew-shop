import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import QuantityController from 'src/components/QuantityController'
import Button from 'src/components/Button'

export default function Cart() {
  return (
    <div className='bg-[#f3f3f3] py-2 md:py-6'>
      <Helmet>
        <title>Giỏ hàng</title>
        <meta name='description' content='Giỏ hàng của tôi ' />
      </Helmet>
      <div className='container p-2 shadow md:p-4 '>
        <div className='mb-2 text-lg font-bold md:text-2xl'>
          <h2>Giỏ hàng</h2>
        </div>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <div className='mb-2 flex gap-1 overflow-hidden bg-white p-2 md:p-4' key={index}>
              <div className='flex flex-shrink-0 items-center justify-center'>
                <input type='checkbox' className='h-5 w-5 accent-main-color' checked={true} />
              </div>
              <div className='flex w-full flex-row gap-2 md:gap-4'>
                <Link to='/' className='flex-shrink-0 self-center'>
                  <img
                    src='https://api-ecom.duthanhduoc.com/images/aa374023-7a5b-46ea-aca3-dad1b29fb015.jpg'
                    alt=''
                    className='h-20 w-20 md:h-24 md:w-24'
                  />
                </Link>
                <div className='flex flex-grow flex-col gap-1 truncate md:gap-2'>
                  <Link
                    to='/'
                    className='flex-shrink flex-grow truncate text-base font-medium uppercase text-black md:text-lg'
                  >
                    Điện thoại OPPO 32GB Soei re xin lạo xa xoi
                  </Link>
                  <div className='flex gap-1 md:gap-2'>
                    <span className='truncate text-base text-gray-500 line-through md:text-base'>₫190000</span>
                    <span className='truncate text-base font-bold text-main-color md:text-base'>₫190000</span>
                  </div>
                  <QuantityController />
                </div>
              </div>
            </div>
          ))}
        <div className='sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center'>
          <div className='flex items-center'>
            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
              <input type='checkbox' className='h-5 w-5 accent-main-color' checked={true} />
            </div>
            <button className='mx-3 border-none bg-none'>Chọn tất cả 5</button>
            <button className='mx-3 border-none bg-none'>Xóa</button>
          </div>

          <div className='mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
            <div>
              <div className='flex items-center sm:justify-end'>
                <div>Tổng thanh toán (5 sản phẩm):</div>
                <div className='ml-2 text-2xl text-main-color'>₫20000</div>
              </div>
              <div className='flex items-center text-sm sm:justify-end'>
                <div className='text-gray-500'>Tiết kiệm</div>
                <div className='ml-6 text-main-color'>₫230000</div>
              </div>
            </div>
            <Button className='mt-5 flex h-10 w-52 items-center justify-center bg-main-color text-sm uppercase text-white hover:bg-main-color/80 sm:ml-4 sm:mt-0'>
              Mua hàng
            </Button>
          </div>
        </div>
        {/* <div className='flex flex-col justify-center gap-2'>
          <img className='mx-auto h-1/2 w-1/2' src={NoProductInCart} alt='no-purchase' />

          <span className='text-center text-lg font-bold text-gray-500'>Giỏ hàng trống</span>
          <Link
            to={path.home}
            className='w-fit self-center rounded-md bg-main-color px-10 py-3 uppercase text-white transition-all hover:bg-main-color/80'
          >
            Mua Ngay
          </Link>
        </div> */}
      </div>
    </div>
  )
}
