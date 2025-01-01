import { Add, AttachFile, Description, PersonAdd } from "@mui/icons-material";
import {
  Box,
  Button,
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
import CommonTextField from "../../../component/customeTextField";
import { coverImg, profileImg1, profileImg2 } from "../../../asset";
import CommonSelect from "../../../component/customeSelect";
import DatePicker from "react-datepicker";

const ProfileSetting = () => {
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
          <BoxContainer>
            <Grid2 container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <FormTypo>General information</FormTypo>
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                <FieldLabel>First Name</FieldLabel>
                <CommonTextField
                  value={""}
                  placeholder="Enter your first name"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                <FieldLabel>Last Name</FieldLabel>
                <CommonTextField value={""} placeholder="Also your last name" />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                <FieldLabel>Birth Date</FieldLabel>
                <DatePicker
                  selected={new Date()}
                  //   onChange={(date) => setStartDate(date)}
                />
                {/* <CommonTextField
                  value={""}
                  placeholder="Enter your first name"
                /> */}
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                <FieldLabel>Gender</FieldLabel>
                <CommonSelect
                  value=""
                  placeholder="Select Gender"
                  options={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                  ]}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                <FieldLabel>Email</FieldLabel>
                <CommonTextField value={""} placeholder="name@company.com" />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                <FieldLabel>Phone</FieldLabel>
                <CommonTextField value={""} placeholder="+12-345 678 910" />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <FormTypo variant="h5">Address</FormTypo>
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 8, lg: 8 }}>
                <FieldLabel>Address</FieldLabel>
                <CommonTextField
                  value={""}
                  placeholder="Enter your home address"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
                <FieldLabel>Number</FieldLabel>
                <CommonTextField value={""} placeholder="No." />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
                <FieldLabel>City</FieldLabel>
                <CommonTextField value={""} placeholder="City" />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
                <FieldLabel>State</FieldLabel>
                <CommonTextField value={""} placeholder="No." />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
                <FieldLabel>Zip Code</FieldLabel>
                <CommonTextField value={""} placeholder="Zip" />
              </Grid>
            </Grid2>
            <SaveBox>
              <ReportButton>Save All</ReportButton>
            </SaveBox>
          </BoxContainer>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 4 }}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
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
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <ProfileContainer>
              <FormTypo>Select Profile Photo</FormTypo>
              <ProfileBody>
                <img src={profileImg2} className="profile-img" />
                <Button
                  component="label"
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<AttachFile color="action" />}
                  className="file-upload-btn"
                >
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(event) => console.log(event.target.files)}
                  />
                  <FileTypeBox>
                    <TitleTypo>Choose Image</TitleTypo>
                    <AddressTypo>JPG, GIF or PNG. Max size of 800K</AddressTypo>
                  </FileTypeBox>
                </Button>
              </ProfileBody>
            </ProfileContainer>
          </Grid>
        </Grid>
      </Grid2>
    </Box>
  );
};

export default ProfileSetting;

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
  marginTop: 20,
});

const BoxContainer = styled(`form`)({
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
  marginTop: 20,
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
