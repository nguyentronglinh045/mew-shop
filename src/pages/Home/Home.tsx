import { Helmet } from 'react-helmet-async'
import FeaturedCategories from 'src/components/FeaturedCategories'
import SliderBanner from 'src/components/SliderBanner/SliderBanner'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Trang chủ</title>
        <meta name='description' content='Trang chủ dự án Meo Mobile' />
      </Helmet>
      <SliderBanner />
      <FeaturedCategories />
    </>
  )
}
