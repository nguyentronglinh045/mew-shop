import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { createSearchParams, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import InputNumber from 'src/components/InputNumber'
import path from 'src/constants/path'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { NoUndefinedField } from 'src/types/utils.type'
import { Schema, schema } from 'src/utils/rules'
import { ObjectSchema } from 'yup'
import RatingStars from '../RatingStars'

interface Props {
  queryConfig: QueryConfig
}
type FormData = NoUndefinedField<Pick<Schema, 'price_max' | 'price_min'>>

const priceSchema = schema.pick(['price_min', 'price_max'])

export default function AsideFilter({ queryConfig }: Props) {
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver<FormData>(priceSchema as ObjectSchema<FormData>)
  })
  const navigate = useNavigate()
  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.productList,
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max,
        price_min: data.price_min
      }).toString()
    })
  })
  return (
    <div className='p-2'>
      <div className='flex cursor-default items-center gap-1 text-base font-bold text-main-color md:text-lg'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width={24}
          height={24}
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth={2}
          strokeLinecap='round'
          strokeLinejoin='round'
          className='lucide lucide-filter'
        >
          <polygon points='22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3' />
        </svg>
        <span>Lọc giá</span>
      </div>
      <form className='mt-2 flex flex-col gap-2' onSubmit={onSubmit}>
        <div className='flex items-start gap-1'>
          <Controller
            control={control}
            name='price_min'
            render={({ field }) => {
              return (
                <InputNumber
                  type='text'
                  className='grow'
                  placeholder='Giá tối thiểu'
                  classNameInput='p-2 w-full outline-none border border-gray-400 focus:border-blue-300 rounded-md focus:shadow-sm'
                  classNameError='hidden'
                  {...field}
                  onChange={(event) => {
                    field.onChange(event)
                    trigger('price_max')
                  }}
                />
              )
            }}
          />
          <Controller
            control={control}
            name='price_max'
            render={({ field }) => {
              return (
                <InputNumber
                  type='text'
                  className='grow'
                  placeholder='Giá tối đa'
                  classNameInput='p-2 w-full outline-none border border-gray-400 focus:border-blue-300 rounded-md focus:shadow-sm'
                  classNameError='hidden'
                  {...field}
                  onChange={(event) => {
                    field.onChange(event)
                    trigger('price_min')
                  }}
                />
              )
            }}
          />
        </div>
        <div className='text-sm text-main-color'>{errors.price_min?.message}</div>
        {/* <div className='mt-1 min-h-[1.25rem] text-center text-sm text-red-600'>{errors.price_min?.message}</div> */}
        <Button
          type='submit'
          className='flex w-full items-center justify-center rounded-md bg-main-color p-2 text-sm uppercase text-white hover:bg-main-color/80'
        >
          Áp dụng
        </Button>
      </form>
      <div className='my-4 h-[1px] bg-gray-300' />
      <div className='cursor-default text-base font-bold text-main-color md:text-lg'>
        <span>Đánh giá</span>
      </div>
      <RatingStars />
      <div className='my-4 h-[1px] bg-gray-300' />
      <Button className='flex w-full items-center justify-center rounded-md bg-main-color p-2 text-sm uppercase text-white hover:bg-main-color/80'>
        Xóa tất cả
      </Button>
    </div>
  )
}
