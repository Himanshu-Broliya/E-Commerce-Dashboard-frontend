import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { baseUrl } from './Constants/constant';
import Swal from 'sweetalert2';

export default function Signup() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('users');
    // if (auth) {
    //   navigate('/');
    // }
  })

  const getData = async () => {
    if (name === '' || email === '' || password === '') {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are required!",
      });
    } else {
      let res = await fetch(`${baseUrl}/getuser/${email}`);
      res = await res.json();
      if(res){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "User exist please login or use another email to signup !",
        });
      }else{
        let result = await fetch(`${baseUrl}/signup`, {
          method: 'post',
          body: JSON.stringify({ name, email, password }),
          headers: {
            'Content-Type': 'application/json'
          },
        });
  
        result = await result.json();
        if(result){
          localStorage.setItem("users", JSON.stringify(result.result));
          localStorage.setItem("token", JSON.stringify(result.auth));
    
          navigate('/');
          // console.log(result);
          setName('')
          setEmail('')
          setPassword('')
        }
      }
    }
  }



  return (
    <div className='md:h-screen flex md:items-center justify-center mt-[8rem] md:mt-[-75px] px-3'>
      <div className='flex flex-col items-center justify-center bg-blue-300 w-[400px]  py-7 rounded-md'>
        <h1 className='text-2xl text-blue-500 font-bold mb-10'>SignUp Form</h1>
        <input className='border-2 border-blue-500 rounded-md w-[19rem] md:w-[22rem] pl-2 py-1 text-blue-500 focus:border-blue-500 focus:outline-blue-500 ' value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='Name' /><br></br><br></br>
        <input className='border-2 border-blue-500 rounded-md w-[19rem] md:w-[22rem] pl-2 py-1 text-blue-500 focus:border-blue-500 focus:outline-blue-500 ' value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email' /><br></br><br></br>
        <input className='border-2 border-blue-500 rounded-md w-[19rem] md:w-[22rem] pl-2 py-1 text-blue-500 focus:border-blue-500 focus:outline-blue-500 ' value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password' /><br></br><br></br>
        <button className='bg-blue-500 text-white font-bold text-[16px] px-5 py-1 border-2 border-blue-500 text-center rounded-md' type='submit' onClick={getData}>SignUp</button>
      </div>
    </div>
  )
}
