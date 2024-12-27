import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { ISignUp, ISignUpContainerDispatch } from "../../utils/interface/auth";
import { useNavigate } from "react-router-dom";
import { commonNavigate } from "../../utils/helper";
import * as Yup from "yup";
import { Formik } from "formik";
import { SignUpSuccessPayload } from "../../store/auth/types";
import { showToast } from "../../component/toast";
import { MapDispatchToProps, connect } from "react-redux";
import { signUpRequest } from "../../store/auth/action";

export type SignUpProps = ISignUpContainerDispatch;

const mapDispatchToProps: MapDispatchToProps<
  ISignUpContainerDispatch,
  ISignUp
> = {
  signUpRequest,
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required("*Email is required").email("Invalid email"),
  password: Yup.string()
    .required("*Password is required")
    .min(6, "Password too short"),
  fullName: Yup.string().required("*Full name is required"),
});
const initialValue = {
  email: "",
  password: "",
  fullName: "",
};
const SignUpForm = (props: SignUpProps) => {
  const navigate = useNavigate();
  const handleLogin = () => {
    commonNavigate(navigate, "/Login");
  };

  const onSuccess = (response: SignUpSuccessPayload) => {
    const { message, success } = response;
    if (success) {
      showToast(message, "success");
      commonNavigate(navigate, "/Login");
    }
  };
  return (
    <SignUpWrapper>
      <SignUpContainer>
        <SignInTypo>Create an account</SignInTypo>
        <Formik
          initialValues={initialValue}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={(value: ISignUp) => {
            const values = {
              email: value.email,
              password: value.password,
              full_name: value.fullName,
            };
            props.signUpRequest({ values, callback: onSuccess });
          }}
        >
          {({ handleSubmit, errors, touched, getFieldProps, isValid }) => (
            <form onSubmit={handleSubmit}>
              <FieldContainer>
                <FormLabel>Your Email</FormLabel>
                <TextField
                  {...getFieldProps("email")}
                  type="email"
                  name="email"
                  fullWidth
                  variant="outlined"
                  placeholder="example@company.com"
                  error={Boolean(errors.email) && touched.email}
                  helperText={(touched.email && errors.email)?.toString()}
                />
              </FieldContainer>
              <FieldContainer>
                <FormLabel>Your Password</FormLabel>
                <TextField
                  {...getFieldProps("password")}
                  type="password"
                  fullWidth
                  name="password"
                  variant="outlined"
                  placeholder="Password"
                  error={Boolean(errors.password) && touched.password}
                  helperText={(touched.password && errors.password)?.toString()}
                />
              </FieldContainer>
              <FieldContainer>
                <FormLabel>Full Name</FormLabel>
                <TextField
                  {...getFieldProps("fullName")}
                  fullWidth
                  name="fullName"
                  variant="outlined"
                  placeholder="Enter Your Full Name"
                  error={Boolean(errors.fullName) && touched.fullName}
                  helperText={(touched.fullName && errors.fullName)?.toString()}
                />
              </FieldContainer>
              <FormControlLabel
                control={<CustomCheckBox defaultChecked />}
                label="I agree to the terms and conditions"
              />
              <SignUpButton type="submit">Sign up</SignUpButton>
            </form>
          )}
        </Formik>
        <RegisteredTypo>
          Already have an account?{" "}
          <CreateAccountSpan onClick={handleLogin}>
            Login Here
          </CreateAccountSpan>
        </RegisteredTypo>
      </SignUpContainer>
    </SignUpWrapper>
  );
};

export default connect(null, mapDispatchToProps)(SignUpForm);

const SignUpWrapper = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f5f5f5",
  padding: "0 20px",
});

const SignUpContainer = styled(Box)({
  maxWidth: "500px",
  width: "100%",
  boxShadow: "0px 1px 20px 3px #888888",
  padding: "24px",
});

const SignInTypo = styled(Typography)({
  textAlign: "center",
  fontSize: "32px",
  color: "#262b40",
  fontWeight: 600,
});

const SignUpButton = styled(Button)({
  fontSize: "16px",
  textTransform: "none",
  border: "1px solid #262b40",
  backgroundColor: "#262b40",
  color: "#fff",
  fontWeight: 600,
  marginTop: "20px",
  width: "100%",
});

const RegisteredTypo = styled(Typography)({
  textAlign: "center",
  marginTop: "20px",
});

const CreateAccountSpan = styled("span")({
  color: "#262b40",
  fontWeight: 600,
  cursor: "pointer",
});

const CustomCheckBox = styled(Checkbox)({
  color: "#262b40",
  "&.Mui-checked": {
    color: "#262b40",
  },
});

const FieldContainer = styled(Box)({
  marginTop: "20px",
});
