import isUndefined from 'lodash/isUndefined'
import omitBy from 'lodash/omitBy'
import useQueryParams from './useQueryParams'
import { ProductListConfig } from 'src/types/product.type'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function useQueryConfig(itemLimit?: number) {
  const queryParam = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParam.page || '1',
      limit: queryParam.limit || itemLimit || '20',
      sort_by: queryParam.sort_by,
      exclute: queryParam.exclute,
      name: queryParam.name,
      order: queryParam.order,
      price_max: queryParam.price_max,
      price_min: queryParam.price_min,
      rating_filter: queryParam.rating_filter,
      category: queryParam.category
    },
    isUndefined
  )
  return queryConfig
}
