import React, { useContext, useRef, useState } from "react";
import { FaLock, FaSpinner } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Eye, EyeOff } from "lucide-react";
import { AppContext } from "../../Context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailsent, setIsEmailsent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpsubmitted, setIsOtpsubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [otpSuccess, setOtpSuccess] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inputrefs = useRef([]);
  const { backendURL } = useContext(AppContext);
  const navigate = useNavigate();

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputrefs.current.length - 1) {
      inputrefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputrefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, 6);
    paste.split("").forEach((char, index) => {
      if (inputrefs.current[index]) {
        inputrefs.current[index].value = char;
      }
    });
  };

  const onsubmitEmail = async (e) => {
    e.preventDefault();
    if (!email) {
      setEmailError("Email field should not be empty");
      return;
    }
    setEmailError("");
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${backendURL}/api/admin/forgot-admin-password`,
        { email }
      );
      data.success ? toast.success(data.message) : toast.error(data.message);
      if (data.success) {
        setIsEmailsent(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onsubmitOTP = async (e) => {
    e.preventDefault();
    const otpArray = inputrefs.current.map((el) => el.value).join("");
    if (!otpArray) {
      setOtpError("OTP field should not be empty");
      return;
    }
    setOtpError("");
    setOtp(otpArray);
    setIsOtpsubmitted(true);
    setOtpSuccess(true);
    toast.success("OTP Verified!");
  };

  const onsubmitNewPassword = async (e) => {
    e.preventDefault();
    if (!newPassword) {
      setPasswordError("Password field should not be empty");
      return;
    }
    setPasswordError("");
    setNewPassword("");
    setIsLoading(true);
    try {
      const { data } = await axios.put(
        `${backendURL}/api/admin/reset-admin-password`,
        { email, code: otp, newPassword }
      );
      data.success ? toast.success(data.message) : toast.error(data.message);
      if (data.success) {
        setResetSuccess(true);
        navigate("/success");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-yellow-300 rounded-2xl shadow-2xl p-8">
        {/* Lock Icon */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="inline-block p-4 bg-black rounded-full">
            <FaLock className="text-3xl text-yellow-400" />
          </div>
        </div>

        {/* STEP 1: Email */}
        {!isEmailsent && (
          <form className="space-y-6" onSubmit={onsubmitEmail}>
            <h1 className="text-2xl font-bold text-center text-black">
              Reset Password
            </h1>
            <p className="text-center text-black">
              Enter your registered email address
            </p>

            <div className="relative">
              <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500 text-xl" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                className="w-full pl-12 pr-4 py-3 text-black border border-yellow-400 rounded-xl 
                       focus:ring-2 focus:ring-yellow-400 focus:outline-none text-lg"
              />
            </div>
            {emailError && (
              <p className="text-red-600 text-sm font-medium">{emailError}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white py-3 rounded-xl font-semibold tracking-wide shadow-md 
                     transition-all duration-300 ease-in-out 
                     hover:scale-105 hover:bg-yellow-400 hover:text-black 
                     disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <FaSpinner className="animate-spin mx-auto text-white text-2xl" />
              ) : (
                "Verify Email"
              )}
            </button>
          </form>
        )}

        {/* STEP 2: OTP */}
        {isEmailsent && !isOtpsubmitted && (
          <form className="space-y-6 mt-4" onSubmit={onsubmitOTP}>
            <h1 className="text-2xl font-bold text-center text-black">
              Verify OTP
            </h1>
            <p className="text-gray-700 text-center">
              Enter the 6-digit code sent to your email
            </p>

            <div className="flex justify-center gap-3" onPaste={handlePaste}>
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    ref={(el) => (inputrefs.current[index] = el)}
                    onInput={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-12 h-12 text-2xl text-black text-center border-2 border-yellow-400 rounded-xl 
                           focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  />
                ))}
            </div>
            {otpError && (
              <p className="text-red-500 text-sm text-center">{otpError}</p>
            )}

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-xl font-semibold tracking-wide shadow-md 
                     transition-all duration-300 ease-in-out hover:scale-105"
            >
              {isLoading ? (
                <FaSpinner className="animate-spin mx-auto text-white text-2xl" />
              ) : (
                "Submit OTP"
              )}
            </button>

            <p className="text-center text-sm text-black">
              OTP expires in <span className="font-semibold">5 minutes</span>
            </p>

            {otpSuccess && (
              <p className="text-green-600 text-center font-medium">
                ✅ Verification Successful!
              </p>
            )}
          </form>
        )}

        {/* STEP 3: New Password */}
        {isOtpsubmitted && isEmailsent && (
          <form onSubmit={onsubmitNewPassword} className="space-y-6 mt-4">
            <h1 className="text-2xl font-bold text-center text-black">
              Set New Password
            </h1>

            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500 text-xl" />
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full pl-12 pr-12 py-3 rounded-xl bg-white text-black border border-yellow-400 
                       focus:ring-2 focus:ring-yellow-400 focus:outline-none text-lg"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-yellow-500 text-xl"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white py-3 rounded-xl font-semibold tracking-wide shadow-md 
                     transition-all duration-300 ease-in-out hover:scale-105"
            >
              {isLoading ? (
                <FaSpinner className="animate-spin mx-auto text-white text-2xl" />
              ) : (
                "Reset Password"
              )}
            </button>

            {resetSuccess && (
              <p className="text-green-600 text-center font-medium">
                🎉 Your password has been reset successfully
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
