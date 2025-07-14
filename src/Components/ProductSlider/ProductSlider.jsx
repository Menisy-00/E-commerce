import React, { useEffect, useState } from 'react'
import Style from './ProductSlider.module.css'
import Slider from "react-slick";

import axios from 'axios'
export default function ProductSlider() {
    var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 3,
    autoplay:true,
  };
   const [category, setcategory] = useState([])
    function getCategory()
    {
      axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({data})=>{
        setcategory(data.data)     
      })
      .catch((error)=>{

      })
    }
    useEffect(()=>{
      getCategory()
    },[])
  return <>
    <div className='bg-white mb-5'>
      <Slider {...settings}>
        {category.map((category)=><div className='text-center'>
          <img className='w-full h-[210px]' src={category?.image} alt={category?.name} />
          <h2 className='text-green-600 text-xl font-medium ml-2'>{category?.name}</h2>
          </div>)}
       </Slider>
    </div>
  </>
}
