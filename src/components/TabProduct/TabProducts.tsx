import ProductCard from '../ProductCard'

const TabButton = ({ text, icon }: { text: string; icon: string }) => {
  return (
    <div className='group flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-2 hover:border-red-600 max-sm:flex-[0_0_50%]'>
      <img src={icon} alt='' className='h-8 w-8' />
      <p className='max-sm:text-md font-bold text-black/80 group-hover:text-red-600'>{text}</p>
    </div>
  )
}

const TabProducts = () => {
  return (
    <section className='container mt-8 flex flex-col gap-y-4 bg-white p-4'>
      <div className='flex max-w-full gap-2 overflow-x-auto pb-2'>
        <TabButton text='Gợi ý cho bạn' icon='src/assets/icons/goiy-1.webp' />
        <TabButton text='Xả hàng giảm sốc' icon='src/assets/icons/icon-xa-hang-50-50x50-2.webp' />
        <TabButton text='Sale cuối hè' icon='src/assets/icons/chigiamonlinedesk-50x54-1.webp' />
        <TabButton text='Deal ngon bổ rẻ' icon='src/assets/icons/icon-desk-51x50-2.webp' />
      </div>
      <div className='-m-2 flex flex-wrap'>
        <div className='sm:max-w-1/4 max-w-1/2 w-1/2 p-2 sm:w-1/4'>
          <ProductCard className='border-[1px] border-black/10' isFlashSale={false} />
        </div>
        <div className='sm:max-w-1/4 max-w-1/2 w-1/2 p-2 sm:w-1/4'>
          <ProductCard className='border-[1px] border-black/10' isFlashSale={false} />
        </div>
        <div className='sm:max-w-1/4 max-w-1/2 w-1/2 p-2 sm:w-1/4'>
          <ProductCard className='border-[1px] border-black/10' isFlashSale={false} />
        </div>
        <div className='sm:max-w-1/4 max-w-1/2 w-1/2 p-2 sm:w-1/4'>
          <ProductCard className='border-[1px] border-black/10' isFlashSale={false} />
        </div>
        <div className='sm:max-w-1/4 max-w-1/2 w-1/2 p-2 sm:w-1/4'>
          <ProductCard className='border-[1px] border-black/10' isFlashSale={false} />
        </div>
      </div>
      <div className='w-full'>
        <a
          href='/'
          className='flex items-center justify-center rounded-xl border py-2 font-bold text-[#4c4c4c] shadow-box_shadow hover:text-[#d70018] hover:shadow-box_shadow-hover'
        >
          Xem tất cả
        </a>
      </div>
    </section>
  )
}

export default TabProducts
