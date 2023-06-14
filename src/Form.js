import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import './Form.css';

export function Form() {
  // const [value, setValue] = useState(null);
  var [amount, setAmount] = useState(0);
  const [interst, setInterst] = useState(0);
  const [comp, setComp] = useState(0);
  const [dateout, setDateout] = useState(0);
  const [datein, setDatein] = useState(0);
  const [errorinAmount, setErrorinAmount] = useState("");
  const [errorincomp, setErrorincomp] = useState("");
  // const [amountonyear,setAmountonyear]=useState(0);
  const [totalamount, setTotalamount] = useState(0);
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [day, setDay] = useState(0);

  useEffect(() => {
    if (dateout && datein) {
      calculateDateDifference(dateout, datein);
    }
  }, [dateout, datein])

  // useEffect([

  // ],amount)


  function getFormData(e) {
    e.preventDefault()
    // calculateDateDifference(dateout, datein);

    console.log(amount, interst, comp, dateout, datein, year, month, day);


  }

  function onAmountChange(amount) {
    setAmount(amount);
    if (amount < 0) {
      setErrorinAmount("amount cant be less than zero");
    }
    else {
      setErrorinAmount("");
    }
  }

  function onchangeinterst(interst) {
    setInterst(interst);
  }

  function onchangecomp(comp) {
    setComp(comp);
    if (comp < 0) {
      setErrorincomp("compound interst cant be less than zero");
    }
    else {
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
    for (let i = 1; i <= year; i++) {
      let value = calculation1(amount, amount1)
      amount = value;
      amount1 = (amount * interst * 12) / 100;
    }
    // console.log(amount+amount1);
    let amountonyear = amount + amount1;
    let amount2 = (amountonyear * interst * (month / 12)) / 100;
    let amount3 = (amountonyear * interst * (day / 30)) / 100;
    setTotalamount(amountonyear + amount2 + amount3);

    // console.log(amountonyear+amount2+amount3)
  }



  return (
    
    <div className="background">
      <h6>{errorinAmount}</h6>
      <h6>{errorincomp}</h6>
      <form onSubmit={getFormData} className="Form" >

        <h2>Compound interst calculator</h2>
        <h6>{errorinAmount}</h6>

        <TextField id="outlined-basic" label="amount" variant="outlined"  onChange={(e) => onAmountChange(Number(e.target.value))} />


        <br />
        <br />


        <TextField id="outlined-basic" label="interst" variant="outlined" placeholder="Interst" onChange={(e) => onchangeinterst(Number(e.target.value))} />


        <br />
        <br />


        <TextField id="outlined-basic" label="compound-interst:" variant="outlined" onChange={(e) => onchangecomp(Number(e.target.value))} />


        <br />
        <br />

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker label="Date On Which Amount given:" onChange={(date) => onchangedateout(date)} />
            </DemoContainer>
          </LocalizationProvider>
        </div>

        <br />


        <div style={{ display: 'flex', justifyContent: 'center'}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker label="Date On Which Amount given:" onChange={(date) => onchangedatein(date)} />
            </DemoContainer>
          </LocalizationProvider>
        </div>

        <br></br>
        <br></br>
        <Button variant="contained" onClick={() => { calculation() }} >Submit</Button>
        
      </form>
      <div className="h3">
        <h3>your total Amount is {totalamount}</h3>
      </div>

    </div>
  )
}