import Style from './Footer.module.css'
import amazon from '../../assets/amazon-color-svgrepo-com.svg'
import mastercard from '../../assets/card-mastercard.svg'
import visa from '../../assets/card-visa.svg'
import paypal from '../../assets/paypal-svgrepo-com.svg'
import appStore from '../../assets/app-store.svg'
import googlePlay from '../../assets/google-play.svg'
export default function Footer() {

  return <>
    <div className=' px-10 pt-10 pb-5 text-white bg-gray-800  shadow-[0_-4px_8px_rgba(0,0,0,0.05)]'>
      <h2 className='text-3xl capitalize mb-1'>Get the freshCart app</h2>
      <p className='text-gray-400 text-lg'>We will send you a link, open it on your phone to download the app.</p>
      <div className='flex flex-wrap px-4 py-8 items-center '>
        <div className='w-full md:w-9/12 flex '>
        <input type="email" className='w-full block py-2 px-2 rounded-md bg-white text-sm text-gray-900 border-opacity-25   border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer' placeholder='Email...' />
        </div>
        <div className='md:w-3/12 text-center'>
        <button className='md:w-3/4 px-4 md:px-0 font-semibold text-white bg-green-600 py-2 rounded-md my-2 cursor-pointer hover:bg-green-800 transition duration-300'> Share App Link</button>
        </div>
      </div>
      <span className='w-full h-0.5 bg-gray-600 block'></span>
      <div className='row justify-between'>
        <div className='md:flex items-center'>
        <h2 className='text-2xl font-sans'>Payment Partners </h2>
        <div className='flex gap-1 ml-2 mt-2'>
          <img src={visa} alt="" />
          <img src={mastercard} alt="" />
          <img className='w-9' src={paypal} alt="" />
          <img className='w-5' src={amazon} alt="" />
        </div>
        </div>
        <div className='md:flex items-center'>
        <h2 className='text-2xl font-sans'> Get deliveries with FreshCart </h2>
        <div className='flex gap-1 ml-2 mt-2'>
          <img src={appStore} alt="" />
          <img src={googlePlay} alt="" />
        </div>
        </div>
      </div>
      <span className='w-full h-0.5 bg-gray-600 block mb-10'></span>
          <div className='text-md text-slate-800 gap-2 flex items-center md:justify-center ml-6 md:ml-0'>
            <span className='text-gray-400 border-1 border-solid rounded-full hover:bg-green-500 hover:text-white cursor-pointer transition duration-500'><i className=" fa-brands p-2 fa-1 fa-facebook"></i> </span>
            <span className='text-gray-400 border-1 border-solid rounded-full hover:bg-green-500 hover:text-white cursor-pointer transition duration-500'><i className=" fa-brands p-2 fa-1 fa-tiktok"></i></span>
            <span className='text-gray-400 border-1 border-solid rounded-full hover:bg-green-500 hover:text-white cursor-pointer transition duration-500'><i className=" fa-brands p-2 fa-1 fa-youtube"></i></span>
            <span className='text-gray-400 border-1 border-solid rounded-full hover:bg-green-500 hover:text-white cursor-pointer transition duration-500'><i className=" fa-brands p-2 fa-1 fa-linkedin"></i></span>
          </div>
    </div>
  </>
}
