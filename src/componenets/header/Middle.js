import { ShoppingCartOutlined } from "@mui/icons-material";
import {
  Badge,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchBar from "./SearchBar";
import AuthDialog from "../Auth/AuthDialog";
import useAuth from "../../Hooks/useAuth";




const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));



const Header2 = () => {

  const { isAuthenticated, userInfo } = useAuth();

  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setAuthDialogOpen(true);
  };








  const [anchorE, setAnchorE] = useState(null);

  const [tabValue, setTabValue] = useState(0);
  const baseUrl = process.env.REACT_APP_BASE_URL;


  const handleMenuOpen = (event) => setAnchorE(event.currentTarget);
  const handleMenuClose = () => setAnchorE(null);
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload(); // أو setAuthState(false) إذا كنت تستخدم context
  };




  return (

    <Container sx={{ my: 3, display: "flex", justifyContent: "space-between" }}>
      <Stack alignItems={"center"}>
        <ShoppingCartOutlined />
        <Typography variant="body2">E-commerce</Typography>
      </Stack>
      <SearchBar />

      <Stack direction={"row"} alignItems={"center"}>
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={4} color="primary">
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>

        <IconButton onClick={handleMenuOpen}>
          <Person2OutlinedIcon />
        </IconButton>

        <Menu
          anchorEl={anchorE}
          open={Boolean(anchorE)}
          onClose={handleMenuClose}
        >

          {!isAuthenticated ? (
            <>
              <MenuItem onClick={() => {
                setTabValue(0);
                handleOpenDialog();
              }} >Sign In</MenuItem>
              <MenuItem onClick={() => {
                setTabValue(1);
                handleOpenDialog();
              }}>Sign Up</MenuItem>
            </>
          ) : (
            <>
              <MenuItem onClick={() => handleOpenDialog()} >Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </>
          )}

        </Menu>

        <AuthDialog tabValue={tabValue} setTabValue={setTabValue} baseUrl={baseUrl} open={authDialogOpen} onClose={() => setAuthDialogOpen(false)} />

      </Stack>
    </Container>



  );
};

export default Header2;
