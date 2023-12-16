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
const UserEditProfit = () => {
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

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    aadharCard: "",
    panCard: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here, for example, send the data to the server
    console.log(formData);
  };
  return (
    <>
      <UserDashboard>
      <>
      <div className="overflow-x-hidden">
        <div className=" grid md:grid-cols-3 mx-5 gap-5  mt-10 ">
          <div className="bg-white p-5  shadow-xl text-center">
            <img
              src={
                base64Image
                  ? base64Image
                  : profile[0]?.fields?.Image
                  ? profile[0]?.fields?.Image
                  : "https://bootdey.com/img/Content/avatar/avatar7.png"
              }
              alt="Admin"
              className="rounded-circle m-auto"
              width="150"
            />

            <div className="mt-3">
              <h4>{profile[0]?.fields?.first_name}</h4>

              <p className=" mt-2">{profile[0]?.fields?.email}</p>

              <p className="mt-2  ">
                {profile[0]?.fields?.created_date}
              </p>

              <label className="custom-file-input mt-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>

              <Link to="/fund">
                {" "}
                <button className=" p-2  border-2 border-blue-600  rounded-[4px] mt-2">Add Fund</button>{" "}
              </Link>
            </div>
          </div>

          <div className="md:col-span-2   ">
            <div className=" bg-white  p-3 py-3 shadow-2xl">
              <div className="flex  p-4">
                <p>FullName:</p>

                <p className="ml-14">{profile[0]?.fields?.first_name}</p>
              </div>

              <hr />

              <div className="flex  p-4 ">
                <p>Email:</p>

                <p className="ml-20"> {profile[0]?.fields?.email}</p>
              </div>

              <hr />

              <div className="flex  p-4 ">
                <p>Mobile</p>

                <p className="ml-20"> {profile[0]?.fields?.phone_number}</p>
              </div>

              <hr />

              <div className="flex  p-4 ">
                <p>Date Joined:</p>

                <p className="ml-10"> {profile[0]?.fields?.date_joined}</p>
              </div>

              <Link to="/portfolio ">
                {" "}
                <button className="px-5 py-2 rounded-[4px] m-4 bg-blue-600 text-white">
                  PortFolio
                </button>{" "}
              </Link>
            </div>
          </div>
        </div>

        {/*  */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-5 gap-10 mt-10">
          <div>
            <div className="flex p-4 justify-between border border-blue-600 rounded-[4px]">
              <p className="pl-3 text-xl font-medium">Balance Sheet</p>

              <p> {dataValue?.price}</p>
            </div>

            <div className="flex mt-8 p-4 justify-between border border-blue-600 rounded-[4px]">
              <p className="pl-3 text-xl font-medium">Profit</p>

              <p> {dataValue?.profit}</p>
            </div>

            <div className="flex mt-8 p-4 justify-between border border-blue-600 rounded-[4px]">
              <p className="pl-3 text-xl font-medium">Loss</p>

              <p> {dataValue?.loss}</p>
            </div>
          </div>

          <div className=" bg-white  p-5  shadow-xl">
            <div class="card-body">
              <h6 class="text-xl font-medium mb-3">Bank Details</h6>

              <h5>AadhaarCardNumber</h5>

              <div class="progress mb-3 ">
                <div
                  class="progress-bar bg-primary w-[80%]"
                  role="progressbar"
                  aria-valuenow="80"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {profile[0]?.fields?.aadhaarCardNumber}
                </div>
              </div>

              <h5>BankAccount</h5>

              <div class="progress mb-3 ">
                <div
                  class="progress-bar bg-primary w-[72%]"
                  role="progressbar"
                  aria-valuenow="72"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {profile[0]?.fields?.bankaccount}
                </div>
              </div>

              <h5>PanCard</h5>

              <div class="progress mb-3 ">
                <div
                  class="progress-bar bg-primary w-[89%]"
                  role="progressbar"
                  aria-valuenow="89"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {profile[0]?.fields?.pancard}
                </div>
              </div>
              <h5>IFSC</h5>
              <div class="progress mb-3 ">
                <div
                  class="progress-bar bg-primary w-[89%]"
                  role="progressbar"
                  aria-valuenow="89"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {profile[0]?.fields?.ifsccode}
                </div>
              </div>
            </div>
          </div>

          {/* <div>
            <img src={StockMarket} className="w-[80%]"></img>
          </div> */}
        </div>
      </div>
    </>
      </UserDashboard>
    </>
  );
};

export default UserEditProfit;
