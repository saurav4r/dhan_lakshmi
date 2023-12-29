import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const navigate = useNavigate();
  const [email1, setEmail1] = useState('');
  const [pass1, setPass1] = useState('');
  const [name1, setName1] = useState('');
  const [message,setMessage]=useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // function NEVIGATE() {
  //   navigate('/Login');
  // }

  async function ASSIGNVALUE() {
    try {
      const response = await fetch('http://localhost:3003/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: name1,
          password: pass1,
          email: email1,
        }),
      });

      const data = await response.json();
      console.log(data);
      setMessage(data.message+'  Click On login here button');
      
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label>Full name</label>
        <input id="name" placeholder="full name" onChange={(e) => setName1(e.target.value)} />
        <label htmlFor="email">Email</label>
        <input  type="email" placeholder="youremail@gmail.com" id="email" onChange={(e) => setEmail1(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input value={pass1} type="password" placeholder="enter your password" id="password" onChange={(e) => setPass1(e.target.value)} />
        <button type="submit" onClick={ASSIGNVALUE}>Register</button>
        <h5>{message}</h5>
      </form>
      <button className="link-btn" onClick={() => navigate('/Login')}>Already have an account? Login here.</button>
    </div>
  );
};
