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
import Dashboard from './pages/Dashboard';
import MyProfile from './componets/core/dashboard/MyProfile';
import Settings from './componets/core/dashboard/Settings';
import CreateWorkspace from './componets/core/dashboard/Workspace/CreateWorkspace';
import WorkspaceList from './componets/core/dashboard/Workspace/WorkspaceList';
import WorkSpaceDetails from './componets/core/dashboard/Workspace/WorkSpaceDetails';
import OAuthCallback from './componets/core/dashboard/Workspace/OAuthCallback';
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

        <Route element={<PrivateRoute><Dashboard></Dashboard></PrivateRoute>}>
        <Route path='/dashboard/my-profile' element={<MyProfile></MyProfile>}></Route>
        <Route path="/dashboard/settings" element={<Settings></Settings>}></Route>
        <Route path="dashboard/add-video" element={<VideoUpload></VideoUpload>}></Route>

        <Route path="/dashboard/workspace/create" element={<CreateWorkspace></CreateWorkspace>}></Route>
        <Route path='/dashboard/workspace/workspaces' element={<WorkspaceList></WorkspaceList>}></Route>
        <Route path="/dashboard/workspace/workspace/:id" element={<WorkSpaceDetails />} />
        <Route path="/oauth-callback" element={<OAuthCallback />} /></Route>

        

      </Routes>
    </div>
  );
}

export default App;
