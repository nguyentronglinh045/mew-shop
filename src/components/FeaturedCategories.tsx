import { categoryList } from 'src/constants/categoryList'

const FeaturedCategories = () => {
  return (
    <div className='container bg-white p-2 rounded'>
      <h1 className='text-2xl font-bold'>DANH MỤC NỔI BẬT</h1>
      <div className='mt-4 max-sm:mt-2 flex flex-wrap gap-2 max-sm:flex-nowrap max-sm:overflow-x-auto p-2'>
        {categoryList.map((item) => (
          <a
            href={item.link}
            key={item.id}
            className='flex min-w-[13%] flex-1 flex-col items-center 
              gap-y-2 rounded-[10px] border-2 p-4 max-sm:p-2
              xl:min-w-[9%] xl:max-w-[12%] sm:min-w-[13%]
              max-sm:max-w-[100px] max-sm:min-w-[100px]
              shadow-[0px_0px_5px_0px_#e5e5e5] hover:shadow-[0px_0px_5px_0px_#d70018]'
          >
            <img src={item.image} alt={item.name} className='h-[60px] w-[60px]' />
            <span className='text-[14px] text-center'>{item.name}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

export default FeaturedCategories
