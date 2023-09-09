import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from 'src/components/Footer'
import Header from 'src/components/Header'
interface Props {
  children?: React.ReactNode
}

import Slider from 'src/components/Slider'

const MainLayoutInner = ({ children }: Props) => {
  console.log('Main Layout')
  return (
    <div className='relative overflow-hidden'>
      <Header />
      <Slider />
      {children}
      <Outlet />
      <Footer />
    </div>
  )
}

const MainLayout = memo(MainLayoutInner)
export default MainLayout
