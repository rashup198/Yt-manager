
import React, { useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const VerifyEmail = () => {
  const location = useLocation();

  useEffect(() => {
    const verifyEmail = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');

      try {
        const response = await axios.get(`http://localhost:5000/api/auth/verify-email?token=${token}`);
        alert(response.data.message);
      } catch (error) {
        alert(error.response.data.message);
      }
    };

    verifyEmail();
  }, [location]);

  return (
    <div>
      <h2>Email Verification</h2>
      <p>Please wait while we verify your email...</p>
    </div>
  );
};

export default VerifyEmail;
