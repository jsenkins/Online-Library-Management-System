import React, { useState } from 'react'
import Button from './button';
import Logo from '../items/strawberry.png'
import Dots from '../items/strawberry.png'

const AdminViewTopBar = ({name, email}) => {
    
   
  return (
    <div className='shadow-md w-full z-100 fixed top-0 left-0'>
      
      <div className='md:flex items-center justify-between py-4 md:px-10 px-7'style={{background:'#3c5186'}}>
      <div className='font-bold text-2xl cursor-pointer flex items-center  
      text-gray-800'>
        <span className='text-3xl text-white mr-0 pt-2'>
        <ion-icon name="logo-ionic"></ion-icon>
        </span>
        <a href='/adminView'>
        <img src={Logo} height={'60px'} width={'30px'}></img>
        

        </a>
        
        <div className='text-yellow-50  hover:text-indigo-200'> 
        {/* <spline-viewer url="https://prod.spline.design/5NSOuxxC9mvM-uaQ/scene.splinecode" background="rgba(218,81,221,0)"></spline-viewer> */}
          
        

        {name} Your Email Is: {email} 
       
       
        </div> 
        </div> 
        </div> 
     
    </div>
  )
}

export default AdminViewTopBar;