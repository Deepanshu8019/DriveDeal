import React from 'react'
import Button from '../../Components/core/Button'
import {toast} from 'react-hot-toast'
import {Link} from "react-router-dom"
import '../Admin/addVehicle.css'

function ContactUs() {
  return (
    <div className="min-h-screen"> 
        <div className=" border-t-8 rounded-sm border-indigo-600 bg-white m-auto mt-[5rem] p-12 shadow-2xl w-[30rem] max-sm:w-[90%] max-sm:p-4 max-sm:m-auto max-sm:relative max-sm:top-[1rem]">
            <h1 className="font-bold text-center block text-2xl">Contact US</h1>
            <form className='my-form m-auto md:w-[26rem] sm:w-[26rem] max-sm:w-[90%]'>
                <label className="text-gray-500 block mt-3">Name
                    <input
                        autoFocus={true}
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="me@example.com"
                        className="rounded px-4 py-3 w-full mt-1 bg-white text-gray-900 border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-100"/>
                </label>
                <label className="text-gray-500 block mt-3">Email
                    <input
                       type="email" 
                       id="email" 
                       name="email" 
                       placeholder="me@example.com"
                        className="rounded px-4 py-3 w-full mt-1 bg-white text-gray-900 border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-100"/>
                </label>
                <label className="text-gray-500 block mt-3">Contact Number
                    <input
                        type="number" 
                        name="number" 
                        placeholder="1234 XXXX XX"
                        className="rounded px-4 py-3 w-full mt-1 bg-white text-gray-900 border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-100"/>
                </label>
                <label className="block mt-3 text-gray-500">Message
                    <textarea
                        name="message"
                        placeholder="Type your message here..."
                        className="rounded px-4 py-3 w-full mt-1 h-[8rem] bg-white text-gray-900 border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-100"
                    ></textarea>
                </label>

                <Button value="Submit"/>
            </form>
        </div>
    </div>
  )
}

export default ContactUs
