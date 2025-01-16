import {
  MenuItem,
  styled,
  Dialog,
  Box,
  Typography,
  Button,
  FormLabel,
} from "@mui/material";
import { Formik, useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { useNavigate, Form } from "react-router-dom";
import CommonSelect from "../../component/customSelect";
import CommonTextField from "../../component/customTextField";
import * as Yup from "yup";

interface FormDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Please select stock"),
  quantity: Yup.number()
    .required("Quantity is required")
    .positive("Quantity must be greater than 0"),
});

const initialValue = {
  name: "",
  buy_at: 0,
  quantity: 0,
};

const FormDialog = (props: FormDialogProps) => {
  const { open, onClose, onSave } = props;
  const [selectedStock, setSelectedStock] = useState<any>({});

  const handleClose = () => {
    setSelectedStock({});
    onClose();
  };

  const { handleSubmit, touched, errors, getFieldProps, values, isValid } =
    useFormik({
      initialValues: initialValue,
      enableReinitialize: true,
      validationSchema: validationSchema,
      onSubmit: (values: any) => {
        console.log(values);
        //   onSave(values);
        handleClose();
      },
    });

  return (
    <StyledDialog
      aria-labelledby="simple-dialog-title"
      open={open}
      maxWidth="lg"
    >
      <MainBox>
        <HeaderTypography variant="h5">Buy New Stock</HeaderTypography>
        <form onSubmit={handleSubmit}>
          <FieldLabel>Stock</FieldLabel>
          <CommonSelect
            {...getFieldProps("name")}
            error={Boolean(errors.name) && Boolean(touched.name)}
            helperText={(touched.name && errors.name)?.toString()}
            placeholder="Select Stock"
            options={[
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
            ]}
            customStyle={{ marginBottom: 20 }}
          />
          <FieldLabel>Buy At</FieldLabel>
          <CommonTextField
            {...getFieldProps("buy_at")}
            name="buy_at"
            error={Boolean(errors.buy_at) && Boolean(touched.buy_at)}
            helperText={(touched.buy_at && errors.buy_at)?.toString()}
            placeholder="Buy At"
            customStyle={{ marginBottom: 20 }}
          />
          <FieldLabel>Quantity</FieldLabel>
          <CommonTextField
            {...getFieldProps("quantity")}
            name="quantity"
            error={Boolean(errors.quantity) && Boolean(touched.quantity)}
            helperText={(touched.quantity && errors.quantity)?.toString()}
            placeholder="Enter Stocks Quantity"
            customStyle={{ marginBottom: 20 }}
          />
          <ButtonBox>
            <SaveButton
              variant="contained"
              color="primary"
              type="submit"
              disabled={!selectedStock || values.quantity === 0}
            >
              Save
            </SaveButton>
            <CancelButton
              variant="contained"
              color="primary"
              onClick={handleClose}
            >
              Cancel
            </CancelButton>
          </ButtonBox>
        </form>
      </MainBox>
    </StyledDialog>
  );
};

export default FormDialog;

const StyledDialog = styled(Dialog)({
  "& .MuiPaper-root": {
    width: "50vw",
    maxWidth: "900px",
    margin: "auto",
  },
  width: "100%",
  margin: "auto",
});

const MainBox = styled(Box)({
  padding: "20px",
});
const HeaderTypography = styled(Typography)({
  fontWeight: "bold",
  marginBottom: "20px",
});

const ButtonBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: 10,
  marginTop: 30,
});

const SaveButton = styled(Button)({
  backgroundColor: "#262b40",
  color: "#fff",
  fontSize: 14,
  fontWeight: 600,
  textTransform: "none",
  height: "31px",
  borderRadius: "5px",
});

const CancelButton = styled(Button)({
  backgroundColor: "#fff",
  border: "1px solid #262b40",
  color: "#262b40",
  fontSize: 14,
  fontWeight: 600,
  textTransform: "none",
  height: "31px",
  borderRadius: "5px",
});

const FieldLabel = styled(FormLabel)({
  fontSize: "16px",
  fontWeight: 600,
  color: "#4a5073",
  marginBottom: 30,
});
