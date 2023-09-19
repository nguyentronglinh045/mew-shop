import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import userApi from 'src/apis/user.api'
import InputFile from 'src/components/InputFile'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { setProfileToLS } from 'src/utils/auth'
import { UserSchema, userSchema } from 'src/utils/rules'
import { getAvatarURL } from 'src/utils/utils'

type FormUploadAvt = Pick<UserSchema, 'avatar'>
const avatarSchema = userSchema.pick(['avatar'])

export default function UserSideNav() {
  const { profile, setProfile } = useContext(AppContext)
  const avatarURL = (profile?.avatar && getAvatarURL(profile.avatar)) || ''
  const [file, setFile] = useState<File>()
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])
  const { handleSubmit, watch, setValue } = useForm<FormUploadAvt>({
    defaultValues: {
      avatar: ''
    },
    resolver: yupResolver(avatarSchema)
  })
  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  const profileDataRes = profileData?.data.data
  const updateProfileMutation = useMutation(userApi.updateProfile)
  const uploadAvatarMutation = useMutation(userApi.uploadAvatar)
  const avatar = watch('avatar')

  useEffect(() => {
    if (profileDataRes) {
      setValue('avatar', profileDataRes.avatar)
    }
  }, [profileDataRes, setValue])

  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarName = avatar
      if (file) {
        const form = new FormData()
        form.append('image', file)
        const uploadRes = await uploadAvatarMutation.mutateAsync(form)
        avatarName = uploadRes.data.data
        setValue('avatar', avatarName)
      }
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        avatar: avatarName
      })
      setProfile(res.data.data)
      setProfileToLS(res.data.data)
      refetch()
      toast.success(res.data.message)
      setFile(undefined)
    } catch (error) {
      console.log(error)
    }
  })
  const handleChangeFile = (file?: File) => {
    setFile(file)
  }

  return (
    <div className='col-span-4 mt-4 flex flex-col items-center px-2 md:col-span-4 md:mt-0 md:items-start md:py-4 lg:col-span-3'>
      <form onSubmit={onSubmit} className='w-full rounded-t-md bg-white pt-1'>
        <div className='flex flex-col items-center gap-2 pb-4 pt-2 md:py-4'>
          <div className='h-20 w-20'>
            {previewImage || avatarURL ? (
              <img
                src={previewImage || avatarURL}
                alt={profile?.name}
                className='h-full w-full rounded-md object-cover'
              />
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='black'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-user-circle-2'
              >
                <path d='M18 20a6 6 0 0 0-12 0' />
                <circle cx={12} cy={10} r={4} />
                <circle cx={12} cy={12} r={10} />
              </svg>
            )}
          </div>
          <div className='line-clamp-1 flex shrink flex-col gap-2 truncate'>
            <p className='md:text-md text-base text-black'>{profile?.name || profile?.email}</p>
            <div className='flex justify-around gap-4 md:gap-2'>
              <InputFile onChange={handleChangeFile} />
              {previewImage && (
                <button
                  type='submit'
                  className='grow rounded-md border border-main-color bg-main-color px-4 py-2 font-bold text-white duration-200 hover:bg-red-500 active:bg-red-500'
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      </form>

      <div className='flex w-full flex-col gap-2 rounded-b-md bg-white px-4 pb-2'>
        <NavLink
          to={path.profile}
          className={({ isActive }) =>
            classNames(`text-base hover:text-main-color`, {
              'text-main-color': isActive,
              'text-black': !isActive
            })
          }
        >
          Thông tin người dùng
        </NavLink>

        <NavLink
          to={path.changePassword}
          className={({ isActive }) =>
            classNames(`text-base hover:text-main-color`, {
              'text-main-color': isActive,
              'text-black': !isActive
            })
          }
        >
          Đổi mật khẩu
        </NavLink>
      </div>
    </div>
  )
}
