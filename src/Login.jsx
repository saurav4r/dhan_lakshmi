import React, { useState } from "react";
export const Login = (props) => {

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
                <button type="submit">login</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>don't have a account? Register here.</button>
        </div>

    )
}