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
import SettingsIcon from "@mui/icons-material/Settings";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import WifiProtectedSetupIcon from "@mui/icons-material/WifiProtectedSetup";
import MenuIcon from "@mui/icons-material/Menu";
import { ISidebar } from "../utils/interface/common";
import { styled } from "@mui/system";
import { NavLink } from "react-router-dom";
import { AppRoutings } from "../utils/enums/app-routings";

const SidebarOption = [
  { name: "Overview", icon: SettingsIcon, path: AppRoutings.Dashboard },
  { name: "Settings", icon: SettingsIcon, path: "/Settings" },
  { name: "Stock", icon: ShowChartIcon, path: AppRoutings.AdminHome },
  { name: "Portfolio", icon: WifiProtectedSetupIcon, path: "/Portfolio" },
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
            <ListItemButton
              key={option.name}
              className="list-btn"
              style={{ height: "60px" }}
            >
              <NavLink
                to={option.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <option.icon sx={{ marginRight: 1 }} />
                <Typography>{option.name}</Typography>
              </NavLink>
            </ListItemButton>
          ))}
        </SidebarMenu>
      </Drawer>

      <Content isSmallScreen={isSmallScreen}>{children}</Content>
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
