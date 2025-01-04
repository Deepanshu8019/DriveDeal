import React from 'react'
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube,FaLinkedin, FaInstagram } from "react-icons/fa";
import { URL } from '../../Data/URLs';
function Footer() {
  return (
    <div className='bg-black h-[10rem] bottom-0 relative max-sm:h-[15rem]'>
        <div className="flex gap-3 text-white p-4 text-lg justify-between max-sm:flex-col">
            <p className='text-white text-2xl font-bold relative'>DriveDeal</p>
                <div className=' flex gap-3 text-white text-2xl max-sm:text-xl '>
                    <FaFacebook className='cursor-pointer' onClick={() => { window.location.href = URL.Facebook; }}/>
                    <FaGoogle className='cursor-pointer' onClick={() => { window.location.href = URL.Google; }}/>
                    <FaLinkedin className='cursor-pointer' onClick={() => { window.location.href = URL.Linkedin; }}/>
                    <FaInstagram className='cursor-pointer' onClick={() => { window.location.href = URL.Instagram; }} />
                </div>
        </div>
        <div className="text-center text-white absolute bottom-0 left-1/2 transform -translate-x-1/2 ">Made By Deepanshu Shukla © 2025 DriveDeal</div>
    </div>
  )
}

export default Footer
