import React, { useEffect, useState } from "react";

import { servieUrl } from "../../env/env";
import UserDashboard from "./UserDashboard";

const WithdrawForm = ({ isOpen, onClose }) => {
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [formData, setFormData] = useState({
    date: "",

    name: "",

    accountNo: "",

    ifsc: "",

    panNo: "",

    price: "",
    Email:""
  });

  const [profile, setProfile] = useState([]);
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
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,

      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    var formdata = new FormData();

    formdata.append("date", formData.date);

    formdata.append("name", formData.name);

    formdata.append("Account_No", formData.accountNo);

    formdata.append("ifsc", formData.ifsc);

    formdata.append("panNo", formData.panNo);

    formdata.append("price", formData.price);
    formdata.append("user_email", formData.Email);
    var requestOptions = {
      method: "POST",

      body: formdata,

      redirect: "follow",
    };

    fetch(servieUrl.otpurl + "growadmin/stock_fund/", requestOptions)
      .then((response) => response.json())

      .then((result) => {
        setShowSuccessPopup(true);
        onClose();
      })

      .catch((error) => console.log("error", error));

    // alert("Submitted Successfully !")

    console.log(formData);

    // onSubmit(formData);

    setFormData({
      date: "",

      name: "",

      accountNo: "",

      ifsc: "",

      panNo: "",

      price: "",
      Email:""
    });
    setRegistrationSuccess(true);
  };

  return (
    <>
      <UserDashboard>
        {showSuccessPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-10">
            <div className="bg-white p-8 rounded shadow-lg text-center">
              <h2 className="text-2xl font-semibold text-green-500 mb-4">
                Form Successfully
              </h2>

              <p className="text-gray-700">
                Your request is successful and your form will be approved as
                soon as possible.
              </p>

              <div className="mt-6">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={() => setShowSuccessPopup(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <div
          className={`fixed inset-0 flex items-center justify-center z-50 ${
            true ? "" : "hidden"
          }`}
        >
          <div className="bg-white w-2/3 lg:w-1/3 md:w-1/3  p-4 rounded shadow-lg">
            <div className="relative">
              {/* <button
                onClick={onClose}
                className="absolute top-0 right-2 text-black hover:bg-gray-100 p-2"
                style={{ zIndex: 1 }} // To ensure it appears above other content
              >
                X
              </button> */}

              <form onSubmit={handleSubmit} className="p-4">
                <div className="mb-4">
                  <label
                    htmlFor="date"
                    className="block text-gray-700 font-bold"
                  >
                    Date
                  </label>

                  <input
                    type="date"
                    name="date"
                    id="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="border rounded w-full py-2 px-3"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-bold"
                  >
                    Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border rounded w-full py-2 px-3"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="accountNo"
                    className="block text-gray-700 font-bold"
                  >
                    Account No
                  </label>

                  <input
                    type="text"
                    name="accountNo"
                    id="accountNo"
                    value={formData.accountNo}
                    onChange={handleChange}
                    className="border rounded w-full py-2 px-3"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="ifscCode"
                    className="block text-gray-700 font-bold"
                  >
                    IFSC CODE
                  </label>

                  <input
                    type="text"
                    name="ifsc"
                    id="ifsc"
                    value={formData.ifsc}
                    onChange={handleChange}
                    className="border rounded w-full py-2 px-3"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="panNo"
                    className="block text-gray-700 font-bold"
                  >
                    PAN NO
                  </label>

                  <input
                    type="text"
                    name="panNo"
                    id="panNo"
                    value={formData.panNo}
                    onChange={handleChange}
                    className="border rounded w-full py-2 px-3"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block text-gray-700 font-bold"
                  >
                    Price
                  </label>

                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="border rounded w-full py-2 px-3"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block text-gray-700 font-bold"
                  >
                    Email
                  </label>

                  <input
                    type="text"
                    name="Email"
                    id="Email"
                    value={formData.Email}
                    onChange={handleChange}
                    className="border rounded w-full py-2 px-3"
                    required
                  />
                </div>

                <div className="mb-4">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Submit
                  </button>
                </div>
                {registrationSuccess && (
                  <p className="text-green-500 mb-2">
                    {" "}
                    successfully Submitted!
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </UserDashboard>
    </>
  );
};

export default WithdrawForm;
