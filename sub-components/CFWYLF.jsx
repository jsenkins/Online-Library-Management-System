import Button from './button'
import homestrawberry from '../items/strawberry.png'
import { useState } from "react";
import { bookRequestFields } from './formFields'
import LoginSignupInput from './loginSignupInput';
import axios from "axios";
import FormAction from './formAction';
import {  useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const fields=bookRequestFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');



export default function CFWYLF(){
    const navigate=useNavigate();
    const [message, setMessage] = useState('');
    const [bookRequestState,setRequestState]=useState(fieldsState);

    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const useremail = queryParams.get('UserEmail');
    const username = queryParams.get('UserName');
    

    const handleChange=(e)=>{
        setRequestState({...bookRequestState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:80/api/requestabook',bookRequestState).then(response=>{

        console.log(response.data);
        setMessage('Request Submitted!.');
  
        navigate('/home');
  
      }).catch(error => {
        if (error.response.status === 401) {
          // handle invalid credentials error
          setMessage('Please try again later.');
        } else {
          // handle other errors
          setMessage('EXCEPTION THROWN.');
        }
      });
        





    }

       //Handle Login API Integration here

       
    return (
         <div className="flex flex-col min-h-screen h-full align items-center ml-auto justify-center  w-screen ">
                <a href="/home" className="w-auto py-5 align items-center" ><img src={homestrawberry} className="w-10 mt-10" ></img></a>

                <div style={{ color:'#ffffff'}}  className="large-text justify-center px-5 py-5  text-2xl rounded-full  font-mono "><b>Can't Find What You're Looking For?</b></div> 
                <div style={{ color:'#ffffff'}} className=" px-5 py-5 text-lg font-mono"><b>Request A Book</b></div> 

               
                   
                {message && <div>{message}</div>}
      


        <form className="mt-5  space-y-10 ">
        <div className="-space-y-px ">
            {
                fields.map(field=>
                        <LoginSignupInput
                            key={field.id}
                            handleChange={handleChange}
                            value={bookRequestState[field.id]}
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

       
        <button onClick={handleSubmit}  className='group relative w-full' style={{backgroundColor:'#3c5186', color:'#fff5de'}} >Submit Request</button>
     
      </form>
      
            
        </div>
    )
}