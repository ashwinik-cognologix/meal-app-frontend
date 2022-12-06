import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";

const columns = [
  { id: "id", label: "No.", minWidth: 100 },
  { id: "orderId", label: "Order Id", minWidth: 100 },
  { id: "transactionId", label: "Transaction Id", minWidth: 100 },
  { id: "amount", label: "Amount", minWidth: 100 },
  { id: "view", label: "Action", minWidth: 100 },
];

function createData(id, orderId, transactionId, amount, view) {
  return { id, orderId, transactionId, amount, view };
}

export default function StickyHeadTable(props) {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [orders, setOrder] = React.useState(props.data);

  const [rows, setRow] = React.useState([]);

  React.useEffect(() => {
    let view = "View Recipt";
    let newRow = [];
    let totalOrders = orders.length;
    orders.map((order, index) => {
      let obj = createData(
        totalOrders,
        order.attributes.orderId,
        order.attributes.transactionId,
        order.attributes.amount,
        view
      );
      totalOrders = totalOrders - 1;
      newRow.push(obj);

      return true;
    });
    setRow(newRow.reverse());
    console.log(newRow);
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const viewOrderDetails = (id) => {
    navigate(`/view-recipt/${id}`);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          onClick={() => {
                            if (column.id === "view") {
                              viewOrderDetails(row.orderId);
                            }
                          }}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
