import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminViewTopBar from './adminViewTopBar';
function PhysicalInventory() {
    const [physicalbooks, setPhysicalBooks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:80/api/getphysicalbooks')
        .then(response => {
            setPhysicalBooks(response.data);
            console.log(physicalbooks);
        })
        .catch(error => console.error(error));
    }, []);

    const bookRows = [];
    for (let i = 0; i < physicalbooks.length; i++) {
        const book = physicalbooks[i];
        bookRows.push(
            <tr   style={{background:'#3C5186'}} key={i}>
                <td  className="py-2 px-2"style={{ border: '3px solid #C6B4CE' }} >{book.ISBN}</td>
                <td className="px-2" style={{ border: '3px solid #C6B4CE' }} >{book.noOfCopies}</td>
                <td className="px-2" style={{ border: '3px solid #C6B4CE' }} >{book.book_name}</td>
                <td  className="px-2" style={{ border: '3px solid #C6B4CE' }} >{book.category}</td>
                <td className="px-2" style={{ border: '3px solid #C6B4CE' }} >{book.author_name}</td>
            </tr>
        );
    }

    return (
        
        <div className='w-screen flex flex-col overflow-auto  h-screen justify-center align items-center'>
            
        <table className="ml-10 mr-10" style={{ border: '3px solid #C6B4CE' }}>
            <thead style={{ border: '3px solid #C6B4CE', background:'#3C5186' }}>
                <tr >
                    <th   style={{ border: '3px solid #C6B4CE' }}>ISBN</th>
                    <th style={{ border: '3px solid #C6B4CE' }}>No. Of Copies</th>
                    <th style={{ border: '3px solid #C6B4CE' }}>Name</th>
                    <th style={{ border: '3px solid #C6B4CE' }}>Category</th>
                    <th style={{ border: '3px solid #C6B4CE' }}> Author</th>
                </tr>
            </thead>
            <tbody>
                {bookRows}
            </tbody>
        </table>
        <AdminViewTopBar/>
    </div>
    );
}

export default PhysicalInventory;
