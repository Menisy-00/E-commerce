import Style from './Login.module.css'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios'
import * as Yup from 'yup';
import { UserContext } from '../Context/UserContext';
export default function Login() {
  let {setUserLogin}=useContext(UserContext)
  let navigate=useNavigate()
  const [apiError, setapiError] = useState('')
  const [apiSuccess, setapiSuccess] = useState('')
  const [isLonding, setIsLonding] = useState(false)
  // Auto-hide error message after 2 seconds
  useEffect(() => {
    if (apiError) {
      const timer = setTimeout(() => setapiError(''), 2000)
      return () => clearTimeout(timer)
    }
  }, [apiError])
  // Auto-hide success message after 2 seconds
  useEffect(() => {
    if (apiSuccess) {
      const timer = setTimeout(() => setapiSuccess(''), 2000)
      return () => clearTimeout(timer)
    }
  }, [apiSuccess])
  //Validation
  let validationSchema= Yup.object().shape({
    email: Yup.string().email('Email format is invalid').required('email is required'),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{4,10}$/,'Password must match pattern: one uppercase letter followed by 5-10 lowercase letters or digits').required('Password is required'),
    })
 function handleLogin(formValues)
  {
    setIsLonding(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,formValues)
    .then((apiResponse)=>{
      localStorage.setItem('userToken',apiResponse?.data?.token)
      setUserLogin(apiResponse?.data?.token)
      setIsLonding(false)
      setapiSuccess(apiResponse?.data?.message)
      navigate('/')
    })
    .catch((apiResponse)=>{
      setIsLonding(false)
      setapiError(apiResponse?.response?.data?.message)
    })
   
  } 
  let formik= useFormik({
    initialValues:{
    email:"",
    password:"",
    },
    validationSchema,
    onSubmit:handleLogin
  })
  return<>
  <div className='max-w-sm md:max-w-4xl mx-auto py-6 bg-slate-100 p-10 rounded-2xl shadow mt-15'>
    <h2 className='text-3xl text-green-500 font-bold mb-8'>Login Now : </h2>
    <form className='border-green-600 border-l-2 p-5' onSubmit={formik.handleSubmit}>
      {/* email */}
      <div className="relative z-0 w-full mb-5 group">
        <input value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
        <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email Address : </label>
      </div>
      {formik.errors.email && formik.touched.email?<div className="text-center p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span className="font-medium">{formik.errors.email}</span> 
      </div>:null}         
      {/* password */}
      <div className="relative z-0 w-full mb-5 group">
        <input value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
        <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password  : </label>
      </div>
      {formik.errors.password && formik.touched.password?<div className="text-center p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span className="font-medium">{formik.errors.password}</span> 
      </div>:null}
      {/* ------------------------------------------ */}
      {apiError?<div className="text-center p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span className="font-medium">{apiError}</span> 
      </div>:null}

      {apiSuccess?<div className="text-center font-bold p-3 mb-4 text-sm text-green-500 rounded-lg bg-red-50 dark:bg-gray-800 " role="alert">
        <span className="font-medium">{apiSuccess}</span> 
      </div>:null}
      <div className='flex items-center gap-7 justify-between'>
      <button type="submit" className="cursor-pointer text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
      {isLonding?<i className="fa-solid fa-spinner fa-spin"></i>:'Login'} 
        </button>
        <div>
        <p className='text-md text-gray-800 '>Didn't have account yet ? <span className='italic font-semibold text-sky-500 border-b-1'><Link to={'/register'}>Register Now</Link></span></p>
        </div>
        <p className='text-md text-gray-800  '> <span className='italic font-semibold text-sky-500 border-b-1'><Link to={'/forget-passowrd'}>forget your password ?</Link></span></p>
      </div>
    </form>
  </div>

  </>
}