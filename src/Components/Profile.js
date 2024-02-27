import React, { useEffect, useRef, useState } from 'react'
import { IoIosCloudUpload } from "react-icons/io";
import { baseUrl } from './Constants/constant';
import Swal from 'sweetalert2';
import axios from 'axios';




export default function Profile() {

  const inputRef = useRef(null);
  const [image, setImage] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setmobile] = useState('');
  const [address, setAddress] = useState('');
  const [hobby, setHobby] = useState('');
  const [indicator,setIndicator] = useState(false)
  const [newImage, setNewImage] = useState("")
  const [edit ,setEdit] = useState(false)
  const userid = JSON.parse(localStorage.getItem('users'))._id;



  useEffect(() => {
    const name = JSON.parse(localStorage.getItem('users')).name;
    const email = JSON.parse(localStorage.getItem('users')).email;
    setFname(name)
    setEmail(email)
    getProfile();
  }, [])

  




  const getProfile = ()=>{
    axios.get(`${baseUrl}/profile/${userid}`)
    .then((res) => {
      // console.log(res)
      setNewImage(res.data.image);
      if (res.data) {
        setIndicator(true)
        setLname(res.data.lname);
        setAddress(res.data.address);
        setmobile(res.data.mobile);
        setHobby(res.data.hobby);
      }else{
        setIndicator(false)
      }
    })
    .catch(err => console.log(err))

  }

  const handleClick = () => {
    inputRef.current.click();
  }

  

  const uploadImage = async (e) => {

    const formData = new FormData();
    formData.append("image",image);
    formData.append("fname",fname);
    formData.append("lname",lname);
    formData.append("email",email);
    formData.append("mobile",mobile);
    formData.append("address",address);
    formData.append("hobby",hobby);
    formData.append("userid",userid);

    if(image === "" || fname === "" || mobile==="" || address==="" || hobby==="" ){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select profile image or fill the required fields!",
      });
    }else{
      axios.post(`${baseUrl}/profile`,formData)
      .then((res) => {
        // console.log(res)
        if(res){
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Profile updated successfully!",
            showConfirmButton: false,
            timer: 1500
          });
        getProfile();
  
        }
      })
      .catch(err => console.log(err))
    }
    getProfile();
  }


  const editProfile = ()=>{
    setIndicator(false)
    setEdit(true)
  }

  const updateProfile = ()=>{
    const formData = new FormData();
    formData.append("image",image);
    formData.append("fname",fname);
    formData.append("lname",lname);
    formData.append("email",email);
    formData.append("mobile",mobile);
    formData.append("address",address);
    formData.append("hobby",hobby);
    formData.append("userid",userid);


    if( fname === "" || mobile==="" || address==="" || hobby==="" ){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select profile image or fill the required fields!",
      });
    }else{
      axios.put(`${baseUrl}/updateProfile/${userid}`,formData)
      .then((res)=>{

        if(res){
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Profile updated successfully!",
            showConfirmButton: false,
            timer: 1500
          });
        getProfile();
        }

      })
      .catch((err)=>console.log(err))
    }
  } 



  return (
    <div className='flex flex-col items-center gap-5 mt-5'>

      <div onClick={handleClick}>
        {
          newImage
           ? 
           <img src={`http://localhost:5000/${newImage}`} alt='Upload Image' className='rounded-full h-[9rem] w-[9rem] object-cover cursor-pointer'/>
           :
          <div>
          {
            image ? <img src={URL.createObjectURL(image)} alt='profileImg' className='rounded-full h-[9rem] w-[9rem] object-cover cursor-pointer' />
              : <IoIosCloudUpload className='text-8xl text-blue-700 cursor-pointer' />
           }
          </div>

        }
        
        <input type='file' ref={inputRef} className='hidden' onChange={(e)=> setImage(e.target.files[0])} />
      </div>
      <h2 className='text-lg md:text-xl text-blue-700 font-serif font-semibold'>{fname} {lname}</h2>
      {
        indicator ?  
          <div className='mt-8'>
            <h2 className='text-lg md:text-xl mb-5 font-serif'><b>Email:</b> <span className=' pl-2'>{email}</span> </h2>
            <h2 className='text-lg md:text-xl mb-5 font-serif'><b>Mobile:</b> <span className=' pl-2'>{mobile}</span> </h2>
            <h2 className='text-lg md:text-xl mb-5 font-serif'><b>Address:</b> <span className=' pl-2'>{address}</span> </h2>
            <h2 className='text-lg md:text-xl mb-7 font-serif'><b>Hobby:</b> <span className=' pl-2'>{hobby}</span> </h2>
            <button className='bg-blue-300 rounded-md px-5 py-2 text-blue-900 text-[17px] font-bold mb-10' onClick={editProfile}>Edit Profile</button>
           </div>
        : 
        <div className='flex flex-col'>
          <input type='text' placeholder='First Name' value={fname} onChange={(e) => setFname(e.target.value)} className='border-2 border-blue-500 focus:border-blue-500 focus:outline-blue-500 px-3 py-2 rounded-md mb-4 text-blue-800 text-[17px] w-[400px]' />
          <input type='text' placeholder='Last Name' value={lname} onChange={(e) => setLname(e.target.value)} className='border-2 border-blue-500 focus:border-blue-500 focus:outline-blue-500 px-3 py-2 rounded-md mb-4 text-blue-800 text-[17px] w-[400px]' />
          <input type='email' placeholder='Email' value={email} readOnly className='border-2 border-blue-500 focus:border-blue-500 focus:outline-blue-500 px-3 py-2 rounded-md mb-4 text-blue-800 text-[17px] w-[400px]' />
          <input type='number' placeholder='mobile' value={mobile} onChange={(e) => setmobile(e.target.value)} className='border-2 border-blue-500 focus:border-blue-500 focus:outline-blue-500 px-3 py-2 rounded-md mb-4 text-blue-800 text-[17px] w-[400px]' />
          <input type='text' placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} className='border-2 border-blue-500 focus:border-blue-500 focus:outline-blue-500 px-3 py-2 rounded-md mb-4 text-blue-800 text-[17px] w-[400px]' />
          <input type='text' placeholder='Hobby' value={hobby} onChange={(e) => setHobby(e.target.value)} className='border-2 border-blue-500 focus:border-blue-500 focus:outline-blue-500 px-3 py-2 rounded-md mb-4 text-blue-800 text-[17px] w-[400px]' />
          {
            edit 
              ? <button className='bg-blue-300 rounded-md py-2 text-blue-900 text-[17px] font-bold mb-10' onClick={updateProfile}>Update Profile</button>
             :
             <button className='bg-blue-300 rounded-md py-2 text-blue-900 text-[17px] font-bold mb-10' onClick={uploadImage}>Update f Profile</button>

          }
        </div>
      }
    </div>
  )
}
