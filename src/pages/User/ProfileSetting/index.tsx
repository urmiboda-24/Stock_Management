import { Add, AttachFile, Description, PersonAdd } from "@mui/icons-material";
import {
  Box,
  Button,
  FormHelperText,
  FormLabel,
  Grid2,
  Input,
  MenuItem,
  Select,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { Grid } from "@mui/system";
import CommonTextField from "../../../component/customTextField";
import { coverImg, profileImg1, profileImg2 } from "../../../asset";
import CommonSelect from "../../../component/customSelect";
import { DesktopDatePicker, DesktopDatePickerProps } from "@mui/x-date-pickers";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { IUserProfileContainerDispatch } from "../../../utils/interface/profileSetting";
import { MapDispatchToProps, connect, useSelector } from "react-redux";
import {
  addProfileRequest,
  editProfileRequest,
  editUserProfilePhotoRequest,
  getUserProfileRequest,
} from "../../../store/profileSetting/action";
import {
  EditProfileSuccessPayload,
  GetUserProfileSuccessPayload,
  UpdateUserProfileImageSuccessPayload,
} from "../../../store/profileSetting/types";
import { showToast } from "../../../component/toast";

const mapDispatchToProps: MapDispatchToProps<
  IUserProfileContainerDispatch,
  any
> = {
  getUserProfileRequest,
  editUserProfilePhotoRequest,
  editProfileRequest,
  addProfileRequest,
};

const initialFormValue = {
  firstName: "",
  lastName: "",
  birthDate: "",
  gender: "",
  phone: "",
  address: "",
  num: null,
  city: "",
  state: "",
  zip: "",
};

const validation = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  birthDate: Yup.date()
    .required("Birth date is required")
    .max(new Date(), "Birth date cannot be in the future"),
  gender: Yup.string().required("Please select gender"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  address: Yup.string()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters long"),
  num: Yup.string().required("Number is required"),
  city: Yup.string()
    .required("City is required")
    .min(2, "City must be at least 2 characters"),
  state: Yup.string()
    .required("State is required")
    .min(2, "State must be at least 2 characters"),
  zip: Yup.string().required("ZIP code is required"),
});

