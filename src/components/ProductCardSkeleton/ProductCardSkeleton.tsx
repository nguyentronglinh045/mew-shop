export default function ProductCardSkeleton() {
  return (
    <div className='group relative flex w-full flex-1 animate-pulse flex-col gap-2 rounded-xl bg-white px-3 py-3 shadow-lg'>
      <div className='relative w-full overflow-hidden pt-[100%]'>
        <div className='absolute inset-0 bg-slate-300' />
      </div>
      <div className='h-4 w-full bg-slate-300'></div>
      <div className='flex items-center gap-x-2'>
        <div className='h-3 w-full bg-slate-300'></div>
        <div className='h-3 w-full bg-slate-300'></div>
      </div>
      <div className='flex items-center justify-between'>
        <div className='h-3 w-2/4 bg-slate-300'></div>
        <div className='h-3 w-1/4 bg-slate-200'></div>
      </div>
    </div>
  )
}
