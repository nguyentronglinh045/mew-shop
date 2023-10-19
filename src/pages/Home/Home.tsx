import { Helmet } from 'react-helmet-async'
import FeaturedCategories from 'src/components/FeaturedCategories'
import FlashSale from 'src/components/FlashSale'
import SliderBanner from 'src/components/SliderBanner'
import TabProducts from 'src/components/TabProduct'
import Logo from '../../assets/logo/logo_foo.webp'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Trang chủ</title>
        <meta name='description' content='Trang chủ dự án Meo Mobile' />
        <meta property='og:title' content='Trang chủ dự án Meo Mobile' />
        <meta property='og:description' content='Dự án cá nhân về ReactJS và Vite' />
        <meta property='og:image' content={Logo} />
        <meta property='og:type' content='website' />
      </Helmet>
      <SliderBanner />
      <FeaturedCategories />
      <FlashSale />
      <TabProducts />
    </>
  )
}