const ProfileSetting = (props: IUserProfileContainerDispatch) => {
  const [fileError, setFileError] = useState<string | null>(null);
  const [uploadProfile, setUploadProfile] = useState<string>(profileImg2);
  const selector = useSelector((state: any) => state.auth);
  const { user_id } = useSelector((state: any) => state.profile.profileData[0]);
  const editProfileSuccess = async (response: EditProfileSuccessPayload) => {
    const { success } = response;
    if (success) {
      getProfileData();
      showToast("Profile updated successfully", "success");
    }
  };
  const {
    handleSubmit,
    touched,
    errors,
    getFieldProps,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik({
    initialValues: initialFormValue,
    validationSchema: validation,
    enableReinitialize: true,
    onSubmit: (value) => {
      console.log("userId", user_id);
      if (user_id !== null) {
        props.editProfileRequest({ value, callback: editProfileSuccess });
      } else {
        props.addProfileRequest({ value, callback: editProfileSuccess });
      }
    },
  });
  const onProfileImgSuccess = async (
    response: UpdateUserProfileImageSuccessPayload
  ) => {
    const { success } = response;
    if (success) {
      showToast("Image updated successfully", "success");
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      const validFileTypes = ["image/jpeg", "image/gif", "image/png"];
      const maxSize = 800 * 1024;

      if (!validFileTypes.includes(file.type)) {
        setFileError("Invalid file type. Only JPG, GIF, or PNG are allowed.");
        setUploadProfile(profileImg2);
      } else if (file.size > maxSize) {
        setFileError("File is too large. Maximum size is 800KB.");
        setUploadProfile(profileImg2);
      } else {
        const payload = {
          value: {
            file: file,
          },
          callback: onProfileImgSuccess,
        };
        setFileError(null);
        const imageUrl = URL.createObjectURL(file);
        setUploadProfile(imageUrl);
        props.editUserProfilePhotoRequest(payload);
      }
    }
  };
  const onSuccess = async (response: GetUserProfileSuccessPayload) => {
    const { success, data } = response;
    if (success && data.length) {
      setFieldValue("firstName", data[0].first_name);
      setFieldValue("lastName", data[0].last_name);
      setFieldValue("birthDate", data[0].birthday);
      setFieldValue("gender", data[0].gender);
      setFieldValue("phone", data[0].phone_number);
      setFieldValue("address", data[0].address);
      setFieldValue("num", data[0].block_no);
      setFieldValue("city", data[0].city);
      setFieldValue("state", data[0].state);
      setFieldValue("zip", data[0].zip);
      setUploadProfile(
        data[0].profile_pic
          ? `http://localhost:3001/images/${data[0].profile_pic}`
          : profileImg2
      );
    }
  };

  const getProfileData = () => {
    props.getUserProfileRequest({
      callback: onSuccess,
    });
  };

  useEffect(() => {
    getProfileData();
  }, []);
  return (
    <Box>
      <NewTaskBox>
        <Box style={{ maxWidth: "130px" }}>
          <NewTaskButton startIcon={<Add />}>New</NewTaskButton>
        </Box>
        <ReportButton startIcon={<Description />}>Report</ReportButton>
      </NewTaskBox>
      <Grid2 container spacing={3}>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 8 }}>
          <FormContainer onSubmit={handleSubmit}>
            <Grid2 container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <FormTypo>General information</FormTypo>
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                <FieldLabel>First Name</FieldLabel>
                <CommonTextField
                  {...getFieldProps("firstName")}
                  name="firstName"
                  placeholder="Enter your first name"
                  error={Boolean(errors.firstName) && touched.firstName}
                  helperText={(
                    touched.firstName && errors.firstName
                  )?.toString()}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                <FieldLabel>Last Name</FieldLabel>
                <CommonTextField
                  {...getFieldProps("lastName")}
                  name="lastName"
                  error={Boolean(errors.lastName) && touched.lastName}
                  helperText={(touched.lastName && errors.lastName)?.toString()}
                  placeholder="Also your last name"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                <FieldLabel>Birth Date</FieldLabel>
                <CustomDatePicker
                  value={values.birthDate ? dayjs(values.birthDate) : null}
                  onChange={(newValue: Dayjs | null) => {
                    setFieldValue(
                      "birthDate",
                      newValue ? newValue.toISOString() : ""
                    );
                  }}
                  slotProps={{
                    textField: {
                      error: Boolean(errors.birthDate) && touched.birthDate,
                      helperText: (
                        touched.birthDate && errors.birthDate
                      )?.toString(),
                      onBlur: () => setFieldTouched("birthDate", true),
                    },
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                <FieldLabel>Gender</FieldLabel>
                <CommonSelect
                  {...getFieldProps("gender")}
                  error={Boolean(errors.gender) && touched.gender}
                  helperText={(touched.gender && errors.gender)?.toString()}
                  placeholder="Select Gender"
                  options={[
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                  ]}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                <FieldLabel>Email</FieldLabel>
                <CommonTextField
                  value={selector.userEmail}
                  name="email"
                  placeholder="name@company.com"
                  disabled
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                <FieldLabel>Phone</FieldLabel>
                <CommonTextField
                  {...getFieldProps("phone")}
                  name="phone"
                  error={Boolean(errors.phone) && touched.phone}
                  helperText={(touched.phone && errors.phone)?.toString()}
                  placeholder="+12-345 678 910"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <FormTypo variant="h5">Address</FormTypo>
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 8, lg: 8 }}>
                <FieldLabel>Address</FieldLabel>
                <CommonTextField
                  placeholder="Enter your home address"
                  {...getFieldProps("address")}
                  name="address"
                  error={Boolean(errors.address) && touched.address}
                  helperText={(touched.address && errors.address)?.toString()}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
                <FieldLabel>Number</FieldLabel>
                <CommonTextField
                  {...getFieldProps("num")}
                  name="num"
                  error={Boolean(errors.num) && touched.num}
                  helperText={(touched.num && errors.num)?.toString()}
                  placeholder="No."
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
                <FieldLabel>City</FieldLabel>
                <CommonTextField
                  {...getFieldProps("city")}
                  name="city"
                  error={Boolean(errors.city) && touched.city}
                  helperText={(touched.city && errors.city)?.toString()}
                  placeholder="City"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
                <FieldLabel>State</FieldLabel>
                <CommonTextField
                  {...getFieldProps("state")}
                  name="state"
                  error={Boolean(errors.state) && touched.state}
                  helperText={(touched.state && errors.state)?.toString()}
                  placeholder="State"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
                <FieldLabel>Zip Code</FieldLabel>
                <CommonTextField
                  {...getFieldProps("zip")}
                  name="zip"
                  error={Boolean(errors.zip) && touched.zip}
                  helperText={(touched.zip && errors.zip)?.toString()}
                  placeholder="Zip"
                  type="text"
                />
              </Grid>
            </Grid2>
            <SaveBox>
              <ReportButton type="submit">Save All</ReportButton>
            </SaveBox>
          </FormContainer>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 4 }}>
          <Grid2 container spacing={3}>
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 12 }}>
              <CardContainer>
                <CardImgBox>
                  <img src={coverImg} alt="cover-img" className="cover-img" />
                  <img src={profileImg1} className="cover-profile-img" />
                </CardImgBox>
                <CardBodyBox>
                  <NameTypo>Neil Sims</NameTypo>
                  <TitleTypo>Senior Software Engineer</TitleTypo>
                  <AddressTypo>New York, USA</AddressTypo>
                  <CardAction>
                    <ConnectButton startIcon={<PersonAdd />}>
                      Connect
                    </ConnectButton>
                    <MessageButton>Send Message</MessageButton>
                  </CardAction>
                </CardBodyBox>
              </CardContainer>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 12 }}>
              <ProfileContainer>
                <FormTypo>Select Profile Photo</FormTypo>

                <ProfileBody>
                  <img src={uploadProfile} className="profile-img" />
                  <Button
                    component="label"
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<AttachFile color="action" />}
                    className="file-upload-btn"
                  >
                    <VisuallyHiddenInput
                      type="file"
                      onChange={handleFileChange}
                    />
                    <FileTypeBox>
                      <TitleTypo>Choose Image</TitleTypo>
                      <AddressTypo>
                        JPG, GIF or PNG. Max size of 800K
                      </AddressTypo>
                    </FileTypeBox>
                  </Button>
                </ProfileBody>
                <ErrorText>{fileError}</ErrorText>
              </ProfileContainer>
            </Grid>
          </Grid2>
        </Grid>
      </Grid2>
    </Box>
  );
};

