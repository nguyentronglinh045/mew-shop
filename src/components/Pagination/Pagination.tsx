import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'
import path from 'src/constants/path'
import { QueryConfig } from 'src/hooks/useQueryConfig'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

/**
Với range = 2 áp dụng cho khoảng cách đầu, cuối và xung quanh current_page

[1] 2 3 ... 19 20
1 [2] 3 4 ... 19 20 
1 2 [3] 4 5 ... 19 20
1 2 3 [4] 5 6 ... 19 20
1 2 3 4 [5] 6 7 ... 19 20

1 2 ... 4 5 [6] 8 9 ... 19 20

1 2 ...13 14 [15] 16 17 ... 19 20


1 2 ... 14 15 [16] 17 18 19 20
1 2 ... 15 16 [17] 18 19 20
1 2 ... 16 17 [18] 19 20
1 2 ... 17 18 [19] 20
1 2 ... 18 19 [20]
 */

const RANGE = 2
export default function Pagination({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page)

  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span key={index} className='min-w-[40px] rounded border bg-white px-3 py-2 text-center text-base shadow-sm'>
            ...
          </span>
        )
      }
      return null
    }
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span key={index} className='min-w-[40px] rounded border bg-white px-3 py-2 text-center text-base shadow-sm'>
            ...
          </span>
        )
      }
      return null
    }
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1

        // Điều kiện để return về ...
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotAfter(index)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore(index)
        }

        return (
          <Link
            to={{
              pathname: path.productList,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            key={index}
            className={classNames(
              'min-w-[40px] cursor-pointer rounded border px-3 py-2 text-center text-base shadow-sm duration-150 hover:bg-main-color/90 hover:text-white',
              {
                'bg-main-color text-white': pageNumber === page,
                'bg-white text-main-color': pageNumber !== page
              }
            )}
          >
            {pageNumber}
          </Link>
        )
      })
  }
  return (
    <div className='mt-6 flex flex-wrap justify-center gap-1'>
      {page === 1 ? (
        <span className='min-w-[40px] cursor-not-allowed rounded border bg-white stroke-main-color px-3 py-2 text-center text-base shadow-sm'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width={24}
            height={24}
            viewBox='0 0 24 24'
            fill='none'
            strokeWidth={2}
            strokeLinecap='round'
            strokeLinejoin='round'
            className='lucide lucide-chevrons-left'
          >
            <path d='m11 17-5-5 5-5' />
            <path d='m18 17-5-5 5-5' />
          </svg>
        </span>
      ) : (
        <Link
          to={{
            pathname: path.productList,
            search: createSearchParams({
              ...queryConfig,
              page: (page - 1).toString()
            }).toString()
          }}
          className='min-w-[40px] cursor-pointer rounded border bg-white/60 stroke-main-color px-3 py-2 text-center text-base shadow-sm duration-150 hover:bg-main-color/90 hover:stroke-white'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width={24}
            height={24}
            viewBox='0 0 24 24'
            fill='none'
            strokeWidth={2}
            strokeLinecap='round'
            strokeLinejoin='round'
            className='lucide lucide-chevrons-left'
          >
            <path d='m11 17-5-5 5-5' />
            <path d='m18 17-5-5 5-5' />
          </svg>
        </Link>
      )}

      {renderPagination()}
      {page === pageSize ? (
        <span className='min-w-[40px] cursor-not-allowed rounded border bg-white stroke-main-color px-3 py-2 text-center text-base shadow-sm'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width={24}
            height={24}
            viewBox='0 0 24 24'
            fill='none'
            strokeWidth={2}
            strokeLinecap='round'
            strokeLinejoin='round'
            className='lucide lucide-chevrons-right'
          >
            <path d='m6 17 5-5-5-5' />
            <path d='m13 17 5-5-5-5' />
          </svg>
        </span>
      ) : (
        <Link
          to={{
            pathname: path.productList,
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString()
            }).toString()
          }}
          className='min-w-[40px] cursor-pointer rounded border bg-white/60 stroke-main-color px-3 py-2 text-center text-base shadow-sm duration-150 hover:bg-main-color/90 hover:stroke-white'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width={24}
            height={24}
            viewBox='0 0 24 24'
            fill='none'
            strokeWidth={2}
            strokeLinecap='round'
            strokeLinejoin='round'
            className='lucide lucide-chevrons-right'
          >
            <path d='m6 17 5-5-5-5' />
            <path d='m13 17 5-5-5-5' />
          </svg>
        </Link>
      )}
    </div>
  )
}
