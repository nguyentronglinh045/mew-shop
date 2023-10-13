import FooterLogo from 'src/assets/images/logo_foo.webp'
import FacebookIcon from 'src/assets/icons/facebook.webp'
import TwitterIcon from 'src/assets/icons/twitter.webp'
import InstagramIcon from 'src/assets/icons/instagram.webp'
import YoutubeIcon from 'src/assets/icons/youtube.webp'
import ShoppeIcon from 'src/assets/icons/shopee.webp'
import LazadaIcon from 'src/assets/icons/lazada.webp'
import Payment4Img from 'src/assets/images/payment-4.webp'
import Payment3Img from 'src/assets/images/payment-3.webp'
import Payment2Img from 'src/assets/images/payment-2.webp'
import Payment1Img from 'src/assets/images/payment-1.webp'

export default function Footer() {
  return (
    <div className='container mt-4 bg-white p-4 md:mt-8'>
      <div className='flex flex-col'>
        <div className='flex flex-wrap max-md:gap-y-4 max-sm:flex-col'>
          <div className='px-2 md:w-1/2'>
            <img src={FooterLogo} alt='footer logo' className='h-[36px] max-w-full' title='Meo Mobile' />
            <div className='flex gap-1'>
              <h3 className='font-bold leading-5'>Trụ sở chính: </h3>
              <p className='flex-1 text-[14px] leading-5 text-[#4c4c4c]'>
                Ladeco Building, 2366 Doi Can Street, Ba Dinh District, Hanoi.
              </p>
            </div>
            <div className='flex gap-1'>
              <h3 className='font-bold leading-5'>Email: </h3>
              <p className='text-[14px] leading-5 text-[#4c4c4c]'>support@sapo.vn</p>
            </div>
            <div className='flex gap-1'>
              <h3 className='font-bold leading-5'>Hotline: </h3>
              <p className='text-[14px] leading-5 text-[#4c4c4c]'>1900 6750</p>
            </div>
            <p className='text-[14px] text-[#4c4c4c]'>
              Giấy chứng nhận Đăng ký Kinh doanh số 0309532xxx do Sở Kế hoạch và Đầu tư Thành phố Hà Nội cấp ngày
              01/04/2002
            </p>
          </div>
          <div className='px-2 sm:w-1/2 md:w-1/4'>
            <h1 className='text-[20px] font-bold text-[#4c4c4c]'>Chính sách</h1>
            <ul className='mt-3'>
              <li>
                <a className='text-[14px] text-[#4c4c4c] hover:text-[#d70018]' href='/'>
                  Chính sách mua hàng
                </a>
              </li>
              <li>
                <a className='text-[14px] text-[#4c4c4c] hover:text-[#d70018]' href='/'>
                  Chính sách đổi trả
                </a>
              </li>
              <li>
                <a className='text-[14px] text-[#4c4c4c] hover:text-[#d70018]' href='/'>
                  Chính sách bảo hành
                </a>
              </li>
              <li>
                <a className='text-[14px] text-[#4c4c4c] hover:text-[#d70018]' href='/'>
                  Gửi góp ý, khiếu nại
                </a>
              </li>
            </ul>
          </div>
          <div className='px-2 sm:w-1/2 md:w-1/4'>
            <h1 className='text-[20px] font-bold text-[#4c4c4c]'>Kết nối với chúng tôi</h1>
            <div className='mt-2 flex flex-wrap gap-2'>
              <img src={FacebookIcon} alt='facebook' className='h-[32px] w-[32px] rounded-full' />
              <img src={TwitterIcon} alt='twitter' className='h-[32px] w-[32px] rounded-full' />
              <img src={InstagramIcon} alt='instagram' className='h-[32px] w-[32px] rounded-full' />
              <img src={YoutubeIcon} alt='youtube' className='h-[32px] w-[32px] rounded-full' />
              <img src={ShoppeIcon} alt='shoppe' className='h-[32px] w-[32px] rounded-full' />
              <img src={LazadaIcon} alt='lazada' className='h-[32px] w-[32px] rounded-full' />
            </div>
            <p className='mt-4'>Phương thức thanh toán</p>
            <div className='mt-2 flex flex-wrap gap-2'>
              <img src={Payment1Img} alt='payment' className='h-[30px] w-[45px]' />
              <img src={Payment2Img} alt='payment' className='h-[30px] w-[45px]' />
              <img src={Payment3Img} alt='payment' className='h-[30px] w-[45px]' />
              <img src={Payment4Img} alt='payment' className='h-[30px] w-[45px]' />
            </div>
          </div>
        </div>
        <div className='my-8 h-[1px] w-full bg-slate-300' />
        <p className='text-center'>Copyright&copy;: Local Host</p>
      </div>
    </div>
  )
}
