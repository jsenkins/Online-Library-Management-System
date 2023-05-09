import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AdminViewTopBar from '../sub-components/adminViewTopBar';

function ListBookRequest() {
    const [requests, setRequests] = useState([]);
    const [id, setId] = useState('');


    useEffect(() => {
        getRequests();
        
    }, []);
    function getRequests(){
        axios.get('http://localhost:80/api/getBookRequest')
        .then(response => {
            setRequests(response.data);
            console.log(requests);
        })
        .catch(error => console.error(error));

    }



    function handleDelete() {
        navigate('/listBookRequest');
      };
      const deleteRequest = (id) => {
        axios.delete(`http://localhost:80/api/bookrequests/${id}/delete`).then(function(response){
            console.log(response.data);
            getRequests();
        });
    }
      

    const requestRows = [];
    for (let i = 0; i < requests.length; i++) {
        const request = requests[i];
        requestRows.push(
            <tr   style={{background:'#3C5186'}} key={i}>
                <td  className="py-2 px-2"style={{ border: '3px solid #C6B4CE',background:'#354259' }} >{request.request_id}</td>
                <td className="px-2" style={{ border: '3px solid #C6B4CE' }} >{request.user_email}</td>
                <td className="px-2" style={{ border: '3px solid #C6B4CE' }} >{request.bookRequested}</td>
                <td  className="px-2" style={{ border: '3px solid #C6B4CE' }} >{request.author}</td>
                <td  className="px-2" style={{ border: '3px solid #C6B4CE' }} >{request.request_date}</td>

                <td  className="px-2" style={{ border: '3px solid #C6B4CE' }} >
                    <button  className='bg-red-950' onClick={() => deleteRequest(request.request_id)}>Delete Request</button>
                    
                </td>
                
                  </tr>
        );
    }

    return (
        
        <div className='w-screen min-h-screen h-full overflow-auto  justify-center align items-center'>
            
        <div className="flex flex-col mt-20">
        <table className="ml-10   mr-10" style={{ border: '3px solid #C6B4CE' }}>
            <thead style={{ border: '3px solid #C6B4CE', background:'#354259' }}>
                <tr >
                    <th   style={{ border: '3px solid #C6B4CE' }}>ID</th>
                    <th style={{ border: '3px solid #C6B4CE' }}>User Email</th>
                    <th style={{ border: '3px solid #C6B4CE' }}>Name</th>
                    <th style={{ border: '3px solid #C6B4CE' }}>Author</th>

                    <th style={{ border: '3px solid #C6B4CE' }}>Date</th>
                    <th style={{ border: '3px solid #C6B4CE' }}></th>
                </tr>
            </thead>
            <tbody>
                {requestRows}
            </tbody>
        </table>

        </div>
       
        <AdminViewTopBar  className="z-100"/>
    </div>
    ); 
}

export default ListBookRequest;
