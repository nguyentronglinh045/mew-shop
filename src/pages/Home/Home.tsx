import { Helmet } from 'react-helmet-async'
import FeaturedCategories from 'src/components/FeaturedCategories'
import FlashSale from 'src/components/FlashSale'
import SliderBanner from 'src/components/SliderBanner'
import TabProducts from 'src/components/TabProduct'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Trang chủ</title>
        <meta name='description' content='Trang chủ dự án Meo Mobile' />
      </Helmet>
      <SliderBanner />
      <FeaturedCategories />
      <FlashSale />
      <TabProducts />
    </>
  )
}
