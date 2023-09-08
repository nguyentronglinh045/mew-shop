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

import { productsType } from 'src/constants'

export default function Footer() {
  return (
    <div className='flex flex-col'>
      <div className='flex flex-wrap max-sm:flex-col max-md:gap-y-4'>
        <div className='px-2 md:w-1/2'>
          <img src={FooterLogo} alt='footer logo' className='max-w-full h-[36px]' title='Meo Mobile' />
          <div className='flex gap-1'>
            <h3 className='font-bold'>Trụ sở chính: </h3>
            <p className='text-[14px] text-[#4c4c4c]'>Ladeco Building, 266 Doi Can Street, Ba Dinh District, Hanoi.</p>
          </div>
          <div className='flex gap-1'>
            <h3 className='font-bold'>Email: </h3>
            <p className='text-[14px] text-[#4c4c4c]'>support@sapo.vn</p>
          </div>
          <div className='flex gap-1'>
            <h3 className='font-bold'>Hotline: </h3>
            <p className='text-[14px] text-[#4c4c4c]'>1900 6750</p>
          </div>
          <p className='text-[14px] text-[#4c4c4c]'>
            Giấy chứng nhận Đăng ký Kinh doanh số 0309532xxx do Sở Kế hoạch và Đầu tư Thành phố Hà Nội cấp ngày
            01/04/2002
          </p>
        </div>
        <div className='px-2 md:w-1/4 sm:w-1/2'>
          <h1 className='font-bold text-[20px] text-[#4c4c4c]'>Chính sách</h1>
          <ul className='mt-3'>
            <li>
              <a className='hover:text-[#d70018] text-[14px] text-[#4c4c4c]' href='/'>Chính sách mua hàng</a>
            </li>
            <li>
              <a className='hover:text-[#d70018] text-[14px] text-[#4c4c4c]' href='/'>Chính sách đổi trả</a>
            </li>
            <li>
              <a className='hover:text-[#d70018] text-[14px] text-[#4c4c4c]' href='/'>Chính sách bảo hành</a>
            </li>
            <li>
              <a className='hover:text-[#d70018] text-[14px] text-[#4c4c4c]' href='/'>Gửi góp ý, khiếu nại</a>
            </li>
          </ul>
        </div>
        <div className='px-2 md:w-1/4 sm:w-1/2'>
          <h1 className='font-bold text-[20px] text-[#4c4c4c]'>Kết nối với chúng tôi</h1>
          <div className='flex flex-wrap gap-2 mt-2'>
            <img src={FacebookIcon} alt='facebook' className='w-[32px] h-[32px] rounded-full' />
            <img src={TwitterIcon} alt='twitter' className='w-[32px] h-[32px] rounded-full' />
            <img src={InstagramIcon} alt='instagram' className='w-[32px] h-[32px] rounded-full' />
            <img src={YoutubeIcon} alt='youtube' className='w-[32px] h-[32px] rounded-full' />
            <img src={ShoppeIcon} alt='shoppe' className='w-[32px] h-[32px] rounded-full' />
            <img src={LazadaIcon} alt='lazada' className='w-[32px] h-[32px] rounded-full' />
          </div>
          <p className='mt-4'>Phương thức thanh toán</p>
          <div className='flex flex-wrap gap-2 mt-2'>
            <img src={Payment1Img} alt='payment' className='w-[45px] h-[30px]' />
            <img src={Payment2Img} alt='payment' className='w-[45px] h-[30px]' />
            <img src={Payment3Img} alt='payment' className='w-[45px] h-[30px]' />
            <img src={Payment4Img} alt='payment' className='w-[45px] h-[30px]' />
          </div>
        </div>
      </div>
      <div className='w-full h-[1px] bg-slate-300 my-8' />
      <ul className='flex flex-wrap'>
        {productsType.map((product) => (
          <li
            key={product.id}
            className='max-sm:w-1/2 sm:w-1/4 max-md:w-1/6'
          >
            <a className='hover:text-[#d70018] text-[14px] text-[#4c4c4c]' href={product.link}>{product.name}</a>
          </li>
        ))}
      </ul>
      <div className='w-full h-[1px] bg-slate-300 my-8' />
      <p className='text-center'>Copyright&copy;: Ahihi đồ ngốc</p>
    </div>
  )
}
