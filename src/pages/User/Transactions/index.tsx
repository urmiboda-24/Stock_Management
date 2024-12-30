import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormLabel,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import CommonHeader from "../../../component/header";
import CommonTextField from "../../../component/customeTextField";
import { MoreVert, Search, Settings } from "@mui/icons-material";
import { useState as UseState, useEffect as UseEffect } from "react";
import {
  MapDispatchToProps,
  connect,
  useSelector as UseSelector,
} from "react-redux";
import { ITransactionContainerDispatch } from "../../../utils/interface/transactions";
import {
  getTransactionList,
  rowsPerPageChange,
} from "../../../store/transactions/action";
import { useFormik as UseFormik } from "formik";
import * as Yup from "yup";
import { GetTransactionSuccessPayload } from "../../../store/transactions/types";

export type TransactionProps = ITransactionContainerDispatch;

const mapDispatchToProps: MapDispatchToProps<
  ITransactionContainerDispatch,
  any
> = {
  rowsPerPageChange,
  getTransactionList,
};

const renderNewTask = () => {
  return (
    <NewTaskBox>
      {/* <Box style={{ maxWidth: "130px" }}> */}
      <TransactionTitle>Transaction</TransactionTitle>
      {/* </Box> */}
      <ShareExportBox>
        <ShareButton className="share-btn">Share</ShareButton>
        <ShareButton className="export-btn">Export</ShareButton>
      </ShareExportBox>
    </NewTaskBox>
  );
};
interface Column {
  id: keyof Row; // Ensures `id` matches keys in `Row`
  label: string;
  align?: "left" | "center" | "right";
}

