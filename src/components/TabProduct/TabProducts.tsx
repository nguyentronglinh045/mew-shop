import useQueryConfig from 'src/hooks/useQueryConfig'
import ProductCard from '../ProductCard'
import { useQuery } from '@tanstack/react-query'
import { ProductListConfig } from 'src/types/product.type'
import productApi from 'src/apis/product.api'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import ProductCardSkeleton from '../ProductCardSkeleton'

const TabButton = ({ text, icon }: { text: string; icon: string }) => {
  return (
    <div className='group flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-2 hover:border-red-600 max-sm:flex-[0_0_50%]'>
      <img src={icon} alt='' className='h-8 w-8' />
      <p className='max-sm:text-md font-bold text-black/80 group-hover:text-red-600'>{text}</p>
    </div>
  )
}

const TabProducts = () => {
  const queryConfig = useQueryConfig(12)
  const { data: productData, isFetching } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  return (
    <section className='container mt-8 flex flex-col gap-y-4 bg-white p-4'>
      <div className='flex max-w-full gap-2 overflow-x-auto pb-2'>
        <TabButton text='Gợi ý cho bạn' icon='src/assets/icons/goiy-1.webp' />
        <TabButton text='Xả hàng giảm sốc' icon='src/assets/icons/icon-xa-hang-50-50x50-2.webp' />
        <TabButton text='Sale cuối hè' icon='src/assets/icons/chigiamonlinedesk-50x54-1.webp' />
        <TabButton text='Deal ngon bổ rẻ' icon='src/assets/icons/icon-desk-51x50-2.webp' />
      </div>
      <div className='grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
        {!isFetching &&
          productData &&
          productData.data.data.products.map((product) => (
            <div className='col-span-1' key={product._id}>
              <ProductCard className='border-[1px] border-black/10' isFlashSale={false} product={product} />
            </div>
          ))}
        {(isFetching || !productData) &&
          Array(6)
            .fill(0)
            .map((_, index) => (
              <div className='col-span-1' key={index}>
                <ProductCardSkeleton />
              </div>
            ))}
      </div>
      <div className='w-full'>
        <Link
          to={path.productList}
          className='flex items-center justify-center rounded-xl border py-2 font-bold text-[#4c4c4c] shadow-box_shadow duration-200 hover:text-[#d70018] hover:shadow-box_shadow-hover'
        >
          Xem tất cả
        </Link>
      </div>
    </section>
  )
}

export default TabProducts
