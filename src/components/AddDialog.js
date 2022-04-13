import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputBase from '@mui/material/InputBase';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import "./AddDialog.css";
import { useState } from 'react';
import {addNewInvoice} from '../services/data';

const AddDialog = (props) => {
  const [userInput, setUserInput] = useState({
    BusinessCode: '', 
    CustomerNumber: '',
    CustomerName:'',
    BusinessYear:'',
    ClearDate:'',
    DocumentID:'',
    PostingDate:'',
    DueInDate:'',
    BaselineDate:'',
    CustomerPaymentTerms:'',
    ConvertedUSD:''
  }); 

  const onChangeHandler = (event) => {
    const {name, value} = event.target;
    setUserInput({...userInput, [name]: value});
  };

  const submitHandler = async (e) => {
  e.preventDefault();
    console.log('userinput', userInput);
    const response = await addNewInvoice(userInput);
    if(response.data.insert === true) {
      alert("New data inserted successfully");
    } else {
      alert("Something went wrong. Check console.");
    }    
    window.location.reload();
  };

  return <div>
      <Dialog open={props.open} maxWidth="lg" onClose={props.addButtonDialogClose}>
        <DialogTitle sx={{backgroundColor: "#282c34", color: "white"}}>Add</DialogTitle>
        <DialogContent sx={{backgroundColor: "#282c34"}}>
          <form id="addForm" onSubmit={submitHandler}>
          <InputBase name="BusinessCode" value={userInput.BusinessCode} onChange={onChangeHandler} required sx={{backgroundColor: "white", borderRadius:"5px", ml: 1, padding: "0px 5px", margin: "0px 20px 20px 20px" ,textAlign: "center"}} placeholder="Business Code"/>     
          <InputBase name="CustomerNumber" value={userInput.CustomerNumber} onChange={onChangeHandler} required sx={{backgroundColor: "white", borderRadius:"5px", ml: 1, padding: "0px 5px",  margin: "0px 20px 20px 20px" , textAlign: "center"}} placeholder="Customer Number"/>
          <InputBase name="CustomerName" value={userInput.CustomerName} onChange={onChangeHandler} required sx={{backgroundColor: "white", borderRadius:"5px", ml: 1, padding: "0px 5px", margin: "0px 20px 20px 20px" ,  textAlign: "center"}} placeholder="Customer Name"/>        
          <InputBase name="BusinessYear" value={userInput.BusinessYear} onChange={onChangeHandler} required sx={{backgroundColor: "white", borderRadius:"5px", ml: 1, padding: "0px 5px", margin: "20px 20px", textAlign: "center"}} placeholder="Business Year"/>
          
          <input name="ClearDate" value={userInput.ClearDate} onChange={onChangeHandler} required className='datePicker' placeholder='Clear Date' type="date"/>  
          <InputBase name="DocumentID" value={userInput.DocumentID} onChange={onChangeHandler} required sx={{backgroundColor: "white", borderRadius:"5px", ml: 1, padding: "0px 5px", margin: "20px 20px",textAlign: "center"}} placeholder="Document Id"/>

          <input name="PostingDate" value={userInput.PostingDate} onChange={onChangeHandler} required className='datePicker'  placeholder='Posting Date' type="date"/>
          <input name="DueInDate" value={userInput.DueInDate} onChange={onChangeHandler} required className='datePicker'  placeholder='Due In Date' type="date"/>
          <input name="BaselineDate" value={userInput.BaselineDate} onChange={onChangeHandler} required className='datePicker'  placeholder='Baseline Date' type="date"/>          

          <InputBase name="CustomerPaymentTerms" value={userInput.CustomerPaymentTerms} required onChange={onChangeHandler} sx={{backgroundColor: "white", borderRadius:"5px", ml: 1, padding: "0px 5px",margin: "20px 20px", textAlign: "center"}} placeholder="Customer Payment Terms"/>
          <InputBase name="ConvertedUSD" value={userInput.ConvertedUSD} onChange={onChangeHandler} required sx={{backgroundColor: "white", borderRadius:"5px", ml: 1, padding: "0px 5px",margin: "20px 20px", textAlign: "center"}} placeholder="Converted USD"/>
          </form>
        </DialogContent>
        <DialogActions sx={{backgroundColor: "#282c34"}}>
        <Button form="addForm" variant='outlined' type="submit" sx={{ color: "white",width: "50%", padding: "4px 30px", fontWeight: "500",marginLeft: "auto", marginRight: "auto" }}>Submit</Button>
        <Button variant='outlined' sx={{ color: "white",width: "50%", padding: "4px 30px", fontWeight: "500" ,marginLeft: "auto", marginRight: "auto"}} onClick={props.addButtonDialogClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
  </div>;
};

export default AddDialog;