interface Row {
  id: number;
  title: string;
  issuesDate: string;
  dueDate: string;
  total: string;
  status: string;
  action: string;
}
const renderTable = (props: TransactionProps) => {
  const selector = UseSelector((state: any) => state.transactions);
  const { errors, touched, handleSubmit, getFieldProps } = UseFormik({
    initialValues: {
      name: "",
      price: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Please enter stock name"),
      price: Yup.string()
        .required("Please enter price")
        .typeError("Price must be digit"),
    }),
    onSubmit: (values) => {
      console.log("abc=>edit-save", values);
    },
  });
  const columns: Column[] = [
    {
      label: "#",
      id: "id",
    },
    {
      label: "Bill For",
      id: "title",
    },
    {
      label: "Issue Date",
      id: "issuesDate",
    },
    {
      label: "Due Date",
      id: "dueDate",
    },
    {
      label: "Total",
      id: "total",
    },
    {
      label: "Status",
      id: "status",
    },
    {
      label: "Action",
      id: "action",
    },
  ];
  const rows: Row[] = [
    {
      id: 300500,
      title: "Platinum Subscription Plan",
      issuesDate: "29 Dec 2024",
      dueDate: "31 Dec 2024",
      total: "$799.00",
      status: "Paid",
      action: "",
    },
    {
      id: 300500,
      title: "Platinum Subscription Plan",
      issuesDate: "29 Dec 2024",
      dueDate: "31 Dec 2024",
      total: "$799.00",
      status: "Paid",
      action: "",
    },
    {
      id: 300500,
      title: "Platinum Subscription Plan",
      issuesDate: "29 Dec 2024",
      dueDate: "31 Dec 2024",
      total: "$799.00",
      status: "Paid",
      action: "",
    },
    {
      id: 300500,
      title: "Platinum Subscription Plan",
      issuesDate: "29 Dec 2024",
      dueDate: "31 Dec 2024",
      total: "$799.00",
      status: "Paid",
      action: "",
    },
    {
      id: 300500,
      title: "Platinum Subscription Plan",
      issuesDate: "29 Dec 2024",
      dueDate: "31 Dec 2024",
      total: "$799.00",
      status: "Paid",
      action: "",
    },
    {
      id: 300500,
      title: "Platinum Subscription Plan",
      issuesDate: "29 Dec 2024",
      dueDate: "31 Dec 2024",
      total: "$799.00",
      status: "Paid",
      action: "",
    },
    {
      id: 300500,
      title: "Platinum Subscription Plan",
      issuesDate: "29 Dec 2024",
      dueDate: "31 Dec 2024",
      total: "$799.00",
      status: "Paid",
      action: "",
    },
    {
      id: 300500,
      title: "Platinum Subscription Plan",
      issuesDate: "29 Dec 2024",
      dueDate: "31 Dec 2024",
      total: "$799.00",
      status: "Paid",
      action: "",
    },
    {
      id: 300500,
      title: "Platinum Subscription Plan",
      issuesDate: "29 Dec 2024",
      dueDate: "31 Dec 2024",
      total: "$799.00",
      status: "Paid",
      action: "",
    },
    {
      id: 300500,
      title: "Platinum Subscription Plan",
      issuesDate: "29 Dec 2024",
      dueDate: "31 Dec 2024",
      total: "$799.00",
      status: "Paid",
      action: "",
    },
  ];
  const [anchorElTable, setAnchorElTable] = UseState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = UseState<string | null | number>(null);
  const [editOpen, setEditOpen] = UseState<boolean>(false);
  const [orderBy, setOrderBy] = UseState<string>("title");
  const [order, setOrder] = UseState<"desc" | "asc" | undefined>("asc");
  const handleActionClick = (
    event: React.MouseEvent<HTMLElement>,
    rowId: number
  ) => {
    setAnchorElTable(event.currentTarget);
    setSelectedRow(rowId);
  };
  const handleActionClose = () => {
    setAnchorElTable(null);
  };
  const handleEditClick = (rowId: number) => {
    setEditOpen(true);
  };
  const handleEditDialogClose = () => {
    setEditOpen(false);
  };
  const handleSort = (columnId: string) => {
    const isAsc = orderBy === columnId && order === "asc";
    const newOrder = isAsc ? "desc" : "asc";
    setOrderBy(columnId);
    setOrder(newOrder);
  };
  const onListSuccess = (response: GetTransactionSuccessPayload) => {
    console.log("abc=>List", response);
  };
  UseEffect(() => {
    props.getTransactionList({
      callback: onListSuccess,
    });
  }, []);
  return (
    <>
      <TablePaper>
        <CustomTableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={"left"}>
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : "asc"}
                      onClick={() => handleSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id === "action") {
                        return (
                          <>
                            <TableCell key={column.id} align="left">
                              <IconButton
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={(event) =>
                                  handleActionClick(event, row?.id as number)
                                }
                              >
                                <MoreVert />
                              </IconButton>
                            </TableCell>
                            <ActionMenu
                              anchorEl={anchorElTable}
                              open={
                                Boolean(anchorElTable) && selectedRow === row.id
                              }
                              onClose={handleActionClose}
                              onClick={handleActionClose}
                              transformOrigin={{
                                horizontal: "right",
                                vertical: "top",
                              }}
                              anchorOrigin={{
                                horizontal: "right",
                                vertical: "bottom",
                              }}
                            >
                              <MenuItem onClick={() => handleEditClick(row.id)}>
                                Edit
                              </MenuItem>
                              <MenuItem>Delete</MenuItem>
                            </ActionMenu>
                          </>
                        );
                      }
                      return (
                        <TableCell key={column.id} align="left">
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CustomTableContainer>
        <TablePagination
          // rowsPerPageOptions={[]}
          count={rows.length}
          rowsPerPage={selector.rowPerPage}
          page={10}
          onPageChange={() => {}}
          // onRowsPerPageChange={() => {}}
          className="tablePagination"
          labelRowsPerPage={<Box>Rows per page: {selector.rowPerPage}</Box>}
        />
      </TablePaper>
      <Dialog
        maxWidth="md"
        open={editOpen}
        fullWidth
        onClose={handleEditClick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" variant="h5">
          Edit Stock
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <form onSubmit={handleSubmit}>
              <FieldContainer>
                <FormLabel>Stock Name</FormLabel>
                <TextField
                  {...getFieldProps("name")}
                  type="name"
                  name="name"
                  fullWidth
                  variant="outlined"
                  placeholder="Enter stock name"
                  error={Boolean(errors.name) && touched.name}
                  helperText={(touched.name && errors.name)?.toString()}
                />
              </FieldContainer>
              <FieldContainer>
                <FormLabel>Price</FormLabel>
                <TextField
                  {...getFieldProps("price")}
                  type="number"
                  fullWidth
                  name="price"
                  variant="outlined"
                  placeholder="Enter stock price"
                  error={Boolean(errors.price) && touched.price}
                  helperText={(touched.price && errors.price)?.toString()}
                />
              </FieldContainer>
              <EditActionWrapper>
                <SaveButton type="submit">Save</SaveButton>
                <CancelButton onClick={handleEditDialogClose}>
                  Cancel
                </CancelButton>
              </EditActionWrapper>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};
const Transactions = (props: TransactionProps) => {
  const [anchorEl, setAnchorEl] = UseState<null | HTMLElement>(null);
  const handleSettingClose = () => {
    setAnchorEl(null);
  };
  const handleSettingOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleRowOptionChange = (pageValue: number) => {
    props.rowsPerPageChange({ rowPerPagePage: pageValue });
  };
  return (
    <>
      <CommonHeader />
      {renderNewTask()}
      <SearchWrapper>
        <CommonTextField
          value=""
          placeholder="Search"
          customStyle={{ maxWidth: "520px", width: "100%", marginBottom: 0 }}
          startIcon={<Search />}
        />
        <Box onClick={handleSettingOpen}>
          <Settings />
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={Boolean(anchorEl)}
          onClose={handleSettingClose}
          onClick={handleSettingClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem value="" onClick={handleSettingClose}>
            Row Per Page
          </MenuItem>
          <MenuItem onClick={() => handleRowOptionChange(10)}>10</MenuItem>
          <MenuItem onClick={() => handleRowOptionChange(15)}>15</MenuItem>
          <MenuItem onClick={() => handleRowOptionChange(20)}>20</MenuItem>
        </Menu>
      </SearchWrapper>
      {renderTable(props)}
    </>
  );
};

export default connect(null, mapDispatchToProps)(Transactions);

const NewTaskBox = styled(Box)({
  margin: "20px 0px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: 10,
});

const ShareExportBox = styled(Box)({
  border: "1px solid #262b40",
  borderRadius: "10px",
  height: "31px",
  "& .export-btn": {
    borderLeft: "1px solid #262b40",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  "& .share-btn": {
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
});

const ShareButton = styled(Button)({
  backgroundColor: "#fff",
  color: "#262b40",
  fontSize: 14,
  fontWeight: 600,
  textTransform: "none",
  borderRadius: 0,
  maxWidth: "31px",
  height: "100%",
  "&:hover": {
    backgroundColor: "#262b40",
    color: "#fff",
  },
});

const TransactionTitle = styled(Typography)({
  fontSize: "1.5rem",
  fontWeight: 400,
});

const SearchWrapper = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const TablePaper = styled(Paper)({
  width: "100%",
  overflow: "hidden",
  marginTop: "30px",
  "& .tablePagination": {
    display: "flex",
    justifyContent: "end",
    width: "100%",
  },
  "& .MuiTablePagination-select": {
    display: "none", // Hides the dropdown select for rows per page
  },
});

const CustomTableCell = styled(TableCell)({
  minWidth: 100,
});

const CustomTableContainer = styled(TableContainer)({
  maxHeight: 700,
});
const ActionMenu = styled(Menu)({
  "& .MuiPaper-root": {
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px !important",
  },
});
const FieldContainer = styled(Box)({
  marginTop: "20px",
});
const EditActionWrapper = styled(Box)({
  display: "flex",
  gap: 10,
  alignItems: "center",
  justifyContent: "flex-end",
  marginTop: 10,
});
const SaveButton = styled(Button)({
  backgroundColor: "#262b40",
  color: "#fff",
  fontSize: 14,
  fontWeight: 600,
  textTransform: "none",
  borderRadius: "5px",
});

const CancelButton = styled(Button)({
  backgroundColor: "#fff",
  border: "1px solid #262b40",
  color: "#262b40",
  fontSize: 14,
  fontWeight: 600,
  textTransform: "none",
  borderRadius: "5px",
});
