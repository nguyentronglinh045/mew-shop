import { memo } from 'react'
import { Outlet } from 'react-router-dom'

interface Props {
  children?: React.ReactNode
}

function RegisterLayoutInner({ children }: Props) {
  return (
    <div className='relative flex h-screen w-screen justify-end'>
      <div className='absolute inset-0'>
        <img
          src='https://bizweb.dktcdn.net/100/459/533/themes/868331/assets/bg_custom.png?1689838116391'
          alt='background'
          className='h-full w-full object-cover'
        />
      </div>
      {children}
      <Outlet />
    </div>
  )
}

const RegisterLayout = memo(RegisterLayoutInner)
export default RegisterLayout
