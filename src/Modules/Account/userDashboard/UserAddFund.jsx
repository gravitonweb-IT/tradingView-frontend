import { Link, useNavigate } from "react-router-dom";
import { IoPerson } from "react-icons/io5";
import { MdLibraryBooks } from "react-icons/md";
import { BsFillClipboard2DataFill } from "react-icons/bs";
import { FaDollarSign } from "react-icons/fa6";
import { servieUrl } from "../../../env/env";
import React, { useEffect, useState } from "react";
import {
  AiOutlineDashboard,
  AiOutlineFundProjectionScreen,
  AiOutlineMoneyCollect,
  AiOutlineProfile,
  AiOutlineLock,
  AiOutlineLogout,
  AiOutlineCustomerService,
  AiOutlineHistory,
} from "react-icons/ai";
import { GiTrade } from "react-icons/gi";
import "../user.css";

import image5 from "../../../Assests/FundPageImages/QRcodeheading1.svg";

import image2 from "../../../Assests/FundPageImages/accountdetailheading1.svg";

import image4 from "../../../Assests/FundPageImages/Qrcodeimg1.svg";

import image3 from "../../../Assests/FundPageImages/UPIheading1.svg";

import image7 from "../../../Assests/FundPageImages/UPIdetail.svg";

import image8 from "../../../Assests/FundPageImages/bankaccount.svg";

import WithdrawForm from "../../Account/WithdrawForm";

import FundsPopup from "../../Account/FundsPopup";
import UserDashboard from "../UserDashboard";

const UserAddFund = () => {
  const navigate = useNavigate();

  const [base64Image, setBase64Image] = useState(null);

  const [profile, setProfile] = useState([]);

  const uploadImage = (value) => {
    debugger;
  };

  const sourceDiv = document.querySelector(".tv-embed-widget-wrapper__body");

  const targetDiv = document.getElementById("grapch");

  const [selectedMenuItem, setSelectedMenuItem] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: AiOutlineDashboard },
    { name: "Transaction", icon: BsFillClipboard2DataFill },
    { name: "Add Fund", icon: AiOutlineFundProjectionScreen },
    { name: "Withdraw", icon: AiOutlineMoneyCollect },
    { name: "Trade Now", icon: GiTrade },
    { name: "Edit Profile", icon: AiOutlineProfile },
    { name: "Change Password", icon: AiOutlineLock },
    { name: "Logout", icon: AiOutlineLogout },
    { name: "Support Ticket", icon: AiOutlineCustomerService },
    { name: "Payout History", icon: AiOutlineHistory },
  ];

  const handleMenuItemClick = (itemName) => {
    setSelectedMenuItem(itemName);
    // You can perform additional actions here if needed
  };

  useEffect(() => {
    if (localStorage.getItem("userData") == null) {
      navigate("/loginandregister");
    }
  }, [navigate]);
  const [dataValue, setDataValue] = useState([]);

  const [showWithdrawForm, setShowWithdrawForm] = useState(false);

  const [showFundsPopup, setShowFundsPopup] = useState(false);

  const openWithdrawForm = () => {
    setShowWithdrawForm(true);
  };
  const [data, setdata] = useState({});

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,

      redirect: "follow",
    };

    fetch(servieUrl.url + "rolebased/AccountDetails/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setdata(result);
      })
      .catch((error) => console.log("error", error));
  }, []);
  const openFundsPopup = () => {
    setShowFundsPopup(true);
  };
  return (
    <>
      <>
        <UserDashboard>
          <div className=" flex justify-center mt-10 ">
            {/* <button
              onClick={openWithdrawForm}
              className="border-2 border-[#034694] rounded-[4px] px-5 py-2 text-xl cursor-pointer"
            >
              Withdraw
            </button> */}

            {/* <button
                onClick={openFundsPopup}
                className="border-2 border-[#034694] ml-5 rounded-[4px] px-5 py-2 text-xl cursor-pointer">
                Add Funds
              </button> */}
          </div>

     

          {showFundsPopup && (
            <FundsPopup
              isOpen={true}
              onClose={() => setShowFundsPopup(false)}
            />
          )}

          <div className=" grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5  mx-5  md:mx-10 lg:mx-14  mt-5 md:mt-14   p-5">
            <div className="">
              <div className="">
                <img src={image2}></img>
              </div>

              <div className="mt-10 flex justify-center ">
                <img src={image8}></img>
              </div>

              <ul className="mt-10 text-center text-lg">
                <li>
                  <b>Name: </b> {data?.fields?.Name}{" "}
                </li>

                <li>
                  <b>Account No: </b> {data?.fields?.AccountNO}{" "}
                </li>

                <li>
                  {" "}
                  <b>IFSC code: </b> {data?.fields?.IfscCode}{" "}
                </li>
              </ul>
            </div>

            <div className="">
              <div className=" flex justify-center">
                <img src={image5}></img>
              </div>

              <div className="mt-10 ">
                <img src={data?.fields?.QRcodeImage}></img>
              </div>
            </div>

            <div className="">
              <div className="flex justify-center">
                <img src={image3}></img>
              </div>

              <div className="mt-10 flex justify-center">
                <img src={image7} className="  w-full md:w-4/5  h-auto"></img>
              </div>

              <ul className="mt-5  text-center  text-lg ">
                <li>
                  <b>UPI ID: </b> {data?.fields?.UPIid}
                </li>

                <li>
                  <b>Mobile Number: </b>
                  {data?.fields?.mobileNumber}{" "}
                </li>

                <li>
                  <b>Bank Name: </b> {data?.fields?.BankName}
                </li>
              </ul>
            </div>
          </div>
        </UserDashboard>
      </>
    </>
  );
};

export default UserAddFund;
