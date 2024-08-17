import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendOTP } from "../../../services/operations/authAPI";
import { setSignupData } from "../../../slices/authSlice";
import signupImg from "../../../assets/Images/singnup.jpg";
function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [accountType, setAccountType] = useState("YouTuber");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { email, password, firstName, lastName } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const signupData = { ...formData, role: accountType };
    dispatch(setSignupData(signupData));
    dispatch(sendOTP(formData.email, navigate));
    setFormData({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    });
    setAccountType("YouTuber");
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between p-6 lg:p-12 bg-gray-900 text-gray-300 text-yellow-300 lg:gap-5 lg:justify-center ">
      <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left mb-6 lg:mb-0 text-white">
        <h1 className="text-2xl lg:text-4xl font-bold mb-4 text-yellow-300">
          Join the Creator Community!
        </h1>
        <p className="mb-4 text-sm lg:text-base ">
          Sign up today to manage your videos, collaborate with editors, and
          grow your channel.
        </p>
        <p className="mb-4 text-sm lg:text-base">
          Take control of your content and connect with your audience like never
          before.
        </p>
        <img
          src={signupImg}
          alt="Sign up"
          className=" w-full lg:w-full rounded-lg shadow-lg hidden lg:block"
        />
      </div>

      <div className="w-full md:w-1/2 p-8 bg-richblack-800 rounded-lg shadow-lg">
        <form
          onSubmit={handleOnSubmit}
          className="flex w-full flex-col gap-y-4"
        >
          <div className="flex gap-x-4">
            <label className="w-1/2">
              <p className="mb-1 text-sm leading-5 lg:leading-6">First Name</p>
              <input
                required
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleOnChange}
                placeholder="Enter first name"
                className="w-full rounded-md bg-gray-700 p-3 text-gray-300"
              />
            </label>
            <label className="w-1/2">
              <p className="mb-1 text-sm leading-5 lg:leading-6">Last Name</p>
              <input
                required
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleOnChange}
                placeholder="Enter last name"
                className="w-full rounded-md bg-gray-700 p-3 text-gray-300"
              />
            </label>
          </div>
          <label className="w-full">
            <p className="mb-1 text-sm leading-5 lg:leading-6">
              Email Address
            </p>
            <input
              required
              type="email"
              name="email"
              value={email}
              onChange={handleOnChange}
              placeholder="Enter email address"
              className="w-full rounded-md bg-gray-700 p-3 text-gray-300"
            />
          </label>
          <label className="relative">
            <p className="mb-1 text-sm leading-5 lg:leading-6">Password</p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="w-full rounded-md bg-gray-700 p-3 text-gray-300"
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
          </label>
          <button
            type="submit"
            className="mt-6 rounded-md bg-yellow-300 py-2 px-4 font-medium text-gray-900 hover:bg-yellow-400"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
