// App.js or a similar routing file

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VerifyEmail from "./pages/VerifyEmail"
import { useSelector } from "react-redux";
import OpenRoute from "./componets/core/auth/OpenRoute";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PrivateRoute from "./componets/core/auth/PrivateRoute";


import Hero from './Hero';
function App() {
  const user = useSelector((state) => state.auth.user)
  console.log(user);
  return (
    <div  className=" w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Routes>
        <Route path='/' element ={<Hero></Hero>}></Route>
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/signup" element={
          <Signup></Signup>
        }
        ></Route>

        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
              
            </OpenRoute>
          }
        />
        <Route path="/verify-email" element={<VerifyEmail></VerifyEmail>}></Route>

      </Routes>
    </div>
  );
}

export default App;
