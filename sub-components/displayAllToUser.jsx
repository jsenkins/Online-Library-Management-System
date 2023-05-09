import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopBar2 from './topbar';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Marquee from 'react-fast-marquee';

export default function IssuedBox({username, useremail}){
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);

    const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const UserEmail = queryParams.get('email');
  const UserName = queryParams.get('username');

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
            <tr   style={{background:'#222222'}} key={i}>
                <td  className="py-2 px-2"style={{ border: '3px solid #372948' }} >{book.isbn}</td>
                <td className="px-2" style={{ border: '3px solid #372948' }} >{book.book_name}</td>
                <td className="px-2" style={{ border: '3px solid #372948' }} >{book.author_name}</td>
                <td  className="px-2" style={{ border: '3px solid #372948' }} >{book.genre_name}</td>
                <td className="px-2" style={{ border: '3px solid #372948' }} >{book.category}</td>
            </tr>
        );
    }

    return (
        <div className='min-h-screen  justify-center '>
            ;
            
        <div className='w-screen mt-20 flex flex-col overflow-auto  h-full justify-center align items-center'>
            
        <table className="ml-10 mr-10" style={{ border: '3px solid #2A2F4F' }}>
            <thead style={{ border: '3px solid #2A2F4F', background:'#222222' }}>
                <tr >
                    <th   style={{ border: '3px solid #2A2F4F' }}>ISBN</th>
                    <th style={{ border: '3px solid #2A2F4F' }}>Title</th>
                    <th style={{ border: '3px solid #2A2F4F' }}>Author</th>
                    <th style={{ border: '3px solid #2A2F4F' }}>Genre</th>
                    <th style={{ border: '3px solid #2A2F4F' }}> Category</th>
                </tr>
            </thead>
            <tbody>
                {bookRows}
            </tbody>
        </table>
        <Marquee>You Cannot Issue a Book From here. Please visit Search Books Page </Marquee>

        <TopBar2 username={UserName} useremail={UserEmail} className="z-100"/>
        
    </div>
    
    </div>
    );
}