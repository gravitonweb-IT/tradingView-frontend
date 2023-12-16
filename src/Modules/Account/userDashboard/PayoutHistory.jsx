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
import UserDashboard from "../UserDashboard";
const PayoutHistory = () => {
  const navigate = useNavigate();

  const [base64Image, setBase64Image] = useState(null);

  const [profile, setProfile] = useState([]);

  const uploadImage = (value) => {
    debugger;
  };

  const sourceDiv = document.querySelector(".tv-embed-widget-wrapper__body");

  const targetDiv = document.getElementById("grapch");

  const [selectedMenuItem, setSelectedMenuItem] = useState("Dashboard");
  const [trsansaction,setTrsaction]=useState(null)
  useEffect(()=>{
   var requestOptions = {
     method: 'GET',
     redirect: 'follow'
   };
   
   fetch("http://127.0.0.1:8000/rolebased/transaction/johndoe@example.com/", requestOptions)
     .then(response => response.json())
     .then(result =>{
      const data=result.filter(transaction => transaction.type === "Payout")
       setTrsaction(data)
     })
     .catch(error => console.log('error', error));
  },[])
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

  return (
    <>
      <UserDashboard>
        <>
          <div className="py-md-5 py-3 flex items-center justify-center bg-gray-200">
            <div className="bg-gray-100 p-8 rounded shadow-md w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
              <h2 className="text-2xl font-semibold mb-4">Transaction Table</h2>
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2">Username</th>
                    <th className="border p-2">Amount</th>
                    {/* <th className="border p-2">Date</th>
                    <th className="border p-2">Status</th> */}
                  </tr>
                </thead>
                <tbody>
                  {trsansaction?.map((row, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-100" : ""}
                    >
                      <td className="border p-2">{row.name}</td>
                      <td className="border p-2">{row.amount}</td>
                      {/* <td className="border p-2">{row.date}</td>
                      <td className="border p-2">{row.status}</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      </UserDashboard>
    </>
  );
};

export default PayoutHistory;

const data = [
  { username: "JohnDoe", amount: "$100", date: "2023-01-01", status: "Paid" },
  {
    username: "AliceSmith",
    amount: "$150",
    date: "2023-01-02",
    status: "Outstanding",
  },
  // Add more data as needed
];
