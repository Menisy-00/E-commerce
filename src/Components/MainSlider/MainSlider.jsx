import Style from './MainSlider.module.css'
import Slider from "react-slick";
import slider1 from '../../assets/slider-image-1.jpeg'
import slider2 from '../../assets/slider-image-2.jpeg'
import slider3 from '../../assets/slider-image-3.jpeg'
import banner1 from '../../assets/grocery-banner.png'
import banner2 from '../../assets/grocery-banner-2.jpeg'
export default function MainSlider() {
    var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    arrows:false
  };
  return <>
    <div className='flex flex-wrap py-8 items-center mb-5'>
      <div className='w-3/4'>
      <Slider {...settings}>
        <img className='w-full h-[400px]' src={slider1} alt="" />
        <img className='w-full h-[400px]' src={slider2} alt="" />
        <img className='w-full h-[400px]' src={slider3} alt="" />
       </Slider>
      </div>
      <div className='w-1/4'>
      <img className='w-full h-[200px]' src={banner1} alt="" />
      <img className='w-full h-[200px]' src={banner2} alt="" />
      </div>
    </div>
  </>
}
