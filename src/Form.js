import React, { useState, useEffect } from "react"
import Button from "@mui/material/Button"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import TextField from "@mui/material/TextField"
import "./Form.css"
import { Box } from "@mui/system"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import { useNavigate } from "react-router-dom"

export function Form() {
  var [amount, setAmount] = useState(0)
  var [interst, setInterst] = useState(0)
  var [comp, setComp] = useState(0)
  var [dateout, setDateout] = useState(0)
  var [datein, setDatein] = useState(0)
  const [errorinAmount, setErrorinAmount] = useState("")
  const [errorincomp, setErrorincomp] = useState("")
  const [totalamount, setTotalamount] = useState(0)
  const [year, setYear] = useState(0)
  const [month, setMonth] = useState(0)
  const [day, setDay] = useState(0)
  const [useremail, setUseremail] = useState("saurav")

  const navigate = useNavigate()

  useEffect(() => {
    if (dateout && datein) {
      calculateDateDifference(dateout, datein)
    }
  }, [dateout, datein])

  function appbar() {
    function call2(data) {
      setUseremail(data.username)
      console.log(data)
    }

    function call1(res) {
      res.json().then(call2)
    }

    fetch("https://backend-of-dhan-lakshmi.vercel.app/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(call1)
      .catch((error) => console.error("Error:", error))
  }

  function getFormData(e) {
    e.preventDefault()

    console.log(amount, interst, comp, dateout, datein, year, month, day)
  }

  function onAmountChange(amount) {
    setAmount(amount)
    if (amount < 0) {
      setErrorinAmount("amount cant be less than zero")
    } else {
      setErrorinAmount("")
    }
  }

  function onchangeinterst(interst) {
    setInterst(interst)
  }

  function onchangecomp(comp) {
    setComp(comp)
    if (comp < 0) {
      setErrorincomp("compound interst cant be less than zero")
    } else {
      setErrorincomp("")
    }
  }

  function onchangedateout(date) {
    setDateout(date)
  }

  function onchangedatein(date) {
    setDatein(date)
  }

  function calculation1(amount1, amount) {
    amount = amount + amount1
    return amount
  }

  function calculateDateDifference(date1, date2) {
    date1 = new Date(date1)
    date2 = new Date(date2)

    let totalDaysDifference = Math.abs((date2 - date1) / (1000 * 60 * 60 * 24))

    let years = Math.floor(totalDaysDifference / 365)
    totalDaysDifference -= years * 365

    let months = Math.floor(totalDaysDifference / 30)
    totalDaysDifference -= months * 30

    let days = Math.floor(totalDaysDifference)
    setYear(Number(years))
    setMonth(Number(months))
    setDay(Number(days))
    return { years, months, days }
  }

  function calculation() {
    calculateDateDifference(dateout, datein)
    let amount1 = 0
    for (let i = 1; i <= year; i++) {
      let value = calculation1(amount, amount1)
      amount = value
      amount1 = (amount * interst * 12) / 100
    }
    // console.log(amount+amount1);
    let amountonyear = amount + amount1
    let amount2 = (amountonyear * interst * (month)) / 100
    let amount3 = (amountonyear * interst * (day / 30)) / 100
    setTotalamount(amountonyear + amount2 + amount3)

    // console.log(amountonyear+amount2+amount3)
  }

  function backend(amount, interst, comp, dateout, datein) {
    function callback2(data) {
      console.log(amount, interst, comp, dateout, datein)
      console.log(data)
    }

    function callback1(res) {
      res
        .json()
        .then(callback2)
        .catch((error) => console.error("Error parsing JSON:", error))
    }

    fetch("https://backend-of-dhan-lakshmi.vercel.app/from", {
      method: "POST",
      body: JSON.stringify({
        iamount: amount,
        iinterest: interst,
        icompound: comp,
        itaken: dateout,
        igiven: datein,
        itotal: totalamount,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(callback1)
      .catch((error) => console.error("Network error:", error))
  }

  return (
    <div>
      {appbar()}
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", color: "black", borderRadius: "5px" }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}></Box>

          {/* <Button variant="contained"  sx={{ backgroundColor: 'blue', color: 'white',mx:0.5}}>history</Button> */}
          <h6>{useremail}</h6>
          <Button
            variant="contained"
            sx={{ backgroundColor: "blue", color: "white", mx: 0.5 }}
            onClick={() => {
              localStorage.setItem("token", " ")
              navigate("/")
            }}
          >
            log-out
          </Button>
        </Toolbar>
      </AppBar>

      <div className="background">
        <h6>{errorinAmount}</h6>
        <h6>{errorincomp}</h6>
        <form onSubmit={getFormData} className="Form">
          <h2>Compound interst calculator</h2>
          <h6>{errorinAmount}</h6>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <TextField
              size="small"
              id="outlined-basic"
              label="amount"
              variant="outlined"
              onChange={(e) => onAmountChange(Number(e.target.value))}
              style={{ color: "black", textAlign: "center", width: "300px" }}
            />
          </div>

          <br />

          <div style={{ display: "flex", justifyContent: "center" }}>
            <TextField
              size="small"
              id="outlined-basic"
              label="interest"
              variant="outlined"
              placeholder="Interest"
              onChange={(e) => onchangeinterst(Number(e.target.value))}
              style={{ color: "white", textAlign: "center", width: "300px" }}
            />
          </div>

          <br />

          <div style={{ display: "flex", justifyContent: "center" }}>
            <TextField
              size="small"
              id="outlined-basic"
              label="compound-interest:"
              variant="outlined"
              onChange={(e) => onchangecomp(Number(e.target.value))}
              style={{ color: "white", textAlign: "center", width: "300px" }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  size="small"
                  label="Date On Amount taken:"
                  onChange={(date) => onchangedateout(date)}
                  slotProps={{ textField: { size: "small" } }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Date On Amount Given:"
                  onChange={(date) => onchangedatein(date)}
                  slotProps={{ textField: { size: "small" } }}
                  renderInput={(params) => (
                    <Box width={300}>
                      <TextField {...params} />
                    </Box>
                  )}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>

          <br />

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "blue", color: "white" }}
              onClick={() => {
                calculation()
                backend(amount, interst, comp, dateout, datein)
              }}
            >
              Submit
            </Button>
          </div>
        </form>
        <div className="h3">
          <h3>your total Amount is {totalamount}</h3>
        </div>
      </div>
    </div>
  )
}