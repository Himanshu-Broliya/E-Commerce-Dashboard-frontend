import React from 'react'
import {Link} from 'react-router-dom'
import {PNF} from '../assets'

export default function PageNotFound() {
  return (
    <div className='flex flex-col items-center justify-center mt-20 md:mt-0'>
        <div>
            <img src={PNF} alt="404" className='h-[300px] md:h-[480px] md:w-[800px]'/>
        </div>
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-xl md:text-2xl mb-5 font-bold'>Its looks like you lost!</h1>
            <span className='text-[16px] md:text-[18px] font-serif font-semibold text-blue-700 border-2 bg-blue-200 rounded-lg  px-5 py-2' ><Link to="/">Go To Home</Link></span>
        </div>
    </div>
  )
}
