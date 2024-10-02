import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getPasswordResetToken } from "../services/operations/authAPI";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center bg-gray-900 px-4">
      {loading ? (
        <div className="spinner text-yellow-50">Loading....</div>
      ) : (
        <div className="w-full max-w-md p-8 bg-richblack-800 rounded-lg shadow-lg">
          <h1 className="text-[26px] font-bold text-yellow-50 mb-4">
            {!emailSent ? "Reset your password" : "Check your email"}
          </h1>
          <p className="text-gray-400 mb-6 text-white text-[14px]">
            {!emailSent ? (
              "No worries! Just enter your email address"
            ) : (
              <>We've sent the password reset instructions to <span className="font-extrabold">"{email}"</span></>
            )}
          </p>

          <form onSubmit={handleOnSubmit} className="space-y-4">
            {!emailSent && (
              <label className="block">
                <span className="text-yellow-50 mb-2 block">Email Address*</span>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full p-3 rounded-lg bg-richblack-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-50 focus:outline-none"
                />
              </label>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-yellow-50 text-richblack-900 font-semibold hover:bg-yellow-100 transition duration-200 focus:ring-2 focus:ring-yellow-50 focus:outline-none"
            >
              {!emailSent ? "Submit" : "Resend Email"}
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link to="/login" className="text-yellow-50 hover:underline">
              <p className="flex items-center justify-center gap-x-2">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
