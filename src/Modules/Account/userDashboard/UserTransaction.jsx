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
const UserTransaction = () => {
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

  useEffect(() => {
    var formdata = new FormData();
    formdata.append("userEmail", localStorage.getItem("userData"));

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(servieUrl.url + "rolebased/UserAmountStatus/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        let totalProfit = 0;
        let totalLoss = 0;
        let totalPrice = 0;

        // Loop through the data array
        result.forEach((item) => {
          const { profit, loss, price } = item.fields;

          // Add the profit, loss, and price values to the corresponding totals
          totalProfit += Number(profit);
          totalLoss += Number(loss);
          totalPrice += Number(price);
        });

        // Create an object to store the total values
        const result1 = {
          profit: totalProfit,
          loss: totalLoss,
          price: totalPrice,
        };

        debugger;

        setDataValue(result1);
      })
      .catch((error) => console.log("error", error));
  }, []);
  useEffect(() => {
    var formdata = new FormData();

    formdata.append("userEmail", localStorage.getItem("userData"));

    debugger;

    var requestOptions = {
      method: "POST",

      body: formdata,

      redirect: "follow",
    };

    fetch(servieUrl.url + "rolebased/uploadProfile/", requestOptions)
      .then((response) => response.json())

      .then((result) => {
        setProfile(result);
      })

      .catch((error) => console.log("error", error));

    console.log(profile);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setBase64Image(e.target.result);

        if (e.target.result) {
          var formdata = new FormData();

          formdata.append("userEmail", localStorage.getItem("userData"));

          formdata.append("image", e.target.result);

          var requestOptions = {
            method: "POST",

            body: formdata,

            redirect: "follow",
          };

          fetch(servieUrl.url + "rolebased/uploadProfile/", requestOptions)
            .then((response) => response.json())

            .then((result) => {
              alert("successfully update image");
            })

            .catch((error) => console.log("error", error));
        }

        // console.log("base64",e.target.result)
      };

      reader.readAsDataURL(file);
    }

    console.log("base64", e.target.result);
  };

  const [data, setData] = useState([
    { id: 1, name: "Item 1", description: "Description for Item 1" },
    { id: 2, name: "Item 2", description: "Description for Item 2" },
    { id: 3, name: "Item 3", description: "Description for Item 3" },
  ]);

  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelectItem = (id) => {
    setSelectedItem(id === selectedItem ? null : id);
  };

  return (
    <>
      <div className="row">
      <div className="min-h-screen flex   bg-gray-100">
      <div className="lg:w-1/4 bg-gray-100 p-5">
        <ul className="space-y-3">
          <li
            className={`flex items-center text-gray-700 hover:text-blue-500 cursor-pointer ${selectedMenuItem === "Dashboard" ? "font-bold" : ""}`}
            onClick={() => handleMenuItemClick("Dashboard")}
          >
            <Link to="/UserDashboard" className="flex items-center">
              <AiOutlineDashboard className="mr-2" />
              Dashboard
            </Link>
          </li>
          <li
            className={`flex items-center text-gray-700 hover:text-blue-500 cursor-pointer ${selectedMenuItem === "Transaction" ? "font-bold" : ""}`}
            onClick={() => handleMenuItemClick("Transaction")}
          >
            <Link to="/usertransaction" className="flex items-center">
              <BsFillClipboard2DataFill className="mr-2" />
              Transaction
            </Link>
          </li>
          <li
            className={`flex items-center text-gray-700 hover:text-blue-500 cursor-pointer ${selectedMenuItem === "Fund" ? "font-bold" : ""}`}
            onClick={() => handleMenuItemClick("Fund")}
          >
            <Link to="/user-fund" className="flex items-center">
              <AiOutlineFundProjectionScreen className="mr-2" />
             Add Fund
            </Link>
          </li>
          <li
            className={`flex items-center text-gray-700 hover:text-blue-500 cursor-pointer ${selectedMenuItem === "Withdraw" ? "font-bold" : ""}`}
            onClick={() => handleMenuItemClick("Withdraw")}
          >
            <Link to="/user-withdraw" className="flex items-center">
              <AiOutlineMoneyCollect className="mr-2" />
              Withdraw
            </Link>
          </li>
          <li
            className={`flex items-center text-gray-700 hover:text-blue-500 cursor-pointer ${selectedMenuItem === "Now" ? "font-bold" : ""}`}
            onClick={() => handleMenuItemClick("Now")}
          >
            <Link to="/trade-now" className="flex items-center">
              <GiTrade className="mr-2" />
              Trade Now
            </Link>
          </li>
          <li
            className={`flex items-center text-gray-700 hover:text-blue-500 cursor-pointer ${selectedMenuItem === "Profile" ? "font-bold" : ""}`}
            onClick={() => handleMenuItemClick("Profile")}
          >
            <Link to="/edit-profile" className="flex items-center">
              <AiOutlineProfile className="mr-2" />
            Edit  Profile
            </Link>
          </li>
          <li
            className={`flex items-center text-gray-700 hover:text-blue-500 cursor-pointer ${selectedMenuItem === "Password" ? "font-bold" : ""}`}
            onClick={() => handleMenuItemClick("Password")}
          >
            <Link to="/change-password" className="flex items-center">
              <AiOutlineLock className="mr-2" />
              Change Password
            </Link>
          </li>
          <li
            className={`flex items-center text-gray-700 hover:text-blue-500 cursor-pointer ${selectedMenuItem === "Logout" ? "font-bold" : ""}`}
            onClick={() => handleMenuItemClick("Logout")}
          >
            <Link to="/user-logout" className="flex items-center">
              <AiOutlineLogout className="mr-2" />
              Logout
            </Link>
          </li>
          <li
            className={`flex items-center text-gray-700 hover:text-blue-500 cursor-pointer ${selectedMenuItem === "Ticket" ? "font-bold" : ""}`}
            onClick={() => handleMenuItemClick("Ticket")}
          >
            <Link to="/support-ticket" className="flex items-center">
              <AiOutlineCustomerService className="mr-2" />
              Support Ticket
            </Link>
          </li>
          <li
            className={`flex items-center text-gray-700 hover:text-blue-500 cursor-pointer ${selectedMenuItem === "History" ? "font-bold" : ""}`}
            onClick={() => handleMenuItemClick("History")}
          >
            <Link to="/payout-history" className="flex items-center">
              <AiOutlineHistory className="mr-2" />
              Payout History
            </Link>
          </li>
        </ul>
      </div>
    </div>
        <div className="col-lg-10 col-sm-12">
          <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
              <div className="bg-white p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
                <h2 className="text-2xl font-semibold mb-4">Data Transition</h2>
                <ul>
                  {data.map((item) => (
                    <li
                      key={item.id}
                      className={`mb-4 p-4 cursor-pointer transition-all ${
                        selectedItem === item.id
                          ? "bg-blue-100"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => handleSelectItem(item.id)}
                    >
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      {selectedItem === item.id && (
                        <p className="text-gray-600 mt-2">{item.description}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default UserTransaction;
