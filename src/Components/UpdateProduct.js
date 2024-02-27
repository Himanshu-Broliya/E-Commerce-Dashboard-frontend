import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { baseUrl } from './Constants/constant';

export default function UpdateProduct() {

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState(false)
  const params = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    getDataForUpdate()
  },[])


  const getDataForUpdate = async () => {
    let result = await fetch(`${baseUrl}/product/${params.id}`,{
      headers:{
        'Content-Type':'application/json',
        authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    })
    result = await result.json();
    // console.log(result.name)
    setName(result.name)
    setPrice(result.price)
    setCategory(result.category)
    setCompany(result.company)
  }


  const updateProduct = async () => {
    if (name === '' || price === '' || category === '' || company == '' ) {
      setError(true)
    } else {
      let result = await fetch(`${baseUrl}/updateproduct/${params.id}`,{
        method:'PUT',
        body:JSON.stringify({name,price,category,company}),
        headers:{
          'Content-Type':'application/json',
          authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      result = await result.json();
      if(result){
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Product updated successfully!",
          showConfirmButton: false,
          timer: 1500
        });
      }
      // console.log(result)
      navigate('/')
    }
  }



  return (
    <div className='md:h-screen flex md:items-center md:justify-center mt-[5rem] md:mt-[-75px] px-3'>
      <div className='flex flex-col items-center justify-center bg-blue-300 w-[400px]  py-7 rounded-md'>
        <h1 className='text-2xl text-blue-500 font-bold mb-5 md:mb-10'>Update Product</h1>
        <input className='border-2 border-blue-500 rounded-md w-[19rem] md:w-[22rem]  px-2 md:px-3 py-1 md:py-[6px] text-blue-800 focus:border-blue-500 focus:outline-blue-500 mb-[40px] md:mb-[50px] ' value={name} onChange={(e)=> setName(e.target.value)} type='text' placeholder='Product Name' />
        {error && name === '' && <span className='text-xs text-red-600 top-[-42px] md:top-[-50px] left-[-80px] md:left-[-100px] relative'>Please Enter product name</span>}

        <input className='border-2 border-blue-500 rounded-md w-[19rem] md:w-[22rem]  px-2 md:px-3 py-1 md:py-[6px] text-blue-800 focus:border-blue-500 focus:outline-blue-500 mb-[40px] md:mb-[50px] ' value={price} onChange={(e) => setPrice(e.target.value)} type='text' placeholder='Product Price' />
        {error && price === '' && <span className='text-xs text-red-600 top-[-42px] md:top-[-50px] left-[-80px] md:left-[-100px] relative'>Please Enter product Price</span>}

        <input className='border-2 border-blue-500 rounded-md w-[19rem] md:w-[22rem]  px-2 md:px-3 py-1 md:py-[6px] text-blue-800 focus:border-blue-500 focus:outline-blue-500 mb-[40px] md:mb-[50px] ' value={category} onChange={(e) => setCategory(e.target.value)} type='text' placeholder='Product Category' />
        {error && category === '' && <span className='text-xs text-red-600 top-[-42px] md:top-[-50px] left-[-70px] md:left-[-90px] relative'>Please Enter product category</span>}

        <input className='border-2 border-blue-500 rounded-md w-[19rem] md:w-[22rem]  px-2 md:px-3 py-1 md:py-[6px] text-blue-800 focus:border-blue-500 focus:outline-blue-500 mb-[40px] md:mb-[50px] ' value={company} onChange={(e) => setCompany(e.target.value)} type='text' placeholder='Product Company' />
        {error && company === '' && <span className='text-xs text-red-600 top-[-42px] md:top-[-50px] left-[-70px] md:left-[-90px] relative'>Please Enter product company</span>}

        <button className='bg-blue-500 text-white font-bold text-[16px] px-5 py-1 border-2 border-blue-500 text-center rounded-md' type='submit' onClick={updateProduct}>Update Product</button>
      </div>
    </div>
  )
}
