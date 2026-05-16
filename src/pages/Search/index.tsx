import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import ProductCard from 'src/components/ProductCard/ProductCard'
import ProductCardSkeleton from 'src/components/ProductCardSkeleton/ProductCardSkeleton'
import path from 'src/constants/path'
import useQueryParams from 'src/hooks/useQueryParams'

export default function Search() {
  const { t } = useTranslation()
  const queryParams = useQueryParams()
  const keyword = (queryParams.q as string) || ''

  const { data, isLoading } = useQuery({
    queryKey: ['search', keyword],
    queryFn: () => productApi.searchProducts(keyword),
    enabled: keyword.trim().length > 0,
    staleTime: 30000
  })

  const products = data?.data?.data?.products ?? []

  return (
    <div className='min-h-screen bg-gray-100 py-6'>
      <div className='container'>
        {/* No keyword */}
        {!keyword.trim() && (
          <div className='py-16 text-center text-gray-500'>
            <p className='text-lg'>{t('Search.enterKeyword', 'Nhập từ khóa để tìm kiếm sản phẩm')}</p>
          </div>
        )}

        {/* Loading */}
        {isLoading && keyword.trim() && (
          <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {Array.from({ length: 10 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Results */}
        {!isLoading && keyword.trim() && (
          <>
            <p className='mb-4 text-sm text-gray-600'>
              {products.length > 0
                ? t('Search.resultCount', `Tìm thấy {{count}} sản phẩm cho "{{keyword}}"`, {
                    count: products.length,
                    keyword
                  })
                : t('Search.noResult', `Không tìm thấy sản phẩm nào cho "{{keyword}}"`, { keyword })}
            </p>

            {products.length > 0 ? (
              <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className='py-16 text-center'>
                <p className='mb-4 text-gray-500'>
                  {t('Search.tryOther', 'Thử tìm với từ khóa khác hoặc xem tất cả sản phẩm')}
                </p>
                <Link
                  to={path.productList}
                  className='rounded-md bg-main-color px-6 py-2 font-semibold text-white hover:opacity-90'
                >
                  {t('Search.viewAll', 'Xem tất cả sản phẩm')}
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
