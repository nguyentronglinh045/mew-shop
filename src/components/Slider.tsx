import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const Slider = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  }

  return (
    <div className='relative flex justify-center'>
      <img src="src/assets/images/big_bn_slide.webp" alt="" />
      <Carousel 
        responsive={responsive} 
        infinite 
        containerClass='lg:w-3/4 w-full absolute top-3/4' 
        itemClass='px-2 rounded-xl'>
        <img src='src/assets/images/slide-img1.webp' alt='' />
        <img src='src/assets/images/slide-img2.webp' alt='' />
      </Carousel>
    </div>
  )
}

export default Slider
