import { useState } from 'react'
import PageAnimation from "../misc/PageAnimation"
import Marquee from "react-fast-marquee";
import { useNavigate } from 'react-router-dom'

import { useLocation } from 'react-router-dom';


import BottomFooter from '../sub-components/footer'
import DiscussionBoard_recent from '../sub-components/discussionBoard'
import {Link} from 'react-router-dom';
import TopBar2 from '../sub-components/topbar'
// import Registration from './components/userRegistration'
export default function Home(){
    const buttonStyle = { backgroundColor: '#222222', color: '#ffffff', padding: '10px' };

  const buttonHoverStyle = { backgroundColor: '#a78fb7' };
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const UserEmail = queryParams.get('email');
  const UserName = queryParams.get('username');
    const navigate=useNavigate();
    function handleDisplayAllClick(){
        navigate(`/displayAllToUser?email=${UserEmail}&username=${UserName}`)
        
    }
    function handleViewIssuedClick(){
        navigate(`/displayAllToUser?email=${UserEmail}&username=${UserName}`)
        
    }
    return (
        
        // <PageAnimation>
            <div className="w-screen font-mono h-screen overflow-auto ">
                <button className=" h-20 mt-40  m-4 text-white font-bold text-2xl rounded-lg"
                  onClick={handleDisplayAllClick} style={{backgroundColor:'#222222', color:'#3c5186'}} >View All Books</button>
                <button className=" h-20 mt-20  m-4 text-white font-bold text-2xl rounded-lg"
                  onClick={handleViewIssuedClick} style={{backgroundColor:'#222222', color:'#3c5186'}} >View Issued </button>

                <DiscussionBoard_recent  username={UserName} useremail={UserEmail} className=" bring z-50" bookName={"Northanger Abbey"} authorName={"Jane Austen"} textWritten={"A twist."}/>
                {/* <Link to="/CFWYLF" style={{...buttonStyle,':hover':buttonHoverStyle}}className=" flex flex-col mt-10 justify-end absolute bottom-0 text-center px-5 py-5 text-2xl  w-auto rounded-lg shadow-2xlfont-mono hover:bg-indigo-400 text-indigo-950"><b>Can't Find What You're Looking For?</b></Link>  */}
            
                <p>Your email: {UserEmail}</p>
                <p>Your name: {UserName}</p>

            
                {/* <Registration/> */}
                    
               
                <BottomFooter />
                <TopBar2 username={UserName} useremail={UserEmail} className="z-100"/>
                   
            </div>
        // {/* </PageAnimation> */}
            

    )
}

