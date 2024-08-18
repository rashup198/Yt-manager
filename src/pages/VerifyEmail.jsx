import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { sendOTP, signUp } from '../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import OtpInput from 'react-otp-input';

const VerifyEmail = () => {
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signupData, loading } = useSelector((state) => state.auth);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { email, password, firstName, lastName, role } = signupData;
    dispatch(signUp(email, password, firstName, lastName, role, otp, navigate));
  };

  useEffect(() => {
    if (!signupData) {
      navigate('/signup');
    }
  }, [signupData, navigate]);

  return (
    <div className=" min-h-screen flex items-center justify-center">
      {loading ? (
        <div>
          <h1>Loading......</h1>
        </div>
      ) : (
        <div className="bg-richblack-800 p-10 rounded-lg shadow-lg w-full max-w-md text-yellow-50">
          <h1 className="text-3xl font-semibold text-yellow-400 mb-6 text-center">Verify Email</h1>
          <p className="text-gray-300 mb-8 text-center">Enter the verification code we just sent to your email address</p>
          <form onSubmit={handleOnSubmit} className="space-y-4">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={5}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} className='border border-black' />}
              inputStyle={{
                width: '3rem',
                height: '3rem',
                borderRadius: '0.5rem',
                border: '2px solid #ffc107',
                backgroundColor: '#1f2937',
                color: 'white',
                fontSize: '1.5rem',
                textAlign: 'center',
              }}
            />

            <button
              type="submit"
              className="w-full py-3 bg-yellow-400 text-gray-900 rounded-lg font-semibold text-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-600 text-black"            >
              Verify
            </button>
          </form>
          <div className="mt-8 flex items-center justify-between">
            <Link to="/login" className="text-yellow-400 hover:underline">
              <p className="flex items-center gap-x-2">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
          <button
            onClick={() => dispatch(sendOTP(signupData.email,navigate))}
            className="mt-4 text-yellow-400 hover:underline focus:outline-none"
          >
            Resend it
          </button>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
