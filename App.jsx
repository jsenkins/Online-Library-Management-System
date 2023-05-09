import { Route, BrowserRouter,Routes, useLocation , Link} from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import axios from "axios"

import React from 'react'
import Home from "./components/homePage"
import AdvSearch from "./components/advSearch"
import CFWYLF from "./sub-components/CFWYLF"
import AddBook from "./components/addBook"
import LoginPage from "./components/loginPage"
import SignupPage from "./components/signUpPage"
import ListUsers from "./components/listUsers"
import AdminView from "./components/adminView"
import PatronView from "./components/patronView"
import PatronLogin from "./components/patronLoginPage"
import PatronSignup from "./components/addPatron"
import Inventory from "./sub-components/inventory"
import ListPatrons from "./sub-components/listPatrons"
import ListBookRequest from "./sub-components/listBookRequest"
import PhysicalInventory from "./sub-components/physicalCopies"
import DigitalInventory from "./sub-components/digitalInventory"
import PaymentList from "./sub-components/paymentList"
import ReturnBook from "./components/returnBook"
import DisplayAllToUser from "./sub-components/displayAllToUser"
import Payments from "./sub-components/payment"

function App() {
  

  return (
   
    <div className="App bg-slate-800" >
      <AnimatePresence mode="wait">
      <BrowserRouter>
        <Routes>
            <Route path="/Home" element={<Home/>} />
            <Route path="/Advsearch" element={<AdvSearch/>} />
            <Route path="/CFWYLF" element={<CFWYLF/>} />
            <Route path="/AddNewBook" element={<AddBook/>} />
            <Route path="/" element={<LoginPage/>} />
            <Route path="/signup" element={<SignupPage/>} />
            <Route path="/listUsers" element={<ListUsers/>} />
            <Route path="/adminView" element={<AdminView/>} />
            <Route path="/patronView" element={<PatronView/>} />
            <Route path="/patronLogin" element={<PatronLogin/>} />
            <Route path="/patronSignup" element={<PatronSignup/>} />
            <Route path="/inventory" element={<Inventory/>} />
            <Route path="/listPatrons" element={<ListPatrons/>} />
            <Route path="/listBookRequest" element={<ListBookRequest/>} />
            <Route path="/listPhysicalInventory" element={<PhysicalInventory/>} />
            <Route path="/listDigitalInventory" element={<DigitalInventory/>} />
            <Route path="/listAllPayments" element={<PaymentList/>} />
            <Route path="/returnBook" element={<ReturnBook/>} />
            <Route path="/displayAllToUser" element={<DisplayAllToUser/>} />
            <Route path="/payments" element={<Payments/>} />

















        </Routes>
      </BrowserRouter>



           {/* <Home/> */}
           {/* <AdvSearch/> */}
                   
     </AnimatePresence>

       
       
      
      
      
      
    </div>
  )
}

export default App
