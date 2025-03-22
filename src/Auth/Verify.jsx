import { useState } from "react";
import OTPInput from "react-otp-input";

import { Link, useNavigate } from "react-router-dom";
import { useResendHitMutation, useVerifyOtpMutation } from "../page/redux/api/userApi";
import { message } from "antd";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const [verifyOtp] = useVerifyOtpMutation();
  const [resendVerifyOtp]= useResendHitMutation()
  const navigate = useNavigate()
  const handleVerify = () => {
    const data = {
      otp: otp,
      email: localStorage.getItem("email"),
    };
  
    verifyOtp( data )
      .unwrap()
      .then((response) => {
   
        message.success(response?.message);
        navigate("/reset");
        localStorage.setItem("token", response?.passwordResetToken);
      })
      .catch((error) => {
        console.error(error); 
        message.error(error?.data?.message);
      });
  };

  const handleResend = () => {
    const data = {
      email: localStorage.getItem("email"),
      type: "forgot_password",
    };
  
    resendVerifyOtp(data)
      .unwrap()
      .then((response) => {
      
        message.success(response.message);
      })
      .catch((error) => {
        console.error(error);
        message.error(error?.data?.message );
      });
  };
  return (
    <div className="min-h-screen  bg-gray-100">
      
      <div className=" min-h-screen flex items-center justify-center">
        <div className="">
          <div className=" lg:w-[500px] bg-white rounded md:px-16 px-5 py-16 ">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
              Check your email
            </h2>
            <h3 className="text-[#333333] text-center mb-5">
              We sent a reset link to {localStorage.getItem("email")}. Enter the 5-digit
              code mentioned in the email.
            </h3>
            <div className="flex justify-center mb-5">
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span className="mx-1"></span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    className="w-16 h-16 text-center bg-white text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    style={{ width: "40px", height: "50px" }}
                  />
                )}
              />
            </div>

           <button
              onClick={handleVerify}
              className="w-full py-2 bg-black text-white rounded-md mb-4"
            >
              Verify Code
            </button>

            <span className="flex justify-center ">
              You have not received the email?{" "}
              <span
                onClick={handleResend}
                className="text-blue-600 cursor-pointer pl-2"
              >
                 Resend
              </span>
            </span>
          </div>
        </div>
      </div>
  
    </div>
  );
};

export default Verify;
