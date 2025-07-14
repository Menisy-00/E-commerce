import React, { useEffect, useState } from 'react'
import Style from './Brands.module.css'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Spiner from '../Spiner/Spiner';

export default function Brands() {
  function getBrands()
  {
  return  axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }
  let {data,isLoading}=useQuery({
    queryKey: ['products'],
    queryFn: getBrands,
    select :(data)=>{
      return data?.data.data
    }
  })
  if (isLoading) return <Spiner />;
  return <>
 <div className='flex flex-wrap gap-3'>
  {data?.map((prod) => {
    return (
      <div
        key={prod._id}
        className='cursor-pointer rounded-lg hover:shadow-green-200 shadow-md hover:shadow-lg transition duration-300 bg-white text-center'
      >
        <img src={prod.image} alt="" />
      </div>
    );
  })}
</div>


  </>
}
