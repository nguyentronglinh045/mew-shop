import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import userApi from 'src/apis/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { ErrorResponseApi } from 'src/types/utils.type'
import { UserSchema, userSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

type FormData = Pick<UserSchema, 'password' | 'new_password' | 'confirm_password'>
const passwordSchema = userSchema.pick(['password', 'new_password', 'confirm_password'])

export default function ChangePassword() {
  const { t } = useTranslation()
  const updatePasswordMutation = useMutation(userApi.updateProfile)
  const {
    register,
    formState: { errors },
    setError,
    reset,
    handleSubmit
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_password: ''
    },
    resolver: yupResolver(passwordSchema)
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await updatePasswordMutation.mutateAsync(omit(data, ['confirm_password']))
      toast.success(res.data.message)
      reset()
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponseApi<FormData>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData],
              type: 'Server'
            })
          })
        }
      }
    }
  })
  return (
    <div className='col-span-4 p-2 md:col-span-8 md:py-4 lg:col-span-9'>
      <Helmet>
        <title>{t('User.changePassword')}</title>
        <meta name='description' content={t('User.changePassword')} />
      </Helmet>
      <form noValidate className='rounded-md bg-white p-4 md:px-8 md:py-4' onSubmit={onSubmit}>
        <h2 className='mb-2 text-center text-2xl font-bold'>{t('User.changePassword')}</h2>
        <div className='flex flex-col'>
          <div className='flex flex-col gap-1'>
            <span>{t('User.oldPassword')}</span>
            <Input
              type='password'
              name='password'
              classNameInput='w-full rounded-md px-3 py-2 text-black outline-none border border-slate-500 focus:border-main-color focus:shadow-sm duration-200'
              placeholder={t('User.oldPassword')}
              errorMessage={errors.password?.message && t(errors.password?.message)}
              register={register}
            />
          </div>
          <div className='flex flex-col gap-1'>
            <span>{t('User.newPassword')}</span>
            <Input
              name='new_password'
              type='password'
              classNameInput='w-full rounded-md px-3 py-2 text-black outline-none border border-slate-500 focus:border-main-color focus:shadow-sm duration-200'
              placeholder={t('User.newPassword')}
              errorMessage={errors.new_password?.message && t(errors.new_password?.message)}
              register={register}
            />
          </div>
          <div className='flex flex-col gap-1'>
            <span>{t('User.confirmNewPassword')}</span>
            <Input
              name='confirm_password'
              type='password'
              classNameInput='w-full rounded-md px-3 py-2 text-black outline-none border border-slate-500 focus:border-main-color focus:shadow-sm duration-200'
              placeholder={t('User.confirmNewPassword')}
              errorMessage={errors.confirm_password?.message && t(errors.confirm_password?.message)}
              register={register}
            />
          </div>
        </div>
        <Button
          type='submit'
          isLoading={updatePasswordMutation.isLoading}
          disabled={updatePasswordMutation.isLoading}
          className='rounded-md bg-main-color px-4 py-2 text-white hover:bg-main-color/80'
        >
          {t('User.save')}
        </Button>
      </form>
    </div>
  )
}
