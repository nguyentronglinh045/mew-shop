import { Helmet } from 'react-helmet-async'
import FeaturedCategories from 'src/components/FeaturedCategories'
import FlashSale from 'src/components/FlashSale'
import SliderBanner from 'src/components/SliderBanner'
import TabProducts from 'src/components/TabProduct'
import { useTranslation } from 'react-i18next'

export default function Home() {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('Header.homePage')}</title>
        <meta name='description' content='Trang chủ dự án Meo Mobile' />
      </Helmet>
      <SliderBanner />
      <FeaturedCategories />
      <FlashSale />
      <TabProducts />
    </>
  )
}
