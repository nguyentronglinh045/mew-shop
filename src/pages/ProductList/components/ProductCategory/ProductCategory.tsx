import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'
import path from 'src/constants/path'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { Category } from 'src/types/category.type'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}

export default function ProductCategory({ categories, queryConfig }: Props) {
  const { category } = queryConfig

  return (
    <div className='flex w-full items-center gap-1 overflow-auto rounded-md bg-[#ffa293] p-2 text-white md:gap-3'>
      <Link
        to={path.productList}
        className={classNames(
          'whitespace-nowrap px-2 py-2 text-base font-bold text-white duration-200 ease-in-out hover:rounded-full hover:bg-main-color',
          {
            'rounded-full bg-main-color': !category
          }
        )}
      >
        <span>Tất cả sản phẩm</span>
      </Link>
      {categories.map((categoryItem) => (
        <Link
          key={categoryItem._id}
          to={{
            pathname: path.productList,
            search: createSearchParams({
              ...queryConfig,
              page: '1',
              category: categoryItem._id
            }).toString()
          }}
          className={classNames(
            'whitespace-nowrap px-2 py-2 text-base font-bold text-white duration-200 ease-in-out hover:rounded-full hover:bg-main-color',
            {
              'rounded-full bg-main-color': category === categoryItem._id
            }
          )}
        >
          <span>{categoryItem.name}</span>
        </Link>
      ))}
    </div>
  )
}
