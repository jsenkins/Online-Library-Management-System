import AdvTable from "../misc/table";
import { Link } from "react-router-dom";
import homestrawberry from '../items/strawberry.png'
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { searchBookFields } from "../sub-components/formFields";
import SearchBookInput from "../sub-components/loginSignupInput";
import { useEffect } from "react";
// import AdvSearchTable from "../sub-components/advSearchTable";
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import TopBar2 from "../sub-components/topbar";


const fields=searchBookFields;
let fieldsState={};
fields.forEach(field => fieldsState[field.id]='');




export default function AdvSearch(){
    const buttonStyle = { backgroundColor: '#222222', color: '#ffffff', padding: '10px' };
    const buttonHoverStyle = { backgroundColor: '#a78fb7' };


    const [message, setMessage] = useState('');


    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const useremail = queryParams.get('UserEmail');
    const username = queryParams.get('UserName');
    
    const navigate=useNavigate();
    const [searchBookState,setSearchBookState]=useState(fieldsState);
    const [result, setResult]=useState([]);

    const handleChange=(e)=>{
      setSearchBookState({...searchBookState,[e.target.id]:e.target.value});
    }


  //   useEffect(() => {
  //     getResult();
      
  // }, []);
  
    
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent the default form submission
  
    try {
      const response = await axios.post(
        "http://localhost:80/api/searchbook",
        searchBookState 
      );
      if (response && response.status === 200) {
        setResult(response.data);
        console.log(result);
        setSearchBookState({
          book_name:'',
          author_name:'',
          genre_name:''

        })

        setMessage('Here you go or you can Try');

      } else {
        console.log("Error: response undefined or status not 200");
      }
    } catch (error) {
      console.error(error);
      if (error.response.status === 401) {
        // handle invalid credentials error
        
        setMessage('Oh No :( We dont have that book currently, Try ');
        setSearchBookState({
          book_name:'',
          author_name:'',
          genre_name:''

        })
        console.log(' ');
       
        // navigate('/');


      }else{setMessage('Oh No :( We dont have that book currently, Try ');
      setSearchBookState({
        book_name:'',
        author_name:'',
        genre_name:''

      })
      console.log(' ');

      }
    }
  };
  const [userEmail, setUserEmail] = useState('');

  const [IssuanceMessage, setIssuanceMessage] = useState('');
    
    
  const handleIssuance=async (isbn)=>{
    console.log(isbn);
    console.log(useremail);
   
      const email = useremail ;

   try {
      const response = await axios.post(
        "http://localhost:80/api/issuebook",
        { isbn: isbn, email: email }
      );
      if (response && response.status === 200) {
        setIssuanceMessage('thank you<3 the book has been issued to you');

      } else {
        console.log("Error: response undefined or status not 200");
      }
    } catch (error) {
      console.error(error);
      if (error.response.status === 401) {
        // handle invalid credentials error
        
        // setMessage('ueueue');
       
        // navigate('/');


      }
    }
    

    

  }
  

  const bookRows = [];
    for (let i = 0; i < result.length; i++) {
        const book = result[i];
        bookRows.push(
            <tr   style={{background:'#222222'}} key={i}>
                <td  className="py-2 px-2"style={{ border: '3px solid #372948',background:'#222222' }} >{book.isbn}</td>
                {/* <td className="px-2" style={{ border: '3px solid #C6B4CE' }} >{book.author_id}</td> */}
                <td className="px-2" style={{ border: '3px solid #372948' }} >{book.book_name}</td>
                {/* <td  className="px-2" style={{ border: '3px solid #C6B4CE' }} >{book.primary_genre_id}</td> */}
                <td  className="px-2" style={{ border: '3px solid #372948' }} >{book.category}</td>
                <td  className="px-2" style={{ border: '3px solid #372948' }} >{book.author_name}</td>
                <td  className="px-2" style={{ border: '3px solid #372948' }} >{book.genre_name}</td>
                <td  className="px-2" style={{ border: '3px solid #372948' }} >
                
      
                     
                       <button  className='bg-indigo-50 text-black' onClick={() => handleIssuance(book.isbn)}>Issue </button>
                   
                    
                </td>


                  </tr>
        );
    }







  return(
    <div className="flex flex-col  overflow-auto align items-center h-screen w-screen min-w-100wh bg-slate-800">
     
      <div className="py-5 mt-20" > <h1 style={{color:'#ffffff', fontFamily:'fantasy'}}>Search For A Book</h1>
      {/* <img src={homestrawberry} className="w-10  bg-transparent " ></img>
       */}
              
      </div>
      <form className="mt-0 space-y-6" onSubmit={handleSubmit}>
        <div className="">
        {
                fields.map(field=>
                        <SearchBookInput
                            key={field.id}
                            handleChange={handleChange}
                            value={searchBookState[field.id]}
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
    {message && <div>{message}        <a href='https://books.google.com/'>Google</a></div>}

    <div className="mt-10  ">
        <table style={{ border: '3px solid #D89CF6' }}>
            <thead style={{ border: '3px solid #C6B4CE', background:'#222222' }}>
                <tr >
                    <th   style={{ border: '3px solid #2A2F4F' }}>ISBN</th>
                    {/* <th style={{ border: '3px solid #C6B4CE' }}>Author ID</th> */}
                    <th style={{ border: '3px solid #2A2F4F' }}>Name</th>
                    {/* <th style={{ border: '3px solid #C6B4CE' }}>Primary Genre ID</th> */}
                    <th className="px-2" style={{ border: '3px solid #2A2F4F' }}>Category</th>
                    <th className="px-2" style={{ border: '3px solid #2A2F4F' }}>Author Name</th>
                    <th className="px-2" style={{ border: '3px solid #2A2F4F' }}>Genre </th>
                    <th className="px-2" style={{ border: '3px solid #2A2F4F' }}> 
                    {/* <input className="px-2 bg-transparent text-white" type="email"id="email" name="email" 
                        value={userEmail}
                        required={true}
                        placeholder="Enter Your Email"
                        onChange={(event) => setUserEmail(event.target.value)}
                      /> */}
                      </th>




                </tr>
            </thead>
            <tbody>
                {bookRows}
            </tbody>
        </table>
        {IssuanceMessage && <div className="w-screen text-xl text-center">{IssuanceMessage}
         </div>}


        </div>
      
   
      
      {/* <AdvTable /> */}
      <Link to={`/CFWYLF?UserEmail=${useremail}&UserName=${username}`} style={{...buttonStyle,':hover':buttonHoverStyle}} className=" flex flex-col mt-10 justify-end  bottom-0 text-center px-5 py-5 text-lg w-auto rounded-lg shadow-2xlfont-mono hover:bg-indigo-400 text-indigo-950"><b>Can't Find What You're Looking For?</b></Link> 
            <TopBar2 useremail={useremail} username={username} />
    </div>
  )
}