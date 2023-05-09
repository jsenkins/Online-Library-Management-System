import { useState } from 'react';
import { signupFields } from "./formFields";
import FormAction from "./formAction";
import SignupInput from "./loginSignupInput";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const fields=signupFields;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');


export default function Signupbox(){
  const [message, setMessage] = useState('');

  const navigate=useNavigate();
  const [signupState,setSignupState]=useState(fieldsState);

  const handleChange=(e)=>{
    setSignupState({...signupState,[e.target.id]:e.target.value});
}
  const handleSubmit=(e)=>{
    e.preventDefault();
    axios.post('http://localhost:80/api/users/save',signupState).then(response=>{

      console.log(response.data);
      setMessage('You have been registered as a user!');

    }).catch(error => {
      if (error.response.status === 401) {
        InvalidCredentialsAlert();
        // handle invalid credentials error
        // setMessage('Invalid Details. Please try again.');
      } else {
        // handle other errors
        setMessage('An error occurred. Please try again later.');
      }
    });
    // createAccount()
  }

  //handle Signup API Integration here
  // const createAccount=()=>{

  // }

    return(
        <div className="flex flex-col justify-center align items-center mr-10 ml-10 overflow-auto"> 

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
        {
                fields.map(field=>
                        <SignupInput
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
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

        <button className='group relative w-full bg-slate-500 text-white hover:bg-green-200 hover:text-black mt-5 focus:outline-none'>Signup</button>
     

      </form>
      {message && <div>{message}</div>}

      </div>
    )
}