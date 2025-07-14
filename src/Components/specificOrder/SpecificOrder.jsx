import React from 'react'
import useUserOrder from '../../Hooks/useUserOrder';
import { useParams } from 'react-router-dom';

export default function SpecificOrder() {
    let{id}=useParams()
    
    let {data}=useUserOrder()
    let orderData=data?.data
    let myOrder=orderData?.find(order => order.id == id);
    
  return <>
  <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-3/4 m-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200  ">
            <tr>
              <th scope="col" className="px-6 py-3 font-extrabold">
                Image Caver
              </th>
              <th scope="col" className="px-6 py-3 font-extrabold">
                Product name
              </th>
              <th scope="col" className="px-6 py-3 font-extrabold">
                Category
              </th>
              <th scope="col" className="px-6 py-3 font-extrabold">
                Count
              </th>
              <th scope="col" className="px-6 py-3 font-extrabold">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {myOrder?.cartItems.map((order)=><tr key={order._id} className="odd:bg-white  even:bg-gray-50  border-b  border-gray-200">
              <td className="px-6 py-4"><img className='w-20' src={order.product.imageCover} alt={order.product.title} /></td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                {order.product.title.split(' ').slice(0,3).join(' ')}
              </th>
              <td className="px-6 py-4 text-green-500">{order.product.category.name}</td> 
              <td className="px-6 py-4">{order.count}</td>
              <td className="px-6 py-4 text-slate-900 font-medium">{order.price} EGP</td>
              
            </tr>)}

          </tbody>
        </table>
      </div>
  </>
}