export default connect(null, mapDispatchToProps)(ProfileSetting);

const NewTaskBox = styled(Box)({
  margin: "20px 0px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
});

const NewTaskButton = styled(Button)({
  backgroundColor: "#61dafb",
  color: "#262b40",
  fontSize: "1rem",
  fontWeight: 600,
  lineHeight: 1.5,
  textTransform: "none",
  borderRadius: "0.5rem",
  "&:hover": {
    backgroundColor: "#61dafb",
    color: "#262b40",
  },
});

const ReportButton = styled(Button)({
  backgroundColor: "#262b40",
  color: "#fff",
  fontSize: "1rem",
  fontWeight: 600,
  textTransform: "none",
  borderRadius: "0.5rem",
  height: "100%",
  lineHeight: 1.5,
  maxWidth: "120px",
  width: "100%",
  "&:hover": {
    backgroundColor: "#262b40",
    color: "#fff",
  },
});

const FieldLabel = styled(FormLabel)({
  fontSize: "0.94rem",
  fontWeight: 600,
  color: "#4a5073",
});

const FormTypo = styled(Typography)({
  color: "#262b40",
  fontSize: "1.25rem",
  fontWeight: 600,
});

const SaveBox = styled(Box)({
  marginTop: 50,
});

const FormContainer = styled(`form`)({
  borderRadius: "10px",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  padding: "1.25rem 1.5rem",
});

const CardContainer = styled(Box)({
  borderRadius: "10px",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
});
const CardImgBox = styled(Box)({
  height: 200,
  position: "relative",
  "& .cover-img": {
    height: "100%",
    width: "100%",
    borderTopRightRadius: "10px",
    borderTopLeftRadius: "10px",
    position: "absolute",
  },
  "& .cover-profile-img": {
    height: "160px",
    width: "160px",
    borderRadius: "50%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, 0)",
  },
});
const CardBodyBox = styled(Box)({
  height: 260,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});
const CardAction = styled(Box)({
  display: "flex",
  gap: "0.5rem",
  alignItems: "center",
  marginTop: "1.5rem",
});

const ConnectButton = styled(Button)({
  backgroundColor: "#262b40",
  color: "#fff",
  fontSize: "0.875rem",
  textTransform: "none",
  borderRadius: "0.5rem",
  height: "31px",
  lineHeight: 1.5,
  "&:hover": {
    backgroundColor: "#262b40",
    color: "#fff",
  },
});

const MessageButton = styled(Button)({
  backgroundColor: "#61dafb",
  color: "#262b40",
  fontSize: "0.875rem",
  lineHeight: 1.5,
  textTransform: "none",
  borderRadius: "0.5rem",
  height: "31px",
  "&:hover": {
    backgroundColor: "#61dafb",
    color: "#262b40",
  },
});
const NameTypo = styled(Typography)({
  fontSize: "20px",
  color: "#262b40",
  fontWeight: 600,
  marginTop: 30,
});
const TitleTypo = styled(Typography)({
  fontSize: "16px",
  color: "#262b40",
  fontWeight: 400,
});
const AddressTypo = styled(Typography)({
  fontSize: "14px",
  color: "#4a5073",
  fontWeight: 400,
});

const ProfileContainer = styled(Box)({
  borderRadius: "10px",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  padding: "1.25rem 1.5rem",
});
const ProfileBody = styled(Box)({
  display: "flex",
  gap: 15,
  alignItems: "center",
  marginTop: 15,
  "& .profile-img": {
    height: 72,
    width: 72,
    borderRadius: "5px",
  },
  "& .file-upload-btn": {
    textTransform: "none",
    background: "transparent",
    height: "72px",
    padding: 0,
    boxShadow: "none",
    "&:hover": {
      boxShadow: "none",
    },
  },
  "@media (max-width:450px)": {
    flexDirection: "column",
    gap: 5,
    justifyContent: "center",
  },
});
const FileTypeBox = styled(Box)({
  display: "flex",
  gap: 5,
  flexDirection: "column",
});
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const CustomDatePicker = styled(DesktopDatePicker)({
  width: "100%",
  height: "40px",
  "& .MuiInputBase-root": {
    height: "100%",
    borderRadius: 10,
  },
  "& .MuiInputBase-input": {
    marginLeft: 8,
  },
});
const ErrorText = styled(FormHelperText)({
  color: "#d32f2f",
  margin: "3px 14px 0 14px",
});
