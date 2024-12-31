import {
  Box,
  Avatar,
  styled,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Search,
  Notifications,
  Logout,
  PersonAdd,
  Settings,
  Message,
} from "@mui/icons-material";
import CommonTextField from "./customeTextField";
import { useState } from "react";
import { commonNavigate } from "../utils/helper";
import { useNavigate } from "react-router-dom";
import { AppRoutings } from "../utils/enums/app-routings";
const CommonHeader = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => {
    setAnchorEl(null);
  };
  const handleProfileOption = (path: string) => {
    if (path === AppRoutings.LogIn) {
      localStorage.clear();
    }
    commonNavigate(navigate, path);
  };
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
          <UserInfoBox onClick={handleProfileClick}>
            <Avatar />
            <UserNameTypo>Bonnie Green</UserNameTypo>
          </UserInfoBox>
          <ProfileMenu
            anchorEl={anchorEl}
            id="account-menu"
            open={Boolean(anchorEl)}
            onClose={handleProfileClose}
            onClick={handleProfileClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleProfileClose}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              My Profile
            </MenuItem>
            <MenuItem onClick={handleProfileClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={handleProfileClose}>
              <ListItemIcon>
                <Message fontSize="small" />
              </ListItemIcon>
              Message
            </MenuItem>
            <MenuItem onClick={() => handleProfileOption(AppRoutings.LogIn)}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </ProfileMenu>
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

const ProfileMenu = styled(Menu)({
  "& .MuiPaper-root": {
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px !important",
    width: "200px",
    marginTop: 5,
  },
  "& .MuiMenuItem-root": {
    fontSize: "0.875rem",
    fontWeight: 600,
    color: "#66799e",
    "&:last-child": {
      marginTop: 20,
      "& .MuiListItemIcon-root": {
        color: "#fa5252",
      },
    },
    "& .MuiListItemIcon-root": {
      color: "#66799e",
    },
  },
});
