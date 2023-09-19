import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import userApi from 'src/apis/user.api'
import Button from 'src/components/Button'
import DateSelect from 'src/components/DateSelect'
import Input from 'src/components/Input'
import InputNumber from 'src/components/InputNumber'
import { AppContext } from 'src/contexts/app.context'
import { setProfileToLS } from 'src/utils/auth'
import { UserSchema, userSchema } from 'src/utils/rules'

type FormData = Pick<UserSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>

const profileSchema = userSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar'])

export default function Profile() {
  const { setProfile } = useContext(AppContext)
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    setValue
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(profileSchema)
  })
  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  const profile = profileData?.data.data
  const updateProfuleMutation = useMutation(userApi.updateProfile)

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('address', profile.address)
      setValue('avatar', profile.avatar)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])

  const onSubmit = handleSubmit(async (data) => {
    const res = await updateProfuleMutation.mutateAsync({
      ...data,
      date_of_birth: data.date_of_birth?.toISOString()
    })
    setProfile(res.data.data)
    setProfileToLS(res.data.data)
    refetch()
    toast.success(res.data.message)
  })

  return (
    <div className='col-span-4 p-4 shadow shadow-gray-500/50 md:col-span-8 lg:col-span-9'>
      <form noValidate className='bg-white p-4 md:px-8 md:py-4' onSubmit={onSubmit}>
        <h2 className='mb-2 text-center text-2xl font-bold'>Thông tin khách hàng</h2>

        <div className='flex flex-col'>
          <div className='mb-[1.25rem] flex items-center gap-1'>
            <span>Email:</span>
            <span>{profile?.email}</span>
          </div>
          <div className='flex flex-col gap-1'>
            <span>Tên</span>
            <Input
              classNameInput='w-full rounded-md px-3 py-2 text-black outline-none border border-slate-500 focus:border-gray-500 focus:shadow-sm'
              name='name'
              placeholder='Tên'
              register={register}
              errorMessage={errors.name?.message}
            />
          </div>
          <div className='flex flex-col gap-1'>
            <span>Số điện thoại</span>
            <Controller
              control={control}
              name='phone'
              render={({ field }) => (
                <InputNumber
                  classNameInput='w-full rounded-md px-3 py-2 text-black outline-none border border-slate-500 focus:border-gray-500 focus:shadow-sm'
                  placeholder='Số điện thoại'
                  errorMessage={errors.phone?.message}
                  {...field}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <div className='flex flex-col gap-1'>
            <span>Địa chỉ</span>
            <Input
              classNameInput='w-full rounded-md px-3 py-2 text-black outline-none border border-slate-500 focus:border-gray-500 focus:shadow-sm'
              name='address'
              placeholder='Địa chỉ'
              register={register}
              errorMessage={errors.address?.message}
            />
          </div>
          <div className='flex flex-col gap-1'>
            <span>Ngày sinh</span>
            <Controller
              control={control}
              name='date_of_birth'
              render={({ field }) => (
                <DateSelect
                  errorMessage={errors.date_of_birth?.message}
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />
          </div>
        </div>
        <Button type='submit' className='rounded-md bg-main-color px-4 py-2 text-white hover:bg-main-color/80'>
          Lưu
        </Button>
      </form>
    </div>
  )
}
