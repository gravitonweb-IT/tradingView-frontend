import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PendingRequest from "./PendingRequest";
import Withdraw from "./Withdraw";
import AccountDetails from "./AccountDetails";
import Fund from "../Account/Fund";
import DepositForm from "./DepositForm";
import TradeImport from "./TradeImport";

export default function AdminDashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("login") !== "admin") {
      navigate("/loginandregister");
    }
  }, [navigate]);

  const [selectedOption, setSelectedOption] = useState('ManageCustomer');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsSidebarOpen(false); // Close sidebar on selection in mobile view
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex">
      {/* Mobile Menu Button */}
      <button onClick={toggleSidebar} className="lg:hidden p-4">
        Menu
      </button>

      {/* Sidebar */}
      <div className={`lg:w-1/4 bg-gray-100 p-5 ${isSidebarOpen ? 'block' : 'hidden'} lg:block`}>
      <ul className="space-y-3">
          <li onClick={() => handleSelect('ManageCustomer')}>Manage Customer</li>
          <li onClick={() => handleSelect('Trade')}>Trade</li>
          <li onClick={() => handleSelect('WithdrawRequests')}>Withdraw Requests</li>
          <li onClick={() => handleSelect('Deposit')}>Deposit</li>
          <li onClick={() => handleSelect('ManageBlog')}>Manage Blog</li>
          <li onClick={() => handleSelect('AccountDetails')}>Account Details</li>
          <li onClick={() => handleSelect('Fund')}>Fund</li>
          <li onClick={() => handleSelect('WithdrawData')}>Withdraw Data</li>
            {/* ... other menu items */}
          </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-10">
        {selectedOption === 'ManageCustomer' && <PendingRequest />}
        {selectedOption === 'Trade' && <TradeImport/>}
        {selectedOption === 'WithdrawRequests' && <Withdraw />}
        {selectedOption === 'Deposit' && <DepositForm/>}
        {selectedOption === 'ManageBlog' && <>ManageBlog</>}
        {selectedOption === 'AccountDetails' && <AccountDetails />}
        {selectedOption === 'Fund' && <Fund />}
        {selectedOption === 'WithdrawData' && <Withdraw />}
        </div>
    </div>
      
    
  );


  // return (
  //   <>
  //     <h1 className="text-2xl md:text-4xl font-bold text-center text-[#034694] mt-10">
  //       Welcome To Admin Page
  //     </h1>

  //     <h2 className="text-2xl md:text-3xl font-semibold text-center mt-5">
  //       Here is the link given below
  //     </h2>

  //     <div className="text-center mt-8">
  //       <Link to="/stockform">
  //         <button className="bg-[#059DC0] px-5 py-2 text-white font-semibold text-xl rounded-[4px]">
  //           Stock Form
  //         </button>
  //       </Link>

  //       <Link to="/withdraw">
  //         <button className="bg-[#059DC0] px-5 py-2 text-white font-semibold text-xl rounded-[4px] ml-3">
  //           Withdraw Data
  //         </button>
  //       </Link>

  //       <Link to="/addfund">
  //         <button className="bg-[#059DC0] px-5 py-2 text-white font-semibold text-xl rounded-[4px] md:ml-3 mt-4 md:mt-0">
  //           Add Fund
  //         </button>
  //       </Link>

  //       <Link to="/pendingrequest">
  //         <button className="bg-[#059DC0] px-5 py-2 text-white font-semibold text-xl rounded-[4px] ml-3 mt-4 md:mt-0">
  //           Pending Request
  //         </button>
  //       </Link>

  //       <Link to="/AccountDetails">
  //         <button className="bg-[#059DC0] px-5 py-2 text-white font-semibold text-xl rounded-[4px] ml-3 mt-4 md:mt-0">
  //           AccountDetails
  //         </button>
  //       </Link>
  //     </div>
  //   </>
  // );
}
