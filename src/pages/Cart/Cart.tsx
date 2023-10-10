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
            <div className='flex items-center gap-4 border-b bg-white p-5 max-sm:items-start' key={index}>
              <div className=''>
                <input type='checkbox' className='h-5 w-5 accent-main-color' checked={true} />
              </div>
              <div className='flex flex-1 items-center gap-2 max-sm:items-start'>
                <Link to='/' className=''>
                  <img
                    src='https://api-ecom.duthanhduoc.com/images/aa374023-7a5b-46ea-aca3-dad1b29fb015.jpg'
                    alt=''
                    className='h-auto w-auto md:h-20 md:w-20'
                  />
                </Link>
                <div className='flex w-full justify-between max-sm:flex-col max-sm:items-start sm:items-center'>
                  <Link to='/' className='md:text-md text-base font-medium uppercase text-black max-lg:max-w-[160px]'>
                    Điện thoại OPPO 32GB Soei re xin lạo xa xoi
                  </Link>
                  <div className='flex items-center gap-x-4 gap-y-2 max-sm:flex-col max-sm:items-start'>
                    <div className='flex gap-1 md:gap-2'>
                      <span className='text-base text-gray-500 line-through md:text-base'>₫190.000</span>
                      <span className='text-base font-bold text-main-color md:text-base'>₫190.000</span>
                    </div>
                    <QuantityController />
                    <div className='text-base font-bold text-main-color md:text-base'>
                      <span>₫2.000.000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        <div className='sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:justify-between'>
          <div className='flex items-center'>
            <div className='flex flex-shrink-0 items-center justify-center'>
              <input type='checkbox' className='h-5 w-5 accent-main-color' checked={true} />
            </div>
            <button className='mx-3 border-none bg-none'>Chọn tất cả 5</button>
            <button className='mx-3 border-none bg-none text-main-color'>Xóa</button>
          </div>

          <div className='mt-2 flex flex-col sm:mt-0 sm:flex-row sm:items-center'>
            <div>
              <div className='flex items-center max-sm:flex-col max-sm:items-start'>
                <div>Tổng thanh toán (5 sản phẩm):</div>
                <div className='ml-2 text-2xl text-main-color max-sm:ml-0 md:text-xl lg:text-2xl'>₫20.000.000</div>
              </div>
              <div className='flex items-center text-sm sm:justify-end'>
                <div className='text-gray-500'>Tiết kiệm:</div>
                <div className='ml-2 text-main-color'>₫230.000</div>
              </div>
            </div>
            <Button className='mx-auto mt-2 flex h-10 w-full items-center justify-center bg-main-color text-sm uppercase text-white hover:bg-main-color/80 sm:ml-4 sm:mt-0 sm:w-32 lg:w-48'>
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
