import classNames from 'classnames'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { sortBy, order as orderConstanst } from 'src/constants/product'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { ProductListConfig } from 'src/types/product.type'
import omit from 'lodash/omit'
import { useTranslation } from 'react-i18next'

interface Props {
  queryConfig: QueryConfig
}
export default function SortProductList({ queryConfig }: Props) {
  const { t } = useTranslation()
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const navigate = useNavigate()
  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sortByValue === sort_by
  }
  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.productList,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            page: '1',
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }
  const handlePriceOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.productList,
      search: createSearchParams({
        ...queryConfig,
        page: '1',
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }
  return (
    <div className='flex flex-wrap items-center gap-1 md:gap-2'>
      <span className='text-base font-bold text-gray-700 md:text-lg'>{t('ProductList.sortedBy')}:</span>
      <button
        className={classNames('rounded border border-gray-500 px-2 py-1 text-base font-semibold text-gray-600', {
          'border-main-color text-main-color': isActiveSortBy(sortBy.createdAt)
        })}
        onClick={() => handleSort(sortBy.createdAt)}
      >
        {t('ProductList.sortedBynewest')}
      </button>
      <button
        className={classNames('rounded border border-gray-500 px-2 py-1 text-base font-semibold text-gray-600', {
          'border-main-color text-main-color': isActiveSortBy(sortBy.view)
        })}
        onClick={() => handleSort(sortBy.view)}
      >
        {t('ProductList.sortedByView')}
      </button>

      <button
        className={classNames('rounded border border-gray-500 px-2 py-1 text-base font-semibold text-gray-600', {
          'border-main-color text-main-color': isActiveSortBy(sortBy.sold)
        })}
        onClick={() => handleSort(sortBy.sold)}
      >
        {t('ProductList.sortedBySold')}
      </button>
      <button
        className={classNames('rounded border border-gray-500 px-2 py-1 text-base font-semibold text-gray-600', {
          'border-main-color text-main-color': order === orderConstanst.asc
        })}
        onClick={() => handlePriceOrder('asc')}
      >
        {t('ProductList.sortedByAscendingPrice')}
      </button>
      <button
        className={classNames('rounded border border-gray-500 px-2 py-1 text-base font-semibold text-gray-600', {
          'border-main-color text-main-color': order === orderConstanst.desc
        })}
        onClick={() => handlePriceOrder('desc')}
      >
        {t('ProductList.sortedByDescendingPrice')}
      </button>
    </div>
  )
}
