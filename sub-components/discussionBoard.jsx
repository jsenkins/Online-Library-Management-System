
import hmt from '../items/hmt.jpg'
import mtmphs from '../items/mtmphs.jpg'
import nta from '../items/nta.jpg'
import { useState } from 'react'
import { replyField } from './formFields'
import ReplyInput from './loginSignupInput'
import { useNavigate } from 'react-router-dom'

const fields=replyField;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');



export default function DiscussionBoard_recent({username, useremail,bookName, authorName, textWritten}){
    const [replyState, setReplyState]=useState(fieldsState);
    const [message, setMessage] = useState('');

    const navigate=useNavigate();

    const handleChange=(e)=>{
        setReplyState({...replyState,[e.target.id]:e.target.value});
        // console.log(replyState);
    }

    const handleSubmitReply=(e)=>{
        e.preventDefault();
        // setMessage('An error occurred. Please try again later.');
        const UserEmail=useremail; 
        setReplyState({reply:''});
         
        setMessage("Your Reply Has Been Posted!")
    }






    const handleSubmitReturn=(e)=>{
        e.preventDefault();
        navigate('/home');
    }
    

    return(
        <div >
            
        <div className='flex flex-col '>
         <div  style={{ color:'#3c5186'}} className=' bg-slate-950 p-20  shadow-2xl flex flex-col'>
          <div className=' font-bold text-3xl  justify-start py-3'>{bookName}</div> 
          <div className="light-text text-white"><i>{authorName}</i></div>
          
           <div style={{ color:'#3c5186'}} className="text-box bg-inherit justify-center md:col-span-5 lg:col-span-8">
            
           {textWritten}
            
          </div>
          <form onSubmit={handleSubmitReply} className="mt-5 space-y-6 ">
                <div className="-space-y-px ">
                    {
                        fields.map(field=>
                                <ReplyInput
                                    key={field.id}
                                    handleChange={handleChange}
                                    value={replyState[field.id]}

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
            
                    <button className='group relative' style={{backgroundColor:'#3c5186', color:'#fff5de'}} >Reply</button>
      </form>
                      {message && <div>{message}</div>}

                
  
        {/* </div>
        now make a recent view block
        < div  style={{background:'#222222', color:'#ffffff'}}  className='flex flex-row z-0 align h-min items-start mt-20 mb-10  ml-4 mr-4  drop-shadow-xl ' >
            <div style={{backgroundColor:'#3c5186', color:'#fff5de'}}  className='flex flex-col w-full  align items-center rounded-md py-1 px-1 font-mono text-lg absolute top-0'>
                Issued 
            </div>
          <div className='flex flex-row overflow-hidden mr-5 ml-5 py-5 justify-center align items-center'>

        
               
                




                <a href='/home'>
                    <div className=' text-xs px-5    text-white hover:outline-dotted hover:outline-indigo-800'>

                    <img src={nta} width={'70px'} 
                        className='  px-1 mt-10 '/>
                        <b>Northanger Abbey </b>
                    </div>
                    <a href='/home'><button className='bg-blue-900 text-white'>Return</button></a>
               </a>



               <a href='/home'>
                    <div className='text-xs px-5   text-white hover:outline-dotted hover:outline-indigo-800'>

                        <img src={mtmphs} width={'70px'} 
                            className='mt-10  px-1'/>
                           <b>The Metamorphosis </b>
                    </div>
                    <a href='/home'><button className='bg-blue-900 text-white'>Return</button></a>
                </a>



                <a href='/home'>
                    <div className=' text-xs px-5  text-white hover:outline-dotted hover:outline-indigo-800'>

                        <img src={hmt} width={'70px'}className=' mt-10  px-1' />
                           <b >Handmaid's Tale </b>
                    </div>
                    <a href='/home'><button className='bg-blue-900 text-white'>Return</button></a>
                </a>
                </div>

             
                */} 
                
        </div> 
           

            

        
       
       
       </div>
       
    </div>
    
    )
}