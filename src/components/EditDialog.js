import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputBase from '@mui/material/InputBase';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';

const EditDialog = (props) => {
    // const [editData, setEditData] = useState({
    //   invoiceCurrency: editDataFromCheckbox.invoiceCurrency,
    //   customerPaymentTerms:editDataFromCheckbox.customerPaymentTerms
    // });

    const onChangeHandler = () => {

    };

    const submitHandler = () => {

    };

  return <div>
      <Dialog open={props.open} maxWidth="lg" onClose={props.addButtonDialogClose}>
        <DialogTitle sx={{backgroundColor: "#282c34", color: "white"}}>Edit</DialogTitle>
        <DialogContent sx={{backgroundColor: "#282c34"}}>
          <form id="addForm" onSubmit={submitHandler}>
          <InputBase name="InvoiceCurrency" value={props.editButtonDialogData.invoiceCurrency}  onChange={onChangeHandler} required sx={{backgroundColor: "white", borderRadius:"5px", ml: 1, padding: "0px 5px", margin: "0px 20px 20px 20px" ,textAlign: "center"}} placeholder="Invoice Currency"/>     
          <InputBase name="CustomerPaymentTerms" value={props.editButtonDialogData.customerPaymentTerms}  onChange={onChangeHandler} required sx={{backgroundColor: "white", borderRadius:"5px", ml: 1, padding: "0px 5px",  margin: "0px 20px 20px 20px" , textAlign: "center"}} placeholder="Customer Payment Terms"/>
          
          </form>
        </DialogContent>
        <DialogActions sx={{backgroundColor: "#282c34"}}>
        <Button form="addForm" variant='outlined' type="submit" sx={{ color: "white",width: "50%", padding: "4px 30px", fontWeight: "500",marginLeft: "auto", marginRight: "auto" }}>Submit</Button>
        <Button variant='outlined' sx={{ color: "white",width: "50%", padding: "4px 30px", fontWeight: "500" ,marginLeft: "auto", marginRight: "auto"}} onClick={props.editButtonDialogClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
  </div>;
};

export default EditDialog;
