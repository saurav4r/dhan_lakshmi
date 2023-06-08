import React,{useState} from "react";

export function Form(){
   
   const [amount,setAmount]=useState("");
   const [interst,setInterst]=useState("");
   const [comp,setComp]=useState("");
   const [dateout,setDateout]=useState("");
   const [datein,setDatein]=useState("");
   const [errorinAmount, setErrorinAmount]= useState("");

   function getFormData(e){
    console.log(amount,interst,comp,dateout,datein);
    e.preventDefault()
   }

   function onAmountChange(amount){
        setAmount(amount);
        if(amount<0){
            setErrorinAmount("amount cant be less than zero");
        }
        else{
            setErrorinAmount("");
        }
   }



   return(
    <div>
    <h2>Contact Form</h2>
    <h6>{errorinAmount}</h6>
    <form onSubmit={getFormData}> 
      <label>
       Amount:
      <input type="Integer" name="Amount" placeholder="  Amount" onChange={(e)=>onAmountChange(e.target.value)}/>
      </label>
      <br />

      <label>
      Interst:
      <input type="Integer" name="Interst"  placeholder="Interst" onChange={(e)=>setInterst(e.target.value)}/>
      </label>
      <br />

      <label>
       compound-interst:
      <input type="integer" name="compound-interst" placeholder="compound-interst" onChange={(e)=>setComp(e.target.value)}/>
      </label>
      <br />

      <label for="dateInput">date on which amount taken:</label>
      <input type="date" id="dateInput" name="dateInput" onChange={(e)=>setDateout(e.target.value)} /><br />

      <label for="dateInput">date on which amount given:</label>
      <input type="date" id="dateInput" name="dateInput" onChange={(e)=>setDatein(e.target.value)}/><br />

      <button type="submit">Submit</button>
    </form>
  </div>
   )
}