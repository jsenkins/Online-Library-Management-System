import { useState } from 'react';
import icon from '../items/strawberry.png';
function NavBar(){
    const [open, setOpen] = useState(false)
    return (
        <div style={{background:'#3c5186'}} className={` ${open? "w-72" : "w-20"} z-100 duration-300 h-screen shadow-2xl relative z-1`}>
            <img 
                src={icon}
                className= {` absolute z-100 cursor-pointer duration-500 rounded-full ${open? "rotate-180": "rotate-0"}
                -right-3 top-14 border-4 border-white`}
                onClick={()=> setOpen(!open)}
            />
        </div>
    )
}

export default NavBar;