import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import BgAuthen from '../../assets/images/bg_authen.webp'

interface Props {
  children?: React.ReactNode
}

function RegisterLayoutInner({ children }: Props) {
  return (
    <div className='relative flex h-screen w-screen justify-end'>
      <div className='absolute inset-0'>
        <img src={BgAuthen} alt='background' className='h-full w-full object-cover' />
      </div>
      {children}
      <Outlet />
    </div>
  )
}

const RegisterLayout = memo(RegisterLayoutInner)
export default RegisterLayout
