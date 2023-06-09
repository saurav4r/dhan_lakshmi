import React, { useState } from "react";


export function Form() {

  const [amount, setAmount] = useState("");
  const [interst, setInterst] = useState("");
  const [comp, setComp] = useState("");
  const [dateout, setDateout] = useState("");
  const [datein, setDatein] = useState("");
  const [errorinAmount, setErrorinAmount] = useState("");
  const [errorincomp, setErrorincomp] = useState("");
  //  const [amountonyear,setAmountonyear]=useState("");
  //  const [totalamount,setTotalamount]=useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  function getFormData(e) {
    e.preventDefault()
    calculateDateDifference(dateout, datein);

    console.log(amount, interst, comp, dateout, datein);

    
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


  //  calculateDateDifference(dateout, datein);
  //  console.warn(`Years: ${dateDifference.years}, Months: ${dateDifference.months}, Days: ${dateDifference.days}`);


  function calculateDateDifference(date1, date2) {
    // Ensure any date strings are converted to Date objects
    date1 = new Date(date1);
    date2 = new Date(date2);

    // Calculate difference in total days
    let totalDaysDifference = Math.abs((date2 - date1) / (1000 * 60 * 60 * 24));

    // Calculate years difference and remove the accounted days
    let years = Math.floor(totalDaysDifference / 365);
    totalDaysDifference -= years * 365;

    // Calculate months and remove the accounted days
    let months = Math.floor(totalDaysDifference / 30);
    totalDaysDifference -= months * 30;

    // Remaining days
    let days = Math.floor(totalDaysDifference);
    setYear(years);
    setMonth(months);
    setDay(days);
    console.log(year, month, day)
    return { years, months, days };

  }
  
  // function calculation(amount,interst,comp,years,months,days){
  //   let amount1=(amount*interst*years)/100;
  //   setAmountonyear(amount+amount1);
  //   let amount2=(amountonyear*interst*(months/12))/100;
  //   let amount3=(amountonyear*interst*(days/365))/100;
  //   setTotalamount(amountonyear+amount2+amount3);


  // }
  // console.warn(totalamount);


  return (
    <div>
      <h2>Contact Form</h2>
      <h6>{errorinAmount}</h6>
      <h6>{errorincomp}</h6>
      <form onSubmit={() => { }}>
        <label>
          Amount:
          <input type="Integer" name="Amount" placeholder="  Amount" onChange={(e) => onAmountChange(e.target.value)} />
        </label>
        <br />

        <label>
          Interst:
          <input type="Integer" name="Interst" placeholder="Interst" onChange={(e) => onchangeinterst(e.target.value)} />
        </label>
        <br />

        <label>
          compound-interst:
          <input type="integer" name="compound-interst" placeholder="compound-interst" onChange={(e) => onchangecomp(e.target.value)} />
        </label>
        <br />

        <label for="dateInput">date on which amount taken:</label>
        <input type="date" id="dateInput" name="dateInput" onChange={(e) => onchangedateout(e.target.value)} /><br />

        <label for="dateInput">date on which amount given:</label>
        <input type="date" id="dateInput" name="dateInput" onChange={(e) => onchangedatein(e.target.value)} /><br />

        <button type="submit" onClick={(e) => { getFormData(e) }}>Submit</button>
      </form>
    </div>
  )
}