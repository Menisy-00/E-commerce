import error from "../../assets/error.svg";
import Style from './NotFound.module.css'
export default function NotFound() {

  return <>
  <div className='flex justify-center items-center'>
    <img className='w-1/2'  src={error} alt="" />
  </div>
  </>
}
