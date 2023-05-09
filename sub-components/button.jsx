import React from 'react'

const Button = (props) => {
  return (
    <button className='bg-indigo-600  text-center w-1/2 text-white text-xs py-2 px-2 rounded md:ml-8 hover:bg-indigo-400  duration-500'>
      {props.children}
    </button>
  )
}

export default Button