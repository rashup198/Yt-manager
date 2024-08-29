import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../services/operations/authAPI";
import img from "../../../assets/login.jpg";

function LoginForm({ title, description1, description2, image, formType }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full min-h-screen px-4 md:px-8 lg:px-16 bg-gray-900 lg:gap-5">
      <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left mb-6 lg:mb-0 text-white">
        <h1 className="text-2xl lg:text-4xl font-bold mb-4 text-yellow-300">
          Welcome Back, Creator
        </h1>
        <p className="mb-4 text-sm lg:text-base ">
        Manage your content, collaborate with editors, and stay connected with your audience.
        </p>
        <p className="mb-4 text-sm lg:text-base">
        Your next big video is just a few clicks away. Sign in to streamline your workflow and maximize your reach.
        </p>
        <img
          src={img}
          alt="login up"
          className=" w-full lg:w-full rounded-lg shadow-lg hidden lg:block"
        />
      </div>
      <div className="w-full md:w-1/2 p-8 bg-richblack-800 rounded-lg shadow-lg">
        
        <form onSubmit={handleOnSubmit} className="flex flex-col gap-y-6">
          <label className="w-full">
            <p className="mb-2 text-sm font-medium text-yellow-50">Email Address <sup className="text-pink-200">*</sup></p>
            <input
              required
              type="email"
              name="email"
              value={email}
              onChange={handleOnChange}
              placeholder="Enter email address"
              className="w-full rounded-lg bg-richblack-700 px-4 py-3 text-white placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-yellow-50 focus:outline-none"
            />
          </label>
          <label className="relative">
            <p className="mb-2 text-sm font-medium text-yellow-50">Password <sup className="text-pink-200">*</sup></p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="w-full rounded-lg bg-richblack-700 px-4 py-3 text-white placeholder-gray-400 shadow-sm pr-12 focus:ring-2 focus:ring-yellow-50 focus:outline-none"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-10 cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
            <div className=" flex justify-between">
            <Link to="/signup">
              <p className="mt-2 text-xs text-yellow-50 text-right hover:underline">
                Don't have account?
              </p>
            </Link>
            <Link to="/forgot-password">
              <p className="mt-2 text-xs text-yellow-50 text-right hover:underline">
                Forgot Password?
              </p>
            </Link>
            </div>
          </label>
          <button
            type="submit"
            className="mt-4 rounded-lg bg-yellow-50 py-3 text-lg font-semibold text-richblack-900 hover:bg-yellow-100 focus:ring-2 focus:ring-yellow-50 focus:outline-none"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
