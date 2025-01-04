import React from 'react'

function Input({type, id, name, label, placeholder, autofocus}) {
  return (
    <label className="text-gray-500 block mt-3">{label}
      <input
        autoFocus={autofocus}
        type={type} 
        id={id} 
        name={name} 
        placeholder={placeholder}
        className="rounded px-4 py-3 w-full mt-1 bg-white text-gray-900 border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-100"/>
    </label>
  )
}

export default Input


// <Input type="email" id="email" name="email" label="Email Address" placeholder="me@example.com" autofocus={true}/>
{/* <Input type="password" id="password" name="password" label="Password" placeholder="••••••••••" /> */}

