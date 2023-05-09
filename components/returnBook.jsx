import AdvTable from "../misc/table";
import { Link } from "react-router-dom";
import homestrawberry from '../items/strawberry.png'
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { returnBookFields } from "../sub-components/formFields";
import SearchBookInput from "../sub-components/loginSignupInput";
import { useEffect } from "react";
import ReturnInput from "../sub-components/loginSignupInput";

const fields=returnBookFields;
let fieldsState={};
fields.forEach(field => fieldsState[field.id]='');


const  ReturnBook=(Useremail)=>{
    const buttonStyle = { backgroundColor: '#222222', color: '#ffffff', padding: '10px' };
    const buttonHoverStyle = { backgroundColor: '#a78fb7' };

    const [message, setMessage] = useState('');
    
    const navigate=useNavigate();
    const [emailState,setEmailState]=useState(fieldsState);
    const [result, setResult]=useState([]);

    const handleChange=(e)=>{
        setEmailState({...emailState,[e.target.id]:e.target.value});
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(emailState);
    }




    return(
        <div className="flex flex-col  overflow-auto align items-center h-screen w-screen min-w-100wh bg-slate-800">
        <form className="mt-0 space-y-6" onSubmit={handleSubmit}>
        <div className="">
        {
                fields.map(field=>
                        <ReturnInput
                            key={field.id}
                            handleChange={handleChange}
                            value={setEmailState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
          
        </div>

        <button style={{...buttonStyle,':hover':buttonHoverStyle}} className='group relative w-full  text-white  mt-5 focus:outline-none'>Search</button>
     

      </form>

        </div>
    )

};
export default ReturnBook;