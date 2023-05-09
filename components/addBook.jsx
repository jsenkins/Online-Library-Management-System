import Button from "../sub-components/button"
import homestrawberry from '../items/strawberry.png'
import { addBookFields } from "../sub-components/formFields"
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import AddBookInput from "../sub-components/loginSignupInput";
import AdminViewTopBar from "../sub-components/adminViewTopBar";
const fields=addBookFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');


export default function AddBook(){

    const [addBookState,setAddBookState]=useState(fieldsState);
    const navigate=useNavigate();


    const handleChange=(e)=>{
       

        setAddBookState({...addBookState,[e.target.id]:e.target.value})

    }

    const handleSubmit=(e)=>{
       

       
    }
   
    return (
         <div className="  flex flex-col items-center ml-auto justify-center h-screen w-screen  overflow-auto">
                   <AdminViewTopBar/>
                   <h1 style={{fontSize: '2em', fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase'}}>Add a New Book</h1>

                    <form onSubmit={handleSubmit} className="mt-5 space-y-6 ">
        <div className="-space-y-px ">
            {
                fields.map(field=>
                        <AddBookInput
                            key={field.id}
                            handleChange={handleChange}
                            value={addBookState[field.id]}

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

        <button className='group relative w-full' style={{backgroundColor:'#222222', color:'#ffffff'}} >Add Book</button>
      </form>
                   
                   



            
        </div>
    )
}