import React, { useState } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
export default function ForgetPassword() {
    let navigate=useNavigate()
    const [isLonding, setIsLonding] = useState(false)
      let validationSchema= Yup.object().shape({
        email: Yup.string().email('Email format is invalid').required('email is required'),
        })
    function handleForget(formValues)
    {
      setIsLonding(true)
      axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,formValues)
      .then((apiResponse)=>{
        console.log(apiResponse);
        
      setIsLonding(false)
      navigate('/v-code')
      })
      .catch((apiResponse)=>{
        console.log(apiResponse);
        
      })
    
    } 
  let formik= useFormik({
    initialValues:{
    email:"",
    },
    validationSchema,
    onSubmit:handleForget
  })
  return <>
      <div className='max-w-sm md:max-w-4xl mx-auto py-6 bg-slate-100 p-10 rounded-2xl shadow mt-15'>
    <h2 className='text-3xl text-green-500 font-bold mb-8'>Forget Password </h2>
    <form className='border-green-600 border-l-2 p-5' onSubmit={formik.handleSubmit}>
      
    {/* email */}
      <div className="relative z-0 w-full mb-5 group">
        <input value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
        <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email Address : </label>
      </div>
      {formik.errors.email && formik.touched.email?<div className="text-center p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span className="font-medium">{formik.errors.email}</span> 
      </div>:null} 
    <button type="submit" className="cursor-pointer text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
      {isLonding?<i className="fa-solid fa-spinner fa-spin"></i>:'Verify'} 
        </button>
    </form>
  </div>

  </>
}
