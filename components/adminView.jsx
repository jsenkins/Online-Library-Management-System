
import { useNavigate } from 'react-router-dom';
import AdminViewTopBar from '../sub-components/adminViewTopBar';
import { useLocation } from 'react-router-dom';

export default function AdminView(){
    const navigate = useNavigate();
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const UserEmail = queryParams.get('email');
    const UserName = queryParams.get('username');

    function handleAddBookClick() {
      navigate('/AddNewBook');
    };
    function handleInventoryClick() {
        navigate('/inventory');
      };
    function handleAddPatronClick() {
    navigate('/patronSignup');
    };
    function handleUsersClick() {
        navigate('/listUsers');
    };
  
    function handleListPatrons() {
      navigate('/listPatrons');
    };
    function handleViewRequests() {
      navigate('/listBookRequest');
    };
    function handleViewAllPaymentsClick() {
      navigate('/listAllPayments');
    };
    
    
    


    return(
        <div >
            <div  className="flex flex-col  mb-0 w-screen min-h-screen h-full">
           
               

                  

                <div className="flex flex-wrap  mt-20 justify-center">





                <button className="w-64 h-64 m-4 text-white font-bold text-2xl rounded-lg"
                     onClick={handleInventoryClick} style={{backgroundColor:'#8294C4', color:'#fff5de'}} >Inventory</button>
                <button className="w-64 h-64 m-4 text-white font-bold text-2xl rounded-lg"
                  onClick={handleAddBookClick} style={{backgroundColor:'#DBDFEA', color:'#3c5186'}} >Add A New Book</button>
                
              
                <button className="w-64 h-64  m-4 text-white font-bold text-2xl rounded-lg"
                  onClick={handleUsersClick} style={{backgroundColor:'#C6B4CE', color:'#3c5186'}} >List of Users</button>

                <button className="w-64 h-64 m-4 text-white font-bold text-2xl rounded-lg"
                  onClick={handleListPatrons} style={{backgroundColor:'#ACB1D6', color:'#3c5186'}} >List of  Patrons</button>
                 
                 <button className="w-64 h-64 m-4 text-white font-bold text-2xl rounded-lg"
                  onClick={handleAddPatronClick} style={{backgroundColor:'#DBDFEA', color:'#3c5186'}} >Add A New Patron</button>
                 
                 <button className="w-64 h-64 m-4 text-white font-bold text-2xl rounded-lg"
                  onClick={handleViewRequests} style={{backgroundColor:'#8294C4', color:'#fff5de'}} >View Requests</button>
               
               <button className="w-64 h-64  m-4 text-white font-bold text-2xl rounded-lg"
                  onClick={handleViewAllPaymentsClick} style={{backgroundColor:'#C6B4CE', color:'#3c5186'}} >Payments Log</button>

               
                 

                </div>
               

               
                
     
     
     </div>
     <AdminViewTopBar email={UserEmail} name={UserName} className="z-100"/>
     

     
        </div>

    )
}