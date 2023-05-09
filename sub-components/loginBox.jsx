import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { ReactDOM } from "react-dom";
import { loginFields } from "./formFields";
import LoginInput from "./loginSignupInput";
import { useLocation } from 'react-router-dom';

import axios from "axios";



const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');


export default function LoginForm(){
  
    const [message, setMessage] = useState('');

    const [loginState,setLoginState]=useState(fieldsState);
    const navigate=useNavigate();
    
   

    const handleChange=(e)=>{
       

        setLoginState({...loginState,[e.target.id]:e.target.value})
        // console.log(loginState);

    }
    const handleSubmit=(e)=>{
        e.preventDefault();
       
        axios.post('http://localhost:80/api/users/login', loginState).then(response=> {
            console.log(response.data);
            const Useremail=loginState.email;
            console.log(Useremail);
            const UserName=loginState.username;
            console.log(UserName);

          
            navigate(`/home?email=${Useremail}&username=${UserName}`);


           

        }).catch(error => {


            if (error.response.status === 401) {
              // handle invalid credentials error
              
              setMessage('You are valid but your credentials are not!');
              // navigate('/');


            } else if (error.response.status === 402) {
                const Useremail=loginState.email;
                const UserName=loginState.username;
                console.log(UserName);


                navigate(`/adminView?email=${Useremail}&username=${UserName}`);



              }else  if (error.response.status === 403) {
                const Useremail=loginState.email;
                const UserName=loginState.username;


                navigate(`/patronView?email=${Useremail}&username=${UserName}`);



              } else {
              // handle other errors
              setMessage('An error occurred. Please try again later.');
            }
          });
    }

      



    return(
        <div className="flex flex-col justify-center align items-center mr-10 ml-10 overflow-auto"> 
      
        <form onSubmit={handleSubmit} className="mt-5 space-y-6 ">
        <div className="-space-y-px ">
            {
                fields.map(field=>
                        <LoginInput
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}

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
       
            <button className='group relative w-full' style={{backgroundColor:'#3c5186', color:'#fff5de'}} >Login</button>
      </form>
      {message && <div className="text-white">{message}</div>}
      
     </div>
    )
}