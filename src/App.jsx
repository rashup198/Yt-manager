// App.js or a similar routing file

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VerifyEmail from "./componets/VerifyEmail"
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
    
      <Routes>
        <Route path='/' element ={<Hero></Hero>}></Route>
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/signup" element={<OpenRoute>
          <Signup></Signup>
        </OpenRoute>}
        ></Route>

        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
              
            </OpenRoute>
          }
        />
      </Routes>
    
  );
}

export default App;
