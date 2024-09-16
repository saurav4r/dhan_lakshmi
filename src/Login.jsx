import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./login.css"

export const Login = () => {
  const navigate = useNavigate()
  const [email1, setEmail1] = useState("")
  const [pass1, setPass1] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  async function CHEACK() {
    try {
      const response = await fetch(
        "https://backend-of-dhan-lakshmi-git-main-sauravs-projects-e1caf8bf.vercel.app/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: pass1,
            email: email1,
          }),
        }
      )

      const data = await response.json()
      console.log(data)
      localStorage.setItem("token", data.token)
      console.log(data.token)

      if (data.message === "login-successful") {
        navigate("/form")
      } else {
        setMessage(data.message)
      }
    } catch (error) {
      console.error(error)
      setMessage("An error occurred during login.")
    }
  }

  return (
    <div className="login-back">
      <div className="auth-form-container">
        <h2>Login</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            onChange={(e) => {
              setEmail1(e.target.value)
            }}
          />
          <label htmlFor="password" color="white">
            Password
          </label>
          <input
            type="password"
            placeholder="enter your password"
            id="password"
            onChange={(e) => {
              setPass1(e.target.value)
            }}
          />
          <button type="submit" onClick={CHEACK}>
            login
          </button>
          <h3>{message}</h3>
        </form>

        <button
          className="link-btn"
          onClick={() => {
            navigate("/Register")
          }}
        >
          don't have an account? Register here.
        </button>
      </div>
    </div>
  )
}
