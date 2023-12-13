import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavigationBar from "../src/Common/NavigationBar";
import FooterOne from "../src/Common/FooterOne";
import Home from "../src/Modules/Main/Home";
import About from "../src/Modules/Main/About";
import Service from "../src/Modules/Main/Service";
import Contact from "../src/Modules/Main/Contact";

import Fund from "../src/Modules/Account/Fund";
import Register from "../src/Modules/Account/Register";
import Portfolio from "../src/Modules/Account/Portfolio";
import Profile from "../src/Modules/Account/Profile";

import Withdraw from "../src/Modules/Admin/Withdraw";
import UserApproval from "../src/Modules/Admin/UserApproval";
import StockForm from "../src/Modules/Admin/StockForm";
import AddFund from "../src/Modules/Admin/AddFund";
import LoginAndRegister from "./Modules/Account/LoginAndRegister";
import AdminNavbar from "../src/Common/AdminNavbar";
import Forget from "./Modules/Account/Forget";
import UserNavbar from "../src/Common/UserNavbar";
import ScrollToTop from '../src/Common/ScrollToTop'; // Import the ScrollToTop component
import Scrollup from "./Common/Scrollup";
import AdminDashboard from "./Modules/Admin/AdminDashboard";
import PendingRequest from "./Modules/Admin/PendingRequest";
import UserDashboard from "./Modules/Account/UserDashboard";
import AccountDetails from "./Modules/Admin/AccountDetails";
import PrivacyPolicy from "./Modules/Main/PrivacyPolicy";
import TermCondation from "./Modules/Main/TermCondation";
import NewHome from "./Modules/Main/NewHome/NewHome";


console.log("check", window.location.pathname.includes("adminpanel"))
function App() {
  const [userType , setUserType] = useState("0")
  useEffect(()=>{
  
     if(localStorage.getItem("login")=="user"){
      setUserType("3")
    }else if (localStorage.getItem("login")=="admin"){
      setUserType("1")

    }

  },[])
 
  return (
    <>
      <div>
        {(localStorage.getItem("login")!=="user" && localStorage.getItem("login")!=="admin")  ? <NavigationBar/> : localStorage.getItem("login")=="admin" ? <AdminNavbar setUserType={setUserType} /> :localStorage.getItem("login")=="user" ? <UserNavbar setUserType={setUserType} /> : <NavigationBar />}
        <ScrollToTop /> {/* Add the ScrollToTop component here, outside of Routes */}
        <Routes>
       
          <Route index path="/test" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/loginandregister" element={<LoginAndRegister setUserType={setUserType}/>} />
      
          <Route path="/fund" element={<Fund />} />
          <Route path="/register" element={<Register />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/userapproval" element={<UserApproval />} />
          <Route path="/stockform" element={<StockForm />} />
          <Route path="/addfund" element={<AddFund />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/userDashboard" element={<UserDashboard />} />
          <Route path="/pendingRequest" element={<PendingRequest />} />
          <Route path="/AccountDetails" element={<AccountDetails />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy/>}/>
          <Route path="/termcondation" element={<TermCondation/>}/>
          <Route path="/" element={<NewHome/>}/>
          {/* <Route path ="/adminpanel" element={<AdminNavbar/>}/> */}
          {/* <Route path ="/user" element={<UserNavbar/>}/> */}
        </Routes>
          
     
        <FooterOne />
        <Scrollup/>
      </div>

    </>
  );
}

export default App;
