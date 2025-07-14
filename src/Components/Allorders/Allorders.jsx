import { useNavigate } from 'react-router-dom';
import useUserOrder from "../../Hooks/useUserOrder";
import Spiner from '../Spiner/Spiner';
export default function Allorders() {
    let navigate = useNavigate();
    function goToSpecificOrder(id)
    {
      navigate(`/specific_order/${id}`)
    }
    let {data ,isLoading}=useUserOrder()
    let orderData=data?.data
    if (isLoading) return <Spiner />;
  return <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-3/4 m-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200  ">
            <tr>
              <th scope="col" className="px-6 py-3 font-extrabold">
                Order
              </th>
              <th scope="col" className="px-6 py-3 font-extrabold">
                Date
              </th>
              <th scope="col" className="px-6 py-3 font-extrabold">
                Payment
              </th>
              <th scope="col" className="px-6 py-3 font-extrabold">
                Total Price
              </th>
            </tr>
          </thead>
          <tbody>
            {orderData?.map((order)=><tr key={order?.id} onClick={()=>{goToSpecificOrder(order?.id)}} className="odd:bg-white  even:bg-gray-50  border-b  border-gray-200 cursor-pointer hover:bg-gray-100">
              <td className="px-6 py-4 text-yellow-500 font-semibold">#{order?.id}</td>
              <td className="px-6 py-4">{order.paidAt.split("T")[0]}</td>
              {order.isPaid?<td className="px-6 py-4 text-green-400">Paid</td>:<td className="px-6 py-4 text-red-700">Not Paid</td>}
              
              <td className="px-6 py-4">{order.totalOrderPrice} EGP</td> 
            </tr>)}
            
          </tbody>
        </table>
      </div>
    </>
}
      // <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      //   <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
      //     <thead className="text-xs text-gray-700 uppercase bg-gray-200  ">
      //       <tr>
      //         <th scope="col" className="px-6 py-3 font-extrabold">
      //           Product name
      //         </th>
      //         <th scope="col" className="px-6 py-3 font-extrabold">
      //           Color
      //         </th>
      //         <th scope="col" className="px-6 py-3 font-extrabold">
      //           Category
      //         </th>
      //         <th scope="col" className="px-6 py-3 font-extrabold">
      //           Price
      //         </th>
      //       </tr>
      //     </thead>
      //     <tbody>
      //       <tr className="odd:bg-white  even:bg-gray-50  border-b  border-gray-200">
      //         <th
      //           scope="row"
      //           className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
      //         >
      //           Apple MacBook Pro 17"
      //         </th>
      //         <td className="px-6 py-4">Silver</td>
      //         <td className="px-6 py-4">Laptop</td>
      //         <td className="px-6 py-4">$2999</td>
              
      //       </tr>
      //     </tbody>
      //   </table>
      // </div>
