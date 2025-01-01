import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormHelperText,
  FormLabel,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Select,
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
import { useEffect, useState } from "react";
import { MapDispatchToProps, connect, useSelector } from "react-redux";
import {
  ITransactionAttr,
  ITransactionContainerDispatch,
} from "../../../utils/interface/transactions";
import {
  deleteTransactionRequest,
  editTransactionRequest,
  getTransactionList,
  rowsPerPageChange,
} from "../../../store/transactions/action";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  DeleteTransactionSuccessPayload,
  EditTransactionSuccessPayload,
  GetTransactionSuccessPayload,
} from "../../../store/transactions/types";
import { columns } from "../../../utils/constants/transaction";
import { getStatusColor } from "../../../utils/helper/userDashboard";
import { showToast } from "../../../component/toast";

export type TransactionProps = ITransactionContainerDispatch;

const mapDispatchToProps: MapDispatchToProps<
  ITransactionContainerDispatch,
  any
> = {
  rowsPerPageChange,
  getTransactionList,
  editTransactionRequest,
  deleteTransactionRequest,
};

const validation = Yup.object().shape({
  bill_for: Yup.string().required("Please enter bill name"),
  status: Yup.string().required("Please select status"),
});

const renderNewTask = () => {
  return (
    <NewTaskBox>
      <TransactionTitle>Transaction</TransactionTitle>
      <ShareExportBox>
        <ShareButton className="share-btn">Share</ShareButton>
        <ShareButton className="export-btn">Export</ShareButton>
      </ShareExportBox>
    </NewTaskBox>
  );
};

