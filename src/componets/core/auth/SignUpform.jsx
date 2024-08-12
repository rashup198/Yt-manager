import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// import { sendOtp } from "../../../services/operations/authAPI";
import { setSignupData } from "../../../slices/authSlice";
import Tab from "../../common/Tab";

function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [accountType, setAccountType] = useState("YouTuber");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    youtubeChannelId: "", // Added field for YouTube Channel ID
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { firstName, lastName, email, password, confirmPassword, youtubeChannelId } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }

    if (accountType === "YouTuber" && !youtubeChannelId) {
      toast.error("YouTube Channel ID is required for YouTubers.");
      return;
    }

    const signupData = {
      ...formData,
      role: accountType,
    };

    dispatch(setSignupData(signupData));
    dispatch(sendOtp(formData.email, navigate));

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      youtubeChannelId: "",
    });
    setAccountType("YouTuber");
  };

  const tabData = [
    {
      id: 1,
      tabName: "YouTuber",
      type: "YouTuber", 
    },
    {
      id: 2,
      tabName: "Editor",
      type: "Editor", 
    },
  ];

  return (
    <div>
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        <div className="flex gap-x-4">
          <label className="w-1/2">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-300">
              First Name <sup className="text-4xl">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              className="w-full rounded-md bg-gray-800 p-3 text-gray-300"
            />
          </label>
          <label className="w-1/2">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-300">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              className="w-full rounded-md bg-gray-800 p-3 text-gray-300"
            />
          </label>
        </div>
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-300">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            className="w-full rounded-md bg-gray-800 p-3 text-gray-300"
          />
        </label>
        {accountType === "YouTuber" && (
          <label className="w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-300">
              YouTube Channel ID <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="youtubeChannelId"
              value={youtubeChannelId}
              onChange={handleOnChange}
              placeholder="Enter YouTube Channel ID"
              className="w-full rounded-md bg-gray-800 p-3 text-gray-300"
            />
          </label>
        )}
        <div className="flex gap-x-4">
          <label className="relative w-1/2">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-300">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="w-full rounded-md bg-gray-800 p-3 pr-10 text-gray-300"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
          <label className="relative w-1/2">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-300">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              className="w-full rounded-md bg-gray-800 p-3 pr-10 text-gray-300"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="mt-6 rounded-md bg-yellow-300 py-2 px-4 font-medium text-gray-900"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
