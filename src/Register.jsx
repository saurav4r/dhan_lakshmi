import React, { useState } from 'react';

export const Register = (props) => {
    const { email, setEmail } = useState('');
    const { pass, setPass } = useState('');
    const { name, setName } = useState('');

    const handleSubmit = (e) => {
        e.preventdefault();
        console.log(email, pass)
    }


    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label>Full name</label>
                <input value={name} name="name" id="name" placeholder="full name" />
                <label htmlFor="email">Email</label>
                <input value={email} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={pass} type="password" placeholder="enter your password" id="email" name="email" />
                <button type="submit">login</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>already have a account? login here.</button>
        </div>
    )
}