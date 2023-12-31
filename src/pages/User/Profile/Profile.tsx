import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import userApi from 'src/apis/user.api'
import Button from 'src/components/Button'
import DateSelect from 'src/components/DateSelect'
import Input from 'src/components/Input'
import InputNumber from 'src/components/InputNumber'
import { AppContext } from 'src/contexts/app.context'
import { ErrorResponseApi } from 'src/types/utils.type'
import { setProfileToLS } from 'src/utils/auth'
import { UserSchema, userSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

type FormData = Pick<UserSchema, 'name' | 'address' | 'phone' | 'date_of_birth'>
type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth: string
}
const profileSchema = userSchema.pick(['name', 'address', 'phone', 'date_of_birth'])

export default function Profile() {
  const { t } = useTranslation()
  const { setProfile } = useContext(AppContext)
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    setError,
    setValue
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
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
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await updateProfuleMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString()
      })
      setProfile(res.data.data)
      setProfileToLS(res.data.data)
      refetch()
      toast.success(res.data.message)
    } catch (error) {
      // Bắt lỗi từ server trả về
      if (isAxiosUnprocessableEntityError<ErrorResponseApi<FormDataError>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, {
              message: formError[key as keyof FormDataError],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  return (
    <div className='col-span-4 p-2 md:col-span-8  md:py-4 lg:col-span-9'>
      <Helmet>
        <title>{t('User.profile')}</title>
        <meta name='description' content={t('User.profile')} />
      </Helmet>
      <form noValidate className='b rounded-md bg-white p-4 md:px-8 md:py-4' onSubmit={onSubmit}>
        <h2 className='mb-2 text-center text-2xl font-bold'>{t('User.profile')}</h2>

        <div className='flex flex-col'>
          <div className='mb-[1.25rem] flex items-center gap-1 truncate'>
            <span>{t('User.email')}:</span>
            <span>{profile?.email}</span>
          </div>
          <div className='flex flex-col gap-1'>
            <span>{t('User.name')}</span>
            <Input
              classNameInput='w-full rounded-md px-3 py-2 text-black outline-none border border-slate-500 focus:border-main-color focus:shadow-sm duration-200 '
              name='name'
              placeholder={t('User.name')}
              register={register}
              errorMessage={errors.name?.message && t(errors.name?.message)}
            />
          </div>
          <div className='flex flex-col gap-1'>
            <span>{t('User.phoneNumber')}</span>
            <Controller
              control={control}
              name={'phone'}
              render={({ field }) => (
                <InputNumber
                  classNameInput='w-full rounded-md px-3 py-2 text-black outline-none border border-slate-500 focus:border-main-color focus:shadow-sm duration-200'
                  placeholder={t('User.phoneNumber')}
                  errorMessage={errors.phone?.message && t(errors.phone?.message)}
                  {...field}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <div className='flex flex-col gap-1'>
            <span>{t('User.address')}</span>
            <Input
              classNameInput='w-full rounded-md px-3 py-2 text-black outline-none border border-slate-500 focus:border-main-color focus:shadow-sm duration-200'
              name='address'
              placeholder={t('User.address')}
              register={register}
              errorMessage={errors.address?.message && t(errors.address?.message)}
            />
          </div>
          <div className='flex flex-col gap-1'>
            <span>{t('User.dayOfBirth')}</span>
            <Controller
              control={control}
              name='date_of_birth'
              render={({ field }) => (
                <DateSelect
                  errorMessage={errors.date_of_birth?.message && t(errors.date_of_birth?.message)}
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />
          </div>
        </div>
        <Button
          type='submit'
          isLoading={updateProfuleMutation.isLoading}
          disabled={updateProfuleMutation.isLoading}
          className='rounded-md bg-main-color px-4 py-2 text-white hover:bg-main-color/80'
        >
          {t('User.save')}
        </Button>
      </form>
    </div>
  )
}