const Transactions = (props: TransactionProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleSettingClose = () => {
    setAnchorEl(null);
  };
  const [anchorElTable, setAnchorElTable] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<string | null | number>(null);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [orderBy, setOrderBy] = useState<string>("id");
  const [order, setOrder] = useState<"desc" | "asc">("asc");
  const [searchValue, setSearchValue] = useState<string>("");
  const [transactionList, setTransactionList] = useState<ITransactionAttr[]>(
    []
  );
  const [page, setPage] = useState<number>(1);
  const [rowPerPagePage, setRowPerPagePage] = useState<number>(5);
  const selector = useSelector((state: any) => state.transactions);
  const [initialFormValue, setInitialFormValue] = useState({
    bill_for: "",
    status: "",
    id: "",
  });
  const { errors, touched, handleSubmit, getFieldProps, values } = useFormik({
    initialValues: initialFormValue,
    validationSchema: validation,
    enableReinitialize: true,
    onSubmit: (value) => {
      props.editTransactionRequest({
        value,
        callback: onEditSuccess,
      });
    },
  });

  const handleSettingOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRowOptionChange = (pageValue: number) => {
    setRowPerPagePage(pageValue);
  };

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
    const transactionData = transactionList.filter((data) => data.id === rowId);
    setInitialFormValue({
      bill_for: transactionData[0].bill_title,
      status: transactionData[0].status,
      id: rowId.toString(),
    });
  };

  const handleEditDialogClose = () => {
    setEditOpen(false);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleSort = (columnId: string) => {
    const isAsc = orderBy === columnId && order === "asc";
    const newOrder = isAsc ? "desc" : "asc";
    setOrderBy(columnId);
    setOrder(newOrder);
  };

  const onListSuccess = (response: GetTransactionSuccessPayload) => {
    setTransactionList(response.data.User);
  };

  const getTransactionData = () => {
    props.getTransactionList({
      value: {
        search: searchValue,
        sortBy: orderBy,
        sortOrder: order,
        page: page,
        pageSize: rowPerPagePage,
      },
      callback: onListSuccess,
    });
  };

  const handleSearchChange = (searchValue: string) => {
    setSearchValue(searchValue);
    setPage(1);
  };

  const onEditSuccess = (response: EditTransactionSuccessPayload) => {
    if (response.success) {
      getTransactionData();
      setEditOpen(false);
    }
  };
  const onDeleteSuccess = (response: DeleteTransactionSuccessPayload) => {
    if (response.success) {
      getTransactionData();
      showToast("Transaction delete successful.", "success");
    }
  };
  const handleDeleteClick = (rowId: number) => {
    props.deleteTransactionRequest({
      value: { id: rowId.toString() },
      callback: onDeleteSuccess,
    });
  };

  useEffect(() => {
    getTransactionData();
  }, [rowPerPagePage, order, orderBy, searchValue, page]);

  return (
    <>
      {renderNewTask()}
      <SearchWrapper>
        <CommonTextField
          value={searchValue}
          placeholder="Search"
          customStyle={{ maxWidth: "520px", width: "100%", marginBottom: 0 }}
          startIcon={<Search />}
          onChange={(event) => handleSearchChange(event.target.value)}
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
          <MenuItem disabled>Row Per Page</MenuItem>
          {[5, 10, 15, 20].map((option) => (
            <MenuItem
              key={option}
              selected={rowPerPagePage === option}
              onClick={() => handleRowOptionChange(option)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </SearchWrapper>

      {transactionList.length === 0 ? (
        <NoDataBox>No data found!</NoDataBox>
      ) : (
        <></>
      )}
      {transactionList.length > 0 ? (
        <TablePaper>
          <CustomTableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => {
                    if (column.id === "action" || column.id === "id") {
                      return (
                        <TableCell key={column.id} align={"left"}>
                          {column.label}
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={column.id} align={"left"}>
                        <TableSortLabel
                          active={orderBy === column.id}
                          direction={orderBy === column.id ? order : "asc"}
                          onClick={() => handleSort(column.id)}
                        >
                          {column.label}
                        </TableSortLabel>
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {transactionList.map((row: ITransactionAttr) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id as keyof ITransactionAttr];
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
                                  Boolean(anchorElTable) &&
                                  selectedRow === row.id
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
                                <MenuItem
                                  onClick={() => handleEditClick(row.id)}
                                >
                                  Edit
                                </MenuItem>
                                <MenuItem
                                  onClick={() => handleDeleteClick(row.id)}
                                >
                                  Delete
                                </MenuItem>
                              </ActionMenu>
                            </>
                          );
                        }
                        return (
                          <TableCell key={column.id} align="left">
                            {column.id === "status" ? (
                              <span
                                style={{
                                  color: getStatusColor(value as string),
                                }}
                              >
                                {value}
                              </span>
                            ) : (
                              value
                            )}
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
            count={selector.total}
            rowsPerPage={rowPerPagePage}
            page={page - 1}
            onPageChange={handleChangePage}
            className="tablePagination"
            labelRowsPerPage={
              <Box style={{ marginRight: 50 }}>
                Rows per page: {rowPerPagePage}
              </Box>
            }
          />
        </TablePaper>
      ) : (
        <></>
      )}
      <Dialog
        maxWidth="md"
        open={editOpen}
        fullWidth
        onClose={handleEditDialogClose}
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
                <FormLabel>Bill For</FormLabel>
                <TextField
                  {...getFieldProps("bill_for")}
                  type="text"
                  name="bill_for"
                  fullWidth
                  variant="outlined"
                  placeholder="Enter bill for"
                  error={Boolean(errors.bill_for) && touched.bill_for}
                  helperText={(touched.bill_for && errors.bill_for)?.toString()}
                />
              </FieldContainer>
              <FieldContainer>
                <FormLabel>Status</FormLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  {...getFieldProps("status")}
                  fullWidth
                  error={Boolean(errors.status) && touched.status}
                >
                  <MenuItem value="" disabled>
                    Select Status
                  </MenuItem>
                  <MenuItem value="Paid">Paid</MenuItem>
                  <MenuItem value="Due">Due</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
                <ErrorText>
                  {(touched.status && errors.status)?.toString()}
                </ErrorText>
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
const NoDataBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  color: "grey",
  marginTop: 100,
});
const ErrorText = styled(FormHelperText)({
  color: "#d32f2f",
  margin: "3px 14px 0px 14px",
});
