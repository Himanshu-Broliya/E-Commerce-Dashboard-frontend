import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { baseUrl } from './Constants/constant';
import Swal from 'sweetalert2';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('users');
        if (auth) {
            navigate('/');
        }
    })

    const getData = async () => {
        // console.log(name,email,password)
        if (email === '' || password === '') {
            alert("Please, Enter all the details.")
        } else {
            // console.log(baseUrl)
            let result = await fetch(`${baseUrl}/login`, {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            result = await result.json();
            // console.log(result)
            if(result.auth){
                localStorage.setItem("users", JSON.stringify(result.user));
                localStorage.setItem("token", JSON.stringify(result.auth));
                navigate('/');
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Email or Password is wrong!",
                  });
            }
            
            // console.log(result);
            setEmail('')
            setPassword('')
        }
    }



    return (
        <div className='md:h-screen flex md:items-center md:justify-center mt-[8rem] md:mt-[-75px] px-3 '>
            <div className='flex flex-col items-center justify-center bg-blue-300 w-[370px]  py-7 rounded-md'>
                <h1 className='text-2xl text-blue-500 font-bold mb-10 '>Login Form</h1>
                <input className='border-2 border-blue-500 rounded-md w-[19rem] md:w-[21rem] pl-2 py-1 text-blue-500 focus:border-blue-500 focus:outline-blue-500 ' value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email' /><br></br><br></br>
                <input className='border-2 border-blue-500 rounded-md w-[19rem] md:w-[21rem] pl-2 py-1 text-blue-500 focus:border-blue-500 focus:outline-blue-500 ' value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password' /><br></br><br></br>
                <button className='bg-blue-500 text-white font-bold text-[16px] px-5 py-1 border-2 border-blue-500 text-center rounded-md' type='submit' onClick={getData}>Login</button>
            </div>
        </div>
    )
}
