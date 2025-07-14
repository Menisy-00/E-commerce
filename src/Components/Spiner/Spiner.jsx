import Style from './Spiner.module.css'
import { BounceLoader } from "react-spinners";

export default function Spiner() {

  return <>   
  <div className='h-screen flex justify-center items-center'>
<BounceLoader color="#4fa94d" size={100} />
  </div>
  </>
}
