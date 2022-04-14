import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableHead from "@mui/material/TableHead";
import { useEffect, useState } from "react";
import { getData, slNoEnumerator } from "../services/data";
import { Checkbox } from "@mui/material";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const DataTable = (props) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAllClick = (event) => {
    if(event.target.checked) {
      const newSelected = data.map((row) => row.id);
      setSelected(newSelected);
      event.target.checked=false;
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if(selectedIndex === -1) {
      newSelected = newSelected.concat(selected,id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
    );
      }
    setSelected(newSelected);
  }

  useEffect(() => {
    const update = async () => {
      setData(await getData());
    };
    update();
  }, []);

  const isSelected = (id) => {
    return selected.indexOf(id) !== -1;
  };

  return (
    <TableContainer sx={{borderRadius: "0px"}} component={Paper}>
      <Table
        sx={{ minWidth: 630, backgroundColor: "#282c34" }}
        size="small"
        aria-label="a dense table"
      >
        <TableHead>
          <TableRow
            sx={{
              "& th": {
                color: "white",
              },
            }}
          >
            <TableCell>
              <Checkbox
               color="primary"
               indeterminate={selected.length > 0 && selected.length < data.length}
               checked={data.length > 0 && selected.length === data.length} 
               onChange={handleSelectAllClick}
               inputProps={{
                 "aria-label": "select all rows"
               }}/>
            </TableCell>
            <TableCell align="left">Sl No</TableCell>
            <TableCell align="left">Business Code</TableCell>
            <TableCell align="left">Customer Number</TableCell>
            <TableCell align="left">Customer Name</TableCell>
            <TableCell align="left" width="7%">
              Clear Date
            </TableCell>
            <TableCell align="left">Business Year</TableCell>
            <TableCell align="left">Doc ID</TableCell>
            <TableCell align="left" width="7%">
              Posting Date
            </TableCell>
            <TableCell align="left" width="7%">
              Due In Date
            </TableCell>
            <TableCell align="left" width="7%">
              Baseline Create Date
            </TableCell>
            <TableCell align="left">Invoice Currency</TableCell>
            <TableCell align="left" width="5%">
              Customer Payment Terms
            </TableCell>
            <TableCell align="left">Converted USD</TableCell>
            <TableCell align="left">Aging Bucket</TableCell>
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            "& td": {
              color: "white",
            },
          }}
        >
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((row, index) => {
            const isItemSelected = isSelected(row.id);
            const labelId = `enhanced-table-checkbox-${index}`;

            return (
            <TableRow
              onClick={(event) => handleClick(event, row.id)}
              role="checkbox"
              aria-checked={isItemSelected}
              selected={isItemSelected}
              tabIndex={-1}
              key={row.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "& th": { color: "white" },
                ":hover": {backgroundColor: "#002672"}
              }}
            >
              <TableCell>
                <Checkbox
                  color="primary"
                  checked={isItemSelected}
                  inputProps={{"aria-labelledby":labelId}}
                  onClick={() => props.onCheckboxClicked(row.InvoiceCurrency,row.CustomerPaymentTerms,row.DocID, isItemSelected)}/>
              </TableCell>
              <TableCell component="th" id={labelId} scope="row">
                {++index}
              </TableCell>
              <TableCell align="left">{row.BusinessCode}</TableCell>
              <TableCell align="left">{row.CustomerNumber}</TableCell>
              <TableCell align="left">{row.CustomerName}</TableCell>
              <TableCell align="left">{row.ClearDate}</TableCell>
              <TableCell align="left">{row.BusinessYear}</TableCell>
              <TableCell align="left">{row.DocID}</TableCell>
              <TableCell align="left">{row.PostingDate}</TableCell>
              <TableCell align="left">{row.DueInDate}</TableCell>
              <TableCell align="left">{row.BaselineCreateDate}</TableCell>
              <TableCell align="left">{row.InvoiceCurrency}</TableCell>
              <TableCell align="left">{row.CustomerPaymentTerms}</TableCell>
              <TableCell align="left">{row.ConvertedUSD}</TableCell>
              <TableCell align="left">{row.AgingBucket}</TableCell>
            </TableRow>);
          })}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter sx={{
              "& td": {
                color: "white",
              },
            }}>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={15}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
