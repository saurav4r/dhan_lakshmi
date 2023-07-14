import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
    const navigate = useNavigate();
    const [email1, setEmail1] = useState('');
    const [pass1, setPass1] = useState('');
    const [name1, setName1] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
    }

    function NEVIGATE() {
        navigate("/Login");
    }


    function ASSIGNVALUE() {
        fetch("http://localhost:3003/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: name1,
                password: pass1,
                email: email1
            })
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
            })

    }



    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label>Full name</label>
                <input value={name1} name="name" id="name" placeholder="full name" onChange={(e) => { setName1(e.target.value) }} />
                <label htmlFor="email">Email</label>
                <input value={email1} type="email" placeholder="youremail@gmail.com" id="email" name="email" onChange={(e) => { setEmail1(e.target.value) }} />
                <label htmlFor="password">Password</label>
                <input value={pass1} type="password" placeholder="enter your password" id="password" name="password" onChange={(e) => { setPass1(e.target.value) }} />
                <button type="submit" onClick={() => { NEVIGATE(); ASSIGNVALUE() }} >login</button>
            </form>
            <button className="link-btn" onClick={() => { navigate("/Login") }}>already have a account? login here.</button>
        </div>
    );
}
