import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { IoMoon } from "react-icons/io5";
import Swal from 'sweetalert2';
import { logo } from '../../assets'





export default function Header() {


  const [toggle, setToggle] = useState(false);
  const [togle2, setTogle2] = useState(true)
  const auth = localStorage.getItem('users');
  const navigate = useNavigate();

  const logout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You wnat to logout this account",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        navigate('/signup')
      }
    });
  }



  return (

    <div className=' p-2 px-8 flex flex-row justify-between items-center md:px-6 lg:px-11' id='home'>
      <div >
        <img src={logo} alt='logo' className='h-[3.2rem] w-[3.5rem]  md:h-[3.5rem] md:w-[4rem] mix-blend-color-burn' />
      </div>
      {
        auth ? <div className='hidden md:flex'>
          <ul className='flex flex-row md:gap-6 lg:gap-10'>
            <li className='cursor-pointer transition-all ease-in-out hover:scale-110 hover:text-blue-700 text-[16px] md:text-[17px]'> <Link to='/' >Products</Link> </li>
            <li className='cursor-pointer transition-all ease-in-out hover:scale-110 hover:text-blue-700 text-[16px] md:text-[17px]'> <Link to='/add' >Add Product</Link> </li>
            <li className='cursor-pointer transition-all ease-in-out hover:scale-110 hover:text-blue-700 text-[16px] md:text-[17px]'> <Link to='/profile' >Profile</Link> </li>
            <li className='cursor-pointer transition-all ease-in-out hover:scale-110 hover:text-blue-700 text-[16px] md:text-[17px]'> <Link onClick={logout} to='/login' >Logout</Link> </li>
            <li className='text-xl cursor-pointer'><IoMoon /></li>
          </ul>
        </div>
          :
          <div className='hidden md:flex'>
            <ul className='flex flex-row md:gap-6  lg:gap-10'>
              <li className='text-xl cursor-pointer mt-1'><IoMoon /></li>
              <li className='cursor-pointer transition-all ease-in-out hover:scale-110 hover:text-blue-700 text-[16px] md:text-[18px]'> <Link to='/signup' >SignUp</Link> </li>
              <li className='cursor-pointer transition-all ease-in-out hover:scale-110 hover:text-blue-700 text-[16px] md:text-[18px]'> <Link to='/login' >Login</Link> </li>
            </ul>
          </div>








      }

      <div className='md:hidden lg:hidden absolute top-5 right-[18px] '>
        {
          !toggle ?
            <div className='flex flex-row gap-4'>
              <span className='mt-[2px] text-[18px] cursor-pointer'><IoMoon /></span>
              <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setToggle(true)} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer ">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </div>
            :
            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setToggle(false)} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer float-end ">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        }
        {
          toggle ?
            auth ? <div className=''>
              <ul className='flex flex-col mt-8  bg-neutral-300 px-5 py-2'>
                <li className='p-5 cursor-pointer transition-all ease-in-out hover:scale-110 hover:text-blue-700 text-[16px] md:text-[17px]' onClick={() => setToggle(false)}> <Link to='/' >Products</Link> </li>
                <li className='p-5 cursor-pointer transition-all ease-in-out hover:scale-110 hover:text-blue-700 text-[16px] md:text-[17px]' onClick={() => setToggle(false)}> <Link to='/add' >Add Product</Link> </li>
                <li className='p-5 cursor-pointer transition-all ease-in-out hover:scale-110 hover:text-blue-700 text-[16px] md:text-[17px]' onClick={() => setToggle(false)}> <Link to='/profile' >Profile</Link> </li>
                <li className='p-5 cursor-pointer transition-all ease-in-out hover:scale-110 hover:text-blue-700 text-[16px] md:text-[17px]' onClick={() => setToggle(false)}> <Link onClick={logout} to='/login' >Logout</Link> </li>
              </ul>
            </div>
              : <div>
                <ul className='flex flex-col mt-8  bg-neutral-300 px-5 py-2'>
                  <li className='p-5 cursor-pointer transition-all ease-in-out hover:scale-110 hover:text-blue-700 text-[16px] md:text-[18px]' onClick={() => setToggle(false)}> <Link to='/signup' >SignUp</Link> </li>
                  <li className='p-5 cursor-pointer transition-all ease-in-out hover:scale-110 hover:text-blue-700 text-[16px] md:text-[18px]' onClick={() => setToggle(false)}> <Link to='/login' >Login</Link> </li>
                </ul>
              </div>
            : null
        }
      </div>
    </div>

  )
}
