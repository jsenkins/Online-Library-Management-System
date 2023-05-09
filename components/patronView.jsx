import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

export default function PatronView(){
    const navigate=useNavigate();
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const UserEmail = queryParams.get('email');
    const UserName = queryParams.get('username');
     

    const handleMembership=(e)=>{
        e.preventDefault();
        navigate(`/payments?email=${UserEmail}&username=${UserName}`);


        
    }
    const handleLogout=(e)=>{
        e.preventDefault();
        navigate('/patronLogin');


        
    }
    
    
 
    return(
        <div>
            <div className=" w-screen min-h-screen h-full">
            <div className="h-1/2">
            <button onClick={handleLogout}  style={{backgroundColor:'#222222', color:'#3c5186'}}className=" h-20   m-4 text-white font-bold text-2xl rounded-lg" >
                    Logout</button>

               
           
            <spline-viewer url="https://prod.spline.design/PBQQBw8bfXDhBo7w/scene.splinecode" events-target="local"></spline-viewer>
    
                    </div><center>
                    <br/> email:  {UserEmail}<br/> name:  {UserName} <br/>
                    </center>
            
                
                <button username={UserName} useremail={UserEmail} onClick={handleMembership}  style={{backgroundColor:'#222222', color:'#3c5186'}}className=" h-20   m-4 text-white font-bold text-2xl rounded-lg" >
                    Make A Payment</button>
               
     
      </div> 



        </div>

    )
}