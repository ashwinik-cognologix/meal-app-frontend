import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import HeaderCartButton from "./HeaderCartButton";

const pages = ["Meals", "Add New Meal", "Orders"];
const settings = ["Logout"];

function ResponsiveAppBar(props) {
  const navigate = useNavigate();

  const [user, setUser] = React.useState(localStorage.getItem("user"));
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // React.useEffect(() => {
  //   console.log(" useEffect user", localStorage.getItem("user"));
  // }, []);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              fontSize: "28px",
              display: { xs: "none", md: "flex" },
              fontFamily: "Noto Sans JP",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ReactMeals
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Noto Sans JP",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box
            sx={{
              mt: 1,
              ml: 5,
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  handleCloseNavMenu();
                  if (page === "Meals") {
                    navigate("/meals");
                  }

                  if (page === "Add New Meal") {
                    navigate("/add-meal");
                  }
                }}
                sx={{
                  my: 2,
                  fontFamily: "Noto Sans JP",
                  color: "white",
                  display: "block",
                  fontSize: "16px",
                }}
              >
                {page}
              </Button>
            ))} */}

            <Button
              onClick={() => {
                handleCloseNavMenu();
                navigate("/meals");
              }}
              sx={{
                my: 2,
                fontFamily: "Noto Sans JP",
                color: "white",
                display: "block",
                fontSize: "16px",
              }}
            >
              Meals
            </Button>

            <Button
              onClick={() => {
                handleCloseNavMenu();
                navigate("/order");
              }}
              sx={{
                my: 2,
                fontFamily: "Noto Sans JP",
                color: "white",
                display: "block",
                fontSize: "16px",
              }}
            >
              Order
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <>
                {user !== null ? (
                  <>
                    <Button
                      sx={{
                        mr: 2,
                      }}
                    >
                      <HeaderCartButton onClick={props.onShowCart} />
                    </Button>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt={user} src="/static/images/avatar/2.jpg" />
                      <Button
                        sx={{
                          my: 2,
                          fontFamily: "Noto Sans JP",
                          color: "white",
                          display: "block",
                          fontSize: "16px",
                          textTransform: "none",
                        }}
                      >
                        Hi {user}
                      </Button>
                    </IconButton>
                  </>
                ) : (
                  <Button
                    sx={{
                      my: 2,
                      fontFamily: "Noto Sans JP",
                      color: "white",
                      display: "block",
                      fontSize: "16px",
                      textTransform: "none",
                    }}
                    onClick={() => {
                      handleCloseUserMenu();
                      navigate("/login");
                    }}
                  >
                    Login
                  </Button>
                )}
              </>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user !== null ? (
                <>
                  <MenuItem
                    onClick={() => {
                      navigate("/address");
                    }}
                  >
                    <Typography textAlign="center">Address</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      localStorage.setItem("user", null);
                      setUser(null);
                      navigate("/meals");
                    }}
                  >
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </>
              ) : (
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    navigate("/login");
                  }}
                >
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
