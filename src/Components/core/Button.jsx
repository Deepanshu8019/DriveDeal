import React from 'react'

function Button({value}) {
  return (
    <button 
      // onClick={() => preventDefault(e)}
      className="mt-6 transition-all block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 focus:bg-indigo-900 transform hover:-translate-y-1 hover:shadow-lg">

      {value}
  </button>
  )
}

export default Button
