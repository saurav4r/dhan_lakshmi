import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';
import { Form } from './Form';
import { Login } from './Login';
import { Register } from './Register';
import BasicCard from './BasicCard';


function App() {


  return (
    <div className="App">
       
      <Router>
        
        <Routes>
          <Route path="/" element={<BasicCard/>} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register/>} />
          <Route path="/form" element={<Form/>} />
        </Routes>
      </Router>


    </div>
  );
}

export default App;
