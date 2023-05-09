import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AdminViewTopBar from '../sub-components/adminViewTopBar';

function ListPatrons() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:80/api/getpatrons')
        .then(response => {
            setUsers(response.data);
            console.log(users);
        })
        .catch(error => console.error(error));
    }, []);

    const userRows = [];
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        userRows.push(
            <tr   style={{background:'#3C5186'}} key={i}>
                <td  className="py-2 px-2"style={{ border: '3px solid #C6B4CE',background:'#354259' }} >{user.patron_id}</td>
                <td className="px-2" style={{ border: '3px solid #C6B4CE' }} >{user.name}</td>
                <td className="px-2" style={{ border: '3px solid #C6B4CE' }} >{user.email}</td>

                <td className="px-2" style={{ border: '3px solid #C6B4CE' }} >{user.phone}</td>
                <td  className="px-2" style={{ border: '3px solid #C6B4CE' }} >{user.address}</td>
                  </tr>
        );
    }

    return (
        
        <div className='w-screen min-h-screen h-full overflow-auto justify-center align items-center'>
            ;
        <div className="flex flex-col mt-20">
        <table className="ml-10   mr-10" style={{ border: '3px solid #C6B4CE' }}>
            <thead style={{ border: '3px solid #C6B4CE', background:'#354259' }}>
                <tr >
                    <th   style={{ border: '3px solid #C6B4CE' }}>ID</th>
                    <th style={{ border: '3px solid #C6B4CE' }}>Name</th>
                    <th style={{ border: '3px solid #C6B4CE' }}>Email</th>

                    <th style={{ border: '3px solid #C6B4CE' }}>Phone</th>
                    <th style={{ border: '3px solid #C6B4CE' }}>Address</th>
                </tr>
            </thead>
            <tbody>
                {userRows}
            </tbody>
        </table>

        </div>
       
        <AdminViewTopBar  className="z-100"/>
    </div>
    ); 
}

export default ListPatrons;
