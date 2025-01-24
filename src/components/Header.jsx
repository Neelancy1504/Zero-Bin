import { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import supabase from "../../helpers/supabase";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PersonIcon from "@mui/icons-material/Person";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
// import logo from "../assets/your-logo.svg"; // Uncomment and add your logo
import RecyclingIcon from "@mui/icons-material/Recycling";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleClose();
  };

  const scrollToSection = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { fromHeader: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        if (sectionId === "services") {
          navigate(".", { state: { fromHeader: "services" }, replace: true });
        }
      }
    }
  };

  useEffect(() => {
    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.6)", // Semi-transparent white
        backdropFilter: "blur(10px)", // Apply blur effect
        boxShadow: "none", // Remove shadow for a cleaner look
        borderBottom: "1px solid rgba(255, 255, 255, 0.3)", // Optional subtle border
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          // px: { xs: 2, md: 4 },
          py: 1,
        }}
      >
        {/* Logo and Brand */}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 0, width: "1%" }}
        >
          <RecyclingIcon sx={{ color: "#32a137", fontSize: 40, mr: 0 }} />
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              color: "#32a137",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            ZeroBin
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            marginLeft: "7%",
            gap: 10,
            fontSize: "15px",
          }}
        >
          <Button
            color="inherit"
            sx={{ color: "#333", fontSize: "15px" }}
            onClick={() => navigate("/")}
          >
            Home
          </Button>
          <Button
            color="inherit"
            sx={{ color: "#333" }}
            onClick={() => navigate("/services")}
          >
            Our Services
          </Button>
          <Button
            color="inherit"
            sx={{ color: "#333" }}
            onClick={() => navigate("/about")}
          >
            About Us
          </Button>
          <Button
            color="inherit"
            sx={{ color: "#333" }}
            onClick={() => navigate("/insights")}
          >
            Insights
          </Button>
          <Button
            color="inherit"
            sx={{ color: "#333" }}
            onClick={() => navigate("/faqs")}
          >
            FAQs
          </Button>
        </Box>

        {/* User Section */}
        {user ? (
          <>
            <Avatar
              sx={{
                cursor: "pointer",
                bgcolor: "#2E7D32",
                "&:hover": {
                  boxShadow: "0 2px 8px rgba(46, 125, 50, 0.25)",
                },
              }}
              onClick={handleClick}
            >
              {user.email[0].toUpperCase()}
            </Avatar>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.12))",
                  mt: 1.5,
                  "& .MuiMenuItem-root": {
                    px: 2.5,
                    py: 1.5,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={() => handleMenuItemClick("/pickuplist")}>
                <ListItemIcon>
                  <LocalShippingIcon
                    fontSize="small"
                    sx={{ color: "#2E7D32" }}
                  />
                </ListItemIcon>
                Track My Pickup
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick("/profile")}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" sx={{ color: "#2E7D32" }} />
                </ListItemIcon>
                My Profile
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick("/ecopoints")}>
                <ListItemIcon>
                  <EmojiEventsIcon fontSize="small" sx={{ color: "#2E7D32" }} />
                </ListItemIcon>
                My EcoPoints
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Box
              style={{
                gap: 3,
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  transition: "all 0.3s ease-in-out",
                  mr: 2,
                }}
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
              <Button
                variant="contained"
                sx={{
                  transition: "all 0.3s ease-in-out",
                }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>

    // <AppBar
    //   position="sticky"
    //   sx={{
    //     backgroundColor: "white",
    //     boxShadow: "none",
    //     borderBottom: "1px solid #eee",
    //   }}
    // >
    //   <Toolbar
    //     sx={{
    //       display: "flex",
    //       justifyContent: "space-between",
    //       px: { xs: 2, md: 4 },
    //       py: 1,
    //     }}
    //   >
    //     {/* Logo and Brand */}
    //     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    //       <Typography
    //         variant="h6"
    //         sx={{
    //           fontWeight: 600,
    //           color: "#32a137" ,
    //           cursor: "pointer",
    //         }}
    //         onClick={() => navigate("/")}
    //       >
    //         ZeroBin
    //       </Typography>
    //     </Box>

    //     {/* Navigation Links */}
    //     <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 , fontSize: "10px"}}>
    //       <Button
    //         color="inherit"
    //         sx={{ color: "#333" }}
    //         onClick={() => navigate("/")}
    //       >
    //         Home
    //       </Button>
    //       <Button
    //         color="inherit"
    //         sx={{ color: "#333" }}
    //         onClick={() => navigate("/services")}
    //       >
    //         Our Services
    //       </Button>
    //       <Button
    //         color="inherit"
    //         sx={{ color: "#333" }}
    //         onClick={() => navigate("/about")}
    //       >
    //         About Us
    //       </Button>
    //       <Button
    //         color="inherit"
    //         sx={{ color: "#333" }}
    //         onClick={() => navigate("/insights")}
    //       >
    //         Insights
    //       </Button>
    //       <Button
    //         color="inherit"
    //         sx={{ color: "#333" }}
    //         onClick={() => navigate("/faqs")}
    //       >
    //         FAQs
    //       </Button>
    //     </Box>

    //     {/* User Section */}
    //     {user ? (
    //       <>
    //         <Avatar
    //           sx={{
    //             cursor: "pointer",
    //             bgcolor: "#2E7D32",
    //             "&:hover": {
    //               boxShadow: "0 2px 8px rgba(46, 125, 50, 0.25)",
    //             },
    //           }}
    //           onClick={handleClick}
    //         >
    //           {user.email[0].toUpperCase()}
    //         </Avatar>
    //         <Menu
    //           anchorEl={anchorEl}
    //           open={open}
    //           onClose={handleClose}
    //           onClick={handleClose}
    //           PaperProps={{
    //             elevation: 0,
    //             sx: {
    //               overflow: 'visible',
    //               filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.12))',
    //               mt: 1.5,
    //               '& .MuiMenuItem-root': {
    //                 px: 2.5,
    //                 py: 1.5,
    //               },
    //             },
    //           }}
    //           transformOrigin={{ horizontal: 'right', vertical: 'top' }}
    //           anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    //         >
    //           <MenuItem onClick={() => handleMenuItemClick('/track')}>
    //             <ListItemIcon>
    //               <LocalShippingIcon fontSize="small" sx={{ color: '#2E7D32' }} />
    //             </ListItemIcon>
    //             Track My Product
    //           </MenuItem>
    //           <MenuItem onClick={() => handleMenuItemClick('/profile')}>
    //             <ListItemIcon>
    //               <PersonIcon fontSize="small" sx={{ color: '#2E7D32' }} />
    //             </ListItemIcon>
    //             My Profile
    //           </MenuItem>
    //           <MenuItem onClick={() => handleMenuItemClick('/ecopoints')}>
    //             <ListItemIcon>
    //               <EmojiEventsIcon fontSize="small" sx={{ color: '#2E7D32' }} />
    //             </ListItemIcon>
    //             My EcoPoints
    //           </MenuItem>
    //         </Menu>
    //       </>
    //     ) : (
    //       <>
    //         <Button
    //           variant="outlined"
    //           sx={{
    //             transition: "all 0.3s ease-in-out",
    //           }}
    //           onClick={() => navigate("/signup")}
    //         >
    //           Sign Up
    //         </Button>
    //         <Button
    //           variant="contained"
    //           sx={{
    //             transition: "all 0.3s ease-in-out",
    //           }}
    //           onClick={() => navigate("/login")}
    //         >
    //           Login
    //         </Button>
    //       </>
    //     )}
    //   </Toolbar>
    // </AppBar>
  );
};

export default Header;
