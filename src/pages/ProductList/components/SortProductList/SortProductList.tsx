import classNames from 'classnames'

export default function SortProductList() {
  return (
    <div className='flex flex-wrap items-center gap-1'>
      <span className='text-base font-bold text-gray-700 md:text-lg'>Sắp xếp theo:</span>
      <button
        className={classNames('rounded border border-gray-500 px-2 py-1 text-base font-semibold text-gray-600', {
          'border-main-color text-main-color': true
        })}
      >
        Mặc định
      </button>
      <button
        className={classNames('rounded border border-gray-500 px-2 py-1 text-base font-semibold text-gray-600', {
          'border-main-color text-main-color': true
        })}
      >
        Mặc định
      </button>
      <button
        className={classNames('rounded border border-gray-500 px-2 py-1 text-base font-semibold text-gray-600', {
          'border-main-color text-main-color': true
        })}
      >
        Mặc định
      </button>
      <button
        className={classNames('rounded border border-gray-500 px-2 py-1 text-base font-semibold text-gray-600', {
          'border-main-color text-main-color': true
        })}
      >
        Mặc định
      </button>
    </div>
  )
}
