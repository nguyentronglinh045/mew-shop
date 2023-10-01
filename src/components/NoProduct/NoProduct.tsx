interface Props {
  imgS?: string
  text?: string
}

export default function NoProduct({ imgS, text }: Props) {
  return (
    <div className='col-span-12 h-full w-full'>
      <div className='flex flex-col items-center justify-center gap-2'>
        {imgS && <img src={imgS} alt='No prodct' className='h-1/2 w-1/2' />}
        <span className='text-base font-bold text-main-color md:text-lg'>{text}</span>
      </div>
    </div>
  )
}
