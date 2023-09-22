const Card = () => {
  return (
    <div className='group relative flex flex-1 flex-col overflow-hidden rounded-xl bg-white p-2'>
      <div className='sale-label'>
        <span>Giảm 19%</span>
      </div>
      <a href='/' className='relative'>
        <img
          src='src/assets/images/oppo.webp'
          alt=''
          className='duration-400 h-auto w-auto scale-90 transition-all duration-200 ease-linear hover:scale-100'
        />
        <div className='relative z-[1] flex h-[20px] w-full overflow-hidden rounded-xl bg-[#ff9a9a]'>
          <img src='src/assets/icons/hot-sale.webp' alt='' className='absolute left-[2px] z-[3] w-[18px]' />
          <div className='absolute z-[2] flex h-full w-full items-center justify-center text-[12px] uppercase text-white '>
            <span>Sắp cháy hàng</span>
          </div>
          <div
            className={`remain absolute left-0 top-0 z-[1] h-full w-3/4
          rounded-xl bg-gradient-to-r from-[#ec1a17] to-[#ffad00]`}
          ></div>
        </div>
        <span className='absolute bottom-8 left-0 z-[9] flex items-center gap-[5px] rounded-xl bg-gradient-to-r from-[#3bacf0] to-[#1b6dc1] pr-2 text-[10px] text-white'>
          <img src='src/assets/icons/label_img_3.webp' className='mr-1' width={20} height={20} alt='' />
          VNPAY giảm 500K
        </span>
      </a>
      <div className='absolute bottom-36 right-0 rounded-full bg-rose-600 p-1 opacity-0 transition-all duration-200 group-hover:right-6 group-hover:opacity-100 max-sm:hidden'>
        <a href='/'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            viewBox='0 0 24 24'
            fill='none'
            stroke='white'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
            class='lucide lucide-cog myDIV'
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
        </a>
      </div>
      <h1 className='mx-[5px] mt-1 truncate text-xl font-bold'>
        <a href='/'>Xiaomi Redmi Note 11 Pro Plus 5G</a>
      </h1>
      <div className='mx-[5px] flex items-center gap-x-2'>
        <span className='text-[13px] font-bold text-[#d80000] sm:text-[16px]'>6.890.000₫</span>
        <del className='text-[11px] text-[#929292] sm:text-[13px]'>8.500.000₫</del>
      </div>
      <label className='mx-[5px] flex items-center gap-2'>
        <input type='checkbox' name='' id='' className='rounded-full' />
        <span>So sánh</span>
      </label>
    </div>
  )
}

export default Card
