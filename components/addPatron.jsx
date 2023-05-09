import { patronSignupFields } from "../sub-components/formFields";
import { useState, useEffect } from 'react';
import axios from "axios";
import AdminViewTopBar from "../sub-components/adminViewTopBar";
import PatronSignupInput from "../sub-components/loginSignupInput";
import { useNavigate } from 'react-router-dom';
import PatronSignupHeader from "../sub-components/loginSignupHeader";
const fields=patronSignupFields;
let fieldsState={};
fields.forEach(field => fieldsState[field.id]='');


export default function PatronSignup(){
     
    //validate input as an existing user. 
    //add as a patron only if the user is already registered.

    const [message, setMessage] = useState('');
    
    const navigate=useNavigate();
    const [patronSignupState,setPatronSignupState]=useState(fieldsState);
    const handleChange=(e)=>{
        setPatronSignupState({...patronSignupState,[e.target.id]:e.target.value});
    }
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        
        axios.post('http://localhost:80/api/patronsignup',patronSignupState).then(response=>{
            console.log(response.data);
            setMessage('New patron added!');
            navigate('/adminView');
            

        }).catch(error => {
                if (error.response.status === 402) {

                    // handle invalid credentials error
                    setMessage('Oh no! The email is already registered for a patron :( ');

                } else if (ErrorEvent.code.status==401) {
                    // handle other errors
                    setMessage('You can only add registered users as patrons!');
                }
        });
        

    
    }

    return(<div className=" flex flex-col overflow-auto w-screen h-screen justify-center text-indigo-800 ">

        <div className="flex flex-col justify-center align items-center mr-10 ml-10 overflow-auto"> 
        <PatronSignupHeader
              heading="Add a New patron"
              paragraph=" "
              linkName="Home"
              linkUrl="/adminView"
            />
                  {message && <div className="   text-red-300 text-lg px-10 py-2 rounded-xl font-bold ">{message}</div>}

        <form className="mt-0 space-y-6" onSubmit={handleSubmit}>
        <div className="">
        {
                fields.map(field=>
                        <PatronSignupInput
                            key={field.id}
                            handleChange={handleChange}
                            value={patronSignupState[field.id]}
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

        <button className='group relative w-full bg-green-600 text-white hover:bg-green-200 hover:text-black mt-5 focus:outline-none'>Add A New Patron</button>
     

      </form>

      </div>
      <AdminViewTopBar/>
     
</div>)


            
}