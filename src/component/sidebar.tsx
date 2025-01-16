import { useState } from "react";
import {
  Box,
  ListItemButton,
  Typography,
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme,
  List,
} from "@mui/material";
import WifiProtectedSetupIcon from "@mui/icons-material/WifiProtectedSetup";
import MenuIcon from "@mui/icons-material/Menu";
import { ISidebar } from "../utils/interface/common";
import { styled } from "@mui/system";
import { NavLink } from "react-router-dom";
import { AppRoutings } from "../utils/enums/app-routings";
import CommonHeader from "./header";
import { Assessment, Home, Settings, ShowChart } from "@mui/icons-material";

const SidebarOption = [
  { name: "Overview", icon: Home, path: AppRoutings.Dashboard },
  { name: "Transactions", icon: ShowChart, path: AppRoutings.Transactions },
  { name: "Setting", icon: Settings, path: AppRoutings.Setting },
  { name: "Portfolio", icon: Assessment, path: AppRoutings.Portfolio },
  {
    name: "Admin Home",
    icon: WifiProtectedSetupIcon,
    path: AppRoutings.AdminHome,
  },
];

const SidebarComponent = ({ children }: any) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <SidebarContainer>
      {isSmallScreen && (
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleSidebarToggle}
          sx={{ marginLeft: 2, marginTop: 2, height: "30px" }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        anchor="left"
        open={isSmallScreen ? isSidebarOpen : true}
        onClose={handleSidebarToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: "240px",
            backgroundColor: "#262b40",
            color: "white",
            paddingTop: "16px",
          },
        }}
      >
        <SidebarMenu>
          {SidebarOption.map((option: ISidebar) => (
            <NavLink
              to={option.path}
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "white",
              }}
            >
              <ListItemButton
                key={option.name}
                className="list-btn"
                style={{ height: "60px" }}
              >
                <option.icon sx={{ marginRight: 1 }} />
                <Typography>{option.name}</Typography>
              </ListItemButton>
            </NavLink>
          ))}
        </SidebarMenu>
      </Drawer>
      <Content isSmallScreen={isSmallScreen}>
        <CommonHeader />
        {children}
      </Content>
    </SidebarContainer>
  );
};

export default SidebarComponent;

const SidebarContainer = styled(Box)({
  display: "flex",
  height: "100vh",
  width: "100%",
});

const Content = styled(Box)(
  ({ isSmallScreen }: { isSmallScreen: boolean }) => ({
    flexGrow: 1,
    padding: "24px",
    backgroundColor: "#f8f6f8",
    overflowY: "auto",
    marginLeft: isSmallScreen ? 0 : "240px",
  })
);

const SidebarMenu = styled(List)({
  listStyle: "none",
  paddingLeft: 0,
});
