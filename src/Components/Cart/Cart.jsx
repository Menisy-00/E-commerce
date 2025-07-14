import React, { useContext, useEffect, useState } from 'react'
import Style from './Cart.module.css'
import { CartContext } from '../Context/CartContext'
import { Link } from 'react-router-dom';
import Spiner from '../Spiner/Spiner';
export default function Cart() {
  const [cartData, setCartData] = useState(null)
let{removeCartItems,getCart,removeCarts ,UpdateCartCount}=useContext(CartContext);
  async function getCartProduct()
    {
      let response =await getCart();
      setCartData(response?.data)
      
    }

 async function removeCart(id)
  {
    let response =await removeCartItems(id);
    setCartData(response?.data)
  }
 async function removeAllCart()
  {
    let response =await removeCarts();
    setCartData(response?.data)
  }
 async function UpdateCount(id ,conut)
  {
    if(conut<1)
    {
      return;
    }
    let response =await UpdateCartCount(id ,conut);
    setCartData(response?.data)
  }
  useEffect(()=>{
    getCartProduct()
  },[])
  return <>
  {cartData?.data.products?.length > 0 ?<div className='flex flex-col gap-6 my-10 '>
  <div className='flex justify-between items-center'>
  <h2 className='text-3xl font-semibold text-slate-700'>Cart <span className='text-base font-normal text-gray-400'>({cartData?.numOfCartItems} Items)</span></h2>
  <button onClick={removeAllCart}  className='w-1/3 md:w-1/5 font-semibold text-gray-900 border border-sky-600 px-4 py-2 rounded-md my-2 cursor-pointer hover:bg-sky-600 transition duration-300 capitalize'> Clear Your Cart</button>
  </div>
<div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg flex gap-4">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
      <tr>
        <th scope="col" className="px-16 py-3">Image
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {cartData?.data?.products?.map((product)=><tr key={product._id} className="bg-white border-b  border-gray-200 hover:bg-gray-50 ">
        <td className="p-4">
          <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 ">
          {product.product.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button onClick={()=>UpdateCount(product.product.id,product.count-1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
              <input id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 " placeholder={product.count} required />
            </div>
            <button onClick={()=>UpdateCount(product.product.id,product.count+1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 ">
          {product.price} EGP
        </td>
        <td className="px-6 py-4">
          <span onClick={()=>{removeCart(product.product.id)}}  className="cursor-pointer font-semibold text-red-600 dark:text-red-500 hover:underline">Remove</span>
        </td>
      </tr>
      )}
    </tbody>
  </table>
</div>

  <div className=' w-1/2 md:flex gap-7 items-center justify-between bg-white p-4 rounded-xl shadow-md m-auto'>
    <div className='w-full md:w-1/2 flex gap-1 text-xl font-semibold text-slate-800 font-mono justify-center md:justify-start'>
      <h2>Total : </h2>
      <span className='text-yellow-300'>{cartData?.data?.totalCartPrice}</span><span>EGP</span>
    </div>
    <Link to={'/checkout'} className='w-full md:w-1/3'>
    <button  className='w-full font-semibold text-white bg-yellow-600 px-4 py-2 rounded-md my-2 cursor-pointer hover:bg-yellow-800 transition duration-300 capitalize'>check out</button>
    </Link>
  </div>
  </div> :<Spiner />}



  </>
}
