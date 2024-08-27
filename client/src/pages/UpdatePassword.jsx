import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetPassword } from "../services/operations/authAPI";
import { useLocation, Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";

const UpdatePassword = () => {
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const location = useLocation();

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const { password, confirmPassword } = formData;

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      {loading ? (
        <h1 className="text-white text-2xl">Loading...</h1>
      ) : (
        <div className="bg-richblack-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold text-yellow-50 mb-6 text-center">
            Update Password
          </h1>
          <p className="text-gray-400 mb-6 text-center text-white">
            Enter your new password to update your account
          </p>
          <form onSubmit={handleOnSubmit} className="space-y-6">
            <label className="block">
              <p className="mb-2 text-yellow-50">New Password*</p>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                  placeholder="Enter new password"
                  className="w-full rounded-lg bg-richblack-700 p-3 text-white placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-yellow-50 focus:outline-none"
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 top-[10px] cursor-pointer text-gray-400"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} />
                  ) : (
                    <AiOutlineEye fontSize={24} />
                  )}
                </span>
              </div>
            </label>

            <label className="block">
              <p className="mb-2 text-yellow-50">Confirm New Password*</p>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleOnChange}
                  placeholder="Confirm new password"
                  className="w-full rounded-lg bg-richblack-700 p-3 text-white placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-yellow-50 focus:outline-none"
                />
                <span
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 top-[10px] cursor-pointer text-gray-400"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} />
                  ) : (
                    <AiOutlineEye fontSize={24} />
                  )}
                </span>
              </div>
            </label>

            <button
              type="submit"
              className="w-full bg-yellow-50 text-richblack-900 py-3 rounded-lg font-semibold hover:bg-yellow-100 transition duration-200 focus:ring-2 focus:ring-yellow-50 focus:outline-none"
            >
              Reset Password
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
};

export default UpdatePassword;
