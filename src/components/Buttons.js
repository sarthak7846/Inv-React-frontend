import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import InputBase from '@mui/material/InputBase';
import { createTheme, ThemeProvider } from "@mui/material/styles";

import AddDialog from "./AddDialog";
import { useState } from "react";
import EditDialog from "./EditDialog";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3492ca",
      contrastText: "#fff",
    },
    contrastThreshold: 9,
  },
});



const Buttons = (props) => {
  const [addButtonShow, setAddButtonDialog] = useState(false);
  const [editButtonShow,setEditButtonDialog] = useState(false);

  const addButtonClickHandler = () => {
    setAddButtonDialog(true);
  };

  const addButtonDialogClose = () => {
    setAddButtonDialog(false);
  }

  const editButtonClickHandler = () => {
    setEditButtonDialog(true);
  }

  const editButtonDialogClose = () => {
    setEditButtonDialog(false);
  }

  const searchButtons = [
    <ThemeProvider theme={theme}>
      <Button
        sx={{ padding: "4px 50px", fontWeight: "550" }}
        variant="contained"
        key="predict"
      >
        PREDICT
      </Button>
    </ThemeProvider>,
    <ThemeProvider theme={theme}>
      <Button
        sx={{ color: "white", padding: "4px 30px", fontWeight: "550" }}
        variant="outlined"
        key="analyticsView"
      >
        ANALYTICS VIEW
      </Button>
      <Button
        sx={{ color: "white", padding: "4px 30px", fontWeight: "550" }}
        variant="outlined"
        key="advancedSearch"
      >
        ADVANCED SEARCH
      </Button>
    </ThemeProvider>,
  ];

  const changingButtons = [
    <ThemeProvider theme={theme}>
      <Button
        sx={{ color: "white",padding: "4px 70px", fontWeight: "550" }}
        variant="outlined"
        key="predict"
        onClick={addButtonClickHandler}
      >
        ADD
      </Button>
      <Button
        sx={{ color: "white", padding: "4px 70px", fontWeight: "550" }}
        variant="outlined"
        key="analyticsView"
        onClick={editButtonClickHandler}
      >
        EDIT
      </Button>
      <Button
        sx={{ color: "white", padding: "4px 70px", fontWeight: "550" }}
        variant="outlined"
        key="advancedSearch"
      >
        DELETE
      </Button>
    </ThemeProvider>,
  ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          "& > *": {
            m: 1,
          },
          backgroundColor: "#282c34",
        }}
      >
        <ButtonGroup
          sx={{ marginLeft: "20px" , marginRight: "95px"}}
          size="small"
          aria-label="button group"
        >
          {searchButtons}
        </ButtonGroup>
        <InputBase sx={{backgroundColor: "white", borderRadius:"10px", ml: 1, padding: "0px 5px", textAlign: "center"}} placeholder="Search Customer Id"/>
        <ButtonGroup
          sx={{ marginLeft: "65px",  marginRight: "20px"}}
          size="small"
          aria-label="button group"
        >
          {changingButtons}
        </ButtonGroup>
      </Box>
      <AddDialog open={addButtonShow} addButtonDialogClose={addButtonDialogClose}/>
      <EditDialog open={editButtonShow} editButtonDialogData={props.editDialogData} editButtonDialogClose={editButtonDialogClose}/>
    </>
  );
};

export default Buttons;
