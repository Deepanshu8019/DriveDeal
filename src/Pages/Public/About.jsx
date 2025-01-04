import React from 'react'
import { IoBagHandleSharp } from "react-icons/io5";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { MdSell } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { URL } from '../../Data/URLs';


function About() {
  return (
    <div className='min-h-screen bg-white box-border '>
        <div className='flex justify-between w-full  flex-wrap max-md:flex-col'>
            <div className='w-1/2  p-10 max-md:w-full'>
                <p className='text-center mb-10 w-full font-extrabold text-3xl '>Our Story</p>
                <p className='text-xl'>
                    Launched in 2025, DriveDeal is India's premier online platform dedicated exclusively to buyers of second-hand tractors. We aim to simplify the process of finding reliable and affordable agricultural vehicles, catering to the unique needs of farmers and agricultural professionals.
                </p>
                <br />
                <p className='text-xl'>
                    At DriveDeal, quality and transparency are our top priorities. Every tractor listed undergoes a thorough inspection to ensure it meets our high standards. Buyers can browse a wide range of options, complete with detailed descriptions, images, and specifications, making it easier to find the perfect fit for their needs.
                </p>
                <br />
                <p className='text-xl'>
                    Our platform is designed to provide a seamless and trustworthy experience, with a user-friendly interface and robust customer support. DriveDeal is committed to empowering India's agricultural community by helping buyers access the tools they need to grow and succeed.
                </p>
            </div>
            <div className='w-1/2 bg-white p-10 max-md:w-full max-sm:p-4 '>
                <img src="About.jpg" alt="" className='w-[35rem] h-[25rem] m-auto max-sm:h-[20rem] shadow-[0px_4px_10px_2px_rgba(0,0,0,0.30)]'/>
            </div>
        </div>

        <div className='flex flex-wrap items-center justify-center w-full gap-8 mt-10 mb-20 '>
            <div className='bg-white border-black border-[1px] w-[12rem] h-[11.5rem] p-4 rounded-2xl hover:scale-105 ease-out duration-300 shadow-[0px_4px_10px_2px_rgba(0,0,0,0.30)]'>
                <div className=' bg-red-500 m-auto mt-4 mb-4 w-14 h-14 p-2 rounded-full text-center '><IoBagHandleSharp className='text-center m-auto h-full w-full text-3xl'/></div>
                <p className='text-center text-2xl font-bold'>10k+</p>
                <p className='text-[14px] text-center'>Buyers active in our site</p>
            </div>

            <div className='bg-white border-black border-[1px] w-[12rem] h-[11.5rem] p-4 rounded-2xl hover:scale-105 ease-out duration-300 shadow-[0px_4px_10px_2px_rgba(0,0,0,0.30)]'>
                <div className=' bg-red-500 m-auto mt-4 mb-4 w-14 h-14 p-2 rounded-full text-center '><MdSell className='text-center m-auto h-full w-full text-3xl'/></div>
                <p className='text-center text-2xl font-bold'>100+</p>
                <p className='text-[14px] text-center'>Annual Vehicle Sales</p>
            </div>

            <div className='bg-white border-black border-[1px] w-[12rem] h-[11.5rem] p-4 rounded-2xl hover:scale-105 ease-out duration-300 shadow-[0px_4px_10px_2px_rgba(0,0,0,0.30)]'>
                <div className=' bg-red-500 m-auto mt-4 mb-4 w-14 h-14 p-2 rounded-full text-center '><RiMoneyRupeeCircleFill className='text-center m-auto h-full w-full text-3xl'/></div>
                <p className='text-center text-2xl font-bold'>5M+</p>
                <p className='text-[14px] text-center'>Annual Revenue</p>
            </div>
        </div>
        
        <div className='w-full text-center mt-12 pb-20'>
            <p className='text-3xl font-bold mt-4 underline underline-offset-2 mb-3'>Founder</p>
            <div className='bg-gray-300 p-8 pb-4 inline-block m-auto '>
                <img src="Deepanshu.jpg" alt="" className='m-auto text-center h-[35rem] shadow-[0px_4px_10px_2px_rgba(0,0,0,0.30)] '/>
                <p className='text-2xl font-semibold mt-2 shadow-[0px_4px_10px_2px_rgba(0,0,0,0.30)] '>Mr.Deepanshu Shukla</p>
            </div>
            <div className='w-full mt-1'>
                <div className='m-auto w-[30%] flex gap-4 justify-center'>
                    <a href={URL.Linkedin} className='text-3xl '><FaLinkedin /></a>
                    <a href={URL.Instagram} className='text-3xl '><FaInstagram /></a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default About
