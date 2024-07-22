// App.js or a similar routing file

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VerifyEmail from "./componets/VerifyEmail"
import Hero from './Hero';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element ={<Hero></Hero>}></Route>
        <Route path="/verify-email" element={<VerifyEmail />} />
        
      </Routes>
    </Router>
  );
}

export default App;
