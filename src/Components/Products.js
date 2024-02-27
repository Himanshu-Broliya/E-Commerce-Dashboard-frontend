import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { LuIndianRupee } from "react-icons/lu";
import { baseUrl } from './Constants/constant';


export default function Products() {

  const [products, setProducts] = useState([]);
  const [alertResult, setAlertResult] = useState("");
  const navigate = useNavigate();
  let res = "";


  useEffect(() => {
    getProducts();
  }, [])

  const getProducts = async () => {
    let result = await fetch(`${baseUrl}/products`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    });
    // console.log(JSON.parse(localStorage.getItem('token')));
    result = await result.json();
    if (result.expire === "Token Expired") {
      Swal.fire({
        title: "Oops...",
        text: "Token is expired. Please login again!",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok"
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.clear();
          navigate('/login')
        }
      });
    }
    setProducts(result)
  }



  const deleteProduct = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Product deleted successfully!",
          showConfirmButton: false,
          timer: 1500
        });
        let res = await fetch(`${baseUrl}/products/${id}`, {
          method: 'delete',
          headers: {
            authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        })
        res = await res.json();
        console.log(res)
        getProducts()
      }
    });
  }


  const searchProduct = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`${baseUrl}/search/${key}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        },
      });
      result = await result.json();
      setProducts(result)
      // console.log(result)
    } else {
      getProducts();
    }
  }




  return (
    <div className='p-0 md:p-10'>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-3xl text-blue-700 font-bold mb-5 '>Product List</h1>
        <input type='text' placeholder='Search Product' onChange={searchProduct} className='border-2 border-blue-500 focus:border-blue-500 focus:outline-blue-500 text-blue-800 md:text-lg px-3 py-1 md:px-5 md:py-2 rounded-md w-[300px] md:w-[400px] mb-5  ' />
      </div>
      <div className=' overflow-x-auto overflow-y-auto'>
        <table className='w-full text-left rtl:text-right '>
          <thead className='bg-blue-300 text-blue-700 '>
            <tr className=''>
              <th scope='col' className='py-3 px-6'>Sr No.</th>
              <th scope='col' className='py-3 px-6'>Product Name</th>
              <th scope='col' className='py-3 px-6'>Price</th>
              <th scope='col' className='py-3 px-6'>Category</th>
              <th scope='col' className='py-3 px-6'>Company</th>
              <th scope='col' className='py-3 px-6 ' colSpan={2}>Operations</th>

            </tr>
          </thead>
          <tbody>

            {
              products.length > 0 ? products.map((item, i) =>
                <tr key={i} className='bg-blue-200 border-b border-blue-400'>
                  <td className='py-2 md:py-3 px-6 whitespace-nowrap' scope='row'>{i + 1}</td>
                  <td className='py-2 md:py-3 px-6'>{item.name}</td>
                  <td className='flex flex-row  gap-1 py-3 md:py-3 px-6'> <LuIndianRupee className='mt-[5px]' /> {item.price}</td>
                  <td className='py-2 md:py-3 px-6'>{item.category}</td>
                  <td className='py-2 md:py-3 px-6'>{item.company}</td>
                  <td className='text-2xl text-blue-700 py-2 md:py-3 px-6'><MdDelete className='cursor-pointer' onClick={() => { deleteProduct(item._id) }} /></td>
                  <td className='hover:text-blue-800 pr-6'><Link to={'/update/' + item._id} className='cursor-pointer' >Update</Link></td>
                </tr>
              )
                : 
                <div className='flex flex-row justify-center items-center'>
                  <h1 className='text-4xl text-blue-700 font-semibold'>No Match Found</h1>
                </div> 
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
