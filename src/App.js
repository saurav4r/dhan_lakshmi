import React,{useState} from 'react';
import './App.css';
import { Form } from './Form';
import {Login} from './Login';
import {Register} from './Register';

function App() {
  const [currentform,setCurrentform]=useState('login');

  const toggleform=(forName)=>{
    setCurrentform(forName);
  }
  
  return (
    <div className="App">
      {
        currentform==="login" ? <Login onFormSwitch={toggleform}/> :<Register  u={toggleform}/>
      }
    {/* <Form /> */}
    
    </div>
  );
}

export default App;
