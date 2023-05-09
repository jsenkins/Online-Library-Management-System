
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { paymentFields } from "./formFields";
import { useLocation } from 'react-router-dom';

import PaymentInput from "./loginSignupInput";
const fields=paymentFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');
import Marquee from "react-fast-marquee";

const Payments=()=>{
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const UserEmail = queryParams.get('email');
    const UserName = queryParams.get('username');
    const navigate=useNavigate();
    

    const [paymentState, setPaymentState]=useState(fieldsState);
    const [message, setMessage] = useState('');
    const [historyMessage, setHistoryMessage] = useState('');


    const handleChange=(e)=>{
        setPaymentState({...paymentState,[e.target.id]:e.target.value})
        console.log(paymentState);
        const payingAmount=paymentState.amount;
        console.log(payingAmount);

    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(paymentState);
        setPaymentState({
            amount:''
        });
        const payingAmount=paymentState.amount;

        axios.post('http://localhost:80/api/payments',
        {amount:payingAmount, email:UserEmail}).then(response=>{

      console.log(response.data);
      setMessage('Thank You <3');
    }).catch(error => {
      if (error.response.status === 401) {
        setMessage('Oh No :( Your Payment Could Not Be Registered.');
      } else {
        setMessage('Oh No :( Your Payment Could Not Be Registered. Please Try Again Later!');
      }
    });

    }
    const handleBackToHome=()=>{
        navigate(`/patronView?email=${UserEmail}&username=${UserName}`);
    }


    const [result, setResult]=useState([]);

        
    const handleViewPaymentHistory = async (e) => {
        e.preventDefault(); // prevent the default form submission
        
        const email=UserEmail;
        try {
            const response = await axios.post(
            "http://localhost:80/api/paymenthistory",
            {email:email} 
        );
        if (response && response.status === 200) {
            setResult(response.data);
            console.log(result);
            setHistoryMessage('Here you go <3');
    
        } else {
            console.log("Error: response undefined or status not 200");
        }
    } catch (error) {
        console.error(error);
        if (error.response.status === 401) {
            setMessage(':( ');
        }else{setMessage(':( ');
            console.log(' ');
    
        }
    }

    }
    
    const paymentRows = [];
    for (let i = 0; i < result.length; i++) {
        const pay = result[i];
        paymentRows.push(
            <tr   style={{background:'#222222'}} key={i}>
                <td  className="py-2 px-2"style={{ border: '3px solid #372948',background:'#222222' }} >{pay.payment_id}</td>
                <td className="px-2" style={{ border: '3px solid #372948' }} >{pay.patron_email}</td>
                <td  className="px-2" style={{ border: '3px solid #372948' }} >{pay.payment_amount}</td>
                <td  className="px-2" style={{ border: '3px solid #372948' }} >{pay.payment_date}</td>
                
      
                     
                       


                  </tr>
        );
    }



    return(
        <div className="flex w-screen min-h-screen flex-col  align items-center mr-10 ml-10 overflow-auto"> 
        <Marquee>Your Contributions Ensure Everyone Has Access To This Wonderful, albeit small, Book Selection!....</Marquee>
        <button className=" h-20 mt-20  m-4 text-white font-bold text-2xl rounded-lg"
                  onClick={handleBackToHome} style={{backgroundColor:'#222222', color:'#3c5186'}} >Go Back To Patron Home</button>
            
        
            <Marquee>Payment is being made through the email:{UserEmail}. Please Note That This Only Records Payments. :D .</Marquee>
        
        <div className=" overflow-auto border  bg-slate-500 border-zinc-300">
        
        <p style={{color:'#222222'}} className="mt-5 px-5">Please enter the amount you wish to contribute </p>
        <form onSubmit={handleSubmit} className=" py-5 px-5 ">
        <div className="-space-y-px ">
            {
                fields.map(field=>
                        <PaymentInput
                            key={field.id}
                            handleChange={handleChange}
                            value={paymentState[field.id]}

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
       
            <button className='group relative w-full' style={{backgroundColor:'#222222', color:'#ffffff'}} >Submit Payment</button>
      </form>
      {message && <div className="text-white">{message}</div>}
      </div>   
      {/* border wrap */}

      <button className=" h-20 mt-20  m-4 text-white font-bold text-2xl rounded-lg"
                  onClick={handleViewPaymentHistory} style={{backgroundColor:'#222222', color:'#3c5186'}} >View Payment History</button>
        {historyMessage && <div className="text-white">{historyMessage}</div>}
       
         <table style={{ border: '3px solid #D89CF6' }} className="mb-20">
            <thead style={{ border: '3px solid #C6B4CE', background:'#222222' }}>
                <tr >
                    <th   style={{ border: '3px solid #2A2F4F' }}>ID</th>
                    <th style={{ border: '3px solid #2A2F4F' }}>Patron Email</th>
                    <th className="px-2" style={{ border: '3px solid #2A2F4F' }}>Amount</th>
                    <th className="px-2" style={{ border: '3px solid #2A2F4F' }}>Date Paid</th>
                   




                </tr>
            </thead>
            <tbody>
                {paymentRows}
            </tbody>
        </table>
     </div>
    )

    
}
export default Payments;