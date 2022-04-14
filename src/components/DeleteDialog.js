import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { deleteInvoice } from "../services/data";

const DeleteDialog = (props) => {
  const docID = props.deleteDialogData;

  const onDeleteHandler =async () => {
    const response = await deleteInvoice(docID);
    console.log('del resposne',response);
    if(response.data.delete === true) {
      alert("Invoice deleted successfully");
    } else {
      alert("Something went wrong. Check console.");
    }
    window.location.reload();
  };

  return <div>
      <Dialog open={props.open} maxWidth="lg" onClose={props.deleteButtonDialogClose}>
        <DialogTitle sx={{backgroundColor: "#282c34", color: "white"}}>Delete</DialogTitle>
        <DialogContent sx={{backgroundColor: "#282c34", color: "white"}}>
          Are you sure you want to delete these record[s]?
        </DialogContent>
        <DialogActions sx={{backgroundColor: "#282c34"}}>
        <Button variant='outlined' onClick={onDeleteHandler}  sx={{ color: "white",width: "50%", padding: "4px 30px", fontWeight: "500",marginLeft: "auto", marginRight: "auto" }}>Delete</Button>
        <Button variant='outlined' sx={{ color: "white",width: "50%", padding: "4px 30px", fontWeight: "500" ,marginLeft: "auto", marginRight: "auto"}} onClick={props.deleteButtonDialogClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
  </div>;
};

export default DeleteDialog;
