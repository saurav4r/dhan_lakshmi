// Form.js

import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  TextField,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import "./Form.css";

export function Form() {
  const [amount, setAmount] = useState(0);
  const [interst, setInterst] = useState(0);
  const [comp, setComp] = useState(0);
  const [dateout, setDateout] = useState(null);
  const [datein, setDatein] = useState(null);
  const [errorinAmount, setErrorinAmount] = useState("");
  const [errorincomp, setErrorincomp] = useState("");
  const [totalamount, setTotalamount] = useState(0);
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [day, setDay] = useState(0);
  const [useremail, setUseremail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (dateout && datein) {
      calculateDateDifference(dateout, datein);
    }
  }, [dateout, datein]);

  useEffect(() => {
    fetchUserData();
  }, []);

  function fetchUserData() {
    fetch("https://backend-of-dhan-lakshmi.vercel.app/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUseremail(data.username);
      })
      .catch((error) => console.error("Error:", error));
  }

  function getFormData(e) {
    e.preventDefault();
    console.log(amount, interst, comp, dateout, datein, year, month, day);
  }

  function onAmountChange(amount) {
    setAmount(amount);
    if (amount < 0) {
      setErrorinAmount("Amount can't be less than zero.");
    } else {
      setErrorinAmount("");
    }
  }

  function onchangeinterst(interst) {
    setInterst(interst);
  }

  function onchangecomp(comp) {
    setComp(comp);
    if (comp < 0) {
      setErrorincomp("Compound interest can't be less than zero.");
    } else {
      setErrorincomp("");
    }
  }

  function onchangedateout(date) {
    setDateout(date);
  }

  function onchangedatein(date) {
    setDatein(date);
  }

  function calculation1(amount1, amount) {
    amount = amount + amount1;
    return amount;
  }

  function calculateDateDifference(date1, date2) {
    date1 = new Date(date1);
    date2 = new Date(date2);

    let totalDaysDifference = Math.abs((date2 - date1) / (1000 * 60 * 60 * 24));

    let years = Math.floor(totalDaysDifference / 365);
    totalDaysDifference -= years * 365;

    let months = Math.floor(totalDaysDifference / 30);
    totalDaysDifference -= months * 30;

    let days = Math.floor(totalDaysDifference);
    setYear(Number(years));
    setMonth(Number(months));
    setDay(Number(days));
    return { years, months, days };
  }

  function calculation() {
    calculateDateDifference(dateout, datein);
    let amount1 = 0;
    let tempAmount = amount;

    for (let i = 1; i <= year; i++) {
      let value = calculation1(tempAmount, amount1);
      tempAmount = value;
      amount1 = (tempAmount * interst * 12) / 100;
    }

    let amountonyear = tempAmount + amount1;
    let amount2 = (amountonyear * interst * month) / 100;
    let amount3 = (amountonyear * interst * (day / 30)) / 100;
    setTotalamount(amountonyear + amount2 + amount3);
  }

  function backend(amount, interst, comp, dateout, datein) {
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
      .then((res) => res.json())
      .then((data) => {
        console.log(amount, interst, comp, dateout, datein);
        console.log(data);
      })
      .catch((error) => console.error("Error parsing JSON:", error));
  }

  return (
    <div>
      <AppBar position="static" className="app-bar" sx={{ borderRadius: "5px" }}>
        <Toolbar>
          <Typography variant="h6" className="app-title">
            Compound Interest Calculator
          </Typography>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Typography variant="body1" className="user-email">
            {useremail}
          </Typography>
          <IconButton
            color="inherit"
            onClick={() => {
              localStorage.setItem("token", "");
              navigate("/");
            }}
          >
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>

      <div className="background">
        <form onSubmit={getFormData} className="Form">
          <h2>Compound Interest Calculator</h2>

          {errorinAmount && <div className="error-message">{errorinAmount}</div>}
          <TextField
            size="small"
            label="Amount"
            variant="outlined"
            onChange={(e) => onAmountChange(Number(e.target.value))}
            fullWidth
          />

          <TextField
            size="small"
            label="Interest (%)"
            variant="outlined"
            onChange={(e) => onchangeinterst(Number(e.target.value))}
            fullWidth
          />

          {errorincomp && <div className="error-message">{errorincomp}</div>}
          <TextField
            size="small"
            label="Compound Interest"
            variant="outlined"
            onChange={(e) => onchangecomp(Number(e.target.value))}
            fullWidth
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date Amount Taken"
              value={dateout}
              onChange={(date) => onchangedateout(date)}
              renderInput={(params) => (
                <TextField {...params} size="small" fullWidth margin="normal" />
              )}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date Amount Given"
              value={datein}
              onChange={(date) => onchangedatein(date)}
              renderInput={(params) => (
                <TextField {...params} size="small" fullWidth margin="normal" />
              )}
            />
          </LocalizationProvider>

          <Button
            variant="contained"
            sx={{ backgroundColor: "blue", color: "white" }}
            onClick={() => {
              calculation();
              backend(amount, interst, comp, dateout, datein);
            }}
            className="submit-button"
          >
            Submit
          </Button>
        </form>

        {totalamount > 0 && (
          <div className="results">
            <h3>Calculation Results</h3>
            <p>
              Your principal amount is: <strong>{amount}</strong>
            </p>
            <p>
              Interest rate: <strong>{interst}%</strong>
            </p>
            <p>
              Compounding at: <strong>{comp}</strong>
            </p>
            <p>
              Difference in time:{" "}
              <strong>
                {year} year(s), {month} month(s), {day} day(s)
              </strong>
            </p>
            <hr />
            <p>
              Your total amount is: <strong>{totalamount}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
