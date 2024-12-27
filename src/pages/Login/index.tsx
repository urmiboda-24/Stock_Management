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
import { ILogin, ILoginContainerDispatch } from "../../utils/interface/auth";
import { useNavigate } from "react-router-dom";
import { commonNavigate } from "../../utils/helper";
import { Formik } from "formik";
import * as Yup from "yup";
import { LoginSuccessPayload } from "../../store/auth/types";
import { showToast } from "../../component/toast";
import { AppRoutings } from "../../utils/enums/app-routings";
import { MapDispatchToProps, connect } from "react-redux";
import { loginRequest } from "../../store/auth/action";

export type LoginProps = ILoginContainerDispatch;

const mapDispatchToProps: MapDispatchToProps<ILoginContainerDispatch, ILogin> =
  {
    loginRequest,
  };

const validationSchema = Yup.object().shape({
  email: Yup.string().required("*Email is required").email("Invalid email"),
  password: Yup.string().required("*Password is required"),
});
const LoginForm = (props: LoginProps) => {
  const navigate = useNavigate();
  const handleCreateAccount = () => {
    commonNavigate(navigate, "/SignUp");
  };
  const onSuccess = async (response: LoginSuccessPayload) => {
    const { token, success, message, data } = response;
    const isAdmin = data[0].email.includes("admin") ? true : false;

    if (success && data.length) {
      showToast(message, "success");

      localStorage.setItem("token", token);
      localStorage.setItem("email", data[0].email);
      commonNavigate(
        navigate,
        isAdmin ? AppRoutings.AdminHome : AppRoutings.Dashboard
      );
    }
  };
  return (
    <LoginWrapper>
      <LoginContainer>
        <SignInTypo>Sign in to our platform</SignInTypo>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values: ILogin) => {
            props.loginRequest({
              values,
              callback: onSuccess,
            });
          }}
        >
          {({ handleSubmit, errors, touched, getFieldProps }) => (
            <form onSubmit={handleSubmit}>
              <FiledContainer>
                <FormLabel>Your Email</FormLabel>
                <TextField
                  {...getFieldProps("email")}
                  type="email"
                  fullWidth
                  variant="outlined"
                  placeholder="example@company.com"
                  error={Boolean(errors.email) && touched.email}
                  helperText={(touched.email && errors.email)?.toString()}
                />
              </FiledContainer>
              <FiledContainer>
                <FormLabel>Your Password</FormLabel>
                <TextField
                  {...getFieldProps("password")}
                  type="password"
                  fullWidth
                  variant="outlined"
                  placeholder="Password"
                  error={Boolean(errors.password) && touched.password}
                  helperText={touched.password && errors.password?.toString()}
                />
              </FiledContainer>
              <RememberLostBox>
                <FormControlLabel
                  control={<CustomCheckBox defaultChecked />}
                  label="Remember Me"
                />
                <Typography>Lost Password?</Typography>
              </RememberLostBox>
              <LoginButton type="submit">Sign In</LoginButton>
            </form>
          )}
        </Formik>
        <CreateAccountTypo>
          Not registered?{" "}
          <CreateAccountSpan onClick={handleCreateAccount}>
            Create account
          </CreateAccountSpan>
        </CreateAccountTypo>
      </LoginContainer>
    </LoginWrapper>
  );
};

export default connect(null, mapDispatchToProps)(LoginForm);

const LoginWrapper = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f5f5f5",
  padding: "0 20px",
});

const LoginContainer = styled(Box)({
  display: "flex",
  margin: "auto",
  flexDirection: "column",
  gap: 10,
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

const RememberLostBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "20px",
  alignItems: "center",
});

const LoginButton = styled(Button)({
  fontSize: "16px",
  textTransform: "none",
  border: "1px solid #262b40",
  backgroundColor: "#262b40",
  color: "#fff",
  fontWeight: 600,
  marginTop: "20px",
  width: "100%",
});

const CreateAccountTypo = styled(Typography)({
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

const FiledContainer = styled(Box)({
  marginTop: "20px",
});
