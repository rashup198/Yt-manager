// App.js or a similar routing file

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VerifyEmail from "./pages/VerifyEmail"
import { useSelector } from "react-redux";
import OpenRoute from "./componets/core/auth/OpenRoute";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
import PrivateRoute from "./componets/core/auth/PrivateRoute";


import Hero from './Hero';
import Navbar from './componets/common/Navbar';
import SignupForm from './componets/core/auth/SignUpform';
import LoginForm from './componets/core/auth/LoginForm';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import VideoUpload from './componets/core/dashboard/AddVideo/VideoUpload';
function App() {
  const user = useSelector((state) => state.auth.user)
  console.log(user);
  return (
    <div  className=" w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element ={<Hero></Hero>}></Route>
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/signup" element={
          <SignupForm></SignupForm>
        }
        ></Route>

        <Route
          path="login"
          element={
            <OpenRoute>
              < LoginForm/>
              
            </OpenRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword></ForgotPassword>}></Route>

        <Route path="/update-password/:id" element={<UpdatePassword/>}></Route>
        <Route path="/verify-email" element={<VerifyEmail></VerifyEmail>}></Route>
        <Route path="/about" element={<AboutUs></AboutUs>}></Route>
        <Route path="/contact" element={<ContactUs></ContactUs>}></Route>

        <Route path="dashboard/add-video" element={<VideoUpload></VideoUpload>}></Route>

      </Routes>
    </div>
  );
}

export default App;
