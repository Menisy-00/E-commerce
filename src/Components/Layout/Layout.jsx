import React, { useEffect, useState } from 'react'
import Style from './Layout.module.css'
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
export default function Layout() {
    const [counter, setCounter] = useState(0);
    useEffect(()=>{

    },[])
  return <>
  <div className='min-h-screen flex flex-col '>
  <Navbar/>
  <div className='container m-auto py-20 '>
    <Outlet/>
  </div>
  <Footer/>
  </div>
  </>
}
