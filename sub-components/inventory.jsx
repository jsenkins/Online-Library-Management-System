import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminViewTopBar from './adminViewTopBar';
import { useNavigate } from 'react-router-dom';
function Inventory() {



    function handlePhysicalInventoryClick() {
        navigate('/listPhysicalInventory');
      };
      function handleDigitalInventoryClick() {
        navigate('/listDigitalInventory');
      };

      const navigate = useNavigate();
      const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:80/api/getallbooks')
        .then(response => {
            setBooks(response.data);
            console.log(books);
        })
        .catch(error => console.error(error));
    }, []);

    const bookRows = [];
    for (let i = 0; i < books.length; i++) {
        const book = books[i];
        bookRows.push(
            <tr   style={{background:'#3C5186'}} key={i}>
                <td  className="py-2 px-2"style={{ border: '3px solid #C6B4CE' }} >{book.isbn}</td>
                <td className="px-2" style={{ border: '3px solid #C6B4CE' }} >{book.book_name}</td>
                <td className="px-2" style={{ border: '3px solid #C6B4CE' }} >{book.author_name}</td>
                <td  className="px-2" style={{ border: '3px solid #C6B4CE' }} >{book.genre_name}</td>
                <td className="px-2" style={{ border: '3px solid #C6B4CE' }} >{book.category}</td>
            </tr>
        );
    }

    return (
        <div className='min-h-screen justify-center '>
            <button className=" mt-20 m-4 text-white font-bold text-2xl rounded-lg"
                     onClick={handlePhysicalInventoryClick} style={{backgroundColor:'#8294C4', color:'#fff5de'}} >Physical Inventory</button>
                <button className="m-4 text-white font-bold text-2xl rounded-lg"
                  onClick={handleDigitalInventoryClick} style={{backgroundColor:'#DBDFEA', color:'#3c5186'}} >Digital Inventory</button>
                

        
        <div className='w-screen flex flex-col overflow-auto  h-full justify-center align items-center'>
            
        <table className="ml-10 mr-10" style={{ border: '3px solid #C6B4CE' }}>
            <thead style={{ border: '3px solid #C6B4CE', background:'#3C5186' }}>
                <tr >
                    <th   style={{ border: '3px solid #C6B4CE' }}>ISBN</th>
                    <th style={{ border: '3px solid #C6B4CE' }}>Title</th>
                    <th style={{ border: '3px solid #C6B4CE' }}>Author</th>
                    <th style={{ border: '3px solid #C6B4CE' }}>Genre</th>
                    <th style={{ border: '3px solid #C6B4CE' }}> Category</th>
                </tr>
            </thead>
            <tbody>
                {bookRows}
            </tbody>
        </table>
        <AdminViewTopBar/>
        
    </div>
    
    </div>
    );
}

export default Inventory;
