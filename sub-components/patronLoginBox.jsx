import { useState } from "react";
import { useNavigate } from 'react-router-dom'

import { patronFields } from "./formFields";
import LoginInput from "./loginSignupInput";
import Swal from 'sweetalert2'

import axios from "axios";




const fields=patronFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');


export default function PatronLogin(){
    
    const [patronloginState,setPatronLoginState]=useState(fieldsState);
    const navigate=useNavigate();
    const [message, setMessage] = useState('');


    const handleChange=(e)=>{
       

        setPatronLoginState({...patronloginState,[e.target.id]:e.target.value})

    }
    const handleSubmit=(e)=>{
        e.preventDefault();
       
        axios.post('http://localhost:80/api/patronLogin', patronloginState).then(response=> {
            console.log(response.data);
            setMessage('welcome.');
            // Valid();
            const Useremail=patronloginState.email;
            console.log(Useremail);
            const UserName=patronloginState.name;
            console.log(UserName);
             navigate(`/patronView?email=${Useremail}&username=${UserName}`);


           

        }).catch(error => {
            if (error.response.status === 401) {
              // handle invalid credentials error
              //  InvalidCredentialsAlert();
              setMessage('You are not a patron.');
            } 
             else  {
              // handle invalid credentials error
              // InvalidCredentialsAlert();
              setMessage('An error occured.');
           


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
                            value={patronloginState[field.id]}

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
        {message && <div>{message}</div>}
    

        <button className='group relative w-full' style={{backgroundColor:'#3c5186', color:'#fff5de'}} >Login As A Patron</button>
      </form>
      </div>
    )
}