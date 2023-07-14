import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
export const Login = () => {
    const navigate = useNavigate();
    const { email, setEmail } = useState('');
    const { pass, setPass } = useState('');

    const handleSubmit = (e) => {
        e.preventdefault();
        console.log(email, pass)
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>


            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input value={email} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={pass} type="password" placeholder="enter your password" id="email" name="email" />
                <button type="submit" onClick={() => {
                    navigate("/form")
                }} >login</button>
            </form>


            <button className="link-btn" onClick={() => {
                navigate("/Register")
            }}>don't have a account? Register here.</button>

            
        </div>

    )
}