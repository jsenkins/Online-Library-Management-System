import React, { useState } from 'react'
import Button from './button';
import Logo from '../items/strawberry.png'
import Dots from '../items/strawberry.png'

import SearchIcon from '../items/search-icon.png'
const TopBar2 = ({username, useremail}) => {
    
    let Links =[
      
        {name: 'home',link:`/home?email=${useremail}&username=${username}` }, // add link to search/advanced search page here
        {name: 'Search books', link:`/AdvSearch?UserEmail=${useremail}&UserName=${username}`}, // add link to search/advanced search page here
        {name: 'Login As A Patron', link:'/patronLogin'},
        {name: 'Logout', link:'/'},

     
    ];
    let [open,setOpen]=useState(false);
  return (
    <div className='shadow-md w-full z-100 fixed top-0 left-0'>
      
      <div className='md:flex items-center justify-between py-4 md:px-10 px-7'style={{background:'#3c5186'}}>
      <div className='font-bold text-2xl cursor-pointer flex items-center  
      text-gray-800'>
        <span className='text-3xl text-white mr-0 pt-2'>
        <ion-icon name="logo-ionic"></ion-icon>
        </span>
        
        <img src={Logo} height={'60px'} width={'30px'}></img>
        
        <div className='text-white hover:text-indigo-200'> 
        

        Welcome {username} :D
       
        </div>
      </div>
      
      <div onClick={()=>setOpen(!open)} className='text-3xl absolute right-8 top-4 cursor-pointer md:hidden '>
      <img src={Dots} height={'50px'} width={'50px'} className='hover:shadow-md focus:outline-double outline-indigo-200 py-1 px-2'></img>
      <ion-icon name={open ? 'close':'menu'}></ion-icon>
      </div>

      <ul className={`md:flex md:items-center md:pb-0 pb-2 absolute bg-inherit md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-10 ':'top-[-490px]'}`}>
        {
          
          Links.map((link)=>(
            
            <li key={link.name} className='md:ml-8 text-xl text-indigo-500 md:my-0 my-7'>
              <a href={link.link} className='text-white hover:text-gray-400 duration-500'>{link.name}</a>
              
            </li>
          ))
        }
        
      </ul>
      </div>
    </div>
  )
}

export default TopBar2