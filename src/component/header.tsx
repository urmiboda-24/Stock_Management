import { Box, Avatar, styled } from "@mui/material";
import { Search, Notifications } from "@mui/icons-material";
import CommonTextField from "./customeTextField";
const CommonHeader = () => {
  return (
    <MainBox>
      <SearchBox display="flex" justifyContent="flex-start">
        <CommonTextField
          value=""
          placeholder="Search"
          customStyle={{ maxWidth: "320px", width: "100%", marginBottom: 0 }}
          startIcon={<Search />}
        />
      </SearchBox>
      <Box style={{ marginRight: "8px" }}>
        <UserInfoContainer>
          <Box display="flex" alignItems="center">
            <Notifications />
          </Box>
          <UserInfoBox>
            <Avatar />
            <UserNameTypo>Bonnie Green</UserNameTypo>
          </UserInfoBox>
        </UserInfoContainer>
      </Box>
    </MainBox>
  );
};

export default CommonHeader;

const MainBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  "@media (max-width:600px)": {
    flexDirection: "column-reverse",
    alignItems: "flex-end",
    gap: 10,
  },
});
const SearchBox = styled(Box)({
  "@media (max-width:600px)": {
    width: "100%",
  },
});
const UserInfoContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "20px",
  justifyContent: "flex-end",
  "@media (max-width:900px)": {
    justifyContent: "space-between",
  },
});

const UserInfoBox = styled(Box)({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  maxWidth: "calc(100% - 50px)",
  "@media (max-width:600px)": {
    flexDirection: "column",
    gap: "5px",
  },
});

const UserNameTypo = styled(Box)({
  maxWidth: "200px",
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textWrap: "nowrap",
  fontSize: ".875rem",
  "@media (max-width:900px)": {
    display: "none",
  },
});
