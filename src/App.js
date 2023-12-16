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
import ScrollToTop from "../src/Common/ScrollToTop"; // Import the ScrollToTop component
import Scrollup from "./Common/Scrollup";
import AdminDashboard from "./Modules/Admin/AdminDashboard";
import PendingRequest from "./Modules/Admin/PendingRequest";
import UserDashboard from "./Modules/Account/UserDashboard";
import AccountDetails from "./Modules/Admin/AccountDetails";
import PrivacyPolicy from "./Modules/Main/PrivacyPolicy";
import TermCondation from "./Modules/Main/TermCondation";
import NewHome from "./Modules/Main/NewHome/NewHome";
import Test from "./Modules/Test";
import ChangePassword from "./Modules/Account/userDashboard/ChangePassword";
import PayoutHistory from "./Modules/Account/userDashboard/PayoutHistory";
import SupportTicket from "./Modules/Account/userDashboard/SupportTicket";
import UserAddFund from "./Modules/Account/userDashboard/UserAddFund";
import UserEditProfit from "./Modules/Account/userDashboard/UserEditProfit";
import UserLogout from "./Modules/Account/userDashboard/UserLogout";
import UserTradeNow from "./Modules/Account/userDashboard/UserTradeNow";
import UserTransaction from "./Modules/Account/userDashboard/UserTransaction";
import UserWithdraw from "./Modules/Account/userDashboard/UserWithdraw";
import DashboardUser from "./Modules/Account/userDashboard/DashboardUser";
import WithdrawForm from "./Modules/Account/WithdrawForm";
import TradeNow from "./Modules/TradeNow";
import MainStock from "./Modules/MainStock";

console.log("check", window.location.pathname.includes("adminpanel"));
function App() {
  const [userType, setUserType] = useState("0");
  useEffect(() => {
    if (localStorage.getItem("login") == "user") {
      setUserType("3");
    } else if (localStorage.getItem("login") == "admin") {
      setUserType("1");
    }
  }, []);

  return (
    <>
      <div>
        {localStorage.getItem("login") !== "user" &&
        localStorage.getItem("login") !== "admin" ? (
          <NavigationBar />
        ) : localStorage.getItem("login") == "admin" ? (
          <AdminNavbar setUserType={setUserType} />
        ) : localStorage.getItem("login") == "user" ? (
          <UserNavbar setUserType={setUserType} />
        ) : (
          <NavigationBar />
        )}
        <ScrollToTop />{" "}
        {/* Add the ScrollToTop component here, outside of Routes */}
        <Routes>
          <Route index path="/test1" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/forget" element={<Forget />} />
          <Route
            path="/loginandregister"
            element={<LoginAndRegister setUserType={setUserType} />}
          />

          <Route path="/fund" element={<Fund />} />
          <Route path="/register" element={<Register />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/userapproval" element={<UserApproval />} />
          <Route path="/stockform" element={<StockForm />} />
          <Route path="/addfund" element={<AddFund />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/userDashboard" element={<DashboardUser />} />
          <Route path="/pendingRequest" element={<PendingRequest />} />
          <Route path="/AccountDetails" element={<AccountDetails />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/termcondation" element={<TermCondation />} />
          <Route path="/test" element={<Test />} />
          <Route path="/" element={<NewHome />} />
          {/* <Route path ="/adminpanel" element={<AdminNavbar/>}/> */}
          {/* <Route path ="/user" element={<UserNavbar/>}/> */}

          {/* userdashboard */}

          
         
        
       
          
         
         
          
          <Route path="/user-withdraw" element={<WithdrawForm />} />
          <Route path='/change-password' element={<ChangePassword/>}/>
          <Route path='/payout-history' element={<PayoutHistory/>}/>
          <Route path='/support-ticket' element={<SupportTicket/>}/>
          <Route path='/user-fund' element={<UserAddFund/>}/>
          <Route path='/edit-profile' element={<UserEditProfit/>}/>
          <Route path='/user-logout' element={<UserLogout/>}/>
          <Route path='/trade-now' element={<UserTradeNow/>}/>
          <Route path='/usertransaction' element={<UserTransaction/>}/>
          <Route path='/user-withdraw' element={<UserWithdraw/>}/>
          <Route path='/tradeNow' element={<MainStock/>}/>







        </Routes>
        <FooterOne />
        <Scrollup />
      </div>
    </>
  );
}

export default App;
