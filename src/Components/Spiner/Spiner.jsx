import Style from './Spiner.module.css'
import{ThreeCircles} from 'react-loader-spinner'
export default function Spiner() {

  return <>   
  <div className='h-screen flex justify-center items-center'>
 <ThreeCircles
  visible={true}
  height="100"
  width="100"
  color="#4fa94d"
  ariaLabel="three-circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
  </div>
  </>
}
