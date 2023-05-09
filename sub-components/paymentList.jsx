import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminViewTopBar from './adminViewTopBar';
import { paymentFields } from './formFields';

function PaymentList() {
    const [paymentList, setPaymentList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:80/api/getallpayments')
        .then(response => {
            setPaymentList(response.data);
            console.log(paymentList);
        })
        .catch(error => console.error(error));
    }, []);

    const paymentRows = [];
    for (let i = 0; i < paymentList.length; i++) {
        const pay = paymentList[i];
        paymentRows.push(
            <tr   style={{background:'#222222'}} key={i}>
                <td  className="py-2 px-2"style={{ border: '3px solid #372948',background:'#222222' }} >{pay.payment_id}</td>
                <td className="px-2" style={{ border: '3px solid #372948' }} >{pay.patron_email}</td>
                <td  className="px-2" style={{ border: '3px solid #372948' }} >{pay.payment_amount}</td>
                <td  className="px-2" style={{ border: '3px solid #372948' }} >{pay.payment_date}</td>
                
      
                     
                       


                  </tr>
        );
    }

    return (
        
        <div className='w-screen flex flex-col overflow-auto  h-screen justify-center align items-center'>
            
        <table className="ml-10 mr-10" style={{ border: '3px solid #C6B4CE' }}>
            <thead style={{ border: '3px solid #C6B4CE', background:'#3C5186' }}>
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
        <AdminViewTopBar/>
    </div>
    );
}

export default PaymentList;
