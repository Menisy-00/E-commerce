import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Spiner from '../Spiner/Spiner';
export default function Categories() {
  function getCategories()
  {
  return  axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
  let {data , isLoading}=useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    select :(data)=>{
      return data?.data.data
    }
  })
  
  if (isLoading) return <Spiner />;
  return <>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
  {data?.map((prod) => (
    <div
      key={prod._id}
      className=" cursor-pointer rounded-lg shadow-green-400 shadow-md hover:shadow-lg transition duration-300 bg-white text-center"
    >
      
      <img
        src={prod.image}
        alt={prod.name}
        className="w-full h-80 object-cover "
      />
      <h2 className="text-green-700 font-semibold text-xl pb-4 mt-2">{prod.name}</h2>

    </div>
  ))}
</div>


  </>
}
